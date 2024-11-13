import pool from "../db.js";

export async function addSourceInDB({ title, producer, sourceType, year }) {
  const sql =
    "INSERT INTO sources (title, producer, source_type, year) VALUES (?, ?, ?, ?);";

  try {
    const [result] = await pool.query(sql, [title, producer, sourceType, year]);
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

export async function getSourcesFromDB() {
  const sql = `SELECT  s.id
                      ,s.title
                      ,t.text AS type
                      ,s.producer
                      ,s.year
                FROM sources AS s
                JOIN types AS t
                ON s.source_type = t.sub_type
                WHERE t.main_type = "SOURCE"
                ORDER BY type, s.year ASC;`;
  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export async function getSourceTypesFromDB() {
  const sql =
    "SELECT * FROM types WHERE main_type = 'SOURCE' ORDER BY list_order ASC;";
  try {
    const [result] = await pool.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
