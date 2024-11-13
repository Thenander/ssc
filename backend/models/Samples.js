import pool from "../db.js";

export async function getSamplesFromDB() {
  const sql = `SELECT  s.id
                      ,s.sample
                      ,t.text
                FROM samples AS s
                JOIN types AS t
                ON s.sample_type = t.sub_type
                WHERE t.main_type = "SAMPLE"
                ORDER BY s.sample ASC;`;

  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSampleTypesFromDB() {
  const sql =
    "SELECT * FROM types WHERE main_type = 'SAMPLE' ORDER BY list_order ASC;";

  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
