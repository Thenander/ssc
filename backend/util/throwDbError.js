export default function throwError(error) {
  if (error.code === "ECONNREFUSED") {
    console.error("Database connection was refused:", error);
    throw new Error(
      "Could not connect to the database. Please try again later."
    );
  } else {
    console.error("Database query failed:", error);
    throw new Error("An unexpected database error occurred.");
  }
}
