import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Configurar el Service Worker con los handlers
export const worker = setupWorker(...handlers);
