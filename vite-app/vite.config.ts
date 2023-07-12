import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // defaults to absolute paths, breaks on github hosting
  base: "./",

  // https://vitejs.dev/config/shared-options.html#apptype
  appType: 'spa',

  server: {
    host: true, // to enable access from phone on wifi
  },
})
