import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En desarrollo usa '/', en producción usa '/hospital-patient-react-router-mock-rest/'
  base: mode === 'development' ? '/' : '/hospital-patient-react-router-mock-rest/',
}))
