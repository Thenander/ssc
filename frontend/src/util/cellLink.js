import { Link } from "react-router-dom";

/**
 * @param {Object} info ReactTable default cell info
 * @param {Object} params { id: "releaseId", path: "/releases"}
 * @returns <Link />
 */
export default function cellLink(info, params) {
  const { id, path } = params;
  const { row } = info;
  const { original } = row;

  return (
    <Link
      to={`${path ?? ""}?id=${original[id] ?? original.id}`}
      className="stretched-link"
    >
      {info.getValue()}
    </Link>
  );
}
