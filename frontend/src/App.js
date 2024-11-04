import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

import Login from "./components/LoginPage";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );

  /*   const { register, handleSubmit, reset } = useForm();
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert && alert.variant === "info") {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  useEffect(() => {
    getUsers();
  }, []);

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

  const onSubmit = async (params) => {
    setAlert(null);
    try {
      const response = await submitHandler({ params });

      if (response && !response.err) {
        await getUsers();
        setAlert({ variant: "info", msg: "User added successfully" });
        reset();
      } else if (response && response.err) {
        setAlert({
          variant: "danger",
          msg: response.err || "Unable to add user",
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {[
          { key: "username", label: "Username" },
          { key: "password", label: "Password" },
          { key: "firstName", label: "First name" },
          { key: "lastName", label: "Last name" },
          { key: "email", label: "Email" },
        ].map(({ key, label }) => {
          const isPassword = key === "password";
          return (
            <Form.Group key={key}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={isPassword ? "password" : "text"}
                className="mb-1 w-25"
                {...register(key, { required: true })}
              />
            </Form.Group>
          );
        })}
        {alert && (
          <Alert
            className="w-25 position-fixed top-0 end-0"
            dismissible
            variant={alert?.variant}
            onClose={() => setAlert(null)}
          >
            {alert?.msg}
          </Alert>
        )}

        <Button type="submit">Submit</Button>
      </Form>
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
      <Login />
    </div>
  );

  async function getUsers() {
    try {
      const response = await fetch("http://localhost:8080/api/V1/users/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");

      const users = await response.json();

      setUsers((Array.isArray(users) && users) || []);
    } catch (err) {
      setAlert({ variant: "danger", msg: "Failed to load users" });
    }
  }

  async function deleteUser(id) {
    try {
      const responseFromServer = await fetch(
        `http://localhost:8080/api/V1/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      if (!responseFromServer.ok) throw new Error("Failed to delete user");
      return await responseFromServer.json();
    } catch (err) {
      setAlert({ variant: "danger", msg: "Failed to delete user" });
      return { err };
    }
  }

  async function submitHandler({ params }) {
    try {
      const responseFromServer = await fetch(
        "http://localhost:8080/api/V1/users/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify(params),
        }
      );
      const response = await responseFromServer.json();

      return response;
    } catch (error) {
      throw error;
    }
  } */
}

export default App;
