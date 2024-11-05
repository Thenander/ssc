import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import FormInput from "../formComponents/FormInput";
import classes from "./RegisterPage.module.scss";
import Alert from "../Alert";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const [inputError, setInputError] = useState();
  const [axiosError, setAxiosError] = useState();

  const onSubmit = async (params) => {
    console.log(params);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/V1/users/add",
        params
      );
      if (response.data && response.data.err) {
        setInputError(response.data.err);
      }
    } catch (error) {
      if (error.name === "AxiosError") {
        setAxiosError(error.response.data.err);
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Card.Header className={classes.header}>Sign up</Card.Header>
        <Card.Body>
          <div className={classes.welcome}>
            <Card.Title>Welcome!</Card.Title>
            <Card.Text className="mb-3">Please sign up to explore</Card.Text>
          </div>
          {inputError && (
            <Alert variant="danger" onClose={() => setInputError()}>
              {inputError}
            </Alert>
          )}
          {axiosError && (
            <Alert variant="danger" onClose={() => setAxiosError()}>
              {axiosError}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes["two-columns-wrapper"]}>
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
            </div>
            <div className={classes["two-columns-wrapper"]}>
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
              />
            </div>
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="email@example.com"
              register={register}
              inputError={inputError}
            />
            <div className="py-3">
              <Button
                type="submit"
                variant="warning"
                className={classes.button}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Sampling, scratches and cuts
        </Card.Footer>
      </Card>
    </div>
  );
}

export default RegisterPage;
