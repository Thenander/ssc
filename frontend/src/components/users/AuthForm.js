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
import Checked from "../Checked/Check";
import { MODES } from "./modes.js";
import Spinner from "../Spinner/Spinner.js";
import { useAuth } from "../../contexts/AuthProvider.js";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

function AuthForm({ mode }) {
  const { setAuth, auth } = useAuth();

  const isSignUp = mode === "signup";
  const { register, handleSubmit, getValues, reset } = useForm({
    defaultValues,
  });

  // Alerts
  const [inputError, setInputError] = useState(null);
  const [axiosError, setAxiosError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Password check
  const [repeatedPassword, setRepeatedPassword] = useState();
  const [pwCheck, setPwCheck] = useState(false);

  // Loader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (repeatedPassword && getValues("password") === repeatedPassword) {
      setPwCheck(true);
      setInputError(null);
    } else {
      setPwCheck(false);
    }
  }, [getValues, repeatedPassword]);

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        {loading && <Spinner />}
        <Card.Header className={classes.header}>
          {MODES[mode].action}
        </Card.Header>
        <Card.Body>
          <WelcomeMessage mode={mode} />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes["column-wrapper"]}>
              {isSignUp && (
                <div className="w-100">
                  <FormInput
                    success={success}
                    disabled={loading}
                    id="firstName"
                    label="First name"
                    type="text"
                    placeholder="John"
                    register={register}
                    inputError={inputError}
                  />
                  <FormInput
                    success={success}
                    disabled={loading}
                    id="lastName"
                    label="Last name"
                    type="text"
                    placeholder="Doe"
                    register={register}
                    inputError={inputError}
                  />
                  <FormInput
                    success={success}
                    disabled={loading}
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
                  success={success}
                  disabled={loading}
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Spiderman"
                  register={register}
                  inputError={inputError}
                />

                <FormInput
                  success={success}
                  disabled={loading}
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
                      success={success}
                      disabled={loading}
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
            <div
              style={{ height: "100px" }}
              className="d-flex justify-content-center align-items-center"
            >
              {success ? (
                <Checked />
              ) : (
                <Button
                  disabled={loading}
                  type="submit"
                  variant="warning"
                  className={`${classes.button} ${classes.fade}`}
                >
                  {MODES[mode].action}
                </Button>
              )}
            </div>
          </Form>
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
        </Card.Body>
        <Card.Footer className="text-muted">
          {`Sampling, Scratches and Cuts. © ${new Date().toLocaleDateString()}.`}
        </Card.Footer>
      </Card>
    </div>
  );

  async function onSubmit(params) {
    console.log(auth);

    const isComplete = Object.values(params).every((value) => value);
    if (
      isComplete &&
      isSignUp &&
      (repeatedPassword || getValues("password")) &&
      getValues("password") !== repeatedPassword
    ) {
      return setInputError("Check Password field");
    }

    resetFeedbackStates();

    try {
      setLoading(true);
      const response = await axios.post(MODES[mode].apiUrl, params);

      if (isSignUp) {
        // Signup
        if (response.status === 201) {
          setPwCheck();
          setSuccess(MODES[mode].successMessage);
          const { token } = response.data;
          localStorage.setItem("token", token);
          reset();
          setLoading(false);
        } else if (response.data?.err) {
          setInputError(response.data.err);
          setLoading(false);
        }
      } else {
        // Login
        if (response.status === 200) {
          setSuccess(MODES[mode].successMessage);
          const { token } = response.data;
          localStorage.setItem("token", token);
          setAuth(response.data);
          reset();
          setLoading(false);
        } else if (response.data?.err) {
          setInputError(response.data.err);
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
      setAxiosError(error.message);
      console.error("Response Error:", error.response);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    console.error("Error config:", error.config);
  }

  function resetFeedbackStates() {
    setInputError(null);
    setAxiosError(null);
    setSuccess(null);
  }
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
