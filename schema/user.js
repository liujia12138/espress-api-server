// 1.导入自定义验证规则的包
const joi = require('joi')

// 2.定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required()

// 定义更新数据的表单校验规则
const nickname = joi.string().required()
const id = joi.number().integer().min(1).required()
const email = joi.string().email().required()

// 3.定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  // 对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}

// 注意定义校验规则时，body内的key需要和接口调用时参数的key保持一致
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}

// 定义重置密码的表单校验规则
exports.reset_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password) //新密码和旧密码的校验规则保持一致 且 不可以和旧密码相同
  }
}

// 定义avatar头像表单校验规则
exports.update_avatar_schema = {
  body:{
    avatar: joi.string().dataUri().required()
  }
}