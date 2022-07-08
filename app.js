const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// 解析x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 自定义中间件
// 优化res.send
// 一定要在路由注册之前
app.use((req, res, next) => {
  // status 默认为 1，表示失败的情况
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
  console.log('api server is running at http://127.0.0.1:3007')
})
