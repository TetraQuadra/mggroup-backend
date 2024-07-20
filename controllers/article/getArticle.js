const findSectionModel = require("../../helpers/findSectionModel");

const getArticle = async (req, res, next) => {
  const { section } = req.params;
  const SectionModel = findSectionModel(section);

  if (!SectionModel) {
    return res.status(400).json({ message: "wrong section" });
  }

  try {
    const sectionData = await SectionModel.find();
    res.status(200).json(sectionData);
  } catch (error) {
    next(error);
  }
};

module.exports = getArticle;
