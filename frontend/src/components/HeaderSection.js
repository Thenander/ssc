import Badge from "react-bootstrap/Badge";

export default function HeaderSection({ title, badgeText }) {
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
        pill={true}
        bg="primary"
        text="dark"
        style={{ padding: ".5rem 1rem" }}
      >
        {badgeText}
      </Badge>
    </div>
  );
}
