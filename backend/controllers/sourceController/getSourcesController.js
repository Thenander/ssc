import { getSourcesFromDB } from "../../models/Sources.js";

export async function getSourcesController(req, res, next) {
  try {
    const types = await getSourcesFromDB();
    if (types) {
      console.log("types", types);
      res.json(types);
    } else {
      res.status(404).json({ error: "No types found" });
    }
  } catch (error) {
    next(error);
  }
}
