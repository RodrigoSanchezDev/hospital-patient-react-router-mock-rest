import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Inicializar MSW (Mock Service Worker)
async function enableMocking() {
  const { worker } = await import('./mocks/browser')

  // Configurar la URL del Service Worker según el entorno
  // En desarrollo usa la ruta raíz, en producción usa la base de GitHub Pages
  const base = import.meta.env.BASE_URL || '/';
  const serviceWorkerUrl = `${base}mockServiceWorker.js`;

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start({
    serviceWorker: {
      url: serviceWorkerUrl
    }
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
