// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: "defaults", // Adjust based on your target environments
      useBuiltIns: 'usage',
      corejs: 3, // It uses core-js for polyfilling
      modules: 'commonjs' // auto automatically determines the module type (CommonJS, ES Modules, etc.)
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', {
            corejs: false,  // Do not use corejs in transform-runtime to simplify polyfills
            helpers: true,  // Use helpers from runtime
            regenerator: true,  // Enable regenerator
            useESModules: false  // Do not transform imports to ES Modules
        }]
  ]
};
