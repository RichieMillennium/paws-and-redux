import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      bundler: 'vite',
      webServerCommands: {
        default: 'nx run paws-and-redux:serve',
        production: 'nx run paws-and-redux:preview',
      },
      ciWebServerCommand: 'nx run paws-and-redux:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
