export function formatUsers(users) {
  return users.map((user) => ({
    id: user.id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    role: user.role,
  }));
}

export function handleDatabaseError(error, res) {
  console.error(`${error.errno} - ${error.code}: ${error.sqlMessage}`);
  if (error.code === "ER_DUP_ENTRY") {
    res.status(409).json({ err: "Email or username already in use" });
  } else {
    res.status(500).json("Database ERROR");
  }
}

export function formatTypes(types) {
  return types.map((type) => ({
    id: type.id,
    type: type.sub_type,
    text: type.text,
  }));
}
