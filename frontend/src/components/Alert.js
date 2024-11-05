import React, { useEffect } from "react";
import { Alert as AlertBootstrap } from "react-bootstrap";
import classes from "./Alert.module.scss";

function Alert({ type, message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <AlertBootstrap variant={type} className={classes.alert}>
      {message}
    </AlertBootstrap>
  );
}

export default Alert;
