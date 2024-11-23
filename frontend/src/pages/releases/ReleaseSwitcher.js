import React from "react";
import Release from "./Release";
import Releases from "./Releases";
import { useLocation } from "react-router-dom";

function ReleaseSwitcher(props) {
  const { search } = useLocation();

  if (search) {
    return <Release {...props} />;
  }

  return <Releases {...props} />;
}

export default ReleaseSwitcher;
