import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(fileURLToPath(new URL('.', import.meta.url)), 'src'),
      '@public': resolve(
        fileURLToPath(new URL('.', import.meta.url)),
        'public'
      ),
    },
  },
  test: {
    environment: 'node',
  },
});
