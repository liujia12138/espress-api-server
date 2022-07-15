const express = require('express')
const cors = require('cors')
const joi = require('joi')

// swagger
const expressSwagger = require('express-swagger-generator')


let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0'
    },
    host: 'localhost:3007',
    basePath: '/v1',
    produces: ['application/json', 'application/xml'],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: ''
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./controller/*.js'] //Path to the API handle folder
}
expressSwagger(options)

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


// 获取参数验证错误
// 在路由之后定义错误级别的中间件
app.use(mw.handleError)

app.listen(3007, () => {
  console.log('api server is running at http://127.0.0.1:3007')
})
