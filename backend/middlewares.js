export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status = statusCode;

  const responseBody = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  };

  console.error(responseBody);
  res.json("Server error.");
}
