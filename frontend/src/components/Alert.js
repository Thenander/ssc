import React, { useEffect, useState } from "react";
import { Alert as AlertBootstrap } from "react-bootstrap";
import classes from "./Alert.module.scss";

function Alert({ type = "primary", message = "", onClose = () => {} }) {
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    if (!message) return; // Exit early if no message

    const styleTimer = setTimeout(() => setLeave(true), 4000);
    const closeTimer = setTimeout(onClose, 5000);

    return () => {
      clearTimeout(styleTimer);
      clearTimeout(closeTimer);
      setLeave(false);
    };
  }, [message, onClose]);

  if (!message) return null;

  return (
    <AlertBootstrap
      variant={type}
      className={`${classes.alert} ${leave ? classes.leave : ""}`}
    >
      {message}
    </AlertBootstrap>
  );
}

export default Alert;
