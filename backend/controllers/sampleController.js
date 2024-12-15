import SampleModel from "../models/SampleModel.js";

const SampleController = {
  //////////
  // GET
  getSample: async (req, res, err) => {
    const sampleId = req.query.id;

    let sampleData;
    let sources = [];
    let types = [];
    let sourceSamples = [];

    try {
      if (sampleId) {
        // GET type options
        types = await SampleModel.getSampleTypes();

        // GET format options
        sources = await SampleModel.getAllSources();

        if (isNaN(Number(sampleId))) {
          // New track
          sampleData = {};
        } else if (sampleId) {
          // Single track
          sampleData = await SampleModel.getSampleById(sampleId);
          if (sampleData) {
            sourceSamples = await SampleModel.getSamplesBySource(
              sampleData.source
            );
          }
        }
      } else {
        // All tracks
        sampleData = await SampleModel.getAllSamples();
      }

      const singleSample = {
        types,
        sources,
        sample: sampleData,
        sourceSamples,
      };

      if (!sampleData) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json(sampleId ? singleSample : sampleData);
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
  updateSample: async (req, res) => {
    const sampleNumber = req.query.id;
    const { body } = req;

    const params = {
      id: parseInt(body.id, 10),
      sample: body.sample,
      type: body.type,
      source: body.source,
    };

    try {
      const result = await SampleModel.updateSample(sampleNumber, params);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  //////////
  // POST
  createSample: async (req, res) => {
    const { body } = req;
    try {
      const result = await SampleModel.createSample(body);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },

  //////////
  // DELETE
  deleteSample: async (req, res) => {
    const sampleNumber = req.query.id;
    try {
      const result = await SampleModel.deleteSample(sampleNumber);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};

export default SampleController;
