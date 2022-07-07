const express = require('express')

// 创建路由对象
const router = express.Router()

// 注册接口
router.post('/register', (req, res)=>{
  res.send('注册成功')
})

// 登录接口
router.post('/login', (req, res)=>{
  res.send('登录成功')
})

module.exports = router