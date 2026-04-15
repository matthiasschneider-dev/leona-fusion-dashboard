import React from 'react';
import { Reactor } from '../types';
import { getStatusBgColor, getEfficiencyColor, formatNumber, formatLargeNumber } from '../utils/calculations';

interface ReactorDetailModalProps {
  reactor: Reactor | null;
  onClose: () => void;
}

const ReactorDetailModal: React.FC<ReactorDetailModalProps> = ({ reactor, onClose }) => {
  if (!reactor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-quantum-blue to-quantum-purple p-6 text-white rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold">{reactor.name}</h2>
              <p className="text-sm opacity-90 mt-1">Container #{reactor.containerNumber} • {reactor.id}</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusBgColor(reactor.status)} shadow-lg`}>
                {reactor.status.toUpperCase()}
              </span>
              <button
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Primary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-fusion-green/10 to-fusion-green/5 rounded-xl p-4 border border-fusion-green/20">
              <p className="text-sm text-gray-600 uppercase font-semibold">Efficiency</p>
              <p className={`text-4xl font-bold mt-2 ${getEfficiencyColor(reactor.efficiency)}`}>
                {reactor.efficiency}%
              </p>
            </div>
            <div className="bg-gradient-to-br from-quantum-purple/10 to-quantum-purple/5 rounded-xl p-4 border border-quantum-purple/20">
              <p className="text-sm text-gray-600 uppercase font-semibold">Power Output</p>
              <p className="text-4xl font-bold text-quantum-purple mt-2">
                {formatNumber(reactor.powerOutput, 0)}
              </p>
              <p className="text-sm text-gray-500">MW</p>
            </div>
            <div className="bg-gradient-to-br from-quantum-cyan/10 to-quantum-cyan/5 rounded-xl p-4 border border-quantum-cyan/20">
              <p className="text-sm text-gray-600 uppercase font-semibold">Uptime</p>
              <p className={`text-4xl font-bold mt-2 ${reactor.uptime >= 95 ? 'text-fusion-green' : 'text-fusion-orange'}`}>
                {reactor.uptime}%
              </p>
            </div>
          </div>

          {/* Operational Parameters */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Operational Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Temperature</span>
                <span className="text-gray-900 font-bold">{formatNumber(reactor.temperature / 1e6, 1)} M K</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Pressure</span>
                <span className="text-gray-900 font-bold">{reactor.pressure} atm</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Plasma Density</span>
                <span className="text-gray-900 font-bold">{formatLargeNumber(reactor.plasmaDensity)} /m³</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Confinement Time</span>
                <span className="text-gray-900 font-bold">{reactor.confinementTime} s</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Fuel Consumption</span>
                <span className="text-gray-900 font-bold">{reactor.fuelConsumption} kg/day</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Total Energy Produced</span>
                <span className="text-gray-900 font-bold">{formatNumber(reactor.energyProduced, 0)} MWh</span>
              </div>
            </div>
          </div>

          {/* Maintenance Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Maintenance Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Installation Date</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{reactor.installationDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Last Maintenance</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{reactor.lastMaintenanceDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Next Maintenance</p>
                <p className="text-lg font-bold text-quantum-purple mt-1">{reactor.nextMaintenanceDate}</p>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Efficiency Rating</span>
                  <span className="font-bold text-gray-900">{reactor.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      reactor.efficiency >= 90 ? 'bg-fusion-green' :
                      reactor.efficiency >= 80 ? 'bg-quantum-cyan' :
                      reactor.efficiency >= 70 ? 'bg-fusion-orange' : 'bg-fusion-red'
                    }`}
                    style={{ width: `${reactor.efficiency}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Uptime</span>
                  <span className="font-bold text-gray-900">{reactor.uptime}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${reactor.uptime >= 95 ? 'bg-fusion-green' : 'bg-fusion-orange'}`}
                    style={{ width: `${reactor.uptime}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-quantum-blue to-quantum-purple text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactorDetailModal;
