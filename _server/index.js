// NPM Variable
const express = require('express')
const { createServer } = require('http')
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require('path')
const { Server } = require('socket.io')
const { Nuxt, Builder } = require('nuxt')

// Plugin Variable
const TiktokLiveWrapper = require('./tiktok/live')

// Config Variable
const NuxtConfig = require('../nuxt.config.js')
const AppConfig = require('../app.config.js')
const isProduction = (process.env.NODE_ENV === 'production')

// Main Variable
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' }})
const NuxtClient = new Nuxt(NuxtConfig)
const NuxtBuilder = new Builder(NuxtClient)

// App Set
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, './public')))

// Nuxt Set
if (!isProduction) {
    NuxtBuilder.build()
}
app.use(NuxtClient.render)

// IO
io.on('connection', (socket) => {
    new TiktokLiveWrapper(socket)
})

// Start Server
httpServer.listen(process.env.PORT || AppConfig.port)



