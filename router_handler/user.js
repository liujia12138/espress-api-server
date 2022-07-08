// 抽离用户路由模块中的处理函数

// 导入数据库操作模块
const db = require('../db')

// 导入加密模块
const bcrypt = require('bcryptjs')

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
    
  })

  res.send('登录成功')
}
