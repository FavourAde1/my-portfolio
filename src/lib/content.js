export const profile = {
  firstName: "Favour",
  middleName: "Oluwaseun",
  lastName: "Adeniyi",
  displayName: "Favour Adeniyi",
  monogram: "FA",
  title: "Backend Engineer",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "adeniyifavour49@gmail.com",
  phone: "+234 806 920 0740",
  phoneHref: "tel:+2348069200740",
  linkedin: "https://linkedin.com/in/favouradeniyi",
  github: "https://github.com/FavourAde1",
  // Built from this file by `npm run build:resume`; re-run it after editing content.
  resume: "/Favour-Adeniyi-Resume.pdf",
  availability: "Open to full-time, contract, and founding-engineer roles",
  kicker: "ENG // BACKEND_SYSTEMS",
  headline: "The API layer your product actually ships on.",
  lede: "I design authenticated, documented, deployable backend systems — JWT and RBAC, schemas that can evolve, and CI/CD that gets code into production. Including a live client site + admin system shipped via Afriment.",
};

export const manifesto = [
  "Trained engineer first. I bring that discipline to software: contracts, failure modes, and systems that stay standing.",
  "I take a product idea and turn it into a REST surface a frontend can build against on day one — auth, roles, pagination, and OpenAPI included.",
  "Early-stage teams do not need a 20-person platform org. They need someone who will own the server side end to end. That is the work I do.",
  "Through Afriment I shipped a live client website and admin quote system for Excalet Integrated Services — public site, authenticated inbox, production deploy.",
];

export const metrics = [
  { value: "3+", label: "Years shipping backend systems" },
  { value: "4", label: "Database engines in production use" },
  { value: "JWT", label: "Auth and RBAC default" },
  { value: "CI/CD", label: "Live on Vercel, Render & Railway" },
];

export const engagement = [
  {
    title: "Founding / full-time backend",
    body: "Own the API, data model, and deployment for a product team that needs a reliable server from week one.",
  },
  {
    title: "Contract API builds",
    body: "Scoped REST surfaces with auth, docs, and a schema a frontend can consume without guessing.",
  },
  {
    title: "Technical partnership",
    body: "Architecture, reviews, and the unglamorous layer investors actually depend on — access control and data integrity.",
  },
];

export const experience = [
  {
    id: "freelance",
    role: "Backend Developer",
    org: "Freelance — product APIs",
    period: "Jan 2024 — Present",
    location: "Remote / Lagos",
    note: "Alongside HND studies since Jan 2025",
    summary:
      "I design and ship REST APIs for products that need auth, clean data models, and a deployment story — not a pile of untyped routes.",
    points: [
      "Designed REST surfaces in Node.js and Express with JWT authentication and role-based access control.",
      "Modeled and optimized schemas across MongoDB and PostgreSQL for evolving product requirements.",
      "Integrated payment gateways and email providers behind stable service boundaries.",
      "Shipped to Render and Railway with CI/CD, and documented every public route in Swagger / OpenAPI.",
    ],
  },
  {
    id: "afriment-excalet",
    role: "Backend Developer — Intern",
    org: "Afriment · Team Learners · Excalet Integrated Services",
    period: "Sep 2026 — Oct 2026",
    location: "Remote / Nigeria",
    note: "Alongside HND studies",
    summary:
      "Completed Afriment’s Career Enhancement Internship Program in Backend Development (certificate issued 13 Oct 2026). Shipped a production company website and authenticated admin quote system for Excalet Integrated Services.",
    points: [
      "Built the full public site (Home, Services, About, Gallery, Contact, FAQ, Industries) with responsive UI and conversion CTAs.",
      "Implemented quote request capture plus a protected admin dashboard (session auth) so the business can view, mark, and manage leads.",
      "Shipped on Vercel with Git-based deploys; fixed production issues on forms, admin access, and environment config.",
      "Owned end-to-end delivery: Node.js, Express, EJS, Tailwind, MongoDB, and live evidence on GitHub and production.",
    ],
  },
  {
    id: "solags",
    role: "Backend Developer Intern",
    org: "Solags Nigeria Limited",
    period: "Jan 2023 — Dec 2023",
    location: "Ikeja, Lagos",
    note: "Alongside ND studies",
    summary:
      "Built backend services for internal tools and client work inside a shipping product team.",
    points: [
      "Assisted in backend services for internal tools and client projects, writing reusable modules instead of one-off scripts.",
      "Partnered with frontend engineers and designers so contracts landed before UI work began.",
      "Tested and debugged APIs in Postman and Insomnia; took part in reviews and stand-ups.",
    ],
  },
  {
    id: "decrownes",
    role: "IT Support & Developer Intern",
    org: "De Crownes Electronics",
    period: "Jan 2022 — Dec 2022",
    location: "Cole-Ijesha, Lagos",
    note: "Alongside ND studies",
    summary:
      "Kept production web systems running — deploys, backups, and the operational work that makes APIs trustworthy.",
    points: [
      "Supported deployment and maintenance of live web applications.",
      "Managed databases and ran regular backups so recovery was a procedure, not a prayer.",
      "Automated recurring ops with scripts and documented the system so the next person could run it.",
    ],
  },
];

