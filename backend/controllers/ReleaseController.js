import ReleaseModel from "../models/ReleaseModel.js";

const ReleaseController = {
  //////////
  // GET
  getRelease: async (req, res) => {
    const releaseId = req.query.id;

    let releaseData;
    let types;

    try {
      if (releaseId) {
        let releaseTypes;
        // GET format options
        releaseTypes = await ReleaseModel.getReleaseTypes();
        types = releaseTypes.map((type) => ({
          code: type.sub_type,
          text: type.text,
        }));

        if (isNaN(Number(releaseId))) {
          // New release
          releaseData = {};
        } else if (releaseId) {
          // Single release
          releaseData = await ReleaseModel.getReleaseById(releaseId);
        }
      } else {
        // All releases
        releaseData = await ReleaseModel.getAllReleases();
      }

      const singleRelease = {
        formatOptions: types ?? [],
        release: releaseData,
      };

      if (!releaseData) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json(releaseId ? singleRelease : releaseData);
    } catch (error) {
      if (error.errno) {
        res.status(500).json({ error: error.sqlMessage });
      }

      res.status(500).json({ error: err.message });
    }
  },

  //////////
  // PUT
  updateRelease: async (req, res) => {
    const releaseId = req.query.id;
    const { body } = req;

    try {
      const result = await ReleaseModel.updateRelease(releaseId, body);
      res.json(result);
    } catch (error) {
      console.log(error);

      res.status(500).send({ error });
    }
  },

  //////////
  // POST
  createRelease: async (req, res) => {
    const { body } = req;

    try {
      const result = await ReleaseModel.createRelease(body);

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error });
    }
  },

  //////////
  // DELETE
  deleteRelease: async (req, res) => {
    const releaseId = req.query.id;

    try {
      const result = await ReleaseModel.deleteRelease(releaseId);

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error });
    }
  },
};

export default ReleaseController;
