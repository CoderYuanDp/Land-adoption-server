const express = require('express')

const userManageRouter = express.Router()

const { getUserSQL } = require('../../sql')

userManageRouter.post('/getUser', (req, res, next) => {
  const { nickname } = req.body
  getUserSQL(nickname).then(([values]) => {
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

module.exports = userManageRouter