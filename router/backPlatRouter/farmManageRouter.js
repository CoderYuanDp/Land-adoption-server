const express = require('express')

const farmManageRouter = express.Router()

const { addFarmSQL, getFarmSQL, editFarmSQL, delFarmSQL, getLandSQL, getAllLandSQL, addLandSQL, delLandSQL, setLandSQL } = require('../../sql')

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

farmManageRouter.post('/addFarm', (req, res, next) => {
  const { farmName, lanlng, area, address, images, farmDesc, model } = req.body
  const id = uid(6)
  addFarmSQL(id, farmName, farmDesc, lanlng, area, address, images, model).then(([values]) => {
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

farmManageRouter.post('/editFarm', (req, res, next) => {
  const { farmId, farmName, lanlng, area, address, images, farmDesc, model } = req.body
  console.log(res.body)
  editFarmSQL(farmId, farmName, farmDesc, lanlng, area, address, images, model).then(([values]) => {
    console.log(values)
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

farmManageRouter.post('/delFarm', (req, res, next) => {
  const { farmId } = req.body
  console.log(res.body)
  delFarmSQL(farmId).then(([values]) => {
    console.log(values)
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

farmManageRouter.get('/getFarm', (req, res, next) => {
  const { farmName } = req.query
  getFarmSQL(farmName).then(([values]) => {
    res.json({
      code: 200,
      list: values,
      success: true,
      message: '搜索成功'
    })
  }).catch(err => {
    res.json({
      code: 200,
      error: err,
      success: false,
      message: '搜索失败'
    })
  })
})

farmManageRouter.get('/getLand', (req, res, next) => {
  const { farmId } = req.query
  if(farmId){
    getLandSQL(farmId).then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '搜索成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '搜索失败'
      })
    })
  }else {
    getAllLandSQL().then(([values]) => {
      res.json({
        code: 200,
        list: values,
        success: true,
        message: '搜索成功'
      })
    }).catch(err => {
      res.json({
        code: 200,
        error: err,
        success: false,
        message: '搜索失败'
      })
    })
  }
})

farmManageRouter.post('/addLand', (req, res, next) => {
  const { land_name, land_plants, land_area, farm_id, land_price } = req.body
  const id = uid(6)
  addLandSQL(id, land_name, land_plants, land_area, farm_id, land_price).then(([values]) => {
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

farmManageRouter.post('/delLand', (req, res, next) => {
  const { land_id } = req.body
  delLandSQL(land_id).then(([values]) => {
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

// 修改land状态
farmManageRouter.post('/setLandStatus', (req, res, next) => {
  const { land_id } = req.body
  setLandSQL(land_id).then(([values]) => {
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

module.exports = farmManageRouter