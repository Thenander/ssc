import pool from "../db.js";

export async function getTracksFromDB() {
  const sql = "SELECT * FROM tracks ORDER BY release_id, track_number;";

  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
