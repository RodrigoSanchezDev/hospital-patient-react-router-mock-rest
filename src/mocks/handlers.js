import { http, HttpResponse } from 'msw';
import { pacientesData } from './data';

// Base de datos en memoria
let pacientes = [...pacientesData];

export const handlers = [
  // GET /api/pacientes - Obtener todos los pacientes
  http.get('/api/pacientes', () => {
    return HttpResponse.json(pacientes);
  }),

  // GET /api/pacientes/:id - Obtener un paciente por ID
  http.get('/api/pacientes/:id', ({ params }) => {
    const { id } = params;
    const paciente = pacientes.find(p => p.id === id);
    
    if (!paciente) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(paciente);
  }),

  // POST /api/pacientes - Crear un nuevo paciente
  http.post('/api/pacientes', async ({ request }) => {
    const nuevoPaciente = await request.json();
    
    // Generar ID automático
    const maxId = pacientes.length > 0 
      ? Math.max(...pacientes.map(p => parseInt(p.id.replace('P', '')))) 
      : 0;
    const nuevoId = `P${String(maxId + 1).padStart(3, '0')}`;
    
    const pacienteConId = {
      ...nuevoPaciente,
      id: nuevoId,
      numeroPaciente: nuevoId
    };
    
    pacientes.push(pacienteConId);
    
    return HttpResponse.json(pacienteConId, { status: 201 });
  }),

  // PUT /api/pacientes/:id - Actualizar un paciente
  http.put('/api/pacientes/:id', async ({ params, request }) => {
    const { id } = params;
    const datosActualizados = await request.json();
    
    const index = pacientes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    pacientes[index] = { ...pacientes[index], ...datosActualizados };
    
    return HttpResponse.json(pacientes[index]);
  }),

  // DELETE /api/pacientes/:id - Eliminar un paciente
  http.delete('/api/pacientes/:id', ({ params }) => {
    const { id } = params;
    const index = pacientes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    
    pacientes.splice(index, 1);
    
    return new HttpResponse(null, { status: 204 });
  }),
];
