const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const sharedTailwindConfig = require('../../libs/config/tailwind-preset/src');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedTailwindConfig,
  presets:[sharedTailwindConfig],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
};
