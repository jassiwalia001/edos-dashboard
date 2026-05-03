# EDOS Operational Dashboard

> A decision-focused dashboard for energy operators. Not a data display tool—a system built to help operators think.

## 🎯 The Problem

Energy operators face information overload. Traditional dashboards show everything. EDOS delivers **decisions**, not data.

**Operators need to answer:**
- Where is money being made or lost?
- Which sites/assets need attention right now?
- Are EVs and batteries operating optimally?
- Is anything about to fail?

## Our Mental Model

We designed around **how operators think**, not how data engineers organize databases.

**3 Core Insights:**
1. **Operators don't have time for exploration** → Critical alerts surface immediately
2. **Context matters more than completeness** → Show only what explains the problem
3. **Operations connect to revenue** → Every action has a dollar impact

## The 4 Operator Journeys

| Page | Route | Question | Features |
|------|-------|----------|----------|
| **Overview** | `/` | What needs attention? | Alerts, metrics, site grid |
| **Site Detail** | `/site/:id` | What's wrong here? | Asset status, revenue, efficiency |
| **Charging** | `/charging` | How efficient are EVs? | Sessions, utilization, analytics |
| **Revenue** | `/revenue` | Where's the money? | Revenue breakdown, recommendations |

## Project Structure

```
src/app/
├── components/          (5 reusable components)
│   ├── header/         Navigation
│   ├── alert-panel/    Dismissible alerts
│   ├── asset-card/     Metric cards
│   ├── site-grid/      Site grid
│   └── revenue-chart/  Data visualization
├── pages/              (4 operator workflows)
│   ├── overview/
│   ├── site-detail/
│   ├── charging-sessions/
│   └── revenue-analytics/
└── services/
    └── mock-data.service.ts
```

## 🚀 Quick Start

```bash
npm install
npm start
# Open http://localhost:4200
```

**Navigate using header buttons:**
- Dashboard → Overview page (alerts, metrics, sites)
- Battery → Site detail page (select a site)
- Charging → Active EV sessions
- Revenue → Revenue breakdown by source

## 🎨 Design Philosophy

### ✅ What I Prioritized
- **Alert-first design** - Red alerts demand immediate action
- **Workflow-driven navigation** - Each page answers one question
- **Revenue connection** - Every metric ties to business impact
- **Real-time ready** - Built for live data integration
- **Responsive design** - Works on desktop, tablet, mobile

## 💡 Design Trade-Offs

| Included | Omitted | Why |
|----------|---------|-----|
| Real-time metrics | Historical trends | Operators decide in minutes |
| Alert prioritization | Detailed forecasting | Time is constrained |
| Revenue context | Customer billing | Out of scope |
| Responsive layout | Advanced filtering | Keep it simple |
| Material Design | Custom styling | Professional + accessible |

## 🛠️ Technology Stack

- **Angular 21** - Modern standalone components
- **TypeScript 5.9** - Strict mode for reliability
- **Material Design 21** - Professional UI components
- **Tailwind CSS** - Responsive design
- **Chart.js** - Data visualization (ready to use)
- **RxJS** - Reactive state management

## Real-World Operator Workflow

**7:00 AM - Shift Starts**
1. Open EDOS overview
2. Scan critical alerts (red = problems)
3. See: "BESS #2 at 18% → revenue loss risk"

**7:05 AM - Investigate**
4. Click site detail
5. Confirm: BESS underperforming, PV not dispatched

**7:10 AM - Decide**
6. Check revenue analytics
7. Decision: Trigger BESS discharge to capture arbitrage
8. Return to overview to monitor

**Result:** One informed decision in <10 minutes.

## Integration Ready

The dashboard uses mock data now. To integrate real APIs:

## 📝 Next Steps for Development

1. **Real API integration** - Replace MockDataService
2. **WebSocket for real-time** - Live telemetry updates
3. **User authentication** - Login & role-based access
4. **Historical analytics** - Separate "Reports" section
5. **Admin panel** - Site configuration
