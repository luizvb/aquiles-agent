"use client";

import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Binoculars,
  BracketsCurly,
  Bug,
  ChartLineUp,
  Check,
  CloudArrowUp,
  Code,
  Fingerprint,
  LockKey,
  ShieldCheck,
  Sparkle,
  Strategy,
} from "@phosphor-icons/react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PrimaryLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <motion.a
      className="primary-link"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>{children}</span>
      <span className="button-icon" aria-hidden="true">
        {external ? <ArrowUpRight size={17} weight="bold" /> : <ArrowRight size={17} weight="bold" />}
      </span>
    </motion.a>
  );
}

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 46]);
  const y = useSpring(rawY, { stiffness: 90, damping: 24 });

  return (
    <motion.div ref={ref} className="hero-visual" style={reduce ? undefined : { y }}>
      <Image
        src="/images/aquiles-core.webp"
        alt="A precision computational core coordinating multiple software engineering systems"
        fill
        priority
        fetchPriority="high"
        quality={65}
        sizes="(max-width: 820px) 100vw, 58vw"
        className="hero-image"
      />
    </motion.div>
  );
}

const capabilities = [
  {
    title: "Discovery that leads to code",
    body: "Turns fuzzy requirements into a scoped product, architecture, backlog, and measurable release plan.",
    icon: Strategy,
    className: "capability-discovery",
  },
  {
    title: "Production engineering",
    body: "Builds frontend, backend, data, integrations, tests, CI, and deployment as one coherent system.",
    icon: Code,
    className: "capability-build",
  },
  {
    title: "Security by default",
    body: "Applies secret hygiene, dependency review, threat-aware choices, and least-privilege defaults.",
    icon: ShieldCheck,
    className: "capability-security",
  },
  {
    title: "Privacy in the pipeline",
    body: "Designs LGPD-aware data flows and PII redaction before sensitive data reaches models or logs.",
    icon: Fingerprint,
    className: "capability-privacy",
  },
  {
    title: "Operated after launch",
    body: "Adds telemetry, monitoring, alerts, incident context, and the feedback loop for continuous improvement.",
    icon: ChartLineUp,
    className: "capability-operate",
  },
] as const;

export function CapabilityGrid() {
  const reduce = useReducedMotion();

  return (
    <div className="capability-grid">
      {capabilities.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.title}
            className={`capability ${item.className}`}
            initial={reduce ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.62, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduce ? undefined : { y: -4 }}
          >
            <Icon size={28} weight="duotone" aria-hidden="true" />
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

const lifecycle = [
  { title: "Discover", body: "Problem framing, user needs, constraints, success metrics.", icon: Binoculars },
  { title: "Design", body: "Architecture, data model, UX system, delivery plan.", icon: BracketsCurly },
  { title: "Build", body: "Product code, integrations, migrations, infrastructure.", icon: Sparkle },
  { title: "Prove", body: "Automated tests, browser QA, security review, release gates.", icon: Bug },
  { title: "Ship", body: "CI/CD, environment setup, controlled rollout, rollback path.", icon: CloudArrowUp },
  { title: "Operate", body: "Logs, traces, metrics, alerts, incidents, improvements.", icon: LockKey },
] as const;

export function Lifecycle() {
  const reduce = useReducedMotion();

  return (
    <div className="lifecycle">
      {lifecycle.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.article
            key={item.title}
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 0.58, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="lifecycle-icon"><Icon size={22} weight="duotone" /></span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <li>
      <Check size={18} weight="bold" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
