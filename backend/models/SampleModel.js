import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const SampleModel = {
  getAllSamples: async () => {
    const sql = `SELECT  CONVERT(s.id,CHARACTER)        AS 'id'
                        ,s.sample
                        ,t.text                         AS "type"
                        ,CONVERT(s.source_id,CHARACTER) AS 'sourceId'
                        ,sr.title  AS 'source'
                        ,CONVERT(sr.year,CHARACTER)     AS 'year'
                  FROM samples AS s
                  JOIN sources AS sr
                  ON s.source_id = sr.id
                  JOIN types AS t
                  ON t.main_type = "SOURCE" AND t.sub_type = sr.source_type
                  ORDER BY sr.year, sr.title, s.sample;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  getSampleById: async (id) => {
    const sql = `SELECT  CONVERT(smp.id,CHARACTER)        AS 'id'
                        ,smp.sample
                        ,smp.sample_type                  AS 'type'
                        ,CONVERT(smp.source_id,CHARACTER) AS 'source'
                        ,src.title                        AS 'sourceTitle'
                  FROM samples AS smp
                  JOIN sources AS src
                  ON src.id = smp.source_id
                  WHERE smp.id = ?;`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (error) {
      throwDbError(error);
    }
  },

  getSamplesBySource: async (releaseId) => {
    const sql = `SELECT  CONVERT(s.id,CHARACTER)    AS 'id'
                        ,s.sample
                        ,sr.title                   AS 'sourceTitle'
                        ,sr.source_type             AS 'type'
                        ,CONVERT(sr.year,CHARACTER) AS 'year'
                  FROM samples AS s
                  JOIN sources AS sr
                  ON s.source_id = sr.id
                  WHERE s.source_id = ?;`;
    try {
      const [results] = await pool.query(sql, [releaseId]);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  createSample: async ({ sample, type, source }) => {
    const missingParams = [];
    if (!sample) missingParams.push("sample");
    if (!type) missingParams.push("type");
    if (!source) missingParams.push("source");

    if (missingParams.length > 0) {
      throw new Error({
        error: `Missing parameters: ${missingParams.join(", ")}`,
      });
    }

    const sql = `INSERT INTO samples (sample, sample_type, source_id) VALUES (?, ?, ?);`;
    try {
      const [result] = await pool.query(sql, [sample, type, source]);
      const json = JSON.parse(JSON.stringify(result));
      return json;
    } catch (error) {
      throwDbError(error);
    }
  },

  updateSample: async (id, { sample, type, source, refs }) => {
    const sql = `UPDATE samples
                  SET sample = ?, sample_type = ?, source_id = ?
                  WHERE id = ?;`;
    try {
      const [result] = await pool.query(sql, [sample, type, source, id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  deleteSample: async (id) => {
    const sql = "DELETE FROM samples WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getAllSources: async () => {
    const sql = `SELECT  s.id                         AS "key"
                        ,CONCAT(s.title,' - ',t.text) AS "value"
                  FROM sources AS s
                  JOIN types AS t
                  ON t.main_type = "SOURCE" AND t.sub_type = s.source_type;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getAllSamplesFromSourceById: async (releaseId) => {
    const sql = `SELECT  CONVERT(id,CHARACTER) AS 'id'
                         ,sample
                  FROM samples
                  WHERE source_id = ?
                  ORDER BY sample;`;
    try {
      const [result] = await pool.query(sql, [releaseId]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getSampleTypes: async () => {
    const sql = `SELECT  sub_type AS 'key'
                        ,text     AS 'value'
                  FROM types
                  WHERE main_type = 'SAMPLE'
                  ORDER BY text;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getAllTracks: async () => {
    const sql = `SELECT  releases.id         AS 'releaseId'
                        ,releases.title      AS 'releaseTitle'
                        ,releases.year       AS 'releaseYear'
                        ,tracks.id           AS 'trackId'
                        ,tracks.title        AS 'trackTitle'
                        ,tracks.track_number AS 'trackNumber'
                  FROM releases
                  LEFT JOIN tracks
                  ON releases.id = tracks.release_id
                  ORDER BY releases.year, tracks.track_number;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getRefsById: async (id) => {
    const sql = `SELECT  CONCAT(ref.track_id,'-',ref.sample_id) AS refId
                        ,t.id                                   AS trackId
                        ,t.release_id                           AS releaseId
                        ,t.title                                AS trackTitle
                        ,t.track_number                         AS trackNumber
                  FROM tracks_samples_ref AS ref
                  JOIN tracks AS t
                  ON t.id = ref.track_id
                  JOIN releases AS r
                  WHERE ref.sample_id = ?
                  ORDER BY r.year, r.title, t.track_number;`;
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getRefBySampleId: async (sampleId) => {
    const [rows] = await pool.query(
      "SELECT track_id FROM tracks_samples_ref WHERE sample_id = ?",
      [sampleId]
    );
    return rows;
  },

  deleteRef: async (sampleId, trackId) => {
    await pool.query(
      "DELETE FROM tracks_samples_ref WHERE sample_id = ? AND track_id = ?",
      [sampleId, trackId]
    );
  },

  addRef: async (sampleId, trackId) => {
    const [existing] = await pool.query(
      "SELECT 1 FROM tracks_samples_ref WHERE track_id = ? AND sample_id = ?",
      [trackId, sampleId]
    );

    if (existing.length === 0) {
      await pool.query(
        "INSERT INTO tracks_samples_ref (track_id, sample_id) VALUES (?, ?)",
        [trackId, sampleId]
      );
    }
  },

  addMultipleRefs: async (sampleId, trackIds) => {
    const values = trackIds
      .map((trackId) => `(${trackId}, ${sampleId})`)
      .join(",");

    const sql = `
      INSERT INTO tracks_samples_ref (track_id, sample_id)
      VALUES ${values}
      ON DUPLICATE KEY UPDATE changed = CURRENT_TIMESTAMP
    `;

    await pool.query(sql);
  },
};

export default SampleModel;
