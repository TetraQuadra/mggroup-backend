const Joi = require("joi");

const HeroSchema = Joi.object({
  _id: Joi.string().optional(),
  show: Joi.boolean().required(),
  title: Joi.string().required(),
  descr: Joi.string().required(),
  img: Joi.string().required(),
  altText: Joi.string().required(),
  btn: Joi.string().required(),
});

const AboutUsSchema = Joi.object({
  _id: Joi.string().optional(),
  show: Joi.boolean().required(),
  array: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        descr: Joi.string().required(),
        img: Joi.string().required(),
        alt: Joi.string().required(),
      })
    )
    .required(),
});

const ServicesSchema = Joi.object({
  _id: Joi.string().optional(),
  show: Joi.boolean().required(),
  title: Joi.string().required(),
  array: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        descr: Joi.string().required(),
        bnt: Joi.string().required(),
        btnLink: Joi.string().required(),
        img: Joi.string().required(),
        img2x: Joi.string().required(),
        alt: Joi.string().required(),
      })
    )
    .required(),
});

const LastWorksSchema = Joi.object({
  _id: Joi.string().optional(),
  show: Joi.boolean().required(),
  title: Joi.string().required(),
  tabs: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        name: Joi.string().required(),
        imagesArr: Joi.array()
          .items(
            Joi.object({
              path: Joi.string().required(),
              alt: Joi.string().required(),
            })
          )
          .required(),
      })
    )
    .required(),
});

const PrefsSchema = Joi.object({
  _id: Joi.string().optional(),
  show: Joi.boolean().required(),
  title: Joi.string().required(),
  array: Joi.array()
    .items(
      Joi.object({
        img: Joi.string().required(),
        alt: Joi.string().required(),
        title: Joi.string().required(),
      })
    )
    .required(),
});

module.exports = {
  HeroSchema,
  AboutUsSchema,
  ServicesSchema,
  LastWorksSchema,
  PrefsSchema,
};
