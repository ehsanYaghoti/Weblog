
require('app-module-path').addPath(__dirname) 

const app = require('./app')

require('dotenv').config()


new app();