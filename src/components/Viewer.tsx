import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Structure, Vec3 } from "@/types/structure";
import { structuresFor } from "@/data";
import { useLocale } from "@/i18n/locale";
import { useStrings } from "@/i18n/strings";
import { ViewerEngine, IS_LOW_MEMORY_DEVICE, ModelTooHeavyError } from "@/three/engine";
import { HotspotLayer } from "./HotspotLayer";
import { DevHotspotEditor } from "@/dev/DevHotspotEditor";

const DEV_MODE =
  import.meta.env.DEV && typeof window !== "undefined" && new URLSearchParams(window.location.search).get("dev") === "1";
import {
  RotateIcon,
  ZoomInIcon,
  ZoomOutIcon,
  FullscreenIcon,
  PanIcon,
  LayersIcon,
  VaseIcon,
  TimelineIcon,
  ResetIcon,
  BulbIcon,
  CloseIcon,
  GridIcon,
  WireIcon,
  XrayIcon,
  EyeIcon,
  CheckIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
} from "./icons";

const STARS = Array.from({ length: 95 }, (_, i) => {
  let seed = (i + 1) * 7919;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return {
    id: i,
    x: Number((rand() * 99).toFixed(2)),
    y: Number((rand() * 88).toFixed(2)),
    size: Number((0.8 + rand() * 1.8).toFixed(1)),
    opacity: Number((0.35 + rand() * 0.65).toFixed(2)),
    twinkleDuration: Number((2.0 + rand() * 3.5).toFixed(2)),
    twinkleDelay: Number((rand() * 4).toFixed(2)),
  };
});

interface ViewerProps {
  structure: Structure; // the structure the viewer should display
  onSwap: (e: Structure) => void; // called mid-transition: panels should update
  reducedMotion: boolean;
  animating: boolean;
  focusHotspot: string | null;
  onFocusHandled: () => void;
  onArtifacts: () => void;
  onTimeline: () => void;
  /** hands the parent a way to warm a dwelling before it is picked */
  onPrefetchReady?: (prefetch: (e: Structure) => void) => void;
}

type ToolMode = "rotate" | "pan";

