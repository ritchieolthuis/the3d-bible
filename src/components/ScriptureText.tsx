import { Fragment } from "react";
import { useLocale } from "@/i18n/locale";
import { findScriptureReferences } from "@/lib/scripture";

interface Props {
  text: string;
}

/** Renders `text` as plain prose, except every Bible reference it contains
 *  (e.g. "Genesis 2:15", "Gen. 3:14-19") becomes a link that opens that
 *  verse on bible.com, in the translation this app quotes for the current
 *  locale (Statenvertaling for nl, KJV for en). */
export function ScriptureText({ text }: Props) {
  const { locale } = useLocale();
  type MatchSpan = { start: number; end: number; url: string; kind: "scripture" | "quote" };
  const matches: MatchSpan[] = findScriptureReferences(text, locale).map(m => ({ ...m, kind: "scripture" as const }));
  
  const quoteRegex = /«(.*?)»/g;
  let match;
  while ((match = quoteRegex.exec(text)) !== null) {
    matches.push({ start: match.index, end: match.index + match[0].length, url: "", kind: "quote" as const });
  }
  
  matches.sort((a, b) => a.start - b.start);
  const clean = matches.filter((m, i) => i === 0 || m.start >= matches[i - 1].end);

  if (clean.length === 0) return <>{text}</>;

  const nodes: React.ReactNode[] = [];
  let pos = 0;
  clean.forEach((m, i) => {
    if (m.start > pos) nodes.push(<Fragment key={`t${i}`}>{text.slice(pos, m.start)}</Fragment>);
    
    if (m.kind === "quote") {
      nodes.push(
        <span key={`l${i}`} className="italic text-slateblue font-serif">
          {text.slice(m.start + 1, m.end - 1)}
        </span>
      );
    } else {
      nodes.push(
        <a
          key={`l${i}`}
          href={m.url}
          target="_blank"
          rel="noopener noreferrer"
          className="description-link"
          onClick={(e) => e.stopPropagation()}
        >
          {text.slice(m.start, m.end)}
        </a>
      );
    }
    pos = m.end;
  });
  if (pos < text.length) nodes.push(<Fragment key="tail">{text.slice(pos)}</Fragment>);
  return <>{nodes}</>;
}
