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
                      ,track_number AS trackNumber
                FROM tracks
                WHERE id = ?`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  createTrack: async (
    {
      /* title, artist, year, format */
    }
  ) => {
    // const yearInt = parseInt(year, 10);
    // if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
    //   throw new Error("Invalid year format. Year must be a 4-digit number.");
    // }
    // const sql =
    //   "INSERT INTO releases (title, artist, year, format_type) VALUES (?, ?, ?, ?);";
    // try {
    //   const [result] = await pool.query(sql, [title, artist, yearInt, format]);
    //   const json = JSON.parse(JSON.stringify(result));
    //   return json;
    // } catch (err) {
    //   throw err;
    // }
  },

  updateTrack: async (
    id,
    {
      /* title, artist, year, format */
    }
  ) => {
    // const yearInt = parseInt(year, 10);
    // if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
    //   throw new Error("Invalid year format. Year must be a 4-digit number.");
    // }
    // const sql = `UPDATE releases
    //     SET title = ?, artist = ?, year = ?, format_type = ?
    //     WHERE id = ?;`;
    // try {
    //   const [result] = await pool.query(sql, [
    //     title,
    //     artist,
    //     yearInt,
    //     format,
    //     id,
    //   ]);
    //   return result;
    // } catch (err) {
    //   throw err;
    // }
  },

  deleteTrack: async (id) => {
    // const sql = "DELETE FROM releases WHERE id = ?";
    // try {
    //   const [result] = await pool.query(sql, [id]);
    //   return result;
    // } catch (err) {
    //   throw err;
    // }
  },

  getAllReleases: async (id) => {
    const sql = `SELECT r.id
                      ,r.artist
                      ,r.title
                      ,t.text
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
};

export default TrackModel;
