/**
 * API Service - Centraliza todas las llamadas a la API REST
 * Utiliza MSW (Mock Service Worker) para simular el backend
 * Incluye caché en memoria para optimizar peticiones
 */

const API_BASE_URL = '/api';

// Caché en memoria para optimizar consultas repetidas
const cache = {
  pacientes: null,
  lastFetch: null,
  CACHE_DURATION: 30000 // 30 segundos
};

/**
 * Clase personalizada para errores de API con información detallada
 */
class APIError extends Error {
  constructor(message, status, details = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
    this.userMessage = this.getUserFriendlyMessage(status);
  }

  getUserFriendlyMessage(status) {
    const messages = {
      400: 'Los datos enviados no son válidos. Por favor, revisa la información.',
      401: 'No tienes autorización para realizar esta acción.',
      403: 'Acceso denegado. No tienes permisos suficientes.',
      404: 'El recurso solicitado no fue encontrado. Puede que haya sido eliminado.',
      500: 'Error en el servidor. Por favor, intenta nuevamente en unos momentos.',
      503: 'El servicio no está disponible temporalmente. Intenta más tarde.'
    };
    return messages[status] || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.';
  }
}

/**
 * Manejo centralizado de errores HTTP con mensajes descriptivos
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    let errorDetails = null;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = await response.text();
    }
    
    throw new APIError(
      `Error HTTP ${response.status}`,
      response.status,
      errorDetails
    );
  }
  
  // Si es 204 No Content, no hay body
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

/**
 * Verifica si el caché es válido
 */
const isCacheValid = () => {
  if (!cache.pacientes || !cache.lastFetch) {
    return false;
  }
  const now = Date.now();
  return (now - cache.lastFetch) < cache.CACHE_DURATION;
};

/**
 * Limpia el caché
 */
const clearCache = () => {
  cache.pacientes = null;
  cache.lastFetch = null;
};

/**
 * Servicio de API para Pacientes
 */
export const pacientesAPI = {
  /**
   * Obtiene todos los pacientes (con caché para optimización)
   * @param {boolean} forceRefresh - Forzar actualización ignorando caché
   * @returns {Promise<Array>} Lista de pacientes
   */
  getAll: async (forceRefresh = false) => {
    // Usar caché si es válido y no se fuerza refresh
    if (!forceRefresh && isCacheValid()) {
      console.log('📦 Usando datos en caché');
      return cache.pacientes;
    }

    console.log('🌐 Obteniendo datos del servidor');
    const response = await fetch(`${API_BASE_URL}/pacientes`);
    const data = await handleResponse(response);
    
    // Actualizar caché
    cache.pacientes = data;
    cache.lastFetch = Date.now();
    
    return data;
  },

  /**
   * Obtiene un paciente por ID (primero busca en caché)
   * @param {string} id - ID del paciente
   * @returns {Promise<Object>} Datos del paciente
   */
  getById: async (id) => {
    // Buscar primero en caché
    if (cache.pacientes) {
      const cached = cache.pacientes.find(p => p.id === id);
      if (cached) {
        console.log('📦 Paciente encontrado en caché');
        return cached;
      }
    }

    console.log('🌐 Obteniendo paciente del servidor');
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`);
    return handleResponse(response);
  },

  /**
   * Crea un nuevo paciente (limpia caché después)
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
    const result = await handleResponse(response);
    
    // Limpiar caché para forzar recarga en próxima consulta
    clearCache();
    console.log('🔄 Caché limpiado después de crear');
    
    return result;
  },

  /**
   * Actualiza un paciente existente (limpia caché después)
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
    const result = await handleResponse(response);
    
    // Limpiar caché para forzar recarga
    clearCache();
    console.log('🔄 Caché limpiado después de actualizar');
    
    return result;
  },

  /**
   * Elimina un paciente (limpia caché después)
   * @param {string} id - ID del paciente
   * @returns {Promise<null>}
   */
  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/pacientes/${id}`, {
      method: 'DELETE',
    });
    const result = await handleResponse(response);
    
    // Limpiar caché para forzar recarga
    clearCache();
    console.log('🔄 Caché limpiado después de eliminar');
    
    return result;
  },
  
  /**
   * Limpia el caché manualmente
   */
  clearCache: () => {
    clearCache();
    console.log('🗑️ Caché limpiado manualmente');
  }
};
