'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"localhost"',
  // API_ROOT: '"47.91.217.132"'
  PORT:'"8080"'
})
