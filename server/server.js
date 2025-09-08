
require('app-module-path').addPath(__dirname)

require('dotenv').config()

const app = require('./app')

new app();
