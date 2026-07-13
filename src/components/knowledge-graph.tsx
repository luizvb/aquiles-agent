"use client";

import { useEffect, useRef } from "react";

const domains = [
  { name: "Development", x: 0.2, y: 0.25 },
  { name: "Architecture", x: 0.43, y: 0.17 },
  { name: "Product", x: 0.72, y: 0.22 },
  { name: "Design", x: 0.84, y: 0.4 },
  { name: "Marketing", x: 0.81, y: 0.68 },
  { name: "Benchmarking", x: 0.63, y: 0.81 },
  { name: "Research", x: 0.38, y: 0.82 },
  { name: "Security", x: 0.16, y: 0.69 },
  { name: "Quality", x: 0.12, y: 0.47 },
  { name: "Data & AI", x: 0.38, y: 0.39 },
  { name: "Delivery", x: 0.66, y: 0.43 },
  { name: "Observability", x: 0.56, y: 0.66 },
] as const;

type GraphNode = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  phase: number;
  hub: boolean;
  label?: string;
};

type GraphEdge = {
  from: number;
  to: number;
  strength: number;
};

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function buildGraph(width: number, height: number) {
  const random = seededRandom(24051989);
  const mobile = width < 720;
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const hubIndexes: number[] = [];
  const centerIndex = nodes.push({
    x: width * 0.51,
    y: height * 0.5,
    baseX: width * 0.51,
    baseY: height * 0.5,
    radius: mobile ? 8 : 11,
    phase: 0,
    hub: true,
    label: "AQUILES",
  }) - 1;

  const coreCount = mobile ? 22 : 82;
  const coreIndexes: number[] = [];
  for (let i = 0; i < coreCount; i += 1) {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * (mobile ? 76 : 145);
    const x = width * 0.51 + Math.cos(angle) * distance;
    const y = height * 0.5 + Math.sin(angle) * distance * 0.68;
    const nodeIndex = nodes.push({
      x,
      y,
      baseX: x,
      baseY: y,
      radius: (mobile ? 1.1 : 1.25) + random() * (mobile ? 1.7 : 2.4),
      phase: random() * Math.PI * 2,
      hub: false,
    }) - 1;
    coreIndexes.push(nodeIndex);
    edges.push({ from: centerIndex, to: nodeIndex, strength: 0.13 + random() * 0.1 });
    if (i > 0) edges.push({ from: coreIndexes[i - 1], to: nodeIndex, strength: 0.1 });
    if (i > 5 && random() > 0.36) edges.push({ from: coreIndexes[i - 5], to: nodeIndex, strength: 0.08 });
  }

  domains.forEach((domain, domainIndex) => {
    const hubX = domain.x * width;
    const hubY = domain.y * height;
    const hubIndex = nodes.push({
      x: hubX,
      y: hubY,
      baseX: hubX,
      baseY: hubY,
      radius: mobile ? 3.8 : 5.5,
      phase: random() * Math.PI * 2,
      hub: true,
      label: domain.name,
    }) - 1;
    hubIndexes.push(hubIndex);
    edges.push({ from: centerIndex, to: hubIndex, strength: 0.34 });

    const satelliteCount = mobile ? 8 + (domainIndex % 3) : 18 + (domainIndex % 6);
    const satelliteIndexes: number[] = [];

    for (let i = 0; i < satelliteCount; i += 1) {
      const angle = (Math.PI * 2 * i) / satelliteCount + random() * 0.28;
      const distance = (mobile ? 18 : 25) + random() * (mobile ? 30 : 52);
      const x = hubX + Math.cos(angle) * distance;
      const y = hubY + Math.sin(angle) * distance * 0.72;
      const nodeIndex = nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        radius: (mobile ? 1 : 1.2) + random() * (mobile ? 1.4 : 2.1),
        phase: random() * Math.PI * 2,
        hub: false,
      }) - 1;
      satelliteIndexes.push(nodeIndex);
      edges.push({ from: hubIndex, to: nodeIndex, strength: 0.2 + random() * 0.16 });

      if (i > 0 && random() > 0.42) {
        edges.push({ from: satelliteIndexes[i - 1], to: nodeIndex, strength: 0.12 });
      }
      if (i > 2 && random() > 0.72) {
        edges.push({ from: satelliteIndexes[i - 3], to: nodeIndex, strength: 0.09 });
      }
    }
  });

  hubIndexes.forEach((hubIndex, index) => {
    const nextHub = hubIndexes[(index + 1) % hubIndexes.length];
    edges.push({ from: hubIndex, to: nextHub, strength: 0.12 });
    if (index % 2 === 0) {
      edges.push({ from: hubIndex, to: hubIndexes[(index + 4) % hubIndexes.length], strength: 0.08 });
    }
  });

  return { nodes, edges, hubIndexes, centerIndex };
}

