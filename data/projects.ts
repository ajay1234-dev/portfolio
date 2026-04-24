export interface Project {
  id: string;
  number: string;
  name: string;
  description: string;
  tech: string[];
  region: string;
  metrics: string;
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: "global-cdn-platform",
    number: "01",
    name: "Global CDN Platform",
    description:
      "Architected a multi-region content delivery network serving static assets and API responses with sub-20ms edge latency globally. Built custom cache invalidation logic and real-time origin health monitoring.",
    tech: ["Next.js", "AWS CloudFront", "Node.js", "Redis"],
    region: "us-east-1",
    metrics: "99.99% uptime · 18ms avg · 2M req/day",
    github: "#",
    demo: "#",
  },
  {
    id: "k8s-orchestration-dashboard",
    number: "02",
    name: "K8s Orchestration Dashboard",
    description:
      "Full-featured Kubernetes operations dashboard providing real-time cluster metrics, pod lifecycle management, and automated scaling decisions powered by custom Prometheus alerting rules.",
    tech: ["React", "Go", "Kubernetes", "Prometheus", "Grafana"],
    region: "eu-west-1",
    metrics: "99.9% uptime · 40ms avg · 50k req/day",
    github: "#",
    demo: "#",
  },
  {
    id: "cicd-automation-framework",
    number: "03",
    name: "CI/CD Automation Framework",
    description:
      "End-to-end deployment pipeline eliminating manual release steps. Includes blue/green deployments, automated rollbacks triggered by error rate thresholds, and full infrastructure drift detection.",
    tech: ["GitHub Actions", "Terraform", "AWS", "Docker"],
    region: "us-west-2",
    metrics: "80% faster deploys · 0 rollback failures · 200+ pipelines",
    github: "#",
    demo: "#",
  },
  {
    id: "serverless-api-platform",
    number: "04",
    name: "Serverless API Platform",
    description:
      "Event-driven microservices platform built on AWS Lambda with automatic scaling to zero. Handles burst traffic with no cold start penalty through provisioned concurrency and connection pooling.",
    tech: ["TypeScript", "AWS Lambda", "DynamoDB", "CDK"],
    region: "ap-southeast-1",
    metrics: "99.95% uptime · 12ms p99 · 500k req/day",
    github: "#",
    demo: "#",
  },
  {
    id: "infrastructure-as-code-lib",
    number: "05",
    name: "Infrastructure as Code Library",
    description:
      "Reusable Terraform module library covering VPC, ECS, RDS, and security group patterns. Used across 15+ projects to enforce compliance policies and reduce infrastructure setup time from days to hours.",
    tech: ["Terraform", "Python", "AWS Config", "GitHub Actions"],
    region: "global",
    metrics: "15 teams · 40+ modules · 3hr avg setup",
    github: "#",
    demo: "#",
  },
  {
    id: "realtime-chat-application",
    number: "06",
    name: "Real-Time Chat Application",
    description:
      "WebSocket-driven chat platform supporting 10k concurrent connections per node. Features message persistence, end-to-end encryption, presence tracking, and horizontal scaling via Redis pub/sub.",
    tech: ["Next.js", "Socket.io", "Redis", "PostgreSQL", "Nginx"],
    region: "ap-south-1",
    metrics: "10k concurrent · 8ms latency · 100k MAU",
    github: "#",
    demo: "#",
  },
  {
    id: "multi-cloud-cost-optimizer",
    number: "07",
    name: "Multi-Cloud Cost Optimizer",
    description:
      "Intelligent cloud spend analyzer that identifies waste across AWS and GCP accounts. Provides actionable recommendations that reduced cloud costs by 34% within 90 days of deployment.",
    tech: ["Python", "FastAPI", "React", "AWS SDK", "GCP SDK"],
    region: "multi-cloud",
    metrics: "34% cost reduction · $180k saved · 12 accounts",
    github: "#",
    demo: "#",
  },
  {
    id: "devops-monitoring-stack",
    number: "08",
    name: "DevOps Monitoring Stack",
    description:
      "Unified observability platform aggregating metrics, logs, and traces across 50+ services. Includes custom alerting runbooks, SLO tracking dashboards, and automated incident escalation.",
    tech: ["Prometheus", "Grafana", "Loki", "Docker Compose"],
    region: "on-prem",
    metrics: "50+ services · 99.9% alert accuracy · 2min MTTR",
    github: "#",
    demo: "#",
  },
];
