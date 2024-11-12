import { getReleaseTypesFromDB } from "../../models/Releases.js";

export async function getReleaseTypesController(req, res, next) {
  try {
    const types = await getReleaseTypesFromDB();
    if (types) {
      const formattedTypes = formatTypes(types);
      res.json(formattedTypes);
    } else {
      res.status(404).json({ error: "No formats found" });
    }
  } catch (error) {
    next(error);
  }
}

function formatTypes(types) {
  return types.map((type) => ({
    id: type.id,
    format: type.sub_type,
    text: type.text,
  }));
}
