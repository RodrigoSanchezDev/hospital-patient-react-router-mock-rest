import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { pacientesAPI } from '../services/api';

function EditarPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    numeroPaciente: '',
    telefono: '',
    email: '',
    diagnostico: '',
    fechaIngreso: '',
    doctor: '',
    estadoActual: ''
  });

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPaciente = async () => {
      try {
        const data = await pacientesAPI.getById(id);
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaciente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (id) {
        await pacientesAPI.update(id, formData);
        alert('Paciente actualizado exitosamente');
      } else {
        await pacientesAPI.create(formData);
        alert('Paciente creado exitosamente');
      }
      
      navigate('/pacientes');
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error</p>
          <p>{error}</p>
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

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          {id ? 'Editar Paciente' : 'Nuevo Paciente'}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Edad */}
            <div>
              <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-2">
                Edad *
              </label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                min="0"
                max="150"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Número de Paciente */}
            <div>
              <label htmlFor="numeroPaciente" className="block text-sm font-medium text-gray-700 mb-2">
                Número de Paciente *
              </label>
              <input
                type="text"
                id="numeroPaciente"
                name="numeroPaciente"
                value={formData.numeroPaciente}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Diagnóstico */}
            <div>
              <label htmlFor="diagnostico" className="block text-sm font-medium text-gray-700 mb-2">
                Diagnóstico *
              </label>
              <input
                type="text"
                id="diagnostico"
                name="diagnostico"
                value={formData.diagnostico}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Fecha de Ingreso */}
            <div>
              <label htmlFor="fechaIngreso" className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Ingreso *
              </label>
              <input
                type="date"
                id="fechaIngreso"
                name="fechaIngreso"
                value={formData.fechaIngreso}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Doctor */}
            <div>
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Tratante *
              </label>
              <input
                type="text"
                id="doctor"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Estado Actual */}
            <div className="md:col-span-2">
              <label htmlFor="estadoActual" className="block text-sm font-medium text-gray-700 mb-2">
                Estado Actual *
              </label>
              <select
                id="estadoActual"
                name="estadoActual"
                value={formData.estadoActual}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Seleccione un estado</option>
                <option value="Estable">Estable</option>
                <option value="En Recuperación">En Recuperación</option>
                <option value="En Tratamiento">En Tratamiento</option>
                <option value="Crítico Estable">Crítico Estable</option>
                <option value="Alta Programada">Alta Programada</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
                    {/* Botones */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:space-x-4 pt-4 sm:pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/pacientes')}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base font-semibold"
            >
              {id ? 'Actualizar Paciente' : 'Crear Paciente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarPaciente;
