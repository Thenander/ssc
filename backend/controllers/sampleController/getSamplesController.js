import { getSamplesFromDB } from "../../models/Samples.js";

export async function getSamplesController(req, res, next) {
  try {
    const samples = await getSamplesFromDB();
    if (samples) {
      console.log("samples", samples);

      res.json(samples);
    } else {
      res.status(404).json({ error: "No samples found" });
    }
  } catch (error) {
    next(error);
  }
}
