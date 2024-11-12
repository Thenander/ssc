import pool from "../db.js";

export async function getSamplesFromDB() {
  const sql =
    "SELECT id, sample, sample_type as type, source_id as sourceId FROM samples ORDER BY sample ASC;";
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
