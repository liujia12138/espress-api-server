const db = require('../db')

// 获取用户基本信息的路由处理函数
// 注意express-jwt 7 用户信息存在req.auth中
exports.getUserInfo = (req, res) => {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
  db.query(sql, req.auth.id, (err, results) => {
    // 执行sql语句失败
    if(err) return res.cc(err)

    // 执行sql成功，但是没有查询到数据
    if(results.length !== 1) return res.cc('获取用户信息失败')

    res.cc({
      status: 0,
      msg: 'success',
      data: results[0]
    })
  })
}
