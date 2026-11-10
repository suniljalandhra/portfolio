import { profile, experience, projects, skills, education } from "@/lib/data";
import { getContributions } from "@/lib/github";
import ContributionGraph from "@/components/ContributionGraph";
import ThemeToggle from "@/components/ThemeToggle";
import MerkleArt from "@/components/MerkleArt";
import {
  GithubLogo,
  LinkedinLogo,
  ArrowUpRight,
  MapPin,
  CalendarBlank,
  CaretDown,
  Code,
  Database,
  Cube,
  ShareNetwork,
  TreeStructure,
  TestTube,
  GraduationCap,

} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import EmailLink from "@/components/EmailLink";
import TypedWord from "@/components/TypedWord";
import ConsoleFerris from "@/components/ConsoleFerris";

export const revalidate = 86400;

const typedWords = ["indexers", "Rust services", "bridges", "ZK systems", "Solana programs", "Kafka pipelines"];

const socials = [
  { label: "GitHub", href: profile.github, Icon: GithubLogo },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinLogo },
];

const skillIcons: Record<string, Icon> = {
  Languages: Code,
  Backend: Database,
  Solana: Cube,
  "Protocols & ZK": ShareNetwork,
  Architecture: TreeStructure,
  "Testing & DevOps": TestTube,
};

export default async function Home() {
  const contributions = await getContributions();

  return (
    <>
      <ConsoleFerris email={profile.email} />
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
            <h1>
              <span className="sr-only">Backend &amp; blockchain engineer building indexers, Rust services, bridges and ZK systems</span>
              <span aria-hidden>Backend &amp; blockchain engineer building </span>
              <TypedWord words={typedWords} />
            </h1>
            <p className="intro">
              I&apos;m Sunil Jalandhra, a backend engineer from New Delhi with 5+ years across Solana, EVM, Cosmos,
              NEAR and TON. I write Rust for Solana programs, ZK provers and backend services, and TypeScript
              and Go for the event-driven pipelines around them.
            </p>
            <ul className="socials">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    <Icon size={18} weight="duotone" /> {label}
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
                {(() => {
                  const tile = (
                    <div className={`job-logo${job.logo ? " has-img" : ""}`} style={{ ["--hue" as string]: job.hue }} aria-hidden>
                      {job.logo ? <img src={job.logo} alt="" width={28} height={28} /> : job.mark}
                    </div>
                  );
                  return job.url ? (
                    <a href={job.url} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="job-logo-link">{tile}</a>
                  ) : tile;
                })()}
                <div className="job-body">
                  <h3>
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noreferrer" className="job-company">
                        {job.company} <ArrowUpRight size={13} weight="bold" />
                      </a>
                    ) : job.company}
                  </h3>
                  <p className="job-role">{job.role}</p>
                  <p className="job-date">
                    <span><CalendarBlank size={13} weight="bold" /> {job.period}</span>
                    <span><MapPin size={13} weight="bold" /> {job.place}</span>
                  </p>
                  <p className="job-summary">{job.summary}</p>
                  <details>
                    <summary>Highlights <CaretDown size={12} weight="bold" className="caret" /></summary>
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
                    {p.href && <span className="arrow"><ArrowUpRight size={16} weight="bold" /></span>}
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
            {skills.map((s) => {
              const SkillIcon = skillIcons[s.group] ?? Code;
              return (
              <div key={s.group} className="skill-row">
                <dt><SkillIcon size={18} weight="duotone" /> {s.group}</dt>
                <dd>
                  <ul className="tags">
                    {s.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </dd>
              </div>
              );
            })}
            <div className="skill-row">
              <dt><GraduationCap size={18} weight="duotone" /> Education</dt>
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
