import { useState, useEffect } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Reactor } from '../types';
import { generateReactors } from '../utils/mockData';
import { calculateComparisonMetrics, formatNumber } from '../utils/calculations';

const Analytics = () => {
  const [reactorCount, setReactorCount] = useState(15);
  const [reactors, setReactors] = useState<Reactor[]>([]);

  useEffect(() => {
    setReactors(generateReactors(reactorCount));
  }, [reactorCount]);

  const comparisonMetrics = calculateComparisonMetrics(reactors);

  // Prepare scatter data for efficiency vs power output
  const scatterData = reactors.map(r => ({
    x: r.efficiency,
    y: r.powerOutput,
    z: r.uptime,
    name: r.name,
    status: r.status,
  }));

  // Top 5 performers
  const topPerformers = comparisonMetrics.slice(0, 5);

  // Radar chart data for top 5
  const radarData = [
    { metric: 'Efficiency', ...Object.fromEntries(topPerformers.map((r, i) => [`reactor${i}`, r.efficiency])) },
    { metric: 'Power', ...Object.fromEntries(topPerformers.map((r, i) => [`reactor${i}`, (r.powerOutput / 10)])) },
    { metric: 'Uptime', ...Object.fromEntries(topPerformers.map((r, i) => [`reactor${i}`, r.uptime])) },
    { metric: 'Fuel Eff.', ...Object.fromEntries(topPerformers.map((r, i) => [`reactor${i}`, Math.min(r.fuelEfficiency / 5000, 100)])) },
  ];

  const radarColors = ['#1e40af', '#10b981', '#7c3aed', '#f97316', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
            <p className="text-gray-600 mt-1">Deep performance insights and comparative analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Analyze Reactors:</label>
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

      {/* Top Performers */}
      <div className="bg-gradient-to-r from-quantum-blue to-quantum-purple rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">🏆 Top 5 Performing Reactors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topPerformers.map((reactor, index) => (
            <div key={reactor.reactorId} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold">#{index + 1}</span>
                <span className="text-2xl">🔥</span>
              </div>
              <h4 className="font-bold text-sm mb-2">{reactor.name}</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="opacity-80">Efficiency:</span>
                  <span className="font-bold">{reactor.efficiency}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Power:</span>
                  <span className="font-bold">{formatNumber(reactor.powerOutput, 0)} MW</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Uptime:</span>
                  <span className="font-bold">{reactor.uptime}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Efficiency vs Power Output Scatter */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Efficiency vs Power Output Analysis</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                type="number"
                dataKey="x"
                name="Efficiency"
                unit="%"
                stroke="#6b7280"
                label={{ value: 'Efficiency (%)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                type="number"
                dataKey="y"
                name="Power Output"
                unit=" MW"
                stroke="#6b7280"
                label={{ value: 'Power Output (MW)', angle: -90, position: 'insideLeft' }}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} name="Uptime" unit="%" />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                formatter={(value: any, name: string) => {
                  if (name === 'Efficiency') return [`${value}%`, name];
                  if (name === 'Power Output') return [`${value} MW`, name];
                  if (name === 'Uptime') return [`${value}%`, name];
                  return [value, name];
                }}
              />
              <Legend />
              <Scatter
                name="Reactors"
                data={scatterData}
                fill="#7c3aed"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Bubble size represents uptime percentage
          </p>
        </div>

        {/* Radar Comparison */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top 5 Multi-Dimensional Comparison</h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
              <Legend />
              {topPerformers.map((reactor, index) => (
                <Radar
                  key={reactor.reactorId}
                  name={reactor.name}
                  dataKey={`reactor${index}`}
                  stroke={radarColors[index]}
                  fill={radarColors[index]}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Complete Performance Rankings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reactor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Efficiency
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Power Output
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fuel Efficiency
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {comparisonMetrics.map((reactor, index) => (
                <tr key={reactor.reactorId} className={index < 5 ? 'bg-green-50' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reactor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${
                      reactor.efficiency >= 90 ? 'text-fusion-green' :
                      reactor.efficiency >= 80 ? 'text-quantum-cyan' :
                      reactor.efficiency >= 70 ? 'text-fusion-orange' : 'text-fusion-red'
                    }`}>
                      {reactor.efficiency}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(reactor.powerOutput, 0)} MW
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-semibold ${
                      reactor.uptime >= 95 ? 'text-fusion-green' : 'text-fusion-orange'
                    }`}>
                      {reactor.uptime}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatNumber(reactor.fuelEfficiency, 0)} MWh/kg
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
