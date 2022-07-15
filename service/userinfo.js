const db = require('../db')
const router = require('../controller/user')
// 导入加密模块
const bcrypt = require('bcryptjs')

// 获取用户基本信息的路由处理函数
// 注意express-jwt 7 用户信息存在req.auth中
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(sql, req.auth.id, (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql成功，但是没有查询到数据
    if (results.length !== 1) return res.cc('获取用户信息失败')

    res.send({
      status: 0,
      msg: 'success',
      data: results[0]
    })
  })
}

// 更新用户信息的路由处理函数
exports.updateUserinfo = (req, res) => {
  const data = req.body
  const sql = 'update ev_users set nickname=?, email=?, id=? where id = ?'
  // 或者
  // const sql = 'update ev_users set ? where id = ?'
  db.query(sql, [data.nickname, data.email, data.id, req.body.id], (err, results) => {
    // 执行sql语句失败
    if (err) return res.cc(err)

    // 执行sql成功，但是没有查询到数据
    if (results.affectedRows !== 1) return res.cc('更新用户信息失败')

    // sql执行成功
    res.send({
      status: 0,
      msg: 'success'
    })
  })
}

// 重置密码的路由处理函数
exports.resetPassword = (req, res) => {
  // 根据id查询用户信息，获取旧密码
  const sql = 'select * from ev_users where id=?'
  db.query(sql, req.auth.id, (err, results) => {
    if (err) return res.cc(err.message)

    if (results.length !== 1) return res.cc('用户不存在')

    // 获取用户成功，判断旧密码是否正确
    const { oldPwd, newPwd } = req.body
    const compareResult = bcrypt.compareSync(oldPwd, results[0].password)
    // 旧密码有误
    if (!compareResult) return res.cc('旧密码输入有误！')

    // 密码校验通过，更新密码
    const sql = 'update ev_users set password=? where id=?'
    // 加密密码
    const bcryptNewPwd = bcrypt.hashSync(newPwd, 10)
    db.query(sql, [bcryptNewPwd, req.auth.id], (err, results) => {
      if (err) return res.cc(err.message)

      if (results.affectedRows !== 1) return res.cc('重置密码失败')

      res.cc('重置成功', 0)
    })
  })
}

// 更换用户头像
exports.updateAvatar = (req, res) => {
  const sql = 'update ev_users set user_pic=? where id=?'
  db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
    if (err) return res.cc(err)

    if (results.affectedRows !== 1) return res.cc('更换头像失败')

    return res.send({
      status: 0,
      msg: '更换头像成功'
    })
  })
}
