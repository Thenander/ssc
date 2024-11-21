import ReleaseModel from "../models/ReleaseModel.js";

const ReleaseController = {
  getAllReleases: async (req, res) => {
    try {
      const releases = await ReleaseModel.getAllReleases();
      res.json(releases);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getReleaseById: async (req, res) => {
    const releaseId = req.params.id;
    try {
      const release = await ReleaseModel.getReleaseById(releaseId);
      if (!release) {
        return res.status(404).json({ error: "Release not found" });
      }
      res.json(release);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ReleaseController;
