import React from "react";
import bigLogo from "../../ssc_logo_big.png";

import classes from "./Start.module.scss";

function Start() {
  return (
    <div>
      <div className={classes["inner-wrapper"]}>
        <img src={bigLogo} alt="logo" className={classes.logo} />
        {/* <div>
          <p className={classes.by}>by</p>
          <h1 className={classes["band-name"]}>Cultivated Bimbo</h1>
        </div> */}
      </div>
    </div>
  );
}

export default Start;
