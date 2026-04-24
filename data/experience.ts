export interface Experience {
  id: string;
  years: string;
  role: string;
  company: string;
  description: string;
  wins: string[];
  tech: string[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    years: "2024 — Present",
    role: "Senior Full Stack & DevOps Engineer",
    company: "Acme Cloud Corp",
    description:
      "Lead architect for multi-region SaaS infrastructure serving enterprise clients. Owning end-to-end delivery from design to production deployment.",
    wins: [
      "Reduced P99 latency from 800ms to 40ms via CDN + edge caching",
      "Built zero-downtime deployment pipeline used by 8 engineering teams",
      "Cut cloud spend by $180k/yr through rightsizing and spot fleet automation",
    ],
    tech: ["AWS", "Kubernetes", "Next.js", "Go", "Terraform"],
  },
  {
    id: "exp-2",
    years: "2022 — 2024",
    role: "Full Stack Developer",
    company: "Velocity Labs",
    description:
      "Built and scaled real-time SaaS products from zero to 100k users. Wore many hats: frontend, backend, infrastructure, and incident response.",
    wins: [
      "Architected WebSocket platform handling 10k concurrent connections",
      "Shipped CI/CD system reducing deployment time from 45min to 6min",
      "Led migration from monolith to microservices with zero downtime",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Docker", "GitHub Actions"],
  },
  {
    id: "exp-3",
    years: "2021 — 2022",
    role: "Cloud Infrastructure Engineer",
    company: "DataBridge Systems",
    description:
      "Designed and maintained cloud infrastructure for a data analytics platform processing 5TB+ of events daily. Focused on reliability and cost efficiency.",
    wins: [
      "Achieved 99.95% uptime SLA consistently for 12 consecutive months",
      "Automated compliance reporting saving 20hrs/week of manual effort",
      "Built self-healing infrastructure with auto-recovery runbooks",
    ],
    tech: ["AWS", "Python", "Terraform", "Prometheus", "Grafana"],
  },
  {
    id: "exp-4",
    years: "2020 — 2021",
    role: "Software Engineer",
    company: "StartupOS",
    description:
      "Early engineer at a B2B startup. Built core product features from scratch, set up the entire development and deployment infrastructure.",
    wins: [
      "Built authentication and billing systems from 0 to production",
      "Established engineering culture: code reviews, testing, observability",
      "Shipped MVP in 6 weeks that closed the company's seed round",
    ],
    tech: ["TypeScript", "Next.js", "PostgreSQL", "Stripe", "AWS"],
  },
];
