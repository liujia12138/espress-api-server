// 抽离用户路由模块中的处理函数

// 导入数据库操作模块
const db = require('../db')

// 注册
// 步骤
// 1.检测表单提交的数据是否合法
// 2.检测用户名是否被占用
// 3.对密码进行加密处理
// 4.插入新用户
exports.registerUser = (req, res) => {
  // 接收数据
  const userinfo = req.body
  console.log(userinfo)
  // 检测数据的合法性
  if (!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      msg: '用户名或密码不能为空'
    })
  }

  // 检测用户名是否被占用
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    // sql语句执行失败
    if (err) return res.send({ status: 1, msg: err.message })

    // 用户名被占用
    if (results.length > 0) {
      return res.send({ status: 1, msg: '用户名被占用，请更换一个用户名' })
    }
    res.send('注册成功')
  })
}

exports.userLogin = (req, res) => {
  res.send('登录成功')
}
