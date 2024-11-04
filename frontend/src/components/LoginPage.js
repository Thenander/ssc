import Button from "react-bootstrap/button";
import React, { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const { register, handleSubmit } = useForm();
  const [info, setInfo] = useState();

  const style = {
    backgroundColor: "antiquewhite",
    borderRadius: ".5rem",
    padding: "1rem",
  };

  return (
    <div className="container mt-5 w-25" style={style}>
      <Form onSubmit={handleSubmit(login)}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", { required: true })}
            className="mb-3"
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", { required: true })}
          />
        </Form.Group>
        <Button type="submit" className="mt-4">
          Logga in
        </Button>
      </Form>
      {info && (
        <Alert className="mt-4" variant="danger">
          {info}
        </Alert>
      )}
    </div>
  );

  async function login(params) {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    try {
      setInfo();
      const response = await axios
        .post(
          "http://localhost:8080/api/V1/login",
          { params },
          { headers: headersList }
        )
        .catch((err) => console.log(err));
      if (!response.statusText === "OK") {
        setInfo("Failed to login");
      }
    } catch (error) {}
  }
}

export default Login;
