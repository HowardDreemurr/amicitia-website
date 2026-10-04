import Reveal from "./components/Reveal";
import MeowMapShowcase from "./components/MeowMapShowcase";

const EMAIL = "support@amicitia.uk";

const STEPS = [
  {
    n: "01",
    title: "Concept",
    body: "We shape the idea with you: what it is, who it's for, and the smallest version worth shipping.",
  },
  {
    n: "02",
    title: "Build",
    body: "Design and engineering under one roof: interfaces, backends, maps, machine learning, whatever the product needs.",
  },
  {
    n: "03",
    title: "Completion",
    body: "We ship it properly: app stores, launch, and the follow-through that keeps it alive after day one.",
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
          <a href="#how">How we work</a>
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
          We build things that do <span className="hl">good</span>, or are
          just plain <span className="hl">fun</span>.
        </Reveal>
        <Reveal as="p" className="hero-sub" delay={120}>
          A UK studio that takes projects from first concept to completion,
          as long as they make the world a little better, or a little more
          fun.
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

      {/* Concept to completion */}
      <section className="how" id="how">
        <Reveal as="h2" className="section-title">
          Concept to completion
        </Reveal>
        <Reveal as="p" className="how-lead" delay={60}>
          We don&apos;t specialise in a sector. We specialise in finishing.
          If an idea does some good, or is simply good fun, we&apos;ll design
          it, build it, and ship it.
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} className="step" delay={i * 80}>
              <span className="step-num">{s.n}</span>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </Reveal>
          ))}
        </div>
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
