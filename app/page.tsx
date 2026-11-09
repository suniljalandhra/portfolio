import { profile, experience, projects, skills, education } from "@/lib/data";
import { getContributions } from "@/lib/github";
import ContributionGraph from "@/components/ContributionGraph";
import ThemeToggle from "@/components/ThemeToggle";
import MerkleArt from "@/components/MerkleArt";
import { GitHubIcon, LinkedInIcon, ArrowIcon } from "@/components/icons";
import EmailLink from "@/components/EmailLink";

export const revalidate = 86400;

const socials = [
  { label: "GitHub", href: profile.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon },
];

export default async function Home() {
  const contributions = await getContributions();

  return (
    <>
      <header className="nav">
        <div className="nav-inner">
          <a href="#top" className="logo" aria-label="Home">SJ</a>
          <nav>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="hero-text">
            <p className="status"><span className="pulse" aria-hidden /> {profile.availability}</p>
            <h1>Backend &amp; blockchain engineer building indexers, bridges and ZK systems</h1>
            <p className="intro">
              I&apos;m Sunil Jalandhra, a backend engineer from New Delhi with 5+ years across Solana, EVM, Cosmos,
              NEAR and TON. I build event-driven pipelines in TypeScript, and reach for Rust and Go when the
              problem calls for it.
            </p>
            <ul className="socials">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <Icon /> {label}
                  </a>
                </li>
              ))}
              <li>
                <EmailLink email={profile.email} label="Email" />
              </li>
            </ul>
          </div>
          <div className="hero-art" aria-hidden>
            <MerkleArt />
          </div>
        </section>

        {contributions.length > 0 && (
          <section className="block">
            <h2>Contribution Graph</h2>
            <ContributionGraph years={contributions} />
          </section>
        )}

        <section id="experience" className="block">
          <h2>Work Experience</h2>
          <div className="jobs">
            {experience.map((job) => (
              <article key={job.company} className="job">
                <div className="job-logo" style={{ ["--hue" as string]: job.hue }} aria-hidden>
                  {job.mark}
                </div>
                <div className="job-body">
                  <h3>{job.company}</h3>
                  <p className="job-role">{job.role}</p>
                  <p className="job-date">
                    {job.period}
                    <span className="job-loc"> · {job.place}</span>
                  </p>
                  <p className="job-summary">{job.summary}</p>
                  <details>
                    <summary>Highlights</summary>
                    <ul>
                      {job.points.map((pt) => <li key={pt}>{pt}</li>)}
                    </ul>
                  </details>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="block">
          <h2>Projects</h2>
          <div className="projects">
            {projects.map((p) => {
              const inner = (
                <>
                  <p className="kicker">{p.kicker}</p>
                  <h3>
                    {p.title}
                    {p.href && <span className="arrow"><ArrowIcon /></span>}
                  </h3>
                  <p className="project-body">{p.body}</p>
                  <ul className="tags">
                    {p.stack.map((s) => <li key={s}>{s}</li>)}
                  </ul>
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

        <section id="skills" className="block">
          <h2>Skills</h2>
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
            <div className="skill-row">
              <dt>Education</dt>
              <dd className="edu">
                {education.degree}, {education.school} <span className="muted">· {education.period}</span>
              </dd>
            </div>
          </dl>
        </section>

        <section id="contact" className="block contact">
          <h2>Let&apos;s work together</h2>
          <p className="intro">
            Looking for someone to own a backend, an indexer or a cross-chain protocol? I&apos;m available
            immediately and open to remote roles.
          </p>
          <EmailLink className="btn" email={profile.email} />
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>Built with Next.js · Hosted on Vercel</span>
          <span>© {new Date().getFullYear()} Sunil Jalandhra</span>
        </div>
      </footer>
    </>
  );
}
