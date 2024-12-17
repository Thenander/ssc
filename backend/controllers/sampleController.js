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
    let releases = [];

    try {
      if (sampleId) {
        console.log(sampleId);

        // GET type options
        types = await SampleModel.getSampleTypes();

        // GET sources
        sources = await SampleModel.getAllSources();

        // GET releases, tracks and refs
        const releasesWithTracks = getReleasesWithTracks(
          await SampleModel.getAllTracks()
        );
        const refs = await SampleModel.getRefsById(sampleId);

        releases = combineTracksWithRefs(releasesWithTracks, refs);

        if (isNaN(Number(sampleId))) {
          // New sample
          sampleData = {};
        } else if (sampleId) {
          // Single sample
          sampleData = await SampleModel.getSampleById(sampleId);
          if (sampleData) {
            sourceSamples = await SampleModel.getSamplesBySource(
              sampleData.source
            );
          }
        }
      } else {
        // All samples
        sampleData = await SampleModel.getAllSamples();
      }

      const singleSample = {
        types,
        sources,
        sample: sampleData,
        sourceSamples,
        releases,
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
    const sampleId = req.query.id;
    const { body } = req;
    const newRefs = extractRefsFromTracks(body.releases);

    const uniqueRefs = [];
    newRefs.forEach((ref) => {
      if (!uniqueRefs.some((item) => item.trackId === ref.trackId)) {
        uniqueRefs.push(ref);
      }
    });

    const params = {
      id: parseInt(body.id, 10),
      sample: body.sample,
      source: body.source,
      type: body.type,
    };

    try {
      const currentRefs = await SampleModel.getRefsById(sampleId);
      const currentTrackIds = currentRefs.map((row) => row.trackId);

      const newTrackIds = uniqueRefs.map((ref) => ref.trackId);
      const tracksToAdd = newTrackIds.filter(
        (id) => !currentTrackIds.includes(id)
      );
      if (tracksToAdd.length > 0) {
        await SampleModel.addMultipleRefs(sampleId, tracksToAdd);
      }
      const tracksToRemove = currentTrackIds.filter(
        (id) => !newTrackIds.includes(id)
      );

      for (const trackId of tracksToRemove) {
        await SampleModel.deleteRef(sampleId, trackId);
      }

      for (const trackId of tracksToAdd) {
        await SampleModel.addRef(sampleId, trackId);
      }

      const result = await SampleModel.updateSample(sampleId, params);

      res.status(200).json({ message: "Sample updated successfully", result });
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

function getReleasesWithTracks(rows) {
  const releasesMap = {};

  rows.forEach((row) => {
    const releaseId = row.releaseId;
    const releaseTitle = row.releaseTitle;
    const releaseYear = row.releaseYear;
    const trackId = row.trackId;
    const trackTitle = row.trackTitle;
    const trackNumber = row.trackNumber;

    if (!releasesMap[releaseId]) {
      releasesMap[releaseId] = {
        id: releaseId,
        title: releaseTitle,
        year: releaseYear,
        tracks: [],
      };
    }

    if (trackTitle) {
      releasesMap[releaseId].tracks.push({
        id: trackId,
        title: trackTitle,
        trackNumber,
      });
    }
  });

  const releases = Object.values(releasesMap);

  return releases;
}

function combineTracksWithRefs(releases, refs) {
  return releases.map((release) => ({
    ...release,
    tracks: release.tracks.map((track) => ({
      ...track,
      checked: refs.some((ref) => ref.trackId === track.id),
    })),
  }));
}

const extractRefsFromTracks = (releases) => {
  const refs = [];
  releases.forEach((release) => {
    release.tracks.forEach((track) => {
      if (track.checked) {
        refs.push({
          refId: `${track.id}-${release.id}`,
          trackId: track.id,
          releaseId: release.id,
          trackTitle: track.title,
          trackNumber: track.trackNumber || null,
        });
      }
    });
  });
  return refs;
};
