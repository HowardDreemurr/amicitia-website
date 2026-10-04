import Reveal from "./components/Reveal";
import MeowMapShowcase from "./components/MeowMapShowcase";

export default function Home() {
  return (
    <main>
      {/* Nav */}
      <header className="nav">
        <a className="wordmark" href="#top">
          <span className="logo-dot" />
          Amicitia
        </a>
        <nav className="nav-links">
          <a href="#work">Meow Map</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="top">
        <Reveal as="p" className="eyebrow">
          Amicitia Limited · UK Software Studio
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={60}>
          We build things that do <span className="hl">good</span>, or are
          just plain <span className="hl">fun</span>.
        </Reveal>
        <Reveal as="p" className="hero-sub" delay={120}>
          A small UK studio making apps that leave the world a little better,
          or a little more fun. Our first, Meow Map, is live now.
        </Reveal>
      </section>

      {/* Work / Meow Map */}
      <section className="work" id="work">
        <Reveal className="work-card">
          <div className="work-mock">
            <MeowMapShowcase />
          </div>
          <div className="work-info">
            <span className="pill-live">● Live · one from the fun column</span>
            <h2 className="work-title">Meow Map</h2>
            <p className="work-desc">
              Turn a daily walk into a collecting game. Snap a photo, let AI
              identify the cat, and watch a live map of your neighbourhood fill
              up.
            </p>
            <a
              className="btn"
              href="https://www.catapp.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Meow Map →
            </a>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="footer">
        <span className="wordmark sm">
          <span className="logo-dot" />
          Amicitia
        </span>
        <span>© 2026 Amicitia Limited · Registered in the United Kingdom</span>
      </footer>
    </main>
  );
}
