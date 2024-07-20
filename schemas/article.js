const Joi = require("joi");

const ImageSchema = Joi.object({
  path: Joi.string().required(),
  alt: Joi.string().required(),
});

const ArrayItemSchema = Joi.object({
  title: Joi.string().required(),
  descr: Joi.string().required(),
  img: Joi.string().required(),
  alt: Joi.string().required(),
});

const TabSchema = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  imagesArr: Joi.array().items(ImageSchema).required(),
});

const SectionSchema = Joi.object({
  show: Joi.boolean().required(),
  title: Joi.string().required(),
  descr: Joi.string().required(),
  img: Joi.string().required(),
  altText: Joi.string().required(),
  btn: Joi.string().required(),
  btnLink: Joi.string().required(),
  array: Joi.array().items(ArrayItemSchema).required(),
  tabs: Joi.array().items(TabSchema).required(),
});

const LandingPageSchema = Joi.object({
  landingName: Joi.string().required(),
  hero: SectionSchema.required(),
  aboutUs: SectionSchema.required(),
  services: SectionSchema.required(),
  lastWorks: SectionSchema.required(),
  prefs: SectionSchema.required(),
});

module.exports = { LandingPageSchema };
