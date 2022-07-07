// 抽离用户路由模块中的处理函数
exports.registerUser = (req, res) => {
  res.send('注册成功')
}

exports.userLogin = (req, res) => {
  res.send('登录成功')
}
