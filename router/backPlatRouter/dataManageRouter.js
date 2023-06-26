const express = require('express')

const dataManageRouter = express.Router()

const { addLunboSQL, delLunboSQL, getALLLunboSQL, addHotfarm, getAllHotSQL, delHotfarmSQL } = require('../../sql')

dataManageRouter.post('/addLunbo', (req, res, next) => {
  const { farm_id, farm_name, url } = req.body
  addLunboSQL(farm_id, farm_name, url).then(([values]) => {
    res.json({
      code: 200,
      success: true,
      message: '添加成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '添加失败'
    })
  })
})

dataManageRouter.post('/delLunbo', (req, res, next) => {
  const { farmId } = req.body
  delLunboSQL(farmId).then(([values]) => {
    res.json({
      code: 200,
      success: true,
      message: '删除成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '删除失败'
    })
  })
})

dataManageRouter.get('/getALLLunbo', (req, res, next) => {
  getALLLunboSQL().then(([values]) => {
    res.json({
      code: 200,
      list: values,
      success: true,
      message: 'success'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: 'failed'
    })
  })
})

dataManageRouter.post('/addHotfarm', (req, res, next) => {
  const { farm_id, farm_name } = req.body
  addHotfarm(farm_id, farm_name).then(([values]) => {
    res.json({
      code: 200,
      success: true,
      message: '添加成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '添加失败'
    })
  })
})

dataManageRouter.get('/getALLhot', (req, res, next) => {
  getAllHotSQL().then(([values]) => {
    res.json({
      code: 200,
      list: values,
      success: true,
      message: 'success'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: 'failed'
    })
  })
})

dataManageRouter.post('/delHotFarm', (req, res, next) => {
  const { farm_id } = req.body
  delHotfarmSQL(farm_id).then(([values]) => {
    res.json({
      code: 200,
      success: true,
      message: '删除成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '删除失败'
    })
  })
})
module.exports = dataManageRouter