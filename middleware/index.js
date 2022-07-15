const joi = require('joi')

// 自定义send函数
const mySend = (req, res, next) => {
  // status 默认为 1，表示失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
}

// 错误级别中间件
const handleError = (err, req, res, next) => {
  // 验证失败的错误
  if (err instanceof joi.ValidationError) return res.cc(err.message)

  // 身份认证失败后的error
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
  // 其他未知的错误
  res.cc(err)

  next()
}

module.exports = {
  mySend,
  handleError
}
