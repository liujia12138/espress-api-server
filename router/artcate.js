const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

const { getArticleCatesList, addArticleCate } = require('../router_handler/artcate')

const { add_cate_schema } = require('../schema/artcate')

router.get('/cates/list', getArticleCatesList)

// 新增文章分类
router.post('/cates/add', expressJoi(add_cate_schema), addArticleCate)

module.exports = router
