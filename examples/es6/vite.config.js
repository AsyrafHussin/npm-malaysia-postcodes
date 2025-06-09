import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    exclude: ['react', 'react-dom', 'react-dom/client']
  }
});
