import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ListaPacientes from './pages/ListaPacientes';
import DetallePaciente from './pages/DetallePaciente';
import EditarPaciente from './pages/EditarPaciente';

/**
 * Componente principal de la aplicación
 * - Configura las rutas con React Router
 * - Demuestra el uso de MSW (Mock Service Worker) con fetch en useEffect
 * - Verifica que MSW esté funcionando correctamente al iniciar
 */
function App() {
  const [mswStatus, setMswStatus] = useState({ loading: true, error: null });

  // Ejemplo de cómo usar MSW con fetch en el componente principal
  // Esto verifica que MSW está funcionando correctamente
  useEffect(() => {
    // Demostración: Fetch de prueba al iniciar la aplicación
    fetch('/api/pacientes')
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.status + ' - ' + resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        console.log('✅ MSW está funcionando correctamente');
        console.log(`📊 Se encontraron ${data.length} pacientes en el sistema`);
        console.log('🔧 Datos obtenidos desde Mock Service Worker:', data);
        setMswStatus({ loading: false, error: null });
      })
      .catch((err) => {
        console.error('❌ Error al conectar con MSW:', err);
        setMswStatus({ loading: false, error: err.message });
      });
  }, []);

  // Mostrar estado de carga inicial mientras MSW se inicializa
  if (mswStatus.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Inicializando MSW (Mock Service Worker)...</p>
        </div>
      </div>
    );
  }

  // Mostrar error si hay problemas con MSW
  if (mswStatus.error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          <p className="font-bold text-lg mb-2">⚠️ Error al inicializar MSW</p>
          <p>{mswStatus.error}</p>
          <p className="text-sm mt-2">Verifica que el Service Worker esté correctamente instalado.</p>
        </div>
      </div>
    );
  }

  // Configurar basename para que funcione en GitHub Pages y en local
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="pacientes" element={<ListaPacientes />} />
          <Route path="paciente/:id" element={<DetallePaciente />} />
          <Route path="editar-paciente/:id" element={<EditarPaciente />} />
          <Route path="nuevo-paciente" element={<EditarPaciente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
