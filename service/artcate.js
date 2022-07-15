const db = require('../db')

// 文章分类列表处理函数
exports.getArticleCatesList = (req, res) => {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) return res.cc(err)

    res.send({
      status: 0,
      msg: 'success',
      data: results
    })
  })
}

// 新增文章分类
exports.addArticleCate = (req, res) => {
  // 分类名称和别名唯一
  const sql = 'select * from ev_article_cate where name = ? or alias = ?'
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err)

    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
      return res.cc('分类名称与别名被占用，请更换后重试！')
    // 分类名称 或 分类别名 被占用
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

    const sql = 'insert into ev_article_cate set ? '
    db.query(sql, req.body,(err, results)=>{
      if(err) return res.cc(err)

      if(results.affectedRows !== 1) return res.cc('添加失败')

      res.send({
        status:0,
        msg:'success'
      })
    })
  })
}

// 根据id删除文章分类
exports.deleteArticleCateById = (req, res)=>{
  const id = req.params.id
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sql, id, (err, results)=>{
    if(err) return res.cc(err)

    if(results.affectedRows !== 1) return res.cc('删除失败')

    res.send({
      status: 0,
      msg: 'success'
    })
  })
}
