export function formatUsers(users) {
  return users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
  });
}

export function handleDatabaseError(error, res) {
  console.error(`${error.errno} - ${error.code}: ${error.sqlMessage}`);
  if (error.code === "ER_DUP_ENTRY") {
    res.status(409).json({ err: "Email or username already in use" });
  } else {
    res.status(500).json("Database ERROR");
  }
}
