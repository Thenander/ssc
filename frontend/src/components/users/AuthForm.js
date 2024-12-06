import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Check } from "react-bootstrap-icons";

import FormInput from "../formComponents/FormInput";
import Checked from "../Checked/Check";

import { useAuth } from "../../contexts/AuthProvider.js";

import { MODES } from "./modes.js";

import axios from "axios";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

function AuthForm({ mode, setAlert }) {
  const { setAuth, auth } = useAuth();
  console.log(auth);

  const isSignUp = mode === "signup";
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues,
  });

  // Password check
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [pwCheck, setPwCheck] = useState(false);

  // Loader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (repeatedPassword && getValues("password") === repeatedPassword) {
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  }, [getValues, repeatedPassword]);

  return (
    <Container className="mt-5">
      <h1>{MODES[mode].action}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {isSignUp && (
            <div className="w-100">
              <FormInput
                disabled={loading}
                id="firstName"
                label="First name"
                type="text"
                placeholder="John"
                register={register}
              />
              disabled={loading}
              <FormInput
                id="lastName"
                label="Last name"
                type="text"
                placeholder="Doe"
                register={register}
              />
              <FormInput
                disabled={loading}
                id="email"
                label="Email"
                type="email"
                placeholder="email@example.com"
                register={register}
              />
            </div>
          )}
          <div className="w-100">
            <FormInput
              disabled={loading}
              id="username"
              label="Username"
              type="text"
              placeholder="Spiderman"
              register={register}
            />

            <FormInput
              disabled={loading}
              id="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              callback={(val) => {
                console.log(val);
              }}
            />
            {isSignUp && (
              <div className="position-relative">
                {pwCheck && (
                  <Badge bg="success" pill={true}>
                    <Check />
                  </Badge>
                )}
                <FormInput
                  disabled={loading}
                  id="repeatPassword"
                  label="Repeat password"
                  type="password"
                  placeholder="password"
                  register={() => {}}
                  callback={(e) => {
                    setRepeatedPassword(e.target.value);
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div
          style={{ height: "100px" }}
          className="d-flex justify-content-center align-items-center"
        >
          {false ? (
            <Checked />
          ) : (
            <Button disabled={loading} type="submit" variant="primary">
              {MODES[mode].action}
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );

  async function onSubmit(params) {
    const isComplete = Object.values(params).every((value) => value);
    if (
      isComplete &&
      isSignUp &&
      (repeatedPassword || getValues("password")) &&
      getValues("password") !== repeatedPassword
    ) {
      return console.log("Check Password field");
    }

    try {
      setLoading(true);
      const response = await axios.post(MODES[mode].apiUrl, params);

      console.log(response);

      if (isSignUp) {
        // Signup
        if (response.status === 201) {
          setPwCheck();
          const { token } = response.data;
          localStorage.setItem("token", token);
          reset();
          setLoading(false);
        } else if (response.data?.err) {
          setLoading(false);
        }
      } else {
        // Login
        if (response.status === 200) {
          const { token } = response.data;
          console.log("token", token);
          localStorage.setItem("token", token);
          setAuth(response.data);
          reset();
          setLoading(false);
          setAlert({ success: response.data.message });
        } else if (response.data?.err) {
          setLoading(false);
        }
      }
    } catch (error) {
      handleAxiosError(error);
      setLoading(false);
    }
  }

  function handleAxiosError(error) {
    console.log("error", error);
    if (error.response) {
      console.error("Response Error:", error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("Error config:", error.config);
  }
}

function WelcomeMessage({ mode }) {
  return (
    <div>
      <Card.Title>{MODES[mode].welcome}</Card.Title>
      <Card.Text className="mb-3">{MODES[mode].text}</Card.Text>
    </div>
  );
}

export default AuthForm;
