import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  // Configurações para permitir exposição via ngrok
  // Se você exportar a URL do ngrok para NGROK_HOST (ex: "abcd-1234.ngrok.io"),
  // o HMR usará WSS e o host correto para funcionar através do túnel.
  server: {
    host: true,
    port: 5173,
    hmr: {
      protocol: (globalThis.process?.env?.NGROK_HOST) ? 'wss' : 'ws',
      host: globalThis.process?.env?.NGROK_HOST || undefined,
      clientPort: (globalThis.process?.env?.NGROK_HOST) ? 443 : undefined
    }
  }
})
