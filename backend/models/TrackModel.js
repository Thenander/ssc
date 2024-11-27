import pool from "../db.js";

const TrackModel = {
  getAllTracks: async () => {
    const sql = `SELECT id
                      ,track_number AS trackNumber
                      ,title
                FROM tracks
                ORDER BY title ASC;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },

  getTrackById: async (id) => {
    const sql = `SELECT id
                      ,title
                      ,track_number AS 'trackNumber'
                      ,release_id AS 'release'
                FROM tracks
                WHERE id = ?`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  createTrack: async ({ title, trackNumber, release }) => {
    const sql = `INSERT INTO tracks (title, track_number, release_id) VALUES (?, ?, ?);`;
    try {
      const [result] = await pool.query(sql, [title, trackNumber, release]);
      const json = JSON.parse(JSON.stringify(result));
      return json;
    } catch (err) {
      throw err;
    }
  },

  updateTrack: async (id, { title, trackNumber, release }) => {
    const sql = `UPDATE tracks
                  SET title = ?, track_number = ?, release_id = ?
                  WHERE id = ?;`;
    try {
      const [result] = await pool.query(sql, [title, trackNumber, release, id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteTrack: async (id) => {
    const sql = "DELETE FROM tracks WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  getAllReleases: async () => {
    const sql = `SELECT  r.id                                        AS 'key'
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
      throw error;
    }
  },

  getAllTracksFromReleaseById: async (releaseId) => {
    const sql = `SELECT  id, title
                  FROM tracks
                  WHERE release_id = ?
                  ORDER BY track_number;`;
    try {
      const [result] = await pool.query(sql, [releaseId]);
      return result;
    } catch (error) {}
    throw error;
  },
};

export default TrackModel;
