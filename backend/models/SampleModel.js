import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const SampleModel = {
  getAllSamples: async () => {
    const sql = `SELECT  CONVERT(s.id,CHARACTER)        AS 'id'
                        ,s.sample
                        ,CONVERT(s.source_id,CHARACTER) AS 'sourceId'
                        ,sr.title                       AS 'source'
                        ,CONVERT(sr.year,CHARACTER)     AS 'year'
                  FROM samples AS s
                  JOIN sources AS sr
                  ON s.source_id = sr.id
                  ORDER BY sr.year, sr.title, s.sample;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  getSampleById: async (id) => {
    const sql = `SELECT  CONVERT(id,CHARACTER)           AS 'id'
                          ,sample
                          ,CONVERT(source_id,CHARACTER)  AS 'source'
                    FROM samples
                    WHERE id = ?;`;
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
    const sql = `INSERT INTO samples (sample, sample_type, source_id) VALUES (?, ?, ?);`;
    try {
      const [result] = await pool.query(sql, [sample, type, source]);
      const json = JSON.parse(JSON.stringify(result));
      return json;
    } catch (error) {
      throwDbError(error);
    }
  },

  updateSample: async (id, { sample, type, source }) => {
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
    const sql = `SELECT  id    AS "key"
                        ,title AS "value"
                 FROM sources;`;
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
};

export default SampleModel;
