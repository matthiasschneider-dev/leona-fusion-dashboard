import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Reactor } from '../types';
import { generateReactors, generateTimeSeriesData } from '../utils/mockData';
import { calculateEfficiencyMetrics, formatNumber } from '../utils/calculations';

const Dashboard = () => {
  const [reactorCount, setReactorCount] = useState(10);
  const [reactors, setReactors] = useState<Reactor[]>([]);
  const [timeSeriesData, setTimeSeriesData] = useState(generateTimeSeriesData(24));

  useEffect(() => {
    setReactors(generateReactors(reactorCount));
  }, [reactorCount]);

  const metrics = calculateEfficiencyMetrics(reactors);

  const statusData = [
    { name: 'Operational', value: reactors.filter(r => r.status === 'operational').length, color: '#10b981' },
    { name: 'Standby', value: reactors.filter(r => r.status === 'standby').length, color: '#06b6d4' },
    { name: 'Maintenance', value: reactors.filter(r => r.status === 'maintenance').length, color: '#f97316' },
    { name: 'Offline', value: reactors.filter(r => r.status === 'offline').length, color: '#ef4444' },
  ];

  const efficiencyDistribution = reactors.map(r => ({
    name: r.name,
    efficiency: r.efficiency,
    power: r.powerOutput,
  }));

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fusion Reactor Dashboard</h2>
            <p className="text-gray-600 mt-1">Real-time monitoring and efficiency analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              Active Reactors:
            </label>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Overall Efficiency"
          value={metrics.overallEfficiency}
          unit="%"
          color="green"
          trend={metrics.efficiencyTrend === 'increasing' ? 'up' : metrics.efficiencyTrend === 'decreasing' ? 'down' : 'stable'}
          trendValue={metrics.efficiencyTrend}
        />
        <StatCard
          title="Total Power Output"
          value={formatNumber(metrics.totalPowerOutput, 0)}
          unit="MW"
          color="purple"
        />
        <StatCard
          title="Active Reactors"
          value={`${metrics.activeReactors}/${metrics.totalReactors}`}
          color="blue"
        />
        <StatCard
          title="Average Uptime"
          value={metrics.averageUptime}
          unit="%"
          color="cyan"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency Over Time */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Efficiency Trend (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => new Date(value).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                stroke="#6b7280"
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                labelFormatter={(value) => new Date(value).toLocaleString()}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
              />
              <Legend />
              <Line type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Reactor Status Distribution */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Reactor Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        {/* Efficiency by Reactor */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Reactor Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={efficiencyDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} stroke="#6b7280" />
              <YAxis yAxisId="left" orientation="left" stroke="#10b981" label={{ value: 'Efficiency %', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" stroke="#7c3aed" label={{ value: 'Power (MW)', angle: 90, position: 'insideRight' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="efficiency" fill="#10b981" name="Efficiency %" />
              <Bar yAxisId="right" dataKey="power" fill="#7c3aed" name="Power Output (MW)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Total Energy Produced</h4>
          <p className="text-3xl font-bold text-quantum-blue">{formatNumber(metrics.totalEnergyProduced, 0)}</p>
          <p className="text-sm text-gray-600 mt-1">MWh</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-xl p-6 border border-green-200">
          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Total Fuel Consumption</h4>
          <p className="text-3xl font-bold text-fusion-green">{formatNumber(metrics.totalFuelConsumption, 2)}</p>
          <p className="text-sm text-gray-600 mt-1">kg/day</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <h4 className="text-sm font-semibold text-gray-600 uppercase mb-2">Fuel Efficiency</h4>
          <p className="text-3xl font-bold text-quantum-purple">
            {formatNumber(metrics.totalEnergyProduced / metrics.totalFuelConsumption, 0)}
          </p>
          <p className="text-sm text-gray-600 mt-1">MWh/kg</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
