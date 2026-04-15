export interface Reactor {
  id: string;
  name: string;
  status: 'operational' | 'maintenance' | 'offline' | 'standby';
  efficiency: number; // Percentage 0-100
  powerOutput: number; // MW
  temperature: number; // Kelvin
  pressure: number; // Atmospheres
  plasmaDensity: number; // particles/m³
  confinementTime: number; // seconds
  installationDate: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  fuelConsumption: number; // kg/day
  energyProduced: number; // MWh total
  uptime: number; // percentage
  containerNumber: number; // 1-20
}

export interface EfficiencyMetrics {
  overallEfficiency: number;
  totalPowerOutput: number;
  activeReactors: number;
  totalReactors: number;
  averageUptime: number;
  totalEnergyProduced: number;
  totalFuelConsumption: number;
  efficiencyTrend: 'increasing' | 'stable' | 'decreasing';
}

export interface TimeSeriesData {
  timestamp: string;
  efficiency: number;
  powerOutput: number;
  temperature: number;
}

export interface MaintenanceSchedule {
  reactorId: string;
  reactorName: string;
  scheduledDate: string;
  type: 'routine' | 'emergency' | 'upgrade';
  estimatedDuration: number; // hours
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface ComparisonMetrics {
  reactorId: string;
  name: string;
  efficiency: number;
  powerOutput: number;
  uptime: number;
  fuelEfficiency: number;
}
