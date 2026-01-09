import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Replace 'ironside-garage' with your actual repository name on GitHub
  base: '/ironside-garage/', 
})