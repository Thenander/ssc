import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { Check } from "react-bootstrap-icons";

import logo from "../../ssc_logo.png";

import FormInput from "../formComponents/FormInput";
import Checked from "../Checked/Check";

import { useAuth } from "../../contexts/AuthProvider.js";

import { MODES } from "./modes.js";

import classes from "./AuthForm.module.scss";
import mainClasses from "../../pages/pages.module.scss";

import axios from "axios";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

function AuthForm({ mode, setAlert }) {
  const { setUser, user } = useAuth();

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
    <div className={`${classes["card-wrapper"]} ${mainClasses["fade-in"]}`}>
      <div style={{ position: "absolute", top: "4.5rem" }}>
        <img src={logo} alt="logo" className={classes.logo} />
      </div>
      <div className={classes.card}>
        <h1>{MODES[mode].action}</h1>
        <Form onSubmit={handleSubmit(onSubmit)} className="w-100">
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
                Admin {MODES[mode].action}
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
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
          localStorage.setItem("token", token);
          setUser(response.data);
          reset();
          setLoading(false);
          setAlert({ success: response.data.message });
        } else if (response.data?.err) {
          setLoading(false);
        }
      }
    } catch (error) {
      if (error.response) {
        setAlert({ danger: error.response.data });
      } else {
        setAlert({ danger: error.message });
      }
    } finally {
      setLoading(false);
    }
  }
}

export default AuthForm;
