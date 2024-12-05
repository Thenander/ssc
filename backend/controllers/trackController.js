import TrackModel from "../models/TrackModel.js";

const TrackController = {
  //////////
  // GET
  getTrack: async (req, res, err) => {
    const trackId = req.query.id;

    let trackData;
    let releases = [];
    let releaseTracks = [];

    try {
      if (trackId) {
        // GET format options
        releases = await TrackModel.getAllReleases();

        if (isNaN(Number(trackId))) {
          // New track
          trackData = {};
        } else if (trackId) {
          // Single track
          trackData = await TrackModel.getTrackById(trackId);
          if (trackData) {
            releaseTracks = await TrackModel.getTracksByRelease(
              trackData.release
            );
          }
        }
      } else {
        // All tracks
        trackData = await TrackModel.getAllTracks();
      }

      const singleTrack = {
        releases,
        track: trackData,
        releaseTracks,
      };

      console.log(singleTrack);

      if (!trackData) {
        return res.status(404).json({ error: "Not found" });
      }

      res.json(trackId ? singleTrack : trackData);
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
  updateTrack: async (req, res) => {
    const trackId = req.query.id;
    const { body } = req;

    const params = {
      id: parseInt(body.id, 10),
      title: body.title,
      trackNumber: parseInt(body.trackNumber, 10),
      release: parseInt(body.release, 10),
    };

    try {
      const result = await TrackModel.updateTrack(trackId, params);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },

  //////////
  // POST
  createTrack: async (req, res) => {
    const { body } = req;
    try {
      const result = await TrackModel.createTrack(body);
      res.json(result);
    } catch (error) {
      console.error("*** trackController ***", error);
      res.status(500).json({ error });
    }
  },

  //////////
  // DELETE
  deleteTrack: async (req, res) => {
    const trackId = req.query.id;
    try {
      const result = await TrackModel.deleteTrack(trackId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error });
    }
  },
};

export default TrackController;
