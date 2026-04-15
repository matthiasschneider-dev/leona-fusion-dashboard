import { Reactor, TimeSeriesData, MaintenanceSchedule } from '../types';

const REACTOR_NAMES = [
  'Helios Alpha', 'Helios Beta', 'Helios Gamma', 'Helios Delta',
  'Tokamak Prime', 'Tokamak Secondary', 'Stellarator X1', 'Stellarator X2',
  'Fusion Core A', 'Fusion Core B', 'Plasma Ring 1', 'Plasma Ring 2',
  'Ignition Unit 1', 'Ignition Unit 2', 'Confinement Cell A', 'Confinement Cell B',
  'Energy Matrix 1', 'Energy Matrix 2', 'Quantum Reactor Q1', 'Quantum Reactor Q2'
];

const STATUS_OPTIONS: Array<'operational' | 'maintenance' | 'offline' | 'standby'> = [
  'operational', 'operational', 'operational', 'operational', 'operational',
  'operational', 'standby', 'maintenance'
];

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

export function generateReactor(containerNumber: number): Reactor {
  const status = STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)];
  const baseEfficiency = status === 'operational' ? randomInRange(85, 98) :
                        status === 'standby' ? randomInRange(40, 60) :
                        status === 'maintenance' ? randomInRange(20, 40) : 0;

  const installationDate = randomDate(new Date(2020, 0, 1), new Date(2023, 11, 31));
  const lastMaintenance = randomDate(new Date(2023, 6, 1), new Date(2024, 0, 1));
  const nextMaintenance = randomDate(new Date(2024, 2, 1), new Date(2024, 11, 31));

  return {
    id: `reactor-${containerNumber}`,
    name: REACTOR_NAMES[containerNumber - 1],
    status,
    efficiency: parseFloat(baseEfficiency.toFixed(2)),
    powerOutput: parseFloat((baseEfficiency * 10).toFixed(2)), // Max 980 MW
    temperature: parseFloat((150000000 + randomInRange(-10000000, 10000000)).toFixed(0)), // ~150M Kelvin
    pressure: parseFloat(randomInRange(0.5, 2.5).toFixed(2)), // Atmospheres
    plasmaDensity: parseFloat((1e20 + randomInRange(-1e19, 1e19)).toFixed(2)),
    confinementTime: parseFloat(randomInRange(0.5, 3.0).toFixed(2)),
    installationDate,
    lastMaintenanceDate: lastMaintenance,
    nextMaintenanceDate: nextMaintenance,
    fuelConsumption: parseFloat(randomInRange(0.1, 0.5).toFixed(3)), // kg/day
    energyProduced: parseFloat((randomInRange(50000, 200000)).toFixed(2)), // MWh total
    uptime: parseFloat((status === 'operational' ? randomInRange(95, 99.9) :
                       status === 'standby' ? randomInRange(50, 70) :
                       status === 'maintenance' ? randomInRange(10, 30) : 0).toFixed(2)),
    containerNumber
  };
}

export function generateReactors(count: number): Reactor[] {
  const reactors: Reactor[] = [];
  for (let i = 1; i <= count; i++) {
    reactors.push(generateReactor(i));
  }
  return reactors;
}

export function generateTimeSeriesData(hours: number = 24): TimeSeriesData[] {
  const data: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      timestamp: timestamp.toISOString(),
      efficiency: parseFloat(randomInRange(85, 98).toFixed(2)),
      powerOutput: parseFloat(randomInRange(8000, 9500).toFixed(2)),
      temperature: parseFloat((150000000 + randomInRange(-5000000, 5000000)).toFixed(0))
    });
  }

  return data;
}

export function generateMaintenanceSchedule(reactors: Reactor[]): MaintenanceSchedule[] {
  const schedules: MaintenanceSchedule[] = [];
  const types: Array<'routine' | 'emergency' | 'upgrade'> = ['routine', 'routine', 'routine', 'emergency', 'upgrade'];
  const priorities: Array<'low' | 'medium' | 'high' | 'critical'> = ['low', 'medium', 'medium', 'high', 'critical'];

  reactors.forEach(reactor => {
    if (Math.random() > 0.6) { // 40% chance of having a scheduled maintenance
      const type = types[randomInt(0, types.length - 1)];
      const priority = type === 'emergency' ? 'critical' :
                      type === 'upgrade' ? priorities[randomInt(1, 3)] :
                      priorities[randomInt(0, 2)];

      schedules.push({
        reactorId: reactor.id,
        reactorName: reactor.name,
        scheduledDate: randomDate(new Date(2024, 2, 1), new Date(2024, 8, 30)),
        type,
        estimatedDuration: type === 'routine' ? randomInt(4, 12) :
                          type === 'emergency' ? randomInt(24, 72) :
                          randomInt(48, 168),
        priority
      });
    }
  });

  return schedules.sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());
}

export function recalculateReactorData(reactor: Reactor, updates: Partial<Reactor>): Reactor {
  const updated = { ...reactor, ...updates };

  // Recalculate dependent values
  if (updates.efficiency !== undefined) {
    updated.powerOutput = parseFloat((updates.efficiency * 10).toFixed(2));
  }

  if (updates.status !== undefined) {
    if (updates.status === 'offline') {
      updated.efficiency = 0;
      updated.powerOutput = 0;
      updated.uptime = 0;
    } else if (updates.status === 'maintenance') {
      updated.efficiency = randomInRange(20, 40);
      updated.powerOutput = updated.efficiency * 10;
      updated.uptime = randomInRange(10, 30);
    }
  }

  return updated;
}
