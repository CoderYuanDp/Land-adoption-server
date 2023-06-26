const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const { loginSQL } = require('../sql')
const jsonWebToken = require('jsonwebtoken');

const SECRET_KEY = 'kite1874'

const comRouter = express.Router()

comRouter.post('/login', (req, res, next) => {
  const { userId, password } = req.body
  loginSQL(userId, password).then(([values]) => {
    if(values.length === 0) {
      res.json({
        code: 200,
        success: false,
        message: '账户或密码错误'
      })
    }else {
      const token = jsonWebToken.sign({
        userId:values[0].manager_id,
        role:values[0].manager_name
      },SECRET_KEY,{
        expiresIn:"24h"
      })
      res.json({
        code: 200,
        token,
        data: values[0],
        success: true,
        message: 'success'
      })
    }
  }).catch(err => {
    res.json({
      code: 200,
      success: false,
      message: err
    })
  })
})

const upload = multer({
  // dest: './uploads', //被上传文件的位置
  storage: multer.diskStorage({  //自定义上传
    destination(req, file, cb){
      cb(null, './uploads')
    },
    filename(req, file, cb){
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, Date.now()+'_'+file.originalname)  // 自定义文件名称
    }
  })
})
comRouter.post('/uploadFile', upload.array('files'), (req, res, next) => {
  const files = req.files.map(item => {
    item.url = 'https://dpweb.club:3000/'+item.filename
    return item
  })
  res.json({
    code: 200,
    files: files,
    success: true,
    message: 'success'
  })
})

comRouter.get('/getUploadFilesList', (req, res, next) => {
  let readDir = fs.readdirSync('./uploads')
  readDir = readDir.map(item => {
    const date = new Date(Number(item.split('_')[0]))
    Y = date.getFullYear() + '-'
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    D = date.getDate() + ' '
    h = date.getHours() + ':'
    m = date.getMinutes() + ':'
    s = date.getSeconds()
    return {
      date: Y+M+D+h+m+s,
      url: 'https://dpweb.club:3000/'+item
    }
  })
  res.json({
    code: 200,
    success: true,
    data: readDir,
    message: 'success'
  })
})

comRouter.post('/delFile', (req, res) => {
  const { src } = req.body
  fs.unlink('uploads/'+src, (err) => {
    if(err) {
      res.json({
        code: 200,
        success: false,
        message: err
      })
    }else {
      res.json({
        code: 200,
        success: true,
        message:'success'
      })
    }
  })
})


module.exports = comRouter