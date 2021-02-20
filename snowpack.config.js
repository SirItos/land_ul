// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  purge: ['./*.html', './src/*.js', './src/**/*.css', './src/**/*.js'],
  mount: {
    /* ... */
  },
  exclude: [
    '**/.git/**/*',
    '**/node_modules/**/*',
    '**/.prettierrc',
    '**/package-lock.json',
    '**/package.json',
    '**/deploy.sh',
    '**/snowpack.config.js',
    '**/postcss.config.js',
    '**/tailwind.config.js',
    '**/.gitignore'
  ],
  // ]
  plugins: [
    [
      '@snowpack/plugin-babel',
      {
        input: ['.js'] // (optional) specify files for Babel to transform
      }
    ],
    '@snowpack/plugin-sass',
    '@snowpack/plugin-postcss'
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  optimize: {
    bundle: true,
    treeshake: true,
    minify: true,
    target: 'es2018'
  }
}
