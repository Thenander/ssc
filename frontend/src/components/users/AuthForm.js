import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FormInput from "../formComponents/FormInput";
import classes from "./AuthForm.module.scss";
import Alert from "../Alert.js";
import { Badge } from "react-bootstrap";
import { Check } from "react-bootstrap-icons";

const MODES = {
  login: {
    apiUrl: "http://localhost:8080///",
    successMessage: "Successfully logged in!",
    action: "Login",
    prompt: "Please login to explore",
    welcome: "Welcome back!",
    text: "Please login to explore",
  },
  signup: {
    apiUrl: "http://localhost:8080/api/V1/users/add",
    successMessage: "Successfully signed up!",
    action: "Sign up",
    prompt: "Please sign up to explore",
    welcome: "Welcome!",
    text: "Please sign up to explore",
  },
};

function AuthForm({ mode }) {
  const isSignUp = mode === "signup";

  const { register, handleSubmit, getValues } = useForm();
  const [inputError, setInputError] = useState(null);
  const [axiosError, setAxiosError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [pwCheck, setPwCheck] = useState(false);

  useEffect(() => {
    if (getValues("password") === repeatedPassword) {
      setPwCheck(true);
      setInputError(null);
    } else {
      setPwCheck(false);
    }
  }, [getValues, repeatedPassword]);

  const onSubmit = async (params) => {
    console.log(params);

    if (isSignUp && getValues("password") !== repeatedPassword) {
      return setInputError("Check Password field");
    }

    resetFeedbackStates();

    try {
      const response = await axios.post(MODES[mode].apiUrl, params);

      if (response.status === 201) {
        setSuccess(MODES[mode].successMessage);
      } else if (response.data?.err) {
        setInputError(response.data.err);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const handleAxiosError = (error) => {
    if (error.response) {
      setAxiosError(error.response.data.err);
      console.error("Response Error:", error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("Error config:", error.config);
  };

  const resetFeedbackStates = () => {
    setInputError(null);
    setAxiosError(null);
    setSuccess(null);
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Card.Header className={classes.header}>
          {MODES[mode].action}
        </Card.Header>
        <Card.Body>
          <WelcomeMessage mode={mode} />
          <Alert
            type="danger"
            message={inputError}
            onClose={() => setInputError(null)}
          />
          <Alert
            type="danger"
            message={axiosError}
            onClose={() => setAxiosError(null)}
          />
          <Alert
            type="success"
            message={success}
            onClose={() => setSuccess(null)}
          />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes["column-wrapper"]}>
              {isSignUp && (
                <div className="w-100">
                  <FormInput
                    id="firstName"
                    label="First name"
                    type="text"
                    placeholder="John"
                    register={register}
                    inputError={inputError}
                  />
                  <FormInput
                    id="lastName"
                    label="Last name"
                    type="text"
                    placeholder="Doe"
                    register={register}
                    inputError={inputError}
                  />
                  <FormInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    register={register}
                    inputError={inputError}
                  />
                </div>
              )}
              <div className="w-100">
                <FormInput
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Spiderman"
                  register={register}
                  inputError={inputError}
                />

                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  register={register}
                  inputError={inputError}
                  callback={(val) => {
                    console.log(val);
                  }}
                />
                {isSignUp && (
                  <div className="position-relative">
                    {pwCheck && (
                      <Badge
                        className={classes["success-badge"]}
                        bg="success"
                        pill={true}
                      >
                        <Check />
                      </Badge>
                    )}
                    <FormInput
                      id="repeatPassword"
                      label="Repeat password"
                      type="password"
                      placeholder="password"
                      register={() => {}}
                      inputError={inputError}
                      callback={(e) => {
                        setRepeatedPassword(e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="warning"
              className={`${classes.button} my-4`}
            >
              {MODES[mode].action}
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Sampling, scratches and cuts
        </Card.Footer>
      </Card>
    </div>
  );
}

function WelcomeMessage({ mode }) {
  return (
    <div className={classes.welcome}>
      <Card.Title>{MODES[mode].welcome}</Card.Title>
      <Card.Text className="mb-3">{MODES[mode].text}</Card.Text>
    </div>
  );
}

export default AuthForm;
