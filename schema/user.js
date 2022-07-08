// 1.导入自定义验证规则的包
const joi = require('joi')

// 2.定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
  .string()
  .pattern(/^[\s]{6,12}$/)
  .required()

// 3.定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  // 对 req.body 中的数据进行验证
  body: {
    username,
    password
  }
}
