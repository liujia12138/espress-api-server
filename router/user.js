const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const userRouterHandler = require('../router_handler/user')

// 注册接口
router.post('/register', userRouterHandler.registerUser)

// 登录接口
router.post('/login', userRouterHandler.userLogin)

module.exports = router
