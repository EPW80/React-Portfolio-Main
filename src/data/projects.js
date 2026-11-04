export const projects = [
  {
    id: 0,
    title: "Real-Time Chat Analytics Platform",
    tags: ["Go", "WebSockets", "DynamoDB", "React", "TypeScript", "AWS"],
    image: null,
    description:
      "Go WebSocket chat server with a live React dashboard for message volume, active users, and response times — plus ElevenLabs voice alerts with content-hash audio caching.",
    repo: "https://github.com/EPW80/Chat-Analytics-Platform",
    live: null,
  },
  {
    id: 1,
    title: "AgentFlow",
    tags: ["Python", "FastAPI", "Docker", "Claude API", "AWS Bedrock"],
    image: null,
    description:
      "Dockerized FastAPI service that runs multi-step AI workflows through Claude and AWS Bedrock, covered by automated tests.",
    repo: "https://github.com/EPW80/agentflow",
    live: "https://agentflow-orcin.vercel.app/",
  },
  {
    id: 2,
    title: "SugarMenu",
    tags: ["Next.js", "React", "TypeScript"],
    image: null,
    description:
      "Lifestyle editorial publication with App Router routes for home, category fronts, and articles — typed async content repository ready for a CMS adapter.",
    repo: null,
    live: "https://sugarmenu-staging.dev40.workers.dev/",
    status: "In progress",
  },
  {
    id: 3,
    title: "Faucet",
    tags: ["Solidity", "Web3", "Ethereum"],
    image: "/img/nft.webp",
    description:
      "Donate and withdraw funds from a smart contract through a simple faucet interface.",
    repo: "https://github.com/EPW80/faucet",
    live: "https://faucet-xgpo.vercel.app/",
  },
];

export const skills = [
  "Python / Go",
  "TypeScript / JavaScript",
  "React / Next.js",
  "FastAPI / Django",
  "Node.js / Express",
  "AWS / Docker",
  "PostgreSQL / DynamoDB",
  "GraphQL / REST",
  "CI/CD / GitHub Actions",
  "Pytest / Vitest",
];

export const experience = [
  {
    role: "AI Systems Consultant",
    company: "House of Helix LLC",
    dates: "Aug 2026 – Present",
    summary:
      "Design LLM-backed agents and internal AI tools; build API, database, and CRM integrations; shipping a Next.js wholesale storefront with server-side pricing.",
  },
  {
    role: "Full-Stack Developer (Contract)",
    company: "Advanced Sequence",
    dates: "Aug 2026 – Present",
    summary:
      "Lead WooCommerce developer owning theme, checkout, SEO, and structured data; built a Go affiliate payout service with 299 automated tests.",
  },
  {
    role: "Full-Stack Development Intern",
    company: "Cabana Joes Hospitality Products",
    dates: "Apr 2022 – Aug 2022",
    summary:
      "Built an e-commerce platform with 20+ reusable React components and full test coverage; improved query speed with indexing and caching.",
  },
];

export const education = [
  {
    label: "Education",
    detail: "B.S. Computer Science — California State University, Fullerton (Jan 2026)",
  },
  {
    label: "Certificate",
    detail: "Full-Stack Web Development — UCLA Extension (Aug 2022)",
  },
];
