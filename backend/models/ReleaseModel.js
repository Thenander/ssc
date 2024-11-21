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
                  ORDER BY r.year ASC;`;

    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (err) {
      throw err;
    }
  },

  getReleaseById: async (id) => {
    const sql = `SELECT  r.id
                    ,r.title
                    ,r.artist
                    ,r.year
                    ,t.text AS format
                FROM releases r
                JOIN types t
                ON r.format_type = t.sub_type
                WHERE t.main_type = "RELEASE"
                AND r.id = ?;`;

    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (err) {
      throw err;
    }
  },

  createRelease: async ({ title, artist, year, format }) => {
    const sql =
      "INSERT INTO releases (title, artist, year, format_type) VALUES (?, ?, ?, ?);";

    try {
      const [result] = await pool.query(sql, [title, artist, year, format]);
      const json = JSON.parse(JSON.stringify(result));

      if (json.affectedRows) {
        return json;
      } else {
        return {};
      }
    } catch (err) {
      throw err;
    }
  },

  updateRelease: async (id, userData) => {
    // const sql =
    //   "UPDATE releases SET name = ?, email = ?, password = ? WHERE id = ?";
    // try {
    //   const [result] = await pool.query(sql, [
    //     userData.name,
    //     userData.email,
    //     userData.password,
    //     id,
    //   ]);
    //   return result;
    // } catch (err) {
    //   throw err;
    // }
  },

  deleteRelease: async (id) => {
    // const sql = "DELETE FROM users WHERE id = ?";
    // try {
    //   const [result] = await pool.query(sql, [id]);
    //   return result;
    // } catch (err) {
    //   throw err;
    // }
  },

  getReleaseTypes: async () => {
    const sql =
      "SELECT * FROM types WHERE main_type = 'RELEASE' ORDER BY list_order;";

    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (err) {
      throw err;
    }
  },
};

export default ReleaseModel;
