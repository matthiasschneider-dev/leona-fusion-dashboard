# Quantum Manufacturing - Fusion Reactor Management System

A comprehensive efficiency calculator and management dashboard for nuclear fusion reactor assembly and installation planning. This application provides real-time monitoring, performance analytics, and maintenance scheduling for containerized fusion reactors (1-20 units).

## Features

- 📊 **Real-time Dashboard**: Monitor overall efficiency, power output, and system health across all reactors
- ⚛️ **Reactor Fleet Management**: Detailed view of individual reactor status, performance metrics, and operational parameters
- 📈 **Advanced Analytics**: Multi-dimensional performance comparison, efficiency trends, and ranking systems
- 🔧 **Maintenance Scheduling**: Track maintenance schedules, priorities, and operational status
- 📱 **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices
- 🎨 **Interactive Visualizations**: Rich charts and graphs using Recharts for data visualization
- 🔄 **Dynamic Reactor Configuration**: Adjust the number of active reactors (1-20) in real-time

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 (with HMR for fast development)
- **Styling**: Tailwind CSS 3 with custom color palette
- **Routing**: React Router v6
- **Charts & Visualization**: Recharts 2.10
- **State Management**: React Hooks (useState, useEffect)
- **Type Safety**: TypeScript with strict mode

## Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Navigation header with logo
│   │   ├── StatCard.tsx     # Metric display cards
│   │   ├── ReactorCard.tsx  # Individual reactor cards
│   │   └── ReactorDetailModal.tsx  # Detailed reactor view
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.tsx    # Main dashboard with metrics
│   │   ├── Reactors.tsx     # Reactor fleet management
│   │   ├── Analytics.tsx    # Advanced analytics and comparisons
│   │   └── Maintenance.tsx  # Maintenance scheduling
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Reactor, metrics, and schedule types
│   ├── utils/               # Utility functions
│   │   ├── mockData.ts      # Mock data generation
│   │   └── calculations.ts  # Efficiency and performance calculations
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles and Tailwind imports
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Setup Steps

1. **Navigate to the project directory**:
   ```bash
   cd /home/node/txai-projects/project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Verify environment variables** (optional):
   The `.env` file contains configuration for the company logo and branding:
   ```
   VITE_BASE_PATH=/
   VITE_COMPANY_NAME=Quantum Manufacturing
   VITE_COMPANY_LOGO=https://manufacturing.woodburn.digital/dx/api/dam/...
   ```

## Running the Application

### Development Mode

Start the Vite development server with hot module replacement:

```bash
mkdir -p /home/node/txai-projects/project/.logs && npm run dev -- --host 0.0.0.0 > /home/node/txai-projects/project/.logs/server.log 2>&1
```

The application will be available at:
- Local: `http://localhost:5173`
- Network: `http://<your-ip>:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

The optimized build will be output to the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Application Features

### Dashboard Page
- **Overall Efficiency Metrics**: Real-time efficiency percentage and trends
- **Power Output Monitoring**: Total power output across all reactors
- **Status Distribution**: Visual breakdown of reactor operational states
- **24-Hour Trend Analysis**: Line charts showing efficiency over time
- **Performance Comparison**: Bar charts comparing individual reactor metrics
- **Fuel Efficiency Calculations**: Total energy produced vs. fuel consumption

### Reactors Page
- **Fleet Overview**: Grid view of all active reactors
- **Status Filtering**: Filter reactors by operational status (operational, standby, maintenance, offline)
- **Dynamic Sorting**: Sort by efficiency, power output, uptime, or name
- **Detailed Views**: Click any reactor card to view comprehensive operational parameters
- **Real-time Metrics**: Temperature, pressure, plasma density, confinement time

### Analytics Page
- **Top Performers**: Ranking of the best-performing reactors
- **Scatter Plot Analysis**: Efficiency vs. power output with uptime correlation
- **Radar Chart Comparison**: Multi-dimensional comparison of top 5 reactors
- **Performance Rankings Table**: Complete sortable table with all performance metrics
- **Fuel Efficiency Analysis**: MWh per kg of fuel consumed

### Maintenance Page
- **Maintenance Schedule**: Complete calendar of upcoming maintenance events
- **Priority Management**: Color-coded priority levels (critical, high, medium, low)
- **Maintenance Types**: Routine maintenance, emergency repairs, and system upgrades
- **Active Maintenance Tracking**: Current reactors under maintenance
- **Duration Estimates**: Estimated hours for each maintenance task

## Mock Data System

The application uses a sophisticated mock data generator that creates realistic reactor data:

- **Reactor Parameters**:
  - Temperature: ~150 million Kelvin (fusion operating temperature)
  - Pressure: 0.5-2.5 atmospheres
  - Plasma Density: ~10²⁰ particles/m³
  - Confinement Time: 0.5-3.0 seconds
  - Power Output: Up to 980 MW per reactor

- **Performance Metrics**:
  - Efficiency: 85-98% for operational reactors
  - Uptime: 95-99.9% for healthy reactors
  - Fuel Consumption: 0.1-0.5 kg/day
  - Total Energy Produced: 50,000-200,000 MWh

- **Maintenance Scheduling**:
  - Routine maintenance every ~180 days
  - Emergency and upgrade schedules
  - Priority-based task management

## Design Highlights

### Color Palette
Custom Tailwind theme with quantum/fusion-inspired colors:
- **Quantum Blue**: Primary brand color (#1e40af)
- **Quantum Cyan**: Secondary accent (#06b6d4)
- **Quantum Purple**: Tertiary accent (#7c3aed)
- **Fusion Green**: Success/operational status (#10b981)
- **Fusion Orange**: Warning/maintenance status (#f97316)
- **Fusion Red**: Critical/offline status (#ef4444)

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Key UI Patterns
- Gradient backgrounds for visual depth
- Shadow and hover states for interactivity
- Status-based color coding for quick recognition
- Card-based layouts for information grouping
- Modal overlays for detailed views

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Performance Optimization

- Vite's fast HMR for instant updates during development
- Code splitting via dynamic imports
- Optimized production builds with tree shaking
- Responsive images and lazy loading
- Efficient React component rendering

## License

© 2024 Quantum Manufacturing. All rights reserved.

---

**Built by Leona** - Vibe coding Agent from HCL Software ✨
