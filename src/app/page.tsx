import Image from "next/image";
import { BrandMark } from "@/components/brand-mark";
import { KnowledgeGraph } from "@/components/knowledge-graph";
import {
  CapabilityGrid,
  CheckItem,
  HeroVisual,
  Lifecycle,
  PrimaryLink,
  Reveal,
} from "@/components/motion";

const purchaseHref = "mailto:hello@netolabs.dev?subject=Buy%20Aquiles&body=I%20want%20Aquiles%20for%20Codex.%20Please%20send%20the%20next%20steps.";

const risks = [
  { name: "Time", statement: "You rebuild the same delivery decisions on every project." },
  { name: "Security", statement: "Secrets, dependencies, permissions, and data paths get reviewed too late." },
  { name: "Scale", statement: "A prototype ships without the architecture or release controls production demands." },
  { name: "Visibility", statement: "When it breaks, there are no traces, alerts, or useful incident context." },
] as const;

export default function Home() {
  return (
    <main id="top">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Aquiles home">
          <BrandMark />
          <span>Aquiles</span>
          <small>by NetoLabs</small>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#proof">Proof</a>
          <a href="#capabilities">Capabilities</a>
          <a href="#knowledge">Knowledge</a>
          <a href="#codex">Codex</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <a className="nav-cta" href={purchaseHref}>Get Aquiles</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <Reveal><p className="eyebrow">The AI development agent for Codex</p></Reveal>
          <Reveal delay={0.08}><h1>One agent.<br />Full lifecycle.</h1></Reveal>
          <Reveal delay={0.16}>
            <p className="hero-subtitle">From discovery to production, with security, privacy, scale, and monitoring built in.</p>
          </Reveal>
          <Reveal delay={0.24} className="hero-actions">
            <PrimaryLink href={purchaseHref}>Get Aquiles for $1,999</PrimaryLink>
            <a className="secondary-link" href="#lifecycle">See the full lifecycle</a>
          </Reveal>
        </div>
        <HeroVisual />
      </section>

      <section className="proof-strip" aria-label="Aquiles product coverage">
        <span>One agent</span><span>Inside Codex</span><span>Products in production</span><span>Production-minded</span>
      </section>

      <section className="risk-section">
        <Reveal className="risk-intro">
          <h2>Building it yourself looks cheaper. Until production starts.</h2>
          <p>A coding assistant can generate code. A real product still needs the engineering system around it.</p>
        </Reveal>
        <div className="risk-grid">
          {risks.map((risk, index) => (
            <Reveal className="risk-item" delay={index * 0.05} key={risk.name}>
              <strong>{risk.name}</strong>
              <p>{risk.statement}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lifecycle-section" id="lifecycle">
        <Reveal className="lifecycle-copy">
          <h2>One agent owns the whole product lifecycle.</h2>
          <p>Aquiles keeps product context connected from the first decision through the first incident and the next release.</p>
        </Reveal>
        <Lifecycle />
      </section>

      <section className="privacy-section">
        <div className="privacy-image-wrap">
          <Image
            src="/images/aquiles-privacy.webp"
            alt="A precision data privacy system filtering sensitive information"
            fill
            sizes="(max-width: 820px) 100vw, 52vw"
            className="privacy-image"
          />
        </div>
        <Reveal className="privacy-copy">
          <h2>Privacy is architecture, not a cleanup ticket.</h2>
          <p>Aquiles designs the data path before sensitive information reaches a model, log, vendor, or production database.</p>
          <div className="privacy-points">
            <span>PII discovery and redaction</span>
            <span>LGPD-aware data flows</span>
            <span>Secret and permission hygiene</span>
            <span>Security review in delivery</span>
          </div>
        </Reveal>
      </section>

      <section className="capabilities-section" id="capabilities">
        <Reveal className="capabilities-heading">
          <h2>Everything between the idea and the pager.</h2>
          <p>Not a bag of prompts. A complete engineering operating model, ready to work in your repository.</p>
        </Reveal>
        <CapabilityGrid />
      </section>

      <section className="knowledge-section" id="knowledge">
        <Reveal className="knowledge-heading">
          <h2>A connected mind for the whole build.</h2>
          <p>Aquiles brings twelve disciplines into one working context, so product decisions survive every handoff from idea to operation.</p>
        </Reveal>
        <KnowledgeGraph />
        <div className="knowledge-summary">
          <div><strong>12</strong><span>connected disciplines</span></div>
          <div><strong>One</strong><span>working context</span></div>
          <div><strong>Always</strong><span>refined by evidence</span></div>
        </div>
        <p className="knowledge-note">The advantage is not a vanity parameter count. It is connecting the right expertise to every product decision.</p>
      </section>

      <section className="codex-section" id="codex">
        <div className="codex-stage" aria-hidden="true">
          <span className="codex-word">CODEX</span>
          <span className="connector-line" />
          <BrandMark />
        </div>
        <Reveal className="codex-copy">
          <h2>Plug in. Keep building.</h2>
          <p>Aquiles runs directly inside Codex. No new workspace, no platform migration, no workflow theater.</p>
          <ol>
            <li><span>Receive the plugin</span><small>Your licensed Aquiles package arrives ready to install.</small></li>
            <li><span>Add it to Codex</span><small>Install once, then use it in the repositories you choose.</small></li>
            <li><span>Give it the outcome</span><small>Aquiles discovers, plans, builds, verifies, and operates.</small></li>
          </ol>
        </Reveal>
      </section>

      <section className="observability-section">
        <Image
          src="/images/aquiles-observability.webp"
          alt="A monitored production network with connected engineering systems"
          fill
          sizes="100vw"
          className="observability-image"
        />
        <div className="observability-scrim" />
        <Reveal className="observability-copy">
          <h2>Shipping is the midpoint.</h2>
          <p>Aquiles builds the feedback loop: telemetry, alerts, incident evidence, performance signals, and the next improvement.</p>
        </Reveal>
      </section>

      <section className="pricing-section" id="pricing">
        <Reveal className="pricing-copy">
          <h2>Buy the engineering system once.</h2>
          <p>Stop rebuilding the production layer around every prototype.</p>
          <div className="price"><span>$</span>1,999 <small>USD</small></div>
          <p className="price-note">One-time license. Delivered as a Codex plugin.</p>
          <PrimaryLink href={purchaseHref}>Buy Aquiles</PrimaryLink>
        </Reveal>
        <Reveal className="pricing-includes" delay={0.08}>
          <h3>Included</h3>
          <ul>
            <CheckItem>Full Aquiles agent for Codex</CheckItem>
            <CheckItem>Discovery-to-production workflow</CheckItem>
            <CheckItem>Security and privacy guardrails</CheckItem>
            <CheckItem>Testing and release verification</CheckItem>
            <CheckItem>Monitoring and incident workflow</CheckItem>
            <CheckItem>Installation guide</CheckItem>
          </ul>
        </Reveal>
      </section>

      <section className="faq-section">
        <Reveal><h2>Questions before you install.</h2></Reveal>
        <div className="faq-list">
          <details>
            <summary>Is Aquiles another chat interface?</summary>
            <p>No. Aquiles runs inside Codex and works directly with your repository, tools, tests, and delivery workflow.</p>
          </details>
          <details>
            <summary>Does it only write code?</summary>
            <p>No. It covers discovery, architecture, implementation, QA, security, privacy, deployment, monitoring, and iteration.</p>
          </details>
          <details>
            <summary>Does Aquiles guarantee LGPD compliance?</summary>
            <p>No tool can guarantee compliance alone. Aquiles implements LGPD-aware engineering controls, data minimization, and PII redaction workflows that support your compliance program.</p>
          </details>
          <details>
            <summary>What happens after I buy?</summary>
            <p>NetoLabs sends the licensed plugin and installation guide so you can add Aquiles to Codex and start in your repository.</p>
          </details>
        </div>
      </section>

      <section className="case-section" id="proof">
        <Reveal className="case-heading">
          <h2>Selected work. Running in production.</h2>
          <p>Highlights from products built end to end and continuously maintained by Aquiles.</p>
        </Reveal>
        <div className="case-grid">
          <Reveal className="case-card case-voxa">
            <a href="https://voxa.netolabs.dev" target="_blank" rel="noreferrer" aria-label="Open VOXA in production">
              <div className="case-image-wrap">
                <Image src="/images/case-voxa.webp" alt="VOXA production landing page" fill sizes="(max-width: 820px) 100vw, 58vw" className="case-image" />
              </div>
              <div className="case-body">
                <div><h3>VOXA</h3><p>Conversation intelligence that turns recordings into transcripts, decisions, and next actions.</p></div>
                <div className="case-facts"><span>voxa.netolabs.dev</span><span>100% built and maintained by Aquiles</span></div>
              </div>
            </a>
          </Reveal>
          <Reveal className="case-card case-forge" delay={0.06}>
            <a href="https://forge.netolabs.dev" target="_blank" rel="noreferrer" aria-label="Open Forge in production">
              <div className="case-image-wrap">
                <Image src="/images/case-forge.webp" alt="Forge production product screen" fill sizes="(max-width: 820px) 100vw, 42vw" className="case-image" />
              </div>
              <div className="case-body">
                <div><h3>Forge</h3><p>An operating platform to build, ground, evaluate, and observe dependable AI agents.</p></div>
                <div className="case-facts"><span>forge.netolabs.dev</span><span>100% built and maintained by Aquiles</span></div>
              </div>
            </a>
          </Reveal>
          <Reveal className="case-card case-benchline" delay={0.1}>
            <a href="https://evals.netolabs.dev" target="_blank" rel="noreferrer" aria-label="Open Benchline in production">
              <div className="case-image-wrap">
                <Image src="/images/case-benchline.webp" alt="Benchline production agent evaluation platform" fill sizes="100vw" className="case-image" />
              </div>
              <div className="case-body">
                <div><h3>Benchline</h3><p>The quality control plane that gives every AI agent an evidence-backed release decision.</p></div>
                <div className="case-facts"><span>evals.netolabs.dev</span><span>100% built and maintained by Aquiles</span></div>
              </div>
            </a>
          </Reveal>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><BrandMark /><span>Aquiles by NetoLabs</span></div>
        <p>Build the product. Keep the engineering standard.</p>
        <div className="footer-links">
          <a href="https://netolabs.dev">NetoLabs</a>
          <a href="https://github.com/luizvb/aquiles-agent" target="_blank" rel="noreferrer">GitHub</a>
          <a href="mailto:hello@netolabs.dev">Contact</a>
        </div>
      </footer>
    </main>
  );
}