export function KnowledgeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let graph = buildGraph(1, 1);
    let width = 1;
    let height = 1;
    let visible = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      const movement = reduceMotion ? 0 : 1;

      graph.nodes.forEach((node, index) => {
        const drift = node.hub ? 1.1 : 1.8;
        node.x = node.baseX + Math.sin(time * 0.00032 + node.phase + index * 0.03) * drift * movement;
        node.y = node.baseY + Math.cos(time * 0.00027 + node.phase) * drift * movement;
      });

      graph.edges.forEach((edge) => {
        const from = graph.nodes[edge.from];
        const to = graph.nodes[edge.to];
        const activity = reduceMotion ? 0.7 : 0.66 + Math.sin(time * 0.001 + edge.from) * 0.18;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = `rgba(168, 198, 108, ${edge.strength * activity})`;
        context.lineWidth = edge.strength > 0.25 ? 0.85 : 0.55;
        context.stroke();
      });

      graph.nodes.forEach((node, index) => {
        const pulse = reduceMotion ? 1 : 1 + Math.sin(time * 0.0013 + node.phase) * (node.hub ? 0.13 : 0.2);
        context.beginPath();
        context.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        context.fillStyle = node.hub
          ? index === graph.centerIndex ? "rgba(168, 198, 108, 0.98)" : "rgba(226, 232, 219, 0.88)"
          : "rgba(190, 199, 186, 0.7)";
        context.fill();
      });

      graph.hubIndexes.forEach((hubIndex, index) => {
        const hub = graph.nodes[hubIndex];
        const center = graph.nodes[graph.centerIndex];
        const progress = reduceMotion ? 0.62 : (time * 0.00008 + index / graph.hubIndexes.length) % 1;
        const x = center.x + (hub.x - center.x) * progress;
        const y = center.y + (hub.y - center.y) * progress;
        context.beginPath();
        context.arc(x, y, index % 3 === 0 ? 2.3 : 1.6, 0, Math.PI * 2);
        context.fillStyle = "rgba(168, 198, 108, 0.95)";
        context.fill();
      });

      context.textBaseline = "middle";
      context.font = `${width < 720 ? 9 : 11}px var(--font-geist-mono), monospace`;
      graph.nodes.forEach((node, index) => {
        if (!node.label) return;
        context.fillStyle = index === graph.centerIndex ? "rgba(168, 198, 108, 0.98)" : "rgba(218, 224, 212, 0.82)";
        context.fillText(node.label, node.x + node.radius + 7, node.y - node.radius - 5);
      });

      if (visible && !reduceMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      graph = buildGraph(width, height);
      draw(0);
    };

    const start = () => {
      window.cancelAnimationFrame(animationFrame);
      draw(0);
      if (visible && !reduceMotion) animationFrame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else window.cancelAnimationFrame(animationFrame);
      },
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    const handleMotionChange = () => {
      reduceMotion = motionQuery.matches;
      start();
    };

    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    motionQuery.addEventListener("change", handleMotionChange);
    resize();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="knowledge-graph" ref={containerRef}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <p className="sr-only">
        Aquiles connects knowledge across development, architecture, product, design, marketing,
        benchmarking, research, security, quality, data and AI, delivery, and observability.
      </p>
    </div>
  );
}
