import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares.js";
import routes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.API_ORIGIN,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", routes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
