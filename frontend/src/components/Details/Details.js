import classes from "./Details.module.scss";

function Details({ children }) {
  return <div className={classes.wrapper}>{children}</div>;
}

export default Details;
