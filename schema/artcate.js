const joi = require('joi')

exports.add_cate_schema = {
  body:{
    name: joi.string().required(),
    alias: joi.string().required().alphanum()
  }
}

exports.delete_cate_schema = {
  params:{
    id: joi.number().integer().min(1).required()
  }
}