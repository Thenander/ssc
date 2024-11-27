import React from "react";
import classes from "./Spinner.module.scss";

function Spinner({ loading }) {
  const spinner = (
    <div className={classes.outerWrapper}>
      <div className={classes.wrapper}>
        <div className={classes.square}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );

  return loading ? spinner : null;
}

export default Spinner;
