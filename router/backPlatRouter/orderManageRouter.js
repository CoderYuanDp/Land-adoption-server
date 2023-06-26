const express = require('express')

const orderManageRouter = express.Router()

const { getOrderSQL,  getOrderSQL1, getOrderSQL2, getOrderSQL3, editOrderStatusSQL } = require('../../sql')

const uid = (num) => {
  const strCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let str = '';
  while (str.length < num) {
      let str1 = strCode.charAt(Math.round(Math.random() * 61));
      if (str.indexOf(str1) === -1) {
          str += str1;
      }
  }

  return str
}

orderManageRouter.post('/getOrder', (req, res, next) => {
  const { farm_id, user_id } = req.body
  if(farm_id && !user_id) {
    getOrderSQL1(farm_id).then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '获取订单成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '获取订单失败'
      })
    })
  }else if(!farm_id && user_id) {
    getOrderSQL2(user_id).then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '获取订单成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '获取订单失败'
      })
    })
  }else if(farm_id && user_id) {
    getOrderSQL3(farm_id, user_id).then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '获取订单成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '获取订单失败'
      })
    })
  }else {
    getOrderSQL().then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '获取订单成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '获取订单失败'
      })
    })
  }
})

orderManageRouter.post('/editOrderStatus', (req, res, next) => {
  const { order_id, status_sproute, status_germinate, status_grow, status_mature } = req.body
  editOrderStatusSQL(order_id, status_sproute, status_germinate, status_grow, status_mature).then(([values]) => {
    res.json({
      code: 200,
      success: true,
      message: '修改成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '修改失败'
    })
  })
})

module.exports = orderManageRouter