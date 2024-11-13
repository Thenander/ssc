import pool from "../db.js";

export async function addReleaseInDB({ title, artist, year, format }) {
  const sql =
    "INSERT INTO releases (title, artist, year, format_type) VALUES (?, ?, ?, ?);";

  try {
    const [result] = await pool.query(sql, [
      "title",
      "artist",
      "year",
      "format",
    ]);
    const json = JSON.parse(JSON.stringify(result));

    if (json.affectedRows) {
      return json;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getReleasesFromDB() {
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
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getReleaseTypesFromDB() {
  const sql =
    "SELECT * FROM types WHERE main_type = 'RELEASE' ORDER BY list_order;";
  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
