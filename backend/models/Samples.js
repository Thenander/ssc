import pool from "../db.js";

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
