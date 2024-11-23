import ReleaseModel from "../models/ReleaseModel.js";

const ReleaseController = {
  getReleases: async (req, res) => {
    const releaseId = req.query.id;

    let data;

    try {
      if (releaseId) {
        data = await ReleaseModel.getReleaseById(releaseId);
      } else {
        data = await ReleaseModel.getAllReleases();
      }
      res.json(data);
      if (!data) {
        return res.status(404).json({ error: "Not found" });
      }
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ReleaseController;
