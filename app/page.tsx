import { profile, stats, tracks, experience, projects, skills, education } from "@/lib/data";

const pipeline = ["Laserstream", "Kafka", "PostgreSQL", "GraphQL"];

export default function Home() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="nav-mark">SJ</a>
        <nav>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero wrap">
          <p className="eyebrow">
            <span className="dot" aria-hidden /> {profile.availability}
          </p>
          <h1>
            Sunil Jalandhra <em>builds the systems</em> that keep chains and data in sync.
          </h1>
          <p className="lede">{profile.summary}</p>
          <div className="cta">
            <a className="btn primary" href={`mailto:${profile.email}`}>Get in touch</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

          <div className="pipeline" aria-label="Indexer pipeline: Laserstream to Kafka to PostgreSQL to GraphQL">
            {pipeline.map((step, i) => (
              <div key={step} className="pipe-step">
                <span className="pipe-node">{step}</span>
                {i < pipeline.length - 1 && <span className="pipe-edge" aria-hidden />}
              </div>
            ))}
            <span className="pipe-rate">≈1,700 events/s</span>
          </div>
        </section>

        <section className="stats wrap" aria-label="Highlights">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <section className="wrap section">
          <h2 className="section-title"><span>01</span> What I do</h2>
          <div className="tracks">
            {tracks.map((t) => (
              <article key={t.id} className="track">
                <h3>{t.title}</h3>
                <p>{t.body}</p>
                <ul className="tags">
                  {t.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="work" className="wrap section">
          <h2 className="section-title"><span>02</span> Selected work</h2>
          <div className="projects">
            {projects.map((p) => {
              const inner = (
                <>
                  <p className="kicker">{p.kicker}</p>
                  <h3>{p.title}{p.href && <span className="arrow" aria-hidden> ↗</span>}</h3>
                  <p>{p.body}</p>
                  <p className="stack">{p.stack.join(" · ")}</p>
                </>
              );
              return p.href ? (
                <a key={p.title} className="project linked" href={p.href} target="_blank" rel="noreferrer">{inner}</a>
              ) : (
                <article key={p.title} className="project">{inner}</article>
              );
            })}
          </div>
        </section>

        <section id="experience" className="wrap section">
          <h2 className="section-title"><span>03</span> Experience</h2>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job">
                <div className="job-meta">
                  <span className="mono">{job.period}</span>
                  <span className="muted">{job.place}</span>
                </div>
                <div>
                  <h3>{job.role} <span className="at">at {job.company}</span></h3>
                  <ul>
                    {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="wrap section">
          <h2 className="section-title"><span>04</span> Toolbox</h2>
          <dl className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skill-row">
                <dt>{s.group}</dt>
                <dd>
                  <ul className="tags">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
          <p className="edu">
            <span className="mono">{education.period}</span> {education.degree}, {education.school}
          </p>
        </section>

        <section id="contact" className="wrap contact">
          <p className="eyebrow">Contact</p>
          <h2>Got a hard backend or protocol problem?</h2>
          <a className="contact-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          <p className="muted">{profile.location} · {profile.availability}</p>
        </section>
      </main>

      <footer className="wrap footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono">Built with Next.js</span>
      </footer>
    </>
  );
}
