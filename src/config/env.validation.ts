import * as Joi from 'joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  MONGO_URI: Joi.string().uri().required(),
  CORS_ORIGIN: Joi.string().required(),
});
