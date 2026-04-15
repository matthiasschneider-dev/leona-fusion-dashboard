import { useState, useEffect } from 'react';
import { Reactor, MaintenanceSchedule } from '../types';
import { generateReactors, generateMaintenanceSchedule } from '../utils/mockData';

const Maintenance = () => {
  const [reactorCount, setReactorCount] = useState(12);
  const [reactors, setReactors] = useState<Reactor[]>([]);
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);

  useEffect(() => {
    const newReactors = generateReactors(reactorCount);
    setReactors(newReactors);
    setSchedules(generateMaintenanceSchedule(newReactors));
  }, [reactorCount]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-fusion-red text-white';
      case 'high': return 'bg-fusion-orange text-white';
      case 'medium': return 'bg-quantum-cyan text-white';
      case 'low': return 'bg-gray-400 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'routine': return '🔧';
      case 'emergency': return '🚨';
      case 'upgrade': return '⚡';
      default: return '🔧';
    }
  };

  const sortedSchedules = [...schedules].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const maintenanceReactors = reactors.filter(r => r.status === 'maintenance');
  const upcomingMaintenance = schedules.filter(s => new Date(s.scheduledDate) > new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Maintenance Management</h2>
            <p className="text-gray-600 mt-1">Schedule and track reactor maintenance operations</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Total Reactors:</label>
            <select
              value={reactorCount}
              onChange={(e) => setReactorCount(Number(e.target.value))}
              className="px-4 py-2 border-2 border-quantum-blue rounded-lg font-semibold text-quantum-blue focus:outline-none focus:ring-2 focus:ring-quantum-purple"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-fusion-orange to-orange-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 uppercase font-semibold">In Maintenance</p>
              <p className="text-4xl font-bold mt-2">{maintenanceReactors.length}</p>
              <p className="text-sm opacity-90 mt-1">Reactors</p>
            </div>
            <div className="text-5xl opacity-30">🔧</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-quantum-purple to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 uppercase font-semibold">Upcoming</p>
              <p className="text-4xl font-bold mt-2">{upcomingMaintenance.length}</p>
              <p className="text-sm opacity-90 mt-1">Scheduled</p>
            </div>
            <div className="text-5xl opacity-30">📅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-fusion-red to-red-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 uppercase font-semibold">Critical Priority</p>
              <p className="text-4xl font-bold mt-2">
                {schedules.filter(s => s.priority === 'critical').length}
              </p>
              <p className="text-sm opacity-90 mt-1">Items</p>
            </div>
            <div className="text-5xl opacity-30">🚨</div>
          </div>
        </div>
      </div>

      {/* Current Maintenance */}
      {maintenanceReactors.length > 0 && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200">
            <h3 className="text-lg font-bold text-gray-900">⚙️ Currently Under Maintenance</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {maintenanceReactors.map(reactor => (
                <div key={reactor.id} className="bg-orange-50 border-2 border-fusion-orange rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{reactor.name}</h4>
                      <p className="text-sm text-gray-600">Container #{reactor.containerNumber}</p>
                    </div>
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Maintenance:</span>
                      <span className="font-semibold text-gray-900">{reactor.lastMaintenanceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Next Scheduled:</span>
                      <span className="font-semibold text-gray-900">{reactor.nextMaintenanceDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Status:</span>
                      <span className="font-bold text-fusion-orange">{reactor.efficiency}% Capacity</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Schedule */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-blue-200">
          <h3 className="text-lg font-bold text-gray-900">📋 Maintenance Schedule</h3>
          <p className="text-sm text-gray-600 mt-1">Sorted by priority</p>
        </div>
        <div className="overflow-x-auto">
          {sortedSchedules.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reactor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Scheduled Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedSchedules.map((schedule, index) => {
                  const isPast = new Date(schedule.scheduledDate) < new Date();
                  return (
                    <tr key={index} className={isPast ? 'bg-gray-50 opacity-60' : 'hover:bg-blue-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPriorityColor(schedule.priority)}`}>
                          {schedule.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="flex items-center text-sm font-medium text-gray-900">
                          <span className="mr-2">{getTypeIcon(schedule.type)}</span>
                          {schedule.type.charAt(0).toUpperCase() + schedule.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {schedule.reactorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.scheduledDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {schedule.estimatedDuration} hours
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-xs font-semibold ${
                          isPast ? 'text-gray-500' : 'text-quantum-blue'
                        }`}>
                          {isPast ? 'COMPLETED' : 'SCHEDULED'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500">No maintenance scheduled at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-quantum-cyan p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">📖 Maintenance Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🔧</span>
              <h4 className="font-bold text-gray-900">Routine Maintenance</h4>
            </div>
            <p className="text-sm text-gray-700">Scheduled every 180 days for optimal performance and safety checks.</p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🚨</span>
              <h4 className="font-bold text-gray-900">Emergency Maintenance</h4>
            </div>
            <p className="text-sm text-gray-700">Immediate attention required for critical issues affecting reactor safety.</p>
          </div>
          <div>
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⚡</span>
              <h4 className="font-bold text-gray-900">System Upgrades</h4>
            </div>
            <p className="text-sm text-gray-700">Planned improvements to enhance efficiency and extend operational lifespan.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
