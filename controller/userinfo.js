const express = require('express')
// 添加表单校验规则
const expressJoi = require('@escook/express-joi')
const { update_userinfo_schema, reset_password_schema, update_avatar_schema } = require('../schema/user')

const router = express.Router()

// 导入路由处理函数
const { getUserInfo, updateUserinfo, resetPassword, updateAvatar } = require('../service/userinfo')

// 挂载路由

// 获取用户基本信息的路由
router.get('/userinfo', getUserInfo)

// 更新用户基本信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserinfo)

// 重置密码的路由
router.post('/resetPassword', expressJoi(reset_password_schema), resetPassword)

// 更新用户头像的路由
router.post('/updateAvatar', expressJoi(update_avatar_schema), updateAvatar)

module.exports = router
