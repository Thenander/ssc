import pool from "../db.js";
import throwDbError from "../util/throwDbError.js";

const SourceModel = {
  getAllSources: async () => {
    const sql = `SELECT CONVERT(s.id,CHARACTER)    AS "id"
                        ,s.producer
                        ,s.title
                        ,t.text                    AS "type"
                        ,CONVERT(s.year,CHARACTER) AS "year"
                  FROM sources AS s
                  JOIN types AS t
                  ON s.source_type = t.sub_type
                  WHERE t.main_type = "SOURCE"
                  ORDER BY s.year, t.text, s.title ASC;`;
    try {
      const [results] = await pool.query(sql);
      return results;
    } catch (error) {
      throwDbError(error);
    }
  },

  getSourceById: async (id) => {
    const sql = `SELECT  CONVERT(id,CHARACTER)   AS "id"
                        ,title
                        ,producer
                        ,source_type             AS "type"
                        ,CONVERT(year,CHARACTER) AS "year"
                  FROM sources
                  WHERE id = ?;`;
    try {
      const [results] = await pool.query(sql, [id]);
      return results[0];
    } catch (error) {
      throwDbError(error);
    }
  },

  createSource: async ({ title, producer, year, type }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }
    const sql =
      "INSERT INTO sources (title, producer, year, source_type) VALUES (?, ?, ?, ?);";

    try {
      const [result] = await pool.query(sql, [title, producer, yearInt, type]);
      const json = JSON.parse(JSON.stringify(result));

      return json;
    } catch (error) {
      throwDbError(error);
    }
  },

  updateSource: async (id, { title, producer, year, type }) => {
    const yearInt = parseInt(year, 10);

    if (isNaN(yearInt) || yearInt < 1000 || yearInt > 9999) {
      throw new Error("Invalid year format. Year must be a 4-digit number.");
    }

    const sql = `UPDATE sources
                  SET title = ?, producer = ?, year = ?, source_type = ?
                  WHERE id = ?;`;
    try {
      const [result] = await pool.query(sql, [
        title,
        producer,
        yearInt,
        type,
        id,
      ]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  deleteSource: async (id) => {
    const sql = "DELETE FROM sources WHERE id = ?";
    try {
      const [result] = await pool.query(sql, [id]);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },

  getSourceTypes: async () => {
    const sql = `SELECT  sub_type AS 'key'
                        ,text     AS 'value'
                  FROM types
                  WHERE main_type = 'SOURCE'
                  ORDER BY text;`;
    try {
      const [result] = await pool.query(sql);
      return result;
    } catch (error) {
      throwDbError(error);
    }
  },
};

export default SourceModel;
