import React from "react";
import Release from "./Release";
import Releases from "./Releases";
import { useLocation } from "react-router-dom";

function ReleaseSwitcher() {
  console.log("hej");

  const { search } = useLocation();

  if (search) {
    return <Release />;
  }

  return <Releases />;
}

export default ReleaseSwitcher;
