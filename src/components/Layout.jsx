import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detectar tamaño de pantalla y ajustar sidebar
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setSidebarOpen(window.innerWidth >= 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar al navegar en móvil
  useEffect(() => {
    if (isMobile && location.pathname) {
      const timer = setTimeout(() => setSidebarOpen(false), 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const menuItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      path: '/pacientes',
      label: 'Pacientes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      path: '/nuevo-paciente',
      label: 'Nuevo Paciente',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      ),
      highlight: true,
    },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-20'
        } ${
          isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'
        } ${
          isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'
        } bg-gradient-to-b from-primary to-blue-900 text-white transition-all duration-300 ease-in-out shadow-2xl flex flex-col`}
      >
        {/* Logo y Toggle */}
        <div className="p-6 flex items-center justify-between border-b border-blue-800">
          <Link to="/" className="flex items-center space-x-3 overflow-hidden">
            <div className="bg-white rounded-xl p-2 shadow-lg">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">Hospital</span>
                <span className="text-xs text-blue-200">San José</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-blue-800 transition-colors duration-200"
          >
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.path)
                  ? item.highlight
                    ? 'bg-accent text-white shadow-lg shadow-accent/50 scale-105'
                    : 'bg-white text-primary shadow-lg'
                  : item.highlight
                  ? 'bg-accent/20 hover:bg-accent text-white'
                  : 'hover:bg-blue-800 text-blue-100'
              }`}
            >
              <div className={`${isActive(item.path) && !item.highlight ? 'text-primary' : ''} group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>
              {sidebarOpen && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {!sidebarOpen && isActive(item.path) && (
                <div className="absolute left-16 w-1 h-8 bg-accent rounded-r-full"></div>
              )}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-blue-800">
          <div className={`flex items-center space-x-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-amber-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">Admin Usuario</p>
                <p className="text-xs text-blue-200 truncate">Sistema MSW</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            {/* Botón de menú para móvil */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 lg:hidden mr-3"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {location.pathname === '/' && 'Dashboard'}
                {location.pathname === '/pacientes' && 'Gestión de Pacientes'}
                {location.pathname === '/nuevo-paciente' && 'Registrar Nuevo Paciente'}
                {location.pathname.includes('/paciente/') && !location.pathname.includes('/editar') && 'Detalles del Paciente'}
                {location.pathname.includes('/editar-paciente/') && 'Editar Paciente'}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">
                Sistema de Gestión Hospitalaria con MSW
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative hidden sm:block">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
              </button>
              
              <div className="h-8 w-px bg-gray-300 hidden sm:block"></div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs sm:text-sm font-bold">AU</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-0">
            <p>&copy; 2025 Hospital San José. Todos los derechos reservados.</p>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                <span className="text-xs">MSW Activo</span>
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-xs">v1.0.0</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
