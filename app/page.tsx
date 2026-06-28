import Reveal from "./components/Reveal";
import CatAppMock from "./components/CatAppMock";
import Concept from "./components/Concept";

const EMAIL = "support@amicitia.uk";

const FOCUS = [
  {
    kind: "social",
    title: "Social",
    body: "Profiles, feeds, and communities — the connective tissue that makes an app feel alive with people.",
  },
  {
    kind: "map",
    title: "Maps",
    body: "Location and place: live maps, discovery, and geodata that turn coordinates into something useful.",
  },
  {
    kind: "vision",
    title: "Computer Vision",
    body: "On-device recognition and detection — software that understands an image from a single photo.",
  },
];

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
          <a href="#build">What we build</a>
          <a href="#work">Work</a>
          <a className="nav-btn" href={`mailto:${EMAIL}`}>
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero" id="top">
        <Reveal as="p" className="eyebrow">
          Amicitia Limited · UK Software Studio
        </Reveal>
        <Reveal as="h1" className="hero-title" delay={60}>
          We build apps worth{" "}
          <span className="hl">opening every day</span>.
        </Reveal>
        <Reveal as="p" className="hero-sub" delay={120}>
          A UK studio that designs and ships software end to end — from the first
          sketch to the App Store.
        </Reveal>
        <Reveal className="hero-actions" delay={180}>
          <a className="btn" href={`mailto:${EMAIL}`}>
            Get in touch
          </a>
          <a className="btn-ghost" href="#work">
            See our work
          </a>
        </Reveal>
      </section>

      {/* What we build */}
      <section className="build" id="build">
        <Reveal as="h2" className="section-title">
          What we build
        </Reveal>
        <div className="cards">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} className="card" delay={i * 80}>
              <div className="card-visual">
                <Concept kind={f.kind} />
              </div>
              <h3 className="card-title">{f.title}</h3>
              <p className="card-body">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work / CatApp */}
      <section className="work" id="work">
        <Reveal className="work-card">
          <div className="work-mock">
            <CatAppMock small />
          </div>
          <div className="work-info">
            <span className="pill-live">● Live</span>
            <h2 className="work-title">CatApp</h2>
            <p className="work-desc">
              Turn a daily walk into a collecting game. Snap a photo, let AI
              identify the cat, and watch a live map of your neighbourhood fill
              up. Our social, map, and computer-vision work, all in one app.
            </p>
            <a
              className="btn"
              href="https://www.catapp.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit catapp.uk →
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <Reveal>
          <h2 className="contact-title">
            Have an idea? <span className="hl">Let&apos;s build it.</span>
          </h2>
          <a className="contact-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
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
