import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     '/api' : 'http://localhost:8080/api/v1',
  //   },
  // },
  plugins: [react()],
})
