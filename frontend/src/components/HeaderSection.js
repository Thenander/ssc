import Badge from "react-bootstrap/Badge";

export default function HeaderSection({ title, badgeText }) {
  return (
    <div className="d-flex justify-content-between align-items-start">
      <h2 style={{ display: "inline" }} className="me-3">
        {title}
      </h2>
      <Badge
        pill={true}
        bg="info"
        text="dark"
        style={{ padding: ".5rem 1rem" }}
      >
        {badgeText}
      </Badge>
    </div>
  );
}