export const Viewer = memo(function Viewer({
  structure,
  onSwap,
  reducedMotion,
  animating,
  focusHotspot,
  onFocusHandled,
  onArtifacts,
  onTimeline,
  onPrefetchReady,
}: ViewerProps) {
  const { locale } = useLocale();
  const t = useStrings(locale).viewer;
  const catLabel = useStrings(locale).hotspotCategory;
  const STRUCTURES = structuresFor(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ViewerEngine | null>(null);
  const currentStructureRef = useRef<Structure | null>(null);
  /** `${structureId}:${variantId}` for the request currently in flight (set
   *  synchronously before the first await) - closes the race where
   *  StrictMode's double-invoked effect, or any other near-simultaneous
   *  caller, fires presentStructure twice for the same target before
   *  currentStructureRef has been updated by the first call. */
  const pendingKeyRef = useRef<string | null>(null);
  const [engineReady, setEngineReady] = useState(false);
  /** id of the structure markers are currently shown/fading in for, or null.
   *  Storing the id rather than a bare boolean matters: `structure` (the
   *  prop) can flip to a new pick before the state update from the
   *  previous pick's completed load has flushed, producing one render
   *  where the new structure's pins exist but a stale "visible" from the
   *  old pick is still true. That falsely starts the pins' GSAP fade-in,
   *  which then gets killed a render later when this state catches up -
   *  leaving the pins permanently stuck at opacity 0 (clearProps only
   *  runs on the tween's natural completion, not on kill()). Comparing
   *  the id directly in the JSX below instead of relying on a boolean
   *  closes that window. */
  const [markersVisibleFor, setMarkersVisibleFor] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState<{ name: string; pct: number } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [tool, setTool] = useState<ToolMode>("rotate");
  const [layersOpen, setLayersOpen] = useState(false);
  const layersRef = useRef<HTMLDivElement>(null);
  const [timeOfDayOpen, setTimeOfDayOpen] = useState(false);
  const timeOfDayRef = useRef<HTMLDivElement>(null);
  const [layers, setLayers] = useState({ labels: true, grid: false, wire: false, xray: false });
  const [tipVisible, setTipVisible] = useState(true);
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const STRUCTURE_DEFAULT_HOURS: Record<string, number> = {
    golgotha: 18.0,
    mount_of_olives: 16.5,
    tower_babel: 6.5,
  };
  const DEFAULT_HOUR = 14;
  const [timeByStructure, setTimeByStructure] = useState<Record<string, number>>({});
  const defaultHour = STRUCTURE_DEFAULT_HOURS[structure.id] ?? DEFAULT_HOUR;
  const timeOfDay = timeByStructure[structure.id] ?? defaultHour;

  const { dayFactor, duskFactor, nightFactor } = useMemo(() => {
    const t = (((timeOfDay % 24) + 24) % 24) / 24;
    const angle = (t - 0.25) * Math.PI * 2;
    const sunHeight = Math.sin(angle);
    const day = Math.max(0, sunHeight);
    const dusk = Math.max(0, 1 - Math.abs(sunHeight) / 0.35);
    const night = Math.max(0, -sunHeight);
    return { dayFactor: day, duskFactor: dusk, nightFactor: night };
  }, [timeOfDay]);

  const requestRef = useRef(0);
  const loadingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Anchors are authored against the default model. A variant is a separate
     export with its own bounds and orientation, so while one is shown its
     own anchors apply: overridden where the feature sits elsewhere, dropped
     where the variant does not show that feature at all. */
  const shownStructure = useMemo(() => {
    const overrides = structure.modelVariants?.find((v) => v.id === activeVariantId)?.anchors;
    if (!overrides) return structure;
    const hotspots = structure.hotspots
      .filter((hs) => overrides[hs.id] !== null)
      .map((hs) => (overrides[hs.id] ? { ...hs, anchor: overrides[hs.id] as Vec3 } : hs));
    return { ...structure, hotspots };
  }, [structure, activeVariantId]);

  const activeHs = shownStructure.hotspots.find((h) => h.id === activeId) ?? null;

  /* ── engine lifecycle ── */
  useEffect(() => {
    const engine = new ViewerEngine(canvasRef.current!);
    engineRef.current = engine;
    let cancelled = false;
    engine.init().then(async () => {
      if (cancelled) return;
      engine.setReducedMotion(reducedMotion);
      engine.onLoadProgress = (pct) => {
        setLoading((l) => (l ? { ...l, pct } : null));
      };
      setEngineReady(true);
      onPrefetchReady?.((e) => engine.preload(e));
      await presentStructure(structure, { initial: true });
    });
    return () => {
      cancelled = true;
      engine.dispose();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    engineRef.current?.setReducedMotion(reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    engineRef.current?.setAutoRotate(animating);
  }, [animating]);

  const handleTimeChange = useCallback((hours: number) => {
    setTimeByStructure((prev) => ({ ...prev, [structure.id]: hours }));
    engineRef.current?.setTimeOfDay(hours, 0.3);
  }, [structure.id]);

  useEffect(() => {
    engineRef.current?.setPanMode(tool === "pan");
  }, [tool]);

  /* keep isFullscreen in sync with the real state  -  Escape or a browser
     chrome control can exit fullscreen without going through toggleFullscreen.
     iOS Safari has no Fullscreen API for plain elements at all (requestFullscreen
     is undefined on the container, webkitEnterFullscreen only exists on <video>),
     so isFullscreen there is driven entirely by the CSS-overlay fallback below
     rather than by fullscreenchange, which never fires. */
  useEffect(() => {
    const onChange = () => setIsFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  /* Escape leaves native fullscreen automatically (caught by fullscreenchange
     above), but the CSS-overlay fallback has no browser-native concept of
     fullscreen to hook into, so Escape has to be wired up by hand for it. */
  useEffect(() => {
    if (!isFullscreen || document.fullscreenElement) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isFullscreen]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
      return;
    }
    if (el?.requestFullscreen) {
      el.requestFullscreen();
    } else if (el?.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else {
      // No Fullscreen API at all (iOS Safari): fall back to a full-viewport
      // CSS overlay, which reads the same to the visitor even though it
      // isn't the browser's native fullscreen mode.
      setIsFullscreen((v) => !v);
    }
  }, []);

  /* dismiss the layers menu on an outside click, or on Escape */
  useEffect(() => {
    if (!layersOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!layersRef.current?.contains(e.target as Node)) setLayersOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLayersOpen(false);
    };
    // capture, so the menu closes even when the click lands on the canvas,
    // which stops propagation for its own orbit handling
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [layersOpen]);

  /* dismiss the time-of-day popover on an outside click, or on Escape */
  useEffect(() => {
    if (!timeOfDayOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!timeOfDayRef.current?.contains(e.target as Node)) setTimeOfDayOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTimeOfDayOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown, true);
      document.removeEventListener("keydown", onKey);
    };
  }, [timeOfDayOpen]);

  /* ── structure switching ── */
  /* Every request gets a token. A newer request supersedes an older one at
     any point  -  while its model is still downloading, or mid-animation  -  so
     rapid clicking always lands on the last dwelling picked instead of
     dropping the clicks that arrive during a swap. */
  const presentStructure = useCallback(
    async (next: Structure, opts: { initial?: boolean, variantId?: string } = {}) => {
      const engine = engineRef.current;
      if (!engine) return;

      const targetVariantId = opts.variantId || next.modelVariants?.[0]?.id || null;
      const isSameStructure = currentStructureRef.current?.id === next.id;
      // If we are already showing this structure AND this variant, do nothing
      if (isSameStructure && activeVariantId === targetVariantId && !opts.initial) return;

      // Close the race where two near-simultaneous calls for the same target
      // (e.g. React StrictMode double-invoking the reactive effect below)
      // both pass the check above before either has updated
      // currentStructureRef. The second one bails here instead of resetting
      // markersVisible after the first call already turned it on.
      const pendingKey = `${next.id}:${targetVariantId}`;
      if (pendingKeyRef.current === pendingKey) return;
      pendingKeyRef.current = pendingKey;

      try {
      const token = ++requestRef.current;
      currentStructureRef.current = next;
      setActiveId(null);
      setHoverId(null);
      setMarkersVisibleFor(null);
      setActiveVariantId(targetVariantId);

      // loading state if the fetch is slow
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      loadingTimer.current = setTimeout(() => {
        if (token === requestRef.current) setLoading({ name: next.dwelling, pct: 8 });
      }, 400);

      const targetVariant = targetVariantId ? next.modelVariants?.find(v => v.id === targetVariantId) : undefined;
      const variantPath = targetVariant?.path;
      // a cutaway/interior export often has a different orientation than the
      // exterior, so it gets its own opening shot when authored with one
      const framed = targetVariant?.camera ? { ...next, camera: targetVariant.camera } : next;
      let tooHeavy = false;
      const model = await engine.load(next, variantPath).catch((e) => {
        console.error("model load failed", e);
        if (e instanceof ModelTooHeavyError) tooHeavy = true;
        return null;
      });
      if (loadingTimer.current) clearTimeout(loadingTimer.current);
      if (token !== requestRef.current) return; // a newer pick won while loading
      setLoading(null);

      if (!model) {
        setLoadError(tooHeavy ? t.loadTooHeavy(next.dwelling) : null);
        onSwap(next);
        engine.clearStage?.(); // We will add this to engine
        return;
      }
      setLoadError(null);

      // each structure remembers its own hour; prime it before the handover
      // so the transition's own re-tint picks up the incoming dwelling's
      // hour instead of leaving the outgoing one's in place
      const nextDefaultHour = STRUCTURE_DEFAULT_HOURS[next.id] ?? DEFAULT_HOUR;
      engine.primeTimeOfDay(timeByStructure[next.id] ?? nextDefaultHour);

      // the engine drives the exchange; panels flip at the handover so copy
      // and geometry change on the same beat
      await engine.transition(model, framed, {
        instant: opts.initial,
        onMidpoint: () => {
          if (token === requestRef.current) onSwap(next);
        },
      });
      if (token !== requestRef.current) return; // superseded mid-animation

      setMarkersVisibleFor(next.id);

      // warm the neighbours so the next pick is already in memory  -  skipped
      // on touch/low-memory devices, where the initial model alone can
      // already sit close to the practical GPU memory ceiling (iOS Safari)
      if (!IS_LOW_MEMORY_DEVICE) {
        const idx = STRUCTURES.findIndex((e) => e.id === next.id);
        window.setTimeout(() => {
          if (token !== requestRef.current) return;
          engine.preload(STRUCTURES[(idx + 1) % STRUCTURES.length]);
          engine.preload(STRUCTURES[(idx - 1 + STRUCTURES.length) % STRUCTURES.length]);
        }, 1200);
      }
      } finally {
        if (pendingKeyRef.current === pendingKey) pendingKeyRef.current = null;
      }
    },
    [onSwap, activeVariantId],
  );

  /* react to requested structure changes */
  useEffect(() => {
    if (engineReady && currentStructureRef.current?.id !== structure.id) {
      void presentStructure(structure);
    }
  }, [structure, engineReady, presentStructure]);

  /* external hotspot focus (from search) */
  useEffect(() => {
    if (focusHotspot) {
      setActiveId(focusHotspot);
      onFocusHandled();
    }
  }, [focusHotspot, onFocusHandled]);

  /* camera + highlight follow the active marker */
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine || !engineReady) return;
    if (activeHs) {
      engine.focusAnchor(activeHs.anchor, structure);
      engine.setHighlight(activeHs.anchor);
    } else {
      engine.setHighlight(null);
    }
  }, [activeId, engineReady]); // eslint-disable-line react-hooks/exhaustive-deps

  const resetView = useCallback(() => {
    setActiveId(null);
    const activeVariantCamera = structure.modelVariants?.find((v) => v.id === activeVariantId)?.camera;
    engineRef.current?.frameStructure(activeVariantCamera ? { ...structure, camera: activeVariantCamera } : structure, true);
    setTool("rotate");
  }, [structure, activeVariantId]);

  /* layer toggles */
  const toggleLayer = (key: "labels" | "grid" | "wire" | "xray") => {
    const next = { ...layers, [key]: !layers[key] };
    setLayers(next);
    const engine = engineRef.current;
    if (!engine) return;
    if (key === "grid") engine.setGrid(next.grid);
    if (key === "wire") engine.setWireframe(next.wire);
    if (key === "xray") engine.setXray(next.xray);
  };

  const LAYER_ITEMS: { key: "labels" | "grid" | "wire" | "xray"; label: string; icon: typeof GridIcon }[] = [
    { key: "labels", label: t.layerLabels, icon: EyeIcon },
    { key: "grid", label: t.layerGrid, icon: GridIcon },
    { key: "wire", label: t.layerWire, icon: WireIcon },
    { key: "xray", label: t.layerXray, icon: XrayIcon },
  ];

  return (
    <div className="bible-card relative h-full w-full overflow-hidden" data-panel="viewer">
      <div
        ref={containerRef}
        className={`viewer-stage absolute inset-0 ${isFullscreen && !document.fullscreenElement ? "viewer-stage-fallback-fullscreen" : ""}`}
        role="application"
        aria-label={t.stageAria(structure.dwelling)}
        tabIndex={0}
        onKeyDown={(e) => {
          const eng = engineRef.current;
          if (!eng) return;
          const step = e.shiftKey ? 18 : 8;
          if (e.key === "ArrowLeft") eng.nudge(-step, 0);
          else if (e.key === "ArrowRight") eng.nudge(step, 0);
          else if (e.key === "ArrowUp") eng.nudge(0, step * 0.6);
          else if (e.key === "ArrowDown") eng.nudge(0, -step * 0.6);
          else if (e.key === "+" || e.key === "=") eng.zoomBy(0.85);
          else if (e.key === "-" || e.key === "_") eng.zoomBy(1.18);
          else if (e.key === "Home") resetView();
          else return;
          e.preventDefault();
        }}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {/* Daytime sky gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: dayFactor > 0.05 ? 1 : 0,
              background: "radial-gradient(120% 90% at 50% 38%, #ffffff 0%, #f7f9fa 42%, #eef2f4 78%, #e2e9ec 100%)",
            }}
          />

          {/* Sunset / Dusk warm horizon gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: duskFactor * Math.max(0, 1 - dayFactor * 0.7),
              background: "radial-gradient(120% 90% at 50% 45%, #ffd29d 0%, #f09554 30%, #7e3e5c 65%, #1b1730 100%)",
            }}
          />

          {/* Deep starry night gradient */}
          <div
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              opacity: nightFactor,
              background: "radial-gradient(120% 90% at 50% 25%, #182342 0%, #0d1426 48%, #050811 100%)",
            }}
          />

          {/* Starfield with twinkling stars (fades in smoothly as night falls) */}
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{
              opacity: Math.max(0, (nightFactor - 0.08) / 0.92),
            }}
          >
            {/* Subtle celestial milky-way nebular glow */}
            <div
              className="absolute -top-1/4 -right-1/4 h-[120%] w-[120%] opacity-40 blur-3xl pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(140, 170, 240, 0.25) 0%, rgba(90, 110, 190, 0.12) 40%, transparent 70%)",
                transform: "rotate(-25deg)",
              }}
            />

            {STARS.map((s) => (
              <div
                key={s.id}
                className="star"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  boxShadow: s.size > 1.8 ? "0 0 3px rgba(255,255,255,0.8)" : undefined,
                  "--star-opacity": s.opacity,
                  "--twinkle-dur": `${s.twinkleDuration}s`,
                  "--twinkle-delay": `${s.twinkleDelay}s`,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <canvas ref={canvasRef} className="relative z-10 block h-full w-full touch-none" aria-label={t.canvasAria(structure.dwelling)} />
        {/* holds the outgoing frame still while the next dwelling takes its
            place underneath, so a swap dissolves instead of blinking */}
      </div>

      {/* pins fixed to the dwelling */}
      <HotspotLayer
        engine={engineReady ? engineRef.current : null}
        structure={shownStructure}
        containerRef={containerRef}
        activeId={activeId}
        hoverId={hoverId}
        onHover={setHoverId}
        onActivate={setActiveId}
        visible={markersVisibleFor === shownStructure.id && layers.labels}
      />

      {DEV_MODE && (
        <DevHotspotEditor engine={engineReady ? engineRef.current : null} structure={shownStructure} containerRef={containerRef} />
      )}

      {/* ── overlay UI scale wrapper ──
          Everything below (tool rail, disclaimer, variant pills, auto
          rotate, tip card, hotspot detail card) renders at fixed desktop
          size and this wrapper scales the whole group down on narrow
          viewports  -  same proportions and labels as desktop, just smaller,
          instead of a separately laid-out "mobile" design. See the
          .viewer-overlay rules in index.css for the scale steps. The
          canvas and HotspotLayer sit outside this wrapper: pins are
          projected from the container's real pixel size, not this CSS
          transform, so they stay put regardless of overlay scale. */}
      <div className="viewer-overlay pointer-events-none absolute inset-0 z-20">
      {/* ── tool rail ──
          max-h caps the rail at the stage's own height minus a small margin,
          so on a narrow phone (a near-square stage, nine icon-only buttons)
          it scrolls internally instead of overflowing past the card's top/
          bottom edge. */}
      <div className="pointer-events-auto absolute left-3 top-1/2 z-30 max-h-[calc(100%-16px)] -translate-y-1/2" role="toolbar" aria-label={t.toolsAria} aria-orientation="vertical">
        {/* px keeps the active pill clear of the rail's own edges */}
        <div className="bible-card flex h-full max-h-full w-[76px] flex-col items-center gap-0.5 overflow-y-auto !rounded-2xl px-1.5 py-2">
          <button className={`tool-btn ${tool === "rotate" ? "is-on" : ""}`} onClick={() => setTool("rotate")} aria-pressed={tool === "rotate"}>
            <RotateIcon />
            <span>{t.rotate}</span>
          </button>
          <button className={`tool-btn ${tool === "pan" ? "is-on" : ""}`} onClick={() => setTool(tool === "pan" ? "rotate" : "pan")} aria-pressed={tool === "pan"}>
            <PanIcon />
            <span>{t.pan}</span>
          </button>
          {/* zoom acts on the camera directly rather than arming a mode, so it
              takes two plain buttons instead of a toggle that hides them */}
          <button className="tool-btn" onClick={() => engineRef.current?.zoomBy(0.78)}>
            <ZoomInIcon />
            <span>{t.zoomIn}</span>
          </button>
          <button className="tool-btn" onClick={() => engineRef.current?.zoomBy(1.28)}>
            <ZoomOutIcon />
            <span>{t.zoomOut}</span>
          </button>
          <button className={`tool-btn ${isFullscreen ? "is-on" : ""}`} onClick={toggleFullscreen} aria-pressed={isFullscreen}>
            <FullscreenIcon />
            <span>{isFullscreen ? t.exitFullscreen : t.fullscreen}</span>
          </button>
          <div className="relative" ref={layersRef}>
            <button className={`tool-btn ${layersOpen ? "is-on" : ""}`} onClick={() => setLayersOpen((v) => !v)} aria-expanded={layersOpen} aria-haspopup="true">
              <LayersIcon />
              <span>{t.layers}</span>
            </button>
            {layersOpen && (
              <div className="bible-card absolute left-[88px] top-0 z-40 w-[168px] !rounded-xl p-1.5" role="menu">
                {LAYER_ITEMS.map((it) => (
                  <button
                    key={it.key}
                    role="menuitemcheckbox"
                    aria-checked={layers[it.key]}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[0.8rem] text-ink-soft transition-colors hover:bg-paper-deep"
                    onClick={() => toggleLayer(it.key)}
                  >
                    <it.icon className="h-4 w-4 text-slateblue" />
                    <span className="flex-1">{it.label}</span>
                    {layers[it.key] && <CheckIcon className="h-3.5 w-3.5 text-terracotta" />}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="tool-btn" onClick={onArtifacts}>
            <VaseIcon />
            <span>{t.artifacts}</span>
          </button>
          <button className="tool-btn" onClick={onTimeline}>
            <TimelineIcon />
            <span>{t.timeline}</span>
          </button>
          <div className="my-1 h-px w-9 bg-line-warm" />
          <button className="tool-btn" onClick={resetView}>
            <ResetIcon />
            <span>{t.reset}</span>
          </button>
        </div>
      </div>

      {/* ── Model Variant Toggle (Top Center) ──
          max-w caps the row at the stage width minus the tool rail and its
          own margins, so three-plus variants (e.g. noahs_ark's "Na de
          Vloed") wrap their pill instead of pushing the row past the
          card's right edge. */}
      {structure.modelVariants && structure.modelVariants.length > 1 && (
        <div className="pointer-events-auto absolute top-3.5 left-1/2 z-30 max-w-[calc(100%-80px)] -translate-x-1/2">
          <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-line-strong bg-white/95 p-1 shadow-card backdrop-blur-md">
            {structure.modelVariants.map((v) => {
              const isActive = activeVariantId === v.id;
              return (
                <button
                  key={v.id}
                  onClick={() => presentStructure(structure, { variantId: v.id })}
                  className={`relative whitespace-nowrap rounded-full px-4 py-1.5 text-[0.84rem] font-medium transition-colors ${
                    isActive ? "text-white" : "text-ink-soft hover:text-ink"
                  }`}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-terracotta shadow-sm" />
                  )}
                  <span className="relative z-10">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Time of day floating pill ──
          Positioned in the bottom-left corner directly under the vertical tool rail */}
      {/* Hidden on small screens when hotspot card is active to prevent overlap */}
      <div className={`pointer-events-auto absolute bottom-3.5 left-[26px] z-30 flex items-end gap-2 transition-opacity duration-200 ${activeHs ? "opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto" : ""}`}>
        <div className="relative" ref={timeOfDayRef}>
          <button
            type="button"
            onClick={() => setTimeOfDayOpen((v) => !v)}
            className="bible-card group flex h-12 w-12 items-center justify-center !rounded-full border border-line-strong bg-white/95 shadow-card backdrop-blur-md transition-all hover:bg-white hover:shadow-md active:scale-[0.98]"
            aria-label={t.timeOfDayAria}
            aria-expanded={timeOfDayOpen}
            aria-haspopup="true"
          >
            {timeOfDay >= 6.5 && timeOfDay < 18.5 ? (
              <SunIcon className="h-[22px] w-[22px] text-terracotta transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <MoonIcon className="h-[22px] w-[22px] text-slateblue transition-transform duration-300 group-hover:scale-110" />
            )}
          </button>
          {timeOfDayOpen && (
            <div className="bible-card absolute bottom-[56px] left-0 z-40 w-[260px] !rounded-2xl border border-line-strong bg-white/95 p-4 shadow-card backdrop-blur-md">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-serif text-[0.82rem] font-medium text-ink-soft">{t.timeOfDay}</span>
                <span className="font-display text-[0.95rem] font-bold text-ink tabular-nums">
                  {String(Math.floor(timeOfDay)).padStart(2, "0")}:{String(Math.round((timeOfDay % 1) * 60)).padStart(2, "0")}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={24}
                step={0.25}
                value={timeOfDay}
                onChange={(ev) => handleTimeChange(Number(ev.target.value))}
                aria-label={t.timeOfDayAria}
                className="w-full accent-terracotta"
              />
              <div className="mt-1.5 flex items-center justify-between text-[0.68rem] text-ink-muted">
                <span>00:00</span>
                <span>12:00</span>
                <span>24:00</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 border-t border-line-warm pt-2.5">
                <button
                  type="button"
                  onClick={() => handleTimeChange(14)}
                  className={`flex-1 rounded-lg py-1 text-center text-[0.72rem] font-medium transition-colors ${
                    timeOfDay >= 10 && timeOfDay <= 16
                      ? "bg-terracotta text-white"
                      : "bg-paper text-ink-muted hover:bg-paper-deep hover:text-ink"
                  }`}
                >
                  {locale === "nl" ? "Dag" : "Day"}
                </button>
                <button
                  type="button"
                  onClick={() => handleTimeChange(19.25)}
                  className={`flex-1 rounded-lg py-1 text-center text-[0.72rem] font-medium transition-colors ${
                    (timeOfDay > 17 && timeOfDay < 21) || (timeOfDay > 5 && timeOfDay < 8)
                      ? "bg-terracotta text-white"
                      : "bg-paper text-ink-muted hover:bg-paper-deep hover:text-ink"
                  }`}
                >
                  {locale === "nl" ? "Schemer" : "Dusk"}
                </button>
                <button
                  type="button"
                  onClick={() => handleTimeChange(23)}
                  className={`flex-1 rounded-lg py-1 text-center text-[0.72rem] font-medium transition-colors ${
                    timeOfDay >= 21 || timeOfDay <= 4
                      ? "bg-terracotta text-white"
                      : "bg-paper text-ink-muted hover:bg-paper-deep hover:text-ink"
                  }`}
                >
                  {locale === "nl" ? "Nacht ★" : "Night ★"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── active hotspot detail card ── */}
      {activeHs && (
        <div
          className="bible-card pointer-events-auto absolute bottom-3 sm:bottom-4 left-1/2 z-40 w-[min(430px,calc(100%-28px))] sm:w-[min(430px,calc(100%-140px))] -translate-x-1/2 !rounded-2xl p-3.5 sm:p-4 shadow-xl border border-line-warm bg-white/98 backdrop-blur-md max-h-[calc(100%-24px)] overflow-y-auto"
          role="dialog"
          aria-label={activeHs.title}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="kicker !text-[0.62rem] !text-terracotta">{catLabel[activeHs.category]}</div>
              <h3 className="font-display mt-0.5 text-[1.15rem] sm:text-[1.25rem] font-bold leading-tight text-ink">{activeHs.title}</h3>
            </div>
            <button className="rounded-md p-1 text-ink-muted transition-colors hover:bg-paper-deep hover:text-ink" onClick={() => setActiveId(null)} aria-label={t.closeDetail}>
              <CloseIcon className="h-4.5 w-4.5 h-[18px] w-[18px]" />
            </button>
          </div>
          <p className="font-serif mt-2 text-[0.92rem] sm:text-[0.98rem] leading-snug text-ink-muted">{activeHs.short}</p>
          <p className="mt-2 text-[0.82rem] sm:text-[0.86rem] leading-relaxed text-ink-soft">{activeHs.detail}</p>
        </div>
      )}

      {/* ── tip card ──
          Visible at every width now, same fixed desktop size  -  the overlay
          wrapper scale handles fitting it on narrow screens instead of a
          separate compact layout. */}
      {tipVisible && !activeHs && (
        <div className="pointer-events-auto absolute bottom-4 right-4 z-30 w-[210px] rounded-2xl border border-line-strong bg-[#eef2f4] p-3.5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="font-display flex items-center gap-1.5 text-[0.85rem] font-semibold text-ink">
              <BulbIcon className="h-4 w-4 text-ink-muted" />
              {t.tip}
            </span>
            <button className="rounded p-0.5 text-ink-muted transition-colors hover:text-ink" onClick={() => setTipVisible(false)} aria-label={t.tipDismiss}>
              <CloseIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="font-serif mt-1.5 text-[0.85rem] leading-snug text-ink-soft">
            {t.tipText}
          </p>
        </div>
      )}
      </div>

      {/* ── loading experience ── */}
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-paper/85 backdrop-blur-[2px]" role="status" aria-live="polite">
          <div className="flex w-[240px] flex-col items-center text-center">
            <svg viewBox="0 0 120 120" className="loading-compass h-20 w-20 text-terracotta" aria-hidden>
              <g fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="60" cy="60" r="46" opacity="0.4" />
                <circle cx="60" cy="60" r="34" opacity="0.25" />
                <path d="M60 14v10M60 96v10M14 60h10M96 60h10" />
                <path d="M60 24l7 36-7 36-7-36 7-36z" fill="currentColor" stroke="none" opacity="0.8" />
                <path d="M24 60l36-7 36 7-36 7-36-7z" fill="currentColor" stroke="none" opacity="0.3" />
              </g>
            </svg>
            <svg viewBox="0 0 160 40" className="mt-3 w-[150px] text-ink-muted" aria-hidden>
              <path className="loading-line" d="M10 34 L50 34 L60 18 L70 30 L80 10 L92 30 L102 18 L112 34 L150 34" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <h3 className="font-display mt-3 text-[1.25rem] font-bold text-ink">{t.loadingPrefix} {loading.name}</h3>
            <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-line-warm">
              <div className="h-full rounded-full bg-terracotta transition-all duration-300" style={{ width: `${loading.pct}%` }} />
            </div>
            <p className="loading-fact font-serif mt-3 text-[0.85rem] text-ink-muted">{t.loadingFact}</p>
          </div>
        </div>
      )}

      {/* ── model too heavy for this device ── */}
      {!loading && loadError && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-paper/85 px-6 backdrop-blur-[2px]" role="alert">
          <div className="flex w-[280px] flex-col items-center gap-2 text-center">
            <p className="font-serif text-[0.9rem] text-ink-muted">{loadError}</p>
            <button
              type="button"
              onClick={() => setLoadError(null)}
              className="mt-1 rounded-full border border-line-warm px-4 py-1.5 text-[0.8rem] text-ink-muted transition hover:bg-white/60"
            >
              {t.closeDetail}
            </button>
          </div>
        </div>
      )}

      {/* ── scroll-down cue for mobile (canvas traps touch, hint there's more below) ── */}
      {!loading && !activeHs && (
        <div className="scroll-cue absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center xl:hidden" aria-hidden="true">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
            <ChevronDownIcon className="h-4 w-4 text-ink-muted" />
          </div>
        </div>
      )}
    </div>
  );
});
