const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { getArticleCatesList, addArticleCate, deleteArticleCateById } = require('../service/artcate')

const { add_cate_schema, delete_cate_schema } = require('../schema/artcate')

router.get('/cates/list', getArticleCatesList)

// 新增文章分类
router.post('/cates/add', expressJoi(add_cate_schema), addArticleCate)

// 根据id删除
router.get('/cates/delete/:id', expressJoi(delete_cate_schema), deleteArticleCateById)

module.exports = router
