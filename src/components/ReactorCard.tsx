import React from 'react';
import { Reactor } from '../types';
import { getStatusColor, getStatusBgColor, getEfficiencyColor, formatNumber } from '../utils/calculations';

interface ReactorCardProps {
  reactor: Reactor;
  onClick?: () => void;
}

const ReactorCard: React.FC<ReactorCardProps> = ({ reactor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-quantum-blue overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{reactor.name}</h3>
            <p className="text-sm text-gray-500">Container #{reactor.containerNumber}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBgColor(reactor.status)} text-white`}>
              {reactor.status.toUpperCase()}
            </span>
            <span className="text-xs text-gray-500 mt-1">{reactor.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 uppercase">Efficiency</p>
            <p className={`text-2xl font-bold ${getEfficiencyColor(reactor.efficiency)}`}>
              {reactor.efficiency}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Power Output</p>
            <p className="text-2xl font-bold text-quantum-purple">
              {formatNumber(reactor.powerOutput, 0)} MW
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Temperature:</span>
            <span className="font-semibold text-gray-900">
              {formatNumber(reactor.temperature / 1e6, 1)}M K
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Uptime:</span>
            <span className={`font-semibold ${reactor.uptime >= 95 ? 'text-fusion-green' : 'text-fusion-orange'}`}>
              {reactor.uptime}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Confinement Time:</span>
            <span className="font-semibold text-gray-900">{reactor.confinementTime}s</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Next Maintenance</span>
            <span className="font-medium text-gray-700">{reactor.nextMaintenanceDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactorCard;
