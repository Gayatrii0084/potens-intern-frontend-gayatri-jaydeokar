# Potens Frontend Internship Assignment

## Operations Management Dashboard

A responsive operations management dashboard built for the Potens Frontend Internship Assignment.

The dashboard is designed for senior operators monitoring area-wise municipal operations in Pune. It centralizes pending action items, priority cases, system anomalies, operational decisions, and escalation contacts, so an operator can quickly see what needs attention and act on it.

## Features

### Login and Role-Based Access

A login interface lets an operator access the dashboard based on their selected role and operational context. Once logged in, the dashboard shows:

- Operator name
- Role
- Assigned operational area
- Department context

This implementation demonstrates the frontend access flow using local application data.

### Today's Action Items

The main action panel surfaces operational issues that need attention. Each item includes:

- Priority level
- Issue title and description
- Current status
- Approve / Hold actions

Issues are grouped into High, Medium, and Low priority so urgent cases stand out immediately.

### Area-Based Operations

The dashboard is structured around area-wise responsibility rather than a flat, city-wide issue list. The current prototype covers:

- Karve Nagar
- Paud Road
- Kothrud
- DP Road

This lets a senior operator focus on the areas they're actually responsible for.

### Area Operations Summary

A compact overview of activity across areas, showing:

- Area name
- Pending issues
- High-priority cases
- Assigned operator
- Current status

Helps identify which locations need immediate attention at a glance.

### System Anomalies

Displays unusual operational patterns flagged by the monitoring system, each with a title, description, severity level, and detection time. Example anomalies in the prototype include repeated drainage complaints, spikes in pothole reports, delayed road repairs, contractor progress delays, and inspection mismatches.

### Escalation Contacts

Quick access to internal escalation contacts for Ward Operations, Field Engineering, and Contractor Coordination — each with responsibility, extension number, and availability status.

### Review Deadline

A reminder component that keeps time-sensitive, pending cases visible so nothing slips past its review window.

### Keyboard Accessibility

The action workflow supports:

- Keyboard navigation between action items
- Keyboard-accessible action controls
- Visible focus states
- Enter/Space interaction where applicable

Added so repeated operational workflows don't have to depend entirely on a mouse.

### Multilingual Support

English and Marathi language support, to better fit a regional working environment.

## Tech Stack

React · Vite · JavaScript · JSX · Tailwind CSS · HTML5 · CSS · Git · GitHub

## How to Run the Project

### Prerequisites

- Node.js
- npm
- Git

### Setup

```bash
git clone https://github.com/Gayatrii0084/potens-intern-frontend-gayatri-jaydeokar
cd potens-intern-frontend
npm install
npm run dev
```

Vite will print the local dev URL in the terminal — typically `http://localhost:5173`.

### Production Build

```bash
npm run build
```

## Design Decisions

### Action-First Information Hierarchy

The Action Items panel gets the highest visual priority, since reviewing and responding to pending issues is the operator's core task. Supporting context — anomalies, escalation contacts, review deadlines, area summaries — is arranged around that main workflow rather than competing with it.

### Area-Based Operational Structure

Issues are tied to specific Pune areas instead of shown as one undifferentiated list, which keeps responsibility and clarity at the area level.

### Priority-Based Visual Hierarchy

Issues are tagged High, Medium, or Low priority with clear visual indicators, so urgent cases are identifiable at a glance. The hierarchy emphasizes priority → issue details → status → required action, in that order.

### Compact Operational Layout

The layout is intentionally dense rather than spacious — operators need to scan multiple issues quickly, so the design avoids excess white space and decorative elements that would push content below the fold.

### Responsive Action Item Layout

The Action Items component is structured for larger screens and adapts at narrower widths, to keep priority tags, descriptions, status, and action buttons from overlapping or overflowing. That said, a few edge cases at very narrow widths (roughly sub-360px) still show minor spacing tightness — noted under Known Limitations below.

### Accessibility

Keyboard navigation and visible focus states were added on the assumption that an operations dashboard gets used repeatedly through a shift, alongside standard mouse controls.

### Restrained Visual Design

No heavy gradients, glass effects, large decorative icons, or animation — the goal was a focused operational tool, not a marketing dashboard.

## Project Structure

```text
src/
├── assets/
├── Components/
│   ├── ActionPanel.jsx
│   ├── AnomalyPanel.jsx
│   ├── AreaOperationsSummary.jsx
│   ├── EscalationContacts.jsx
│   ├── Header.jsx
│   ├── KpiSummary.jsx
│   ├── Livemetric.jsx
│   ├── LoginPage.jsx
│   └── OperatorContextBar.jsx
├── accessCodes.js
├── App.css
├── App.jsx
├── index.css
├── main.jsx
└── mockData.js
```

Split into reusable components so each dashboard responsibility can be maintained independently.

## Known Limitations and Unfinished Work

This is a frontend prototype. Known gaps:

- Authentication isn't connected to a production backend.
- Operational data is local/mock data, not a live source.
- Approve/Hold actions aren't persisted to a database.
- System anomalies use demonstration data, not a live detection service.
- Area assignments aren't tied to a production operator management system.
- Real-time operational notifications aren't implemented.
- Review deadlines aren't synced with a backend scheduling service.
- Multilingual support could extend to more dynamic content.
- Operator actions aren't stored in a permanent audit history.
- Minor layout tightness on very narrow viewports (sub-360px) in the Action Items row — functional, but could be more polished.

These are documented to be clear about where this prototype ends and a production system would begin.

## What I Would Build Next

**Backend integration** — connect action items, operators, areas, anomalies, and decisions to real APIs and persistent storage.

**Secure authentication and authorization** — role-based access for senior operators, ward operators, field engineers, contractor coordinators, and administrators.

**Real-time operational updates** — live updates on new complaints, anomalies, or status changes, instead of manual refreshes.

**Interactive Pune operations map** — active issues, priority hotspots, area boundaries, issue density, and status, for geographic context.

**Complete audit trail** — who approved or held an action, when, escalation history, reassignment history, and status changes.

**Advanced filtering and search** — by area, priority, status, category, operator, and time range.

**Operational analytics** — average resolution time, area-wise backlog, recurrence rate, operator workload, SLA compliance, contractor performance.

## AI Use Log

AI tools were used as productivity, implementation, debugging, and documentation assistants. All suggestions were reviewed and adapted before being integrated.

Antigravity: Used with free-tier prompt limits, approximately 10 to 15 prompts. Used for initial project setup, dashboard structure, and early frontend implementation.

Cursor: Used with free-tier prompt limits, approximately 15 to 25 prompts. Used to modify the existing React codebase, implement the login flow, add operator and area-based functionality, improve dashboard layout, fix responsive behavior, update the favicon, and refine accessibility.

ChatGPT: Used with free-tier message limits, approximately 40 to 60 messages. Used for requirement analysis, dashboard structure planning, React guidance, prompt creation for implementation tasks, responsive layout debugging, Git configuration and commit attribution troubleshooting, commit workflow guidance, and README documentation.

### AI-Assisted Development Areas

- Planning the dashboard information hierarchy
- Developing and refining frontend components
- Improving responsive behavior
- Debugging layout and alignment issues
- Improving the Action Items component at narrower screen widths
- Planning area-based operator functionality
- Improving keyboard accessibility
- Troubleshooting Git configuration and repository workflow
- Structuring and reviewing project documentation

All suggestions were reviewed, tested, and adapted to fit the assignment requirements and existing project structure.
