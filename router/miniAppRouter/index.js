const express = require('express')

const miniAppRouter = express.Router()

const { addOrderSQL, getOrderSQL, getOrderSQL1, getOrderSQL2, getOrderSQL3, checkLoginSQL, miniLoginSQL, getOrderDetailSQL, editAddressSQL, editLandInfoAdoptSQL } = require('../../sql')

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

miniAppRouter.post('/addOrder', (req, res, next) => {
  const { order_timestamp, order_price, order_type, order_desc, user_id, land_id, farm_id, plant } = req.body
  const id = uid(9)
  addOrderSQL(id, order_timestamp, order_price, order_type, order_desc, user_id, land_id, farm_id, plant ).then(([values]) => {
    editLandInfoAdoptSQL(land_id).then(([v]) => {
      res.json({
        code: 200,
        success: true,
        message: '订单添加成功'
      })
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '订单添加失败'
    })
  })
})

miniAppRouter.post('/getOrder', (req, res, next) => {
  const { farmId, userId } = req.body
  if(farmId && !userId) {
    getOrderSQL1(farmId).then(([values]) => {
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
  }else if(!farmId && userId) {
    getOrderSQL2(userId).then(([values]) => {
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
  }else if(farmId && userId) {
    getOrderSQL3(farmId, userId).then(([values]) => {
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

miniAppRouter.post('/getOrderDetail', (req, res, next) => {
  const { orderId } = req.body
  getOrderDetailSQL(orderId).then(([values]) => {
    res.json({
      code: 200,
      list: values,
      success: true,
      message: '获取订单详情成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '获取订单详情失败'
    })
  })
})

miniAppRouter.post('/login',async (req, res, next) => {
  const { nickname, phone, avator } = req.body
  const [values] = await  checkLoginSQL(phone)
  if(values.length !== 0){
    res.json({
      code: 200,
      data: values[0],
      success: true,
      message: '登录成功'
    })
  }
  await miniLoginSQL(nickname, phone, avator)
  checkLoginSQL(phone).then(([val]) => {
    res.json({
      code: 200,
      data: val[0],
      success: true,
      message: '登录成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '登录失败'
    })
  })

})

miniAppRouter.post('/editAddress', (req, res, next) => {
  const { address, userId } = req.body
  editAddressSQL(userId, address).then(([values]) => {
    res.json({
      code: 200,
      list: values,
      success: true,
      message: '修改地址成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '修改地址失败'
    })
  })
})

module.exports = miniAppRouter