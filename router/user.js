const express = require('express')

// 创建路由对象
const router = express.Router()

// 导入路由处理函数
const userRouterHandler = require('../router_handler/user')

// 1.导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 2.导入需要的验证规则对象
const {reg_login_schema} = require('../schema/user')

// 注册接口
// 3.在注册新用户的路由中，局部声明中间件，对当前请求携带的参数进行校验
router.post('/register', expressJoi(reg_login_schema), userRouterHandler.registerUser)

// 登录接口
router.post('/login', userRouterHandler.userLogin)

module.exports = router
