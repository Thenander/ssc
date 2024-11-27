import pool from "../db.js";

const ReleaseModel = {
  getAllReleases: async () => {
    const sql = `SELECT  r.id
                      ,r.title
                      ,r.artist
                      ,t.text AS type
                      ,r.year
                FROM releases AS r
                JOIN types AS t
                ON r.format_type = t.sub_type
                WHERE t.main_type = "RELEASE"
                ORDER BY r.year, t.text ASC;`;

    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },

  getReleaseById: async (id) => {
    const sql = `SELECT  id
                      ,title
                      ,artist
                      ,year
                      ,format_type AS format
                FROM releases
                WHERE id = ?`;

    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  createRelease: async ({ title, artist, year, format }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }
    const sql =
      "INSERT INTO releases (title, artist, year, format_type) VALUES (?, ?, ?, ?);";

    try {
      const [result] = await pool.query(sql, [title, artist, yearInt, format]);
      const json = JSON.parse(JSON.stringify(result));

      return json;
    } catch (err) {
      throw err;
    }
  },

  updateRelease: async (id, { title, artist, year, format }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }

    const sql = `UPDATE releases
        SET title = ?, artist = ?, year = ?, format_type = ?
        WHERE id = ?;`;

    try {
      const [result] = await pool.query(sql, [
        title,
        artist,
        yearInt,
        format,
        id,
      ]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  deleteRelease: async (id) => {
    const sql = "DELETE FROM releases WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (err) {
      throw err;
    }
  },

  getReleaseTypes: async () => {
    const sql = `SELECT  sub_type AS 'key'
                        ,text     AS 'value'
                  FROM types
                  WHERE main_type = 'RELEASE'
                  ORDER BY text;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default ReleaseModel;