// Each project can carry optional proof links. The page only renders the ones
// that are set, so add them as the real URLs exist:
//   live     hosted app or API base URL
//   docs     hosted Swagger / OpenAPI UI
//   postman  public Postman collection or workspace
//   ci       CI run page (e.g. the repo's GitHub Actions tab)
// `flow` is the request path drawn as a strip above the endpoint playground.
export const projects = [
  {
    id: "excalet",
    name: "Excalet Website + Admin Quotes",
    status: "Live in production",
    stack: ["Node.js", "Express", "EJS", "Tailwind", "Sessions", "Vercel"],
    repo: "https://github.com/FavourAde1/excalet-website",
    live: "https://excalet-website.vercel.app",
    flow: ["Visitor", "Express + EJS", "Quote form → server", "Session-auth admin", "Nodemailer"],
    problem:
      "A facility-services company in Owerri needed a professional digital presence and a reliable way to capture and manage quote requests — not another brochure page that dies after deploy.",
    architecture:
      "Express + EJS public site → quote form posts to server → session-authenticated admin dashboard lists leads. Tailwind for UI. Nodemailer for notifications. Deployed on Vercel with Git-based production deploys.",
    outcomes: [
      "Public marketing site with services, about, gallery, and contact — mobile-ready.",
      "Authenticated admin inbox for quote requests (date, contact, service, message).",
      "Owned delivery end to end under Afriment: code, deploy, and production fixes.",
    ],
    evidence: [
      { src: "/evidence/excalet-homepage.jpg", caption: "Public homepage — live production" },
      { src: "/evidence/excalet-admin-login.jpg", caption: "Admin login (session auth)" },
      { src: "/evidence/excalet-admin-quotes.jpg", caption: "Quote requests inbox" },
      { src: "/evidence/excalet-vercel-deploy.jpg", caption: "Vercel production deploy" },
      { src: "/evidence/excalet-github.jpg", caption: "GitHub repo ownership" },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/",
        desc: "Public homepage — brand, CTAs, services overview.",
        status: 200,
        ms: 28,
        response: {
          page: "home",
          title: "Excalet Integrated Services",
          ctas: ["Free Inspection", "Chat on WhatsApp"],
        },
      },
      {
        method: "POST",
        path: "/contact",
        desc: "Submit a quote request (name, phone, email, service, message).",
        status: 201,
        ms: 54,
        response: {
          ok: true,
          message: "Quote request received",
          service: "Home Cleaning",
        },
      },
      {
        method: "POST",
        path: "/admin/login",
        desc: "Admin session login (bcrypt-verified credentials).",
        status: 200,
        ms: 61,
        response: { authenticated: true, role: "admin" },
      },
      {
        method: "GET",
        path: "/admin/quotes",
        desc: "Protected list of quote requests for the business.",
        status: 200,
        ms: 33,
        response: {
          total: 10,
          items: [
            {
              date: "2026-10-09T20:23:20.000Z",
              name: "Retest User",
              phone: "08039998888",
              service: "Home Cleaning",
              message: "Retest after fixes",
            },
          ],
        },
      },
    ],
  },
  {
    id: "weather-app",
    name: "Weather Prediction Web App",
    status: "Live",
    stack: ["JavaScript", "API integration", "Vercel"],
    repo: "https://github.com/FavourAde1/weather-app",
    live: "https://weather-prediction-api-app.vercel.app",
    flow: ["Client", "Weather API", "Prediction UI", "Vercel"],
    problem:
      "Users need clear weather data and simple prediction views without wrestling with raw API responses.",
    architecture:
      "Frontend app consumes a weather / prediction API, renders conditions and forecasts, and deploys as a static/SSR-friendly site on Vercel.",
    outcomes: [
      "Live weather prediction UI deployed on Vercel.",
      "Public GitHub repo under FavourAde1.",
      "Complements related hardware work (ESP32 miniature weather station).",
    ],
    endpoints: [
      {
        method: "GET",
        path: "/",
        desc: "Main weather prediction interface.",
        status: 200,
        ms: 24,
        response: { page: "weather", status: "ok" },
      },
    ],
  },
  {
    id: "esp32-weather",
    name: "ESP32 Miniature Weather Station",
    status: "Hardware + firmware",
    stack: ["ESP32", "BME280", "OLED", "C/C++"],
    repo: "https://github.com/FavourAde1/ESP32-Miniature-Weather-Station",
    flow: ["Sensors", "ESP32", "OLED display", "Local readings"],
    problem:
      "Classroom and lab projects need a compact station that reads real environmental data, not only simulated web demos.",
    architecture:
      "ESP32 microcontroller with BME280 (temp/humidity/pressure) and a 0.96\" or 1.3\" OLED for live readings; optional simple anemometer path in the hardware design.",
    outcomes: [
      "Working miniature weather station design documented on GitHub.",
      "Bridges mechatronics training with software and IoT practice.",
    ],
    endpoints: [],
  },
  {
    id: "task-api",
    name: "Task Management API",
    status: "Production-shaped",
    stack: ["Node.js", "Express", "MongoDB", "JWT"],
    repo: "https://github.com/FavourAde1/task-management-api",
    flow: ["Client", "Express REST", "JWT middleware", "RBAC gates", "MongoDB"],
    problem:
      "Teams need a single source of truth for work, with role-aware access and a contract a client can paginate against.",
    architecture:
      "Express REST surface → JWT middleware → RBAC gates → MongoDB collections for users and tasks. Filters and pagination live on the list endpoint. Public routes documented in OpenAPI.",
    outcomes: [
      "CRUD on tasks with role-based access, not a single shared bucket.",
      "Pagination and filtering so list endpoints stay usable as data grows.",
      "Auth as a first-class concern, not a later patch.",
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/auth/login",
        desc: "Issue a JWT for a verified user.",
        status: 200,
        ms: 42,
        response: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…",
          user: { id: "u_8841", role: "admin", email: "ada@atlas.dev" },
        },
      },
      {
        method: "GET",
        path: "/api/v1/tasks?page=1&limit=20",
        desc: "Paginated task list with role-aware visibility.",
        status: 200,
        ms: 18,
        response: {
          data: [
            { id: "tsk_102", title: "Ship billing webhook", status: "in_progress", assignee: "u_221" },
            { id: "tsk_098", title: "Index tasks.ownerId", status: "done", assignee: "u_8841" },
          ],
          meta: { page: 1, limit: 20, total: 128 },
        },
      },
      {
        method: "POST",
        path: "/api/v1/tasks",
        desc: "Create a task. Requires member or admin.",
        status: 201,
        ms: 27,
        response: {
          id: "tsk_130",
          title: "Write OpenAPI for reports",
          status: "todo",
          ownerId: "u_8841",
        },
      },
      {
        method: "PATCH",
        path: "/api/v1/tasks/tsk_102",
        desc: "Partial update. Owner or admin only.",
        status: 200,
        ms: 21,
        response: { id: "tsk_102", status: "done", updatedAt: "2026-09-04T12:14:03.000Z" },
      },
    ],
  },
  {
    id: "expense-api",
    name: "Expense Tracker API",
    status: "Production-shaped",
    stack: ["Node.js", "Express", "MySQL", "JWT"],
    repo: "https://github.com/FavourAde1/expense-tracker-api",
    flow: ["Client", "Express REST", "JWT", "MySQL: users · categories · transactions"],
    problem:
      "Personal-finance products fail when the ledger is not trustworthy. The backend has to be the system of record.",
    architecture:
      "Express REST surface → JWT → MySQL relational schema (users, categories, transactions). Monthly reports are aggregations, not client-side math.",
    outcomes: [
      "Authenticated ledger with categorized transactions.",
      "Monthly report endpoints so the client never re-implements sums.",
      "Relational integrity for money — the right default over a document store.",
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/v1/auth/register",
        desc: "Create a user and return a session token.",
        status: 201,
        ms: 64,
        response: { id: "u_4402", email: "ada@atlas.dev", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…" },
      },
      {
        method: "POST",
        path: "/api/v1/transactions",
        desc: "Record an expense against a category.",
        status: 201,
        ms: 31,
        response: {
          id: "txn_7781",
          amount: 18500,
          currency: "NGN",
          category: "infrastructure",
          note: "Railway production",
        },
      },
      {
        method: "GET",
        path: "/api/v1/transactions?month=2026-08",
        desc: "Month-scoped ledger for the current user.",
        status: 200,
        ms: 24,
        response: {
          data: [
            { id: "txn_7781", amount: 18500, category: "infrastructure" },
            { id: "txn_7704", amount: 4200, category: "tools" },
          ],
          totals: { debit: 22700, credit: 0, currency: "NGN" },
        },
      },
      {
        method: "GET",
        path: "/api/v1/reports/monthly?month=2026-08",
        desc: "Aggregated spend by category.",
        status: 200,
        ms: 91,
        response: {
          month: "2026-08",
          byCategory: [
            { category: "infrastructure", total: 18500 },
            { category: "tools", total: 4200 },
          ],
          total: 22700,
        },
      },
    ],
  },
];

