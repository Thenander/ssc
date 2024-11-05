import jwt from "jsonwebtoken";

export function validateToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export function createToken(user) {
  const accessToken = jwt.sign(
    { username: user.username, id: user.id },
    process.env.JWT_TOKEN
  );

  return accessToken;
}

/* import pkg from "jsonwebtoken";
const { sign, verify } = pkg;

export function createToken(user) {
  const accessToken = sign(
    { username: user.username, id: user.id },
    process.env.JWT_TOKEN
  );

  return accessToken;
}

export function validateToken(req, res, next) {
  console.log(req.cookies);

  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(400).json({ err: "User not authenticated" });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_TOKEN);
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
}
 */
