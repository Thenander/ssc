import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/table";
import { useForm } from "react-hook-form";
import axios from "axios";
import Login from "./LoginPage.js";

function Home() {
  const { reset } = useForm();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (alert && alert.variant === "info") {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const onClickDelete = async (e) => {
    setAlert(null);
    const response = await deleteUser(e.target.value);
    if (response.info) {
      setAlert({ variant: "info", msg: response.info });
      await getUsers();
      reset();
    } else {
      setAlert({
        variant: "danger",
        msg: response.err || "Unable to delete user",
      });
    }
  };

  return (
    <div className="container mt-5">
      <Login />
      <Table>
        <thead>
          <tr>
            {["Förnamn", "Efternamn", "Email", "Ta bort"].map((header) => (
              <th className="w-25" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(({ id, firstName, lastName, email }) => (
              <tr key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>
                  <Button
                    disabled={!canEdit}
                    value={id}
                    size="sm"
                    variant="danger"
                    onClick={onClickDelete}
                  >
                    Delete user
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );

  async function getUsers() {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/V1/users/all"
      );

      console.log("response", response);

      if (!response.statusText === "OK") {
        throw new Error("Failed to fetch users");
      }

      const users = response.data;

      setUsers((Array.isArray(users) && users) || []);
    } catch (error) {
      setAlert({ variant: "danger", msg: "Failed to load users" });
    }
  }

  async function deleteUser(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/V1/users/delete/${id}`
      );

      if (!response.statusText === "OK") {
        throw new Error("Failed to delete user");
      }

      console.log(response);
    } catch (err) {
      setAlert({ variant: "danger", msg: "Failed to delete user" });
    }
  }
}

export default Home;
