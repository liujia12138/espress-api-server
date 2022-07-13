const joi = require('joi')

exports.add_cate_schema = {
  body:{
    name: joi.string().required(),
    alias: joi.string().required().alphanum()
  }
}