import React from "react";
import classes from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.square}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Spinner;
