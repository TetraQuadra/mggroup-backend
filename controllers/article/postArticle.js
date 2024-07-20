const findSectionModel = require("../../helpers/findSectionModel");

const postArticle = async (req, res, next) => {
  const { section } = req.params;
  const sectionData = req.body;
  const SectionModel = findSectionModel(section);

  if (!SectionModel) {
    return res.status(400).json({ message: "wrong section" });
  }

  try {
    if (sectionData._id) {
      const updatedSection = await SectionModel.findByIdAndUpdate(
        sectionData._id,
        sectionData,
        { new: true }
      );
      if (!updatedSection) {
        return res.status(404).json({ message: "Section not found" });
      }
      return res.status(200).json(updatedSection);
    }

    const newSection = new SectionModel(sectionData);
    const savedSection = await newSection.save();
    res.status(201).json(savedSection);
  } catch (error) {
    next(error);
  }
};

module.exports = postArticle;
