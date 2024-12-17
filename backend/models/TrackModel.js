import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const TrackModel = {
  getAllTracks: async () => {
    const sql = `SELECT  CONVERT(t.id,CHARACTER)           AS 'id'
                        ,t.title                           AS 'title'
                        ,CONVERT(t.release_id,CHARACTER)   AS 'releaseId'
                        ,r.title                           AS 'release'
                        ,CONVERT(r.year,CHARACTER)         AS 'year'
                        ,CONVERT(t.track_number,CHARACTER) AS 'trackNumber'
                  FROM tracks AS t
                  JOIN releases AS r
                  ON t.release_id = r.id
                  ORDER BY r.year, r.title, t.track_number;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  getTrackById: async (id) => {
    const sql = `SELECT  CONVERT(id,CHARACTER)           AS 'id'
                        ,title
                        ,CONVERT(track_number,CHARACTER) AS 'trackNumber'
                        ,CONVERT(release_id,CHARACTER)   AS 'release'
                  FROM tracks
                  WHERE id = ?;`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (error) {
      throwDbError(error);
    }
  },

  getTracksByRelease: async (releaseId) => {
    const sql = `SELECT  CONVERT(t.id,CHARACTER)           AS 'id'
                        ,CONVERT(t.track_number,CHARACTER) AS 'trackNumber'
                        ,t.title
                        ,r.title                           AS 'releaseTitle'
                        ,r.format_type                     AS 'format'
                        ,CONVERT(r.year,CHARACTER)         AS 'year'
                  FROM tracks AS t
                  JOIN releases AS r
                  ON t.release_id = r.id
                  WHERE t.release_id = ?;`;
    try {
      const [results] = await pool.query(sql, [releaseId]);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  createTrack: async ({ title, trackNumber, release }) => {
    const sql = `INSERT INTO tracks (title, track_number, release_id) VALUES (?, ?, ?);`;
    try {
      const [result] = await pool.query(sql, [title, trackNumber, release]);
      const json = JSON.parse(JSON.stringify(result));
      return json;
    } catch (error) {
      throwDbError(error);
    }
  },

  updateTrack: async (id, { title, trackNumber, release }) => {
    const sql = `UPDATE tracks
                  SET title = ?, track_number = ?, release_id = ?
                  WHERE id = ?;`;
    try {
      const [result] = await pool.query(sql, [title, trackNumber, release, id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  deleteTrack: async (id) => {
    const sql = "DELETE FROM tracks WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getAllReleases: async () => {
    const sql = `SELECT  CONVERT(r.id,CHARACTER)      AS 'key'
                        ,CONCAT(r.title,' - ',t.text) AS 'value'
                  FROM releases AS r
                  JOIN types AS t
                  ON r.format_type = t.sub_type
                  WHERE t.main_type = "RELEASE"
                  ORDER BY r.title;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getAllTracksFromReleaseById: async (releaseId) => {
    const sql = `SELECT  CONVERT(id,CHARACTER)           AS 'id'
                        ,title
                        ,CONVERT(track_number,CHARACTER) AS trackNumber
                  FROM tracks
                  WHERE release_id = ?
                  ORDER BY track_number;`;
    try {
      const [result] = await pool.query(sql, [releaseId]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getRefsById: async (id) => {
    const sql = `SELECT  smp.id      AS 'sampleId'
                        ,smp.sample
                        ,smptps.text AS 'sampleType'
                        ,src.id      AS 'sourceId'
                        ,src.title   AS 'source'
                        ,srctps.text AS 'sourceType'
                  FROM tracks_samples_ref AS ref
                  JOIN samples AS smp
                  ON smp.id = ref.sample_id
                  JOIN sources AS src
                  ON smp.source_id = src.id
                  JOIN types AS smptps
                  ON smptps.sub_type = smp.sample_type AND smptps.main_type = "SAMPLE"
                  JOIN types AS srctps
                  ON srctps.sub_type = src.source_type AND srctps.main_type = "SOURCE"
                  WHERE ref.track_id = ?;`;
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },
};

export default TrackModel;
