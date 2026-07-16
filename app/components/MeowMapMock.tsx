// A recreation of Meow Map's signature "living map" view, on-brand with
// catapp.uk (warm map, cat-face pins, rarity card). Pure markup — no binary asset.

const PINS = [
  { cat: "🐱", top: "18%", left: "52%" },
  { cat: "🐈", top: "26%", left: "24%" },
  { cat: "🐈‍⬛", top: "40%", left: "70%" },
  { cat: "🐱", top: "55%", left: "33%" },
  { cat: "😺", top: "68%", left: "60%" },
];

export default function MeowMapMock({ small = false }: { small?: boolean }) {
  return (
    <div className={`mock${small ? " mock-sm" : ""}`} aria-hidden="true">
      <div className="phone">
        <div className="phone-notch" />
        <div className="map">
          <svg className="map-streets" viewBox="0 0 240 480" preserveAspectRatio="none">
            <rect x="118" y="0" width="14" height="480" />
            <rect x="0" y="150" width="240" height="13" />
            <rect x="0" y="300" width="240" height="11" />
            <path d="M-10 60 L260 200" />
            <path d="M-10 380 L260 250" />
            <rect className="park" x="150" y="40" width="110" height="120" rx="8" />
          </svg>

          {/* search bar */}
          <div className="map-search">Cats near you</div>

          {/* dot = you */}
          <span className="you-dot" />

          {PINS.map((p, i) => (
            <span key={i} className="pin" style={{ top: p.top, left: p.left }}>
              {p.cat}
            </span>
          ))}

          {/* cluster */}
          <span className="cluster">3</span>

          {/* mythical pill */}
          <div className="pill">
            <strong>Mythical find!</strong>
            <span>Only 1 sighting ever</span>
          </div>

          {/* rarity card */}
          <div className="findcard">
            <span className="findcard-face">🐱</span>
            <div className="findcard-info">
              <div className="findcard-row">
                <strong>Biscuit</strong>
                <span className="rare">RARE</span>
              </div>
              <div className="findcard-tags">
                <span>Tabby</span>
                <span>Ginger</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