// `usedIn` names where a tool shows up in the work above; leave it empty until
// there is a project or role to point at. It replaces the old self-rated percentages.
export const stackGroups = [
  {
    title: "Languages",
    items: [
      { name: "JavaScript / Node.js", usedIn: ["Excalet", "Task API", "Expense API"] },
      { name: "SQL", usedIn: ["Expense API"] },
      { name: "Python", usedIn: [] },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { name: "Express.js", usedIn: ["Excalet", "Task API", "Expense API", "Weather app"] },
      { name: "NestJS", usedIn: [] },
      { name: "Django / Flask", usedIn: [] },
    ],
  },
  {
    title: "Data",
    items: [
      { name: "MongoDB", usedIn: ["Excalet", "Task API"] },
      { name: "MySQL", usedIn: ["Expense API"] },
      { name: "PostgreSQL", usedIn: ["Freelance"] },
      { name: "Redis", usedIn: [] },
    ],
  },
  {
    title: "Platform",
    items: [
      { name: "Git / GitHub", usedIn: ["Excalet", "Weather app", "ESP32 station", "Task API", "Expense API"] },
      { name: "Docker", usedIn: [] },
      { name: "Linux / Nginx", usedIn: [] },
      { name: "Render / Railway", usedIn: ["Freelance"] },
      { name: "Vercel", usedIn: ["Excalet", "Weather app"] },
    ],
  },
];

