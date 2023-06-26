const express = require('express')

const dataAnaysisRouter = express.Router()

const { allPriceSQL, userCountSQL, orderCountSQL, priceAnaysisSQL } = require('../../sql/index')

dataAnaysisRouter.get('/getAnaysisData', (req,res,next) => {
 let allPrice = allPriceSQL()
 let userCount = userCountSQL()
 let orderCount = orderCountSQL()

 Promise.all([allPrice, userCount, orderCount]).then(result => {
    allPrice = result[0][0][0]['SUM(order_price)']
    userCount = result[1][0][0]['COUNT(*)']
    orderCount = result[2][0][0]['COUNT(*)']
    res.json({
      code: 200,
      list: [allPrice, userCount, orderCount, userCount],
      success: true,
      message: 'success'
    })
 }).catch(err => {
  res.json({
    code: 200,
    list: [],
    success: false,
    message: err
  })
 })
})

dataAnaysisRouter.get('/priceAnaysis', (req,res,next) => {
  priceAnaysisSQL().then(([values]) => {
    let priceObj = {}
    values.sort((a,b) => a.order_timestamp-b.order_timestamp)
    values.forEach(item => {
      // item.order_timestamp 
      const time = new Date(item.order_timestamp)
      item.order_timestamp = [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('/')
      if(priceObj[item.order_timestamp]){
        priceObj[item.order_timestamp] += item.order_price
      }else {
        priceObj[item.order_timestamp] = item.order_price
      }
    })
    let list1 = [], list2 = []
    for(key in priceObj) {
      list1.push(key)
      list2.push(priceObj[key])
    }
    res.json({
      code: 200,
      list: [list1, list2],
      success: true,
      message: 'success'
    })
  }).catch(err => {
    res.json({
      code: 200,
      data: {},
      success: false,
      message: err
    })
  })
})

module.exports = dataAnaysisRouter