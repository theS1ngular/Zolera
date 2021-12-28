const joi = require('joi');

  const userSchema = joi.object({
    _id: joi.any(),
    email: joi.string()
      .min(8)
      .required()
      .email(),
    password: joi.string()
      .min(8)
      .required()
  });

module.exports = { userSchema };

