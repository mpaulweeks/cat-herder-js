import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // defaults to absolute paths, breaks on github hosting
  base: "./",

  server: {
    host: true, // to enable access from phone on wifi
  },
})
