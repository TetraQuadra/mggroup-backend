const findSectionModel = require("../../helpers/findSectionModel");

const postArticle = async (req, res, next) => {
  const { section } = req.params;
  const sectionData = req.body;
  const SectionModel = findSectionModel(section);

  if (!SectionModel) {
    return res.status(400).json({ message: "wrong section" });
  }

  try {
    const existingSection = await SectionModel.findOne();
    if (existingSection) {
      const updatedSection = await SectionModel.findByIdAndUpdate(
        existingSection._id,
        sectionData,
        { new: true }
      );
      return res.status(200).json(updatedSection);
    }

    const newSection = new SectionModel(sectionData);
    const savedSection = await newSection.save();
    return res.status(201).json(savedSection);
  } catch (error) {
    next(error);
  }
};

module.exports = postArticle;
