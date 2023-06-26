const { log } = require('console')
const express = require('express')

const wsRoute = express.Router()

//存放所有连接的用户
let connections = []

wsRoute.ws('/link', (ws, req) => {
  connections.push(ws)
  ws.send(JSON.stringify({
    content: '服务器发送的第一条消息',
    from: 'server',
    to: 'admin'}))
  ws.on('message', function (msg) {
    // msg = JSON.parse(msg)
    // ws.send(msg)
    // 群发消息给所有用户
    connections.forEach(item => {
      item.send(msg)
    })
  })
  // 关闭
  // ws.on('close', function (e) {
  // console.log('连接关闭')
  // })
})

module.exports = wsRoute