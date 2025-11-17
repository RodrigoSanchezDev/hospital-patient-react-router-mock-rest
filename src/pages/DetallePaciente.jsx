import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pacientesAPI } from '../services/api';

function DetallePaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaciente = async () => {
      try {
        const data = await pacientesAPI.getById(id);
        setPaciente(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPaciente();
  }, [id]);

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de eliminar este paciente?')) {
      try {
        setDeleting(true);
        await pacientesAPI.delete(id);
        alert('✅ Paciente eliminado exitosamente');
        navigate('/pacientes');
      } catch (err) {
        alert('❌ Error al eliminar: ' + (err.userMessage || err.message));
        setDeleting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !paciente) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error || 'Paciente no encontrado'}</p>
        </div>
        <Link
          to="/pacientes"
          className="inline-block mt-4 text-primary hover:text-blue-700"
        >
          ← Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 sm:mb-6">
        <Link
          to="/pacientes"
          className="text-primary hover:text-blue-700 flex items-center text-sm sm:text-base"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a la lista
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{paciente.nombre}</h1>
              <p className="text-blue-100 text-sm sm:text-lg">Número de Paciente: {paciente.numeroPaciente}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
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

        {/* Body */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Información Personal */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Información Personal
              </h2>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Edad</p>
                  <p className="text-lg font-semibold text-gray-800">{paciente.edad} años</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="text-lg font-semibold text-gray-800">{paciente.telefono}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-lg font-semibold text-gray-800">{paciente.email}</p>
                </div>
              </div>
            </div>

            {/* Información Médica */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Información Médica
              </h2>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Diagnóstico</p>
                  <p className="text-lg font-semibold text-gray-800">{paciente.diagnostico}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Fecha de Ingreso</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {new Date(paciente.fechaIngreso).toLocaleDateString('es-CL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor Tratante</p>
                  <p className="text-lg font-semibold text-gray-800">{paciente.doctor}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex space-x-4">
            <Link
              to={`/editar-paciente/${paciente.id}`}
              className="flex-1 bg-secondary text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Información
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center ${
                deleting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              {deleting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Eliminando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar Paciente
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetallePaciente;
