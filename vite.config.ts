import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-ai': ['@google/genai'],
          'vendor-ui': ['react', 'react-dom'],
          'vendor-utils': ['jspdf']
        }
      }
    }
  }
})
