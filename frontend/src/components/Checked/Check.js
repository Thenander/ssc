import React, { useEffect, useState } from "react";
import { CheckLg } from "react-bootstrap-icons";
import classes from "./Check.module.scss";

function Check() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {show && (
        <div className={classes["outer-wrapper"]}>
          <div className={classes.bg} />
          <div className={classes.wrapper}>
            <CheckLg color="#000" />
            <div className={classes.revealer} />
          </div>
          <div className={classes["border-revealer"]} />
        </div>
      )}
    </div>
  );
}

export default Check;
