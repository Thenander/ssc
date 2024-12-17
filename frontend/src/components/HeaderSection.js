import Badge from "react-bootstrap/Badge";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./HeaderSection.module.scss";

export default function HeaderSection({ title, badgeText }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-start mb-3">
      <h2
        style={{
          display: "inline",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </h2>
      <Badge
        className={classes.badge}
        onClick={() => navigate(pathname)}
        pill={true}
        bg="link"
        text="dark"
        style={{ padding: ".5rem 1rem" }}
      >
        {badgeText}
      </Badge>
    </div>
  );
}
