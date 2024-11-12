import { getTracksFromDB } from "../../models/Tracks.js";

export async function getTracksController(req, res, next) {
  try {
    const tracks = await getTracksFromDB();
    if (tracks) {
      console.log(tracks);

      res.json(tracks);
    } else {
      res.status(404).json({ error: "No tracks found" });
    }
  } catch (error) {
    next(error);
  }
}
