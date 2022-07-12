const express = require('express')
// 添加表单校验规则
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, reset_password_schema } = require('../schema/user')

const router = express.Router()

// 导入路由处理函数
const { getUserInfo, updateUserinfo, resetPassword } = require('../router_handler/userinfo')

// 挂载路由

// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

// 更新用户基本信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserinfo)

// 重置密码的路由
router.post('/resetPassword', expressJoi(reset_password_schema), resetPassword)

module.exports = router
