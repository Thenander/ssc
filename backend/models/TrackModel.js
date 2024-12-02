import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const TrackModel = {
  getAllTracks: async () => {
    const sql = `SELECT  t.id
                        ,t.title      AS 'title'
                        ,t.release_id AS 'releaseId'
                        ,r.title      AS 'release'
                        ,r.year
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
    const sql = `SELECT  id
                        ,title
                        ,track_number AS 'trackNumber'
                        ,release_id   AS 'release'
                  FROM tracks
                  WHERE id = ?`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
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
    const sql = `SELECT  r.id                         AS 'key'
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
    const sql = `SELECT  id
                        ,title
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
};

export default TrackModel;
