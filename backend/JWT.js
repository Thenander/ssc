import jwt from "jsonwebtoken";

export function createToken(user) {
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_TOKEN,
    { expiresIn: "12h" }
  );

  return accessToken;
}

export function validateToken(req, res, next) {
  const token = req.get("Authorization").split(" ")[1];

  console.log("token", token);

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}
