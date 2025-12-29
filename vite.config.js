import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // project root containing index.html
  root: path.resolve(__dirname, 'src'),
  // static public files folder
  publicDir: path.resolve(__dirname, 'public'),
  base: process.env.BASE_URL || '/',
  build: {
    // write final output to repository-level dist so Netlify publishes it
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      // explicit Rollup input to ensure index.html is found
      input: path.resolve(__dirname, 'src', 'index.html')
    }
  }
});
