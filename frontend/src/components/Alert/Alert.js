import React, { useEffect, useState } from "react";
import { Alert as AlertBootstrap } from "react-bootstrap";
import classes from "./Alert.module.scss";

function Alert({ alert, setAlert }) {
  const [[key, value] = []] = Object.entries(alert || {});
  const isError = key === "danger";
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    if (!value) return; // Exit early if no message

    const styleTimer = setTimeout(() => {
      if (!isError) {
        setLeave(true);
      }
    }, 4000);
    const closeTimer = setTimeout(() => {
      if (!isError) {
        setAlert({});
      }
    }, 5000);

    return () => {
      clearTimeout(styleTimer);
      clearTimeout(closeTimer);
      setLeave(false);
    };
  }, [isError, setAlert, value]);

  if (!value) return null;

  return (
    <AlertBootstrap
      variant={key}
      className={`${classes.alert} ${leave ? classes.leave : ""}`}
      dismissible={key === "danger"}
      onClose={() => setAlert({})}
    >
      {value}
    </AlertBootstrap>
  );
}

export default Alert;
