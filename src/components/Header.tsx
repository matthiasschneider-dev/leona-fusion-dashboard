import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const logoUrl = import.meta.env.VITE_COMPANY_LOGO;
  const companyName = import.meta.env.VITE_COMPANY_NAME || 'Quantum Manufacturing';

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-quantum-blue via-quantum-purple to-quantum-cyan shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-4 group">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${companyName} Logo`}
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{companyName}</h1>
              <p className="text-sm text-gray-200">Fusion Reactor Management System</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'bg-white text-quantum-blue shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/reactors"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/reactors')
                  ? 'bg-white text-quantum-blue shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Reactors
            </Link>
            <Link
              to="/analytics"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/analytics')
                  ? 'bg-white text-quantum-blue shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Analytics
            </Link>
            <Link
              to="/maintenance"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/maintenance')
                  ? 'bg-white text-quantum-blue shadow-md'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Maintenance
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex space-x-1 overflow-x-auto">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              isActive('/')
                ? 'bg-white text-quantum-blue'
                : 'text-white bg-white/20'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/reactors"
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              isActive('/reactors')
                ? 'bg-white text-quantum-blue'
                : 'text-white bg-white/20'
            }`}
          >
            Reactors
          </Link>
          <Link
            to="/analytics"
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              isActive('/analytics')
                ? 'bg-white text-quantum-blue'
                : 'text-white bg-white/20'
            }`}
          >
            Analytics
          </Link>
          <Link
            to="/maintenance"
            className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              isActive('/maintenance')
                ? 'bg-white text-quantum-blue'
                : 'text-white bg-white/20'
            }`}
          >
            Maintenance
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
