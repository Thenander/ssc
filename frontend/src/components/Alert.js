import React, { useEffect, useState } from "react";
import { Alert as AlertBootstrap } from "react-bootstrap";
import classes from "./Alert.module.scss";

function Alert({ type, message, onClose }) {
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const styleTimer = setTimeout(() => setLeave(true), 4000);
    const closeTimer = setTimeout(onClose, 5000);

    return () => {
      setLeave(false);
      clearTimeout(styleTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

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
