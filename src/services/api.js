/**
 * API Service - Centraliza todas las llamadas a la API REST
 * Utiliza MSW (Mock Service Worker) para simular el backend
 */

const API_BASE_URL = '/api';

/**
 * Manejo centralizado de errores HTTP
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP Error: ${response.status}`);
  }
  
  // Si es 204 No Content, no hay body
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

/**
 * Servicio de API para Pacientes
 */
export const pacientesAPI = {
  /**
   * Obtiene todos los pacientes
   * @returns {Promise<Array>} Lista de pacientes
   */
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/pacientes`);
    return handleResponse(response);
  },

  /**
   * Obtiene un paciente por ID
   * @param {string} id - ID del paciente
   * @returns {Promise<Object>} Datos del paciente
   */
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`);
    return handleResponse(response);
  },

  /**
   * Crea un nuevo paciente
   * @param {Object} pacienteData - Datos del paciente
   * @returns {Promise<Object>} Paciente creado
   */
  create: async (pacienteData) => {
    const response = await fetch(`${API_BASE_URL}/pacientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pacienteData),
    });
    return handleResponse(response);
  },

  /**
   * Actualiza un paciente existente
   * @param {string} id - ID del paciente
   * @param {Object} pacienteData - Datos actualizados
   * @returns {Promise<Object>} Paciente actualizado
   */
  update: async (id, pacienteData) => {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pacienteData),
    });
    return handleResponse(response);
  },

  /**
   * Elimina un paciente
   * @param {string} id - ID del paciente
   * @returns {Promise<null>}
   */
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
