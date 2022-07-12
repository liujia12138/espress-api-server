const express = require('express')
const router = express.Router()

// 导入路由处理函数
const {getUserInfo} = require('../router_handler/userinfo')

// 挂载路由

// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

module.exports = router