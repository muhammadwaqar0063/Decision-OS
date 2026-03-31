# Decision OS

**The Intelligence Layer for SaaS & Soft Tech Executive Teams**

Decision OS transforms raw business data into structured decisions. Not dashboards — **decision systems**. Every screen answers three questions: *What happened? Why does it matter? What do we do next?*

---

## What Is This?

Decision OS is an Executive Decision Support System built for leadership teams at SaaS and technology companies. It provides **8 role-specific portals**, each tailored to how that executive actually thinks and decides.

| Portal | Role | Focus |
|--------|------|-------|
| 🏢 **CEO** | Chief Executive Officer | Company health, runway, board readiness, scenarios |
| 💰 **CFO** | Chief Financial Officer | Financials, burn rate, MRR, hiring gates, runway |
| 📈 **CRO** | Chief Revenue Officer | Pipeline, revenue trends, deal velocity, at-risk accounts |
| ⚙️ **COO** | Chief Operating Officer | Operations, efficiency, cross-functional dependencies |
| 🛡️ **CS** | Head of Customer Success | Account health, churn risk, expansion, NPS |
| 🔧 **CTO** | Chief Technology Officer | Tech debt, delivery velocity, infrastructure, security |
| 📣 **CMO** | Chief Marketing Officer | CAC, attribution, funnel metrics, campaign ROI |
| 🎯 **CPO** | Chief Product Officer | Feature adoption, roadmap impact, user feedback |

---

## Key Features

### 📖 Storytelling Cards
Every screen leads with a **narrative** — not a chart dump. A dark panel tells you what happened, why it matters, and what to do. Data without context is noise.

### 🔮 Scenario Engines
Toggle between **Bear / Base / Bull** scenarios. Every number updates in real-time: hiring plans, forecasts, runway, burn rate. Model "what if" instantly.

### 💸 Cost of Inaction
Every decision screen shows the **dollar cost of doing nothing**. Not vague opportunity cost — actual money you're losing every month you delay.

### 🔗 Cross-Portal Intelligence
Every portal shows how its data connects to others. The CEO sees CFO's hiring gate. The CRO sees CTO's mobile blocker. One click, full context.

### 📋 Decision Playbooks
Pre-built decision flows with **YES / NO / ESCALATE** branches. Step-by-step guidance from trigger to outcome. The system tracks what happened.

### 🧮 Calculators
Model custom scenarios beyond the built-in Bear/Base/Bull. Test hiring plans, pricing changes, and growth assumptions.

### 📊 Outcomes Tracking
Track whether decisions actually worked. Close the loop between "decide" and "did it work."

### 🌙 Dark Mode
Full dark mode support across all portals.

### 📄 PDF Generation
Export any portal view to PDF for board meetings, reviews, or offline reading.

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                   Client                     │
│  ┌──────┐ ┌──────┐ ┌──────┐    ┌──────┐    │
│  │ CEO  │ │ CFO  │ │ CRO  │... │ CPO  │    │
│  │Portal│ │Portal│ │Portal│    │Portal│    │
│  └──┬───┘ └──┬───┘ └──┬───┘    └──┬───┘    │
│     │        │        │           │         │
│  ┌──┴────────┴────────┴───────────┴──┐      │
│  │         dss-core.js               │      │
│  │    (Shared rendering + logic)     │      │
│  └───────────────┬───────────────────┘      │
│                  │                           │
│  ┌───────────────┴───────────────────┐      │
│  │           auth.js                 │      │
│  │    (Session + role management)    │      │
│  └───────────────────────────────────┘      │
└─────────────────────┬───────────────────────┘
                      │ HTTP + WebSocket
