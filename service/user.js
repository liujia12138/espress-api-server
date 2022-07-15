// 抽离用户路由模块中的处理函数

// 导入数据库操作模块
const db = require('../db')

// 导入加密模块
const bcrypt = require('bcryptjs')

// 导入生成token的包
const jwt = require('jsonwebtoken')
// 导入全局配置
const config = require('../config')

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
  // // 1.检测数据的合法性------用joi代替1中的检测步骤
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({
  //     status: 1,
  //     msg: '用户名或密码不能为空'
  //   })
  // }
  //

  // 2.检测用户名是否被占用
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    // sql语句执行失败
    if (err) return res.cc(err.message)

    // 用户名被占用
    if (results.length > 0) {
      return res.cc('用户名被占用，请更换一个用户名')
    }

    // 用户名可用
    // 3.密码加密，调用bcrypt.hashSync(明文密码, 随机言的长度)
    const pwd = bcrypt.hashSync(userinfo.password, 10)
    console.log(pwd)

    // 4.插入新用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: pwd }, (err, results) => {
      // err
      if (err) return res.cc(err.message)

      // 插入失败
      if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试')

      res.cc('注册成功', 0)
    })
  })
}

// 登录
// 1.检测表单数据是否合法
// 2.根据用户名查询用户的数据
// 3.判断用户输入的密码是否正确
// 4.生成JWT的token字符串
exports.userLogin = (req, res) => {
  const userinfo = req.body
  const sql = 'select * from ev_users where username = ?'
  // 2.
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)

    if (results.length <= 0) return res.cc('用户不存在，请先注册')

    // 3.检测密码
    // 使用bcrypt.compareSync 接受两个参数，第一个参数是当前输入的密码，第二个参数是数据库里存的加密后的密码
    // 返回值是一个布尔值，true表示检测通过，false表示检测失败
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    // 3.1 检测不通过
    if (!compareResult) return res.cc('登录失败，密码不正确')

    // 4.生成token
    // 因为token是保存在客户端的，所以在生成token的时候，一定要剔除密码和头像的值
    const user = { ...results[0], password: null, user_pic: null }
    // 生成token字符串
    const tokenStr = jwt.sign(user, config.secretKey, { expiresIn: '10h', })
    res.send({
      status: 0,
      msg: '登录成功',
      token: 'Bearer ' + tokenStr
    })
  })
}
