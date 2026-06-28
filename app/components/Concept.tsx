// Small on-brand "concept" visualisations for the What-we-build cards.
// Same warm CatApp styling as the phone mockup, one per discipline.

const AVATARS = [
  { i: "A", c: "#e2865f", cls: "a0" },
  { i: "M", c: "#cf9b6e", cls: "a1" },
  { i: "J", c: "#8fb079", cls: "a2" },
  { i: "K", c: "#e0b85a", cls: "a3" },
];

const MAP_PINS = [
  { cat: "🐱", top: "30%", left: "28%" },
  { cat: "🐈", top: "24%", left: "66%" },
  { cat: "😺", top: "62%", left: "50%" },
  { cat: "🐈‍⬛", top: "58%", left: "78%" },
];

export default function Concept({ kind }: { kind: string }) {
  if (kind === "social") {
    return (
      <div className="cv cv-social" aria-hidden="true">
        <svg className="cv-lines" viewBox="0 0 240 150" preserveAspectRatio="none">
          <line x1="120" y1="74" x2="52" y2="40" />
          <line x1="120" y1="74" x2="196" y2="38" />
          <line x1="120" y1="74" x2="48" y2="116" />
          <line x1="120" y1="74" x2="192" y2="116" />
        </svg>
        <span className="node node-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 21s-7-4.6-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.4-7 10-7 10Z" />
          </svg>
        </span>
        {AVATARS.map((a) => (
          <span
            key={a.i}
            className={`node ${a.cls}`}
            style={{ background: a.c }}
          >
            {a.i}
          </span>
        ))}
        <span className="cv-chip">+128 nearby</span>
      </div>
    );
  }

  if (kind === "map") {
    return (
      <div className="cv cv-map" aria-hidden="true">
        <svg className="cv-streets" viewBox="0 0 240 150" preserveAspectRatio="none">
          <rect x="108" y="0" width="13" height="150" />
          <rect x="0" y="70" width="240" height="12" />
          <path d="M-10 20 L260 90" />
          <rect className="park" x="150" y="6" width="100" height="58" rx="7" />
        </svg>
        <span className="cv-you" />
        {MAP_PINS.map((p, i) => (
          <span key={i} className="cv-pin" style={{ top: p.top, left: p.left }}>
            {p.cat}
          </span>
        ))}
        <span className="cv-cluster">5</span>
      </div>
    );
  }

  // vision
  return (
    <div className="cv cv-vision" aria-hidden="true">
      <span className="cv-photo">🐱</span>
      <span className="cv-box">
        <i className="c tl" />
        <i className="c tr" />
        <i className="c bl" />
        <i className="c br" />
      </span>
      <span className="cv-label">Tabby · 98%</span>
    </div>
  );
}
