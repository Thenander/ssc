import React from "react";
import { Alert as AlertBootstrap } from "react-bootstrap";
import classes from "./Alert.module.scss";

function Alert({ variant, onClose, children }) {
  return (
    <AlertBootstrap
      variant={variant}
      onClose={onClose}
      closeLabel="Close alert"
      dismissible={true}
      className={classes.alert}
    >
      {children}
    </AlertBootstrap>
  );
}

export default Alert;
