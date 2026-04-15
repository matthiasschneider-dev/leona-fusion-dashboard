import { Reactor, EfficiencyMetrics, ComparisonMetrics } from '../types';

export function calculateEfficiencyMetrics(reactors: Reactor[]): EfficiencyMetrics {
  const activeReactors = reactors.filter(r => r.status === 'operational');
  const totalReactors = reactors.length;

  const totalPowerOutput = reactors.reduce((sum, r) => sum + r.powerOutput, 0);
  const totalEnergyProduced = reactors.reduce((sum, r) => sum + r.energyProduced, 0);
  const totalFuelConsumption = reactors.reduce((sum, r) => sum + r.fuelConsumption, 0);

  const averageEfficiency = reactors.length > 0
    ? reactors.reduce((sum, r) => sum + r.efficiency, 0) / reactors.length
    : 0;

  const averageUptime = reactors.length > 0
    ? reactors.reduce((sum, r) => sum + r.uptime, 0) / reactors.length
    : 0;

  // Simple trend calculation (could be enhanced with historical data)
  const highEfficiencyCount = reactors.filter(r => r.efficiency >= 90).length;
  const lowEfficiencyCount = reactors.filter(r => r.efficiency < 80).length;

  const efficiencyTrend: 'increasing' | 'stable' | 'decreasing' =
    highEfficiencyCount > totalReactors * 0.6 ? 'increasing' :
    lowEfficiencyCount > totalReactors * 0.3 ? 'decreasing' : 'stable';

  return {
    overallEfficiency: parseFloat(averageEfficiency.toFixed(2)),
    totalPowerOutput: parseFloat(totalPowerOutput.toFixed(2)),
    activeReactors: activeReactors.length,
    totalReactors,
    averageUptime: parseFloat(averageUptime.toFixed(2)),
    totalEnergyProduced: parseFloat(totalEnergyProduced.toFixed(2)),
    totalFuelConsumption: parseFloat(totalFuelConsumption.toFixed(3)),
    efficiencyTrend
  };
}

export function calculateComparisonMetrics(reactors: Reactor[]): ComparisonMetrics[] {
  return reactors.map(reactor => ({
    reactorId: reactor.id,
    name: reactor.name,
    efficiency: reactor.efficiency,
    powerOutput: reactor.powerOutput,
    uptime: reactor.uptime,
    fuelEfficiency: reactor.energyProduced / reactor.fuelConsumption
  })).sort((a, b) => b.efficiency - a.efficiency);
}

export function calculatePowerToWeightRatio(powerOutput: number, assumedWeight: number = 500): number {
  // Assumed weight in tons for a containerized reactor
  return parseFloat((powerOutput / assumedWeight).toFixed(2));
}

export function calculateFuelEfficiency(energyProduced: number, fuelConsumed: number): number {
  return parseFloat((energyProduced / fuelConsumed).toFixed(2));
}

export function calculateROI(
  energyProduced: number,
  energyPrice: number = 100, // $/MWh
  operatingCost: number = 50000 // $ per day
): number {
  const revenue = energyProduced * energyPrice;
  const roi = ((revenue - operatingCost) / operatingCost) * 100;
  return parseFloat(roi.toFixed(2));
}

export function predictMaintenanceDate(
  lastMaintenanceDate: string,
  uptimePercentage: number,
  efficiency: number
): string {
  const lastMaintenance = new Date(lastMaintenanceDate);

  // Base interval is 180 days, adjusted by uptime and efficiency
  const baseInterval = 180;
  const uptimeFactor = uptimePercentage / 100;
  const efficiencyFactor = efficiency / 100;

  const adjustedInterval = baseInterval * uptimeFactor * efficiencyFactor;
  const nextDate = new Date(lastMaintenance.getTime() + adjustedInterval * 24 * 60 * 60 * 1000);

  return nextDate.toISOString().split('T')[0];
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'operational':
      return 'text-fusion-green';
    case 'standby':
      return 'text-quantum-cyan';
    case 'maintenance':
      return 'text-fusion-orange';
    case 'offline':
      return 'text-fusion-red';
    default:
      return 'text-gray-500';
  }
}

export function getStatusBgColor(status: string): string {
  switch (status) {
    case 'operational':
      return 'bg-fusion-green';
    case 'standby':
      return 'bg-quantum-cyan';
    case 'maintenance':
      return 'bg-fusion-orange';
    case 'offline':
      return 'bg-fusion-red';
    default:
      return 'bg-gray-500';
  }
}

export function getEfficiencyColor(efficiency: number): string {
  if (efficiency >= 90) return 'text-fusion-green';
  if (efficiency >= 80) return 'text-quantum-cyan';
  if (efficiency >= 70) return 'text-fusion-orange';
  return 'text-fusion-red';
}

export function formatNumber(num: number, decimals: number = 2): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function formatLargeNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}
