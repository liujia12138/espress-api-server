const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

// 解析x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => {
  console.log('api server is running at http://127.0.0.1:3007')
})
