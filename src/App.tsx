import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Reactors from './pages/Reactors';
import Analytics from './pages/Analytics';
import Maintenance from './pages/Maintenance';

const basePath = import.meta.env.VITE_BASE_PATH || '/';

function App() {
  return (
    <BrowserRouter basename={basePath}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/reactors" element={<Reactors />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/maintenance" element={<Maintenance />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12 py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-600">
                  © {new Date().getFullYear()} {import.meta.env.VITE_COMPANY_NAME || 'Quantum Manufacturing'}. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Fusion Reactor Management System v1.0
                </p>
              </div>
              <div className="flex justify-center">
                <p className="text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-md shadow-lg border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 animate-pulse">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    ✨ Built by Leona - Vibe coding Agent from HCL Software
                  </span>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
