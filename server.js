const express = require('express')
const https = require('https')
const fs = require('fs')
const morgan = require('morgan')
const bodyParser = require('body-parser');
const expressWs = require('express-ws')

const options = {
  key: fs.readFileSync('./keys/dpweb.club.key'),
  cert: fs.readFileSync('./keys/dpweb.club_bundle.crt')
}

const server = express()
const app = https.createServer(options, server)
// 引入express-ws的WebSocket功能，并混入app，相当于为 app实例添加 .ws 方法
// const expressWs = require('express-ws')(server)
expressWs(server, app)
const port = 3000   
server.use(bodyParser.json());

// 静态服务
server.use(express.static('./public'))
server.use(express.static('./uploads'))

// 写入日志
const writeStream = fs.createWriteStream('./logs/access.log')
server.use(morgan('combined', { stream: writeStream }))


const comRouter = require('./router/router')
server.use(comRouter)
const dataAnaysisRouter = require('./router/backPlatRouter/dataAnaysisRouter.js')
server.use('/dataAnaysis', dataAnaysisRouter)
const farmManageRouter = require('./router/backPlatRouter/farmManageRouter.js')
server.use('/farmManage', farmManageRouter)
const dataManageRouter = require('./router/backPlatRouter/dataManageRouter.js')
server.use('/dataManage', dataManageRouter)
const userManageRouter = require('./router/backPlatRouter/userManageRouter.js')
server.use('/userManage', userManageRouter)
const orderManageRouter = require('./router/backPlatRouter/orderManageRouter.js')
server.use('/orderManage', orderManageRouter)
const wsRouter = require('./router/WebSocket/index.js')
server.use(wsRouter)

const miniAppRouter = require('./router/miniAppRouter/index.js')
server.use('/miniApp', miniAppRouter)


server.get('/test', (req, res, next) => {
  res.end('连接成功')
})


app.listen(port, () => {
  
  console.log(' 👻 ','\033[34m service started \033[0m');
})