export const pipeline = [
  { id: "edge", label: "Client", detail: "Web, mobile, or partner" },
  { id: "proxy", label: "Nginx", detail: "TLS, reverse proxy" },
  { id: "app", label: "Express", detail: "REST surface" },
  { id: "auth", label: "JWT / RBAC", detail: "Identity and roles" },
  { id: "svc", label: "Handlers", detail: "Domain logic" },
  { id: "data", label: "Data plane", detail: "Mongo · SQL · Redis" },
];

export const education = [
  {
    title: "Higher National Diploma — Mechatronics Engineering",
    school: "Yaba College of Technology, Yaba, Lagos",
    period: "Jan 2025 — Current",
  },
  {
    title: "National Diploma — Electrical and Electronics Engineering",
    school: "SAF Polytechnic, Iseyin, Oyo State",
    period: "Jan 2021 — Dec 2023",
  },
  {
    title: "Senior Secondary Certificate (O-Level)",
    school: "Okota Senior Secondary School, Lagos · Laboratory Prefect",
    period: "Sept 2017 — Aug 2020",
  },
];

export const certifications = [
  {
    name: "Career Enhancement Internship — Backend Developer",
    org: "Afriment, Oct 2026",
    href: "/evidence/afriment-backend-certificate.png",
  },
  { name: "Backend Development", org: "TechCrush NG" },
  { name: "API Design Best Practices", org: "freeCodeCamp, 2023" },
  { name: "Node.js & Express.js", org: "Udemy, 2024" },
  { name: "MongoDB Basics", org: "MongoDB University, 2024" },
  { name: "Git & GitHub", org: "freeCodeCamp, 2023" },
  { name: "3MTT Certified", org: "3 Million Technical Talent" },
];

export const communities = [
  { name: "Google Developer Groups", short: "GDG" },
  { name: "3MTT", short: "3MTT" },
  { name: "Afriment Alumni", short: "Afriment" },
];

export const languages = [
  { name: "English", level: "Fluent" },
  { name: "Yoruba", level: "Native" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "stack", label: "Stack" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export const requestLog = [
  { t: "12:14:02", method: "POST", path: "/auth/login", status: 200, ms: 42 },
  { t: "12:14:03", method: "GET", path: "/tasks?page=1", status: 200, ms: 18 },
  { t: "12:14:03", method: "PATCH", path: "/tasks/tsk_102", status: 200, ms: 21 },
  { t: "12:14:04", method: "GET", path: "/reports/monthly", status: 200, ms: 91 },
  { t: "12:14:06", method: "POST", path: "/transactions", status: 201, ms: 31 },
  { t: "12:14:08", method: "GET", path: "/tasks?status=done", status: 200, ms: 16 },
];
