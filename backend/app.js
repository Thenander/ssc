import express from "express";
import { errorHandler } from "./middlewares.js";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

// Ladda miljövariabler från .env-filen
dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.API_ORIGIN || "http://localhost:3000", // Fallback om API_ORIGIN inte är definierad
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use("/", routes);

// Error handler som sista middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
