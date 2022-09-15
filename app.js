const express = require('express')
const cors = require('cors')
const joi = require('joi')

const app = express()

// cors处理跨域
app.use(cors())

// 引入中间件
const mw = require('./middleware')

// 解析x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 优化res.send
app.use(mw.mySend)

// 解析token
// 一定要在路由注册之前配置解析token的中间件
const { expressjwt } = require('express-jwt')
const config = require('./config')
app.use(expressjwt({ secret: config.secretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))


// 导入并使用用户路由模块
const userRouter = require('./controller/user')
app.use('/api', userRouter)

// 导入并使用获取用户基本信息的路由模块
const userinfoRouter = require('./controller/userinfo')
app.use('/my', userinfoRouter)

// 导入并使用文章分类接口
const articleCateRouter = require('./controller/artcate')
app.use('/article', articleCateRouter)

app.use('login.html', express.static('./public/dist/view'))

// 获取参数验证错误
// 在路由之后定义错误级别的中间件
app.use(mw.handleError)

app.listen(3007, () => {
  console.log('api server is running at http://127.0.0.1:3007')
})
