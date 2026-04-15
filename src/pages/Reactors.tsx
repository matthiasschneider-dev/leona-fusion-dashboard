import { useState, useEffect } from 'react';
import ReactorCard from '../components/ReactorCard';
import ReactorDetailModal from '../components/ReactorDetailModal';
import { Reactor } from '../types';
import { generateReactors } from '../utils/mockData';

const Reactors = () => {
  const [reactorCount, setReactorCount] = useState(10);
  const [reactors, setReactors] = useState<Reactor[]>([]);
  const [selectedReactor, setSelectedReactor] = useState<Reactor | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'efficiency' | 'power' | 'uptime'>('efficiency');

  useEffect(() => {
    setReactors(generateReactors(reactorCount));
  }, [reactorCount]);

  const filteredAndSortedReactors = reactors
    .filter(reactor => filterStatus === 'all' || reactor.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'efficiency':
          return b.efficiency - a.efficiency;
        case 'power':
          return b.powerOutput - a.powerOutput;
        case 'uptime':
          return b.uptime - a.uptime;
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reactor Fleet Management</h2>
            <p className="text-gray-600 mt-1">Monitor and manage all containerized reactors</p>
          </div>
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-gray-700">Reactors:</label>
            <select
              value={reactorCount}
              onChange={(e) => setReactorCount(Number(e.target.value))}
              className="px-3 py-2 border-2 border-quantum-blue rounded-lg font-semibold text-quantum-blue focus:outline-none focus:ring-2 focus:ring-quantum-purple"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'all'
                    ? 'bg-quantum-blue text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({reactors.length})
              </button>
              <button
                onClick={() => setFilterStatus('operational')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'operational'
                    ? 'bg-fusion-green text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Operational ({reactors.filter(r => r.status === 'operational').length})
              </button>
              <button
                onClick={() => setFilterStatus('standby')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'standby'
                    ? 'bg-quantum-cyan text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Standby ({reactors.filter(r => r.status === 'standby').length})
              </button>
              <button
                onClick={() => setFilterStatus('maintenance')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'maintenance'
                    ? 'bg-fusion-orange text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Maintenance ({reactors.filter(r => r.status === 'maintenance').length})
              </button>
              <button
                onClick={() => setFilterStatus('offline')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === 'offline'
                    ? 'bg-fusion-red text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Offline ({reactors.filter(r => r.status === 'offline').length})
              </button>
            </div>
          </div>

          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'efficiency' | 'power' | 'uptime')}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-quantum-blue"
            >
              <option value="efficiency">Efficiency</option>
              <option value="power">Power Output</option>
              <option value="uptime">Uptime</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reactor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedReactors.map(reactor => (
          <ReactorCard
            key={reactor.id}
            reactor={reactor}
            onClick={() => setSelectedReactor(reactor)}
          />
        ))}
      </div>

      {filteredAndSortedReactors.length === 0 && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No reactors match the selected filter.</p>
        </div>
      )}

      {/* Detail Modal */}
      <ReactorDetailModal
        reactor={selectedReactor}
        onClose={() => setSelectedReactor(null)}
      />
    </div>
  );
};

export default Reactors;
