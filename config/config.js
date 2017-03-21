var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'oath2-js-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/oath2-js'
  },

  test: {
    root: rootPath,
    app: {
      name: 'oath2-js-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/oath2-js-test-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'oath2-js-test'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/oath2-js-test-production'
  }
};

module.exports = config[env];
