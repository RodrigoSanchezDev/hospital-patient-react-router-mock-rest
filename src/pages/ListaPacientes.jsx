import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { pacientesAPI } from '../services/api';

function ListaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await pacientesAPI.getAll();
        setPacientes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error al cargar pacientes:', err);
        setError(err);
        setLoading(false);
      }
    };
    
    fetchPacientes();
  }, []);

  const handleRetry = () => {
    setError(null);
    pacientesAPI.getAll(true).then(data => {
      setPacientes(data);
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  };

  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        setDeletingId(id); // Mostrar indicador de carga
        await pacientesAPI.delete(id);
        setPacientes(pacientes.filter(p => p.id !== id));
        alert('✅ Paciente eliminado exitosamente');
      } catch (err) {
        alert('❌ Error al eliminar: ' + (err.userMessage || err.message));
      } finally {
        setDeletingId(null); // Ocultar indicador
      }
    }
  };

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.numeroPaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.diagnostico.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error al cargar los datos
              </h3>
              <p className="text-red-700 mb-3">
                {error.userMessage || error.message}
              </p>
              {error.status && (
                <p className="text-sm text-red-600 mb-3">
                  Código de error: {error.status}
                </p>
              )}
              <div className="space-y-2">
                <p className="text-sm text-red-600">
                  <strong>Soluciones sugeridas:</strong>
                </p>
                <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                  <li>Verifica tu conexión a internet</li>
                  <li>Recarga la página (F5 o Cmd+R)</li>
                  <li>Intenta nuevamente en unos momentos</li>
                  {error.status === 404 && <li>El recurso puede haber sido eliminado</li>}
                  {error.status >= 500 && <li>El servidor está experimentando problemas temporales</li>}
                </ul>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={handleRetry}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reintentar
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Ir al inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Lista de Pacientes</h1>
        <p className="text-gray-600">Gestiona la información de los pacientes del hospital</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, número o diagnóstico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Mostrando {filteredPacientes.length} de {pacientes.length} pacientes
        </p>
      </div>

      {/* Patients Grid */}
      {filteredPacientes.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-gray-600 text-base sm:text-lg">No se encontraron pacientes</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredPacientes.map((paciente) => (
            <div
              key={paciente.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-secondary p-4">
                <h2 className="text-xl font-bold text-white">{paciente.nombre}</h2>
                <p className="text-blue-100">Nº {paciente.numeroPaciente}</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm"><strong>Edad:</strong> {paciente.edad} años</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm"><strong>Diagnóstico:</strong> {paciente.diagnostico}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm"><strong>Doctor:</strong> {paciente.doctor}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      paciente.estadoActual === 'Estable' ? 'bg-green-100 text-green-800' :
                      paciente.estadoActual === 'En Recuperación' ? 'bg-blue-100 text-blue-800' :
                      paciente.estadoActual === 'En Tratamiento' ? 'bg-yellow-100 text-yellow-800' :
                      paciente.estadoActual === 'Crítico Estable' ? 'bg-red-100 text-red-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {paciente.estadoActual}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-200">
                  <Link
                    to={`/paciente/${paciente.id}`}
                    className="flex-1 bg-primary text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Ver Detalles
                  </Link>
                  <Link
                    to={`/editar-paciente/${paciente.id}`}
                    className="flex-1 bg-secondary text-white px-4 py-2 rounded-lg text-center text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(paciente.id)}
                    disabled={deletingId === paciente.id}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
                      deletingId === paciente.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {deletingId === paciente.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Eliminando...
                      </>
                    ) : (
                      'Eliminar'
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaPacientes;