┌─────────────────────┴───────────────────────┐
│                 Server                        │
│  ┌─────────────────────────────────────┐    │
│  │  Express + Socket.IO               │    │
│  │  - REST API (/api/*)               │    │
│  │  - Real-time WebSocket push        │    │
│  │  - File watching (chokidar)        │    │
│  │  - In-memory cache (node-cache)    │    │
│  └──────────────┬──────────────────────┘    │
│                 │                            │
│  ┌──────────────┴──────────────────────┐    │
│  │  JSON Data Files                    │    │
│  │  company · financials · pipeline    │    │
│  │  revenue-trend · revenue-mix        │    │
│  │  accounts · alerts                  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | Node.js |
| **Server** | Express 4.x |
| **Real-time** | Socket.IO 4.x |
| **File Watching** | chokidar |
| **Caching** | node-cache (5-min TTL) |
| **Charts** | Chart.js (CDN) |
| **Auth** | Client-side session (localStorage) |
| **Data** | JSON files |

---

## Quick Start

### Prerequisites
- **Node.js** 16+ 
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repo
git clone https://github.com/waqarrule/Decision-OS.git
cd Decision-OS

# Install dependencies
npm install

# Start the server
npm start
```

The app runs at **http://localhost:3000** and redirects to the login page.

### Alternative (no server)
```bash
# For quick local preview without Node.js
npm run dev
# Uses live-server on port 3000
```

### Windows
Double-click `start.bat` to launch.

---

## Demo Accounts

| Email | Password | Role |
|-------|----------|------|
| `sarah@arcussoft.com` | `demo123` | CEO (full access) |
| `alex@arcussoft.com` | `demo123` | CRO |
| `david@arcussoft.com` | `demo123` | CFO |
| `maria@arcussoft.com` | `demo123` | COO |
| `priya@arcussoft.com` | `demo123` | Customer Success |
| `james@arcussoft.com` | `demo123` | CTO |
| `elena@arcussoft.com` | `demo123` | CMO |
| `tom@arcussoft.com` | `demo123` | CPO |
| `admin@arcussoft.com` | `admin123` | System Admin |
| `demo@arcussoft.com` | `demo` | Read-Only Viewer |

> ⚠️ These are demo credentials for prototype purposes. Replace with proper authentication for production use.

---

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check + uptime |
| `/api/company` | GET | Company overview + scenarios |
| `/api/financials` | GET | Financial data (MRR, burn, runway) |
| `/api/accounts` | GET | Account list (filterable: `?tier=`, `?segment=`, `?atRisk=true`) |
| `/api/alerts` | GET | Active alerts (filterable: `?severity=`, `?portal=`) |
| `/api/pipeline` | GET | Sales pipeline data |
| `/api/revenue-trend` | GET | Revenue over time (filterable: `?range=6&segments=smb,mid`) |
| `/api/revenue-mix` | GET | Revenue breakdown by segment |
| `/api/portals/:id/metrics` | GET | Computed metrics for a specific portal (ceo, cfo, cro, etc.) |
| `/api/scenarios/:type` | GET | Scenario data (`bear`, `base`, `bull`) |
| `/api/data/:file` | GET | Generic JSON data loader |

---

## Project Structure

```
Decision-OS/
├── server.js              # Express server + API + WebSocket
├── auth.js                # Authentication system
├── dss-core.js            # Shared rendering + decision logic
├── dss-data.js            # Data loading utilities
├── dss-shared.css         # Shared styles across all portals
│
├── index.html             # Entry point (redirects to login)
├── login.html             # Login page
├── admin.html             # Admin panel
│
├── dsl-ceo.html           # CEO portal
├── dsl-cfo.html           # CFO portal
├── dsl-cro.html           # CRO portal
├── dsl-coo.html           # COO portal
├── dsl-cto.html           # CTO portal
├── dsl-cmo.html           # CMO portal
├── dsl-cpo.html           # CPO portal
├── dsl-cs.html            # Customer Success portal
│
├── alerts.html            # Alerts center
├── calculators.html       # Scenario calculators
├── learning.html          # Learning & insights
├── outcomes.html          # Decision outcome tracking
│
├── generate-pdf.js        # PDF export utility
├── patch-portals.js       # Portal patching/updates
├── dark-mode.js           # Dark mode toggle
│
├── company.json           # Company data + scenarios
├── financials.json        # Financial metrics
├── pipeline.json          # Sales pipeline
├── pipeline-2.json        # Pipeline (alternate)
├── revenue-trend.json     # Revenue trend data
├── revenue-trend-2.json   # Revenue trend (alternate)
├── revenue-mix.json       # Revenue mix by segment
├── revenue-mix-2.json     # Revenue mix (alternate)
├── accounts.json          # Customer accounts
├── alerts.json            # System alerts
│
├── package.json           # Dependencies
├── start.bat              # Windows launcher
├── download_all.sh        # Asset download script
├── favicon.ico / .png     # App icons
└── LICENSE                # Apache 2.0
```

---

## Walkthrough

Decision OS includes a built-in **interactive walkthrough** that covers:

1. **The Hub** — How to navigate between executive portals
2. **Storytelling Cards** — How to read the narrative-first design
3. **Scenario Engines** — How to toggle Bear/Base/Bull and what changes
4. **Cost of Inaction** — How to read the dollar cost of delay
5. **Cross-Portal Intelligence** — How portals reference each other
6. **Decision Playbooks** — How to follow structured decision flows

Click **"Take the Tour"** on any portal to start.

---

## Data Model

The system runs on JSON data files. To customize for your company:

| File | Purpose |
|------|---------|
| `company.json` | Company name, ARR, employees, customers, scenarios, board metrics |
| `financials.json` | MRR, burn rate, runway, cash on hand, margins |
| `pipeline.json` | Deal stages, values, probabilities, close dates |
| `revenue-trend.json` | Monthly revenue by segment with targets |
| `revenue-mix.json` | Revenue breakdown (new, expansion, renewal, churn) |
| `accounts.json` | Customer accounts with health scores, tier, ARR |
| `alerts.json` | Active alerts with severity, portal, and action items |

---

## Customization

### Adding a New Portal
1. Copy an existing portal (e.g., `dsl-ceo.html`)
2. Update the role, metrics, and storytelling cards
3. Add route handling in `server.js` under `/api/portals/:id/metrics`
4. Register the user's portal access in `auth.js`

### Adding a New Scenario
Edit `company.json` → `scenarios` object. Add your scenario type and update `setScenario()` in `dss-core.js`.

### Changing Chart Types
Charts use Chart.js via CDN. Each `<canvas>` element uses `data-chart` and `data-chart-data` attributes for declarative chart rendering.

---

## Known Limitations

- **Auth is client-side** — Uses localStorage sessions. Not suitable for production without server-side auth (JWT, OAuth, etc.)
- **Data is file-based** — JSON files on disk. For production, connect to a database
- **No user management UI** — Users are hardcoded in `auth.js`. The admin panel has basic controls
- **Chart.js CDN dependency** — Charts fail if the CDN is unreachable (graceful fallback included)

---

## License

Licensed under the [Apache License 2.0](LICENSE).

---

## Built By

**ArcusSoft** — Decision Systems for SaaS Leaders
