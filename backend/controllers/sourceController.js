import SourceModel from "../models/SourceModel.js";

const SourceController = {
  //////////
  // GET
  getSource: async (req, res) => {
    const sourceId = req.query.id;

    let sourceData;
    let types;
    let tracks;

    try {
      if (sourceId) {
        // GET type options
        types = await SourceModel.getSourceTypes();

        // // GET tracks
        // tracks = await TrackModel.getAllTracksFromSourceById(sourceId);

        if (isNaN(Number(sourceId))) {
          // New release
          sourceData = {};
        } else if (sourceId) {
          // Single release
          sourceData = await SourceModel.getSourceById(sourceId);
        }
      } else {
        // All releases
        sourceData = await SourceModel.getAllSources();
        console.log("sourceData", sourceData);
      }

      const singleSource = {
        source: sourceData,
        typeOptions: types ?? [],
        // tracks: tracks ?? [],
      };

      if (!sourceData) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json(sourceId ? singleSource : sourceData);
    } catch (error) {
      if (error.code === "ECONNREFUSED") {
        return res.status(503).json({
          error: "Database connection refused. Please try again later.",
        });
      }

      res.status(500).json({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  },

  //////////
  // PUT
  updateSource: async (req, res) => {
    const sourceId = req.query.id;
    const { body } = req;

    try {
      const result = await SourceModel.updateSource(sourceId, body);
      res.json(result);
    } catch (error) {
      console.log(error);

      res.status(500).send({ error });
    }
  },

  //////////
  // POST
  createSource: async (req, res) => {
    const { body } = req;

    try {
      const result = await SourceModel.createSource(body);

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error });
    }
  },

  //////////
  // DELETE
  deleteSource: async (req, res) => {
    const sourceId = req.query.id;

    try {
      const result = await SourceModel.deleteSource(sourceId);

      res.json(result);
    } catch (error) {
      console.error(error);

      res.status(500).json({ error });
    }
  },
};

export default SourceController;
