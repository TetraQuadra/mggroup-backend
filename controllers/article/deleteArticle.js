const findSectionModel = require("../../helpers/findSectionModel");

const deleteArticle = async (req, res, next) => {
  const { section } = req.params;
  const SectionModel = findSectionModel(section);

  if (!SectionModel) {
    return res.status(400).json({ message: "wrong section" });
  }

  try {
    const deletedArticle = await SectionModel.deleteMany()
    if (deletedArticle.deletedCount === 0) {
      return res.status(404).json({ message: "No documents found to delete" });
    }
    res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteArticle;
