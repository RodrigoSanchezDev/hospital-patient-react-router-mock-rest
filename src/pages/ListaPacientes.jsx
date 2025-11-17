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
        const data = await pacientesAPI.getAll();
        setPacientes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPacientes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        await pacientesAPI.delete(id);
        setPacientes(pacientes.filter(p => p.id !== id));
        alert('Paciente eliminado exitosamente');
      } catch {
        alert('Error al eliminar el paciente');
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
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p className="font-bold">Error</p>
        <p>{error}</p>
        <p className="text-sm mt-2">Asegúrate de que el servidor JSON esté ejecutándose en el puerto 3000</p>
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
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200"
                  >
                    Eliminar
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
