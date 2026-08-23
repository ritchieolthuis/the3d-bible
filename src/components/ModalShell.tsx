import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CloseIcon } from "./icons";
import { useLocale } from "@/i18n/locale";
import { useStrings } from "@/i18n/strings";

interface ShellProps {
  title: string;
  kicker?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  allowFullscreen?: boolean;
}

export function ModalShell({ title, kicker, onClose, children, wide, allowFullscreen }: ShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const t = useStrings(locale).modals;
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const first = ref.current?.querySelector<HTMLElement>("button, [href], input, [tabindex]");
    first?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
      // Dispatch a window resize event to force Leaflet (and other components) to recalculate
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      ref.current?.parentElement?.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  const fullscreenClasses = isFullscreen 
    ? "fixed inset-0 m-0 h-screen w-screen max-w-none max-h-none rounded-none border-0" 
    : `relative max-h-[88vh] w-full ${wide ? "max-w-[1200px]" : "max-w-[620px]"} p-6`;
  
  const fullscreenPadding = isFullscreen ? "p-4 md:p-6" : "";

  return (
    <div className={`overlay-backdrop flex items-center justify-center ${isFullscreen ? 'p-0' : 'p-4'}`} onClick={onClose} role="presentation">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`modal-panel bible-scroll flex flex-col overflow-hidden ${fullscreenClasses} ${fullscreenPadding}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex-none flex items-start justify-between gap-4 border-b border-line-warm pb-4">
          <div>
            {kicker && <div className="kicker">{kicker}</div>}
            <h2 className="font-display mt-1 text-[1.7rem] font-bold leading-none text-ink">{title}</h2>
          </div>
          <div className="flex gap-2">
            {allowFullscreen && (
                <button
                    onClick={toggleFullscreen}
                    className="flex-none rounded-lg border border-line-warm bg-surface p-2 text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
                    title={locale === "nl" ? "Volledig Scherm" : "Fullscreen"}
                >
                    {isFullscreen ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
                    )}
                </button>
            )}
            <button
              onClick={onClose}
              className="flex-none rounded-lg border border-line-warm bg-surface p-2 text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              aria-label={t.close}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* We guarantee this takes the remaining vertical space properly */}
        <div className="flex-1 min-h-0 flex flex-col relative">
           {children}
        </div>
      </div>
    </div>
  );
}
