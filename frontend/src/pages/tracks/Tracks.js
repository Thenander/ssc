import { createColumnHelper } from "@tanstack/react-table";

import GenericTable from "../../components/GenericTable/GenericTable.js";
import Track from "./Track.js";
import cellLink from "../../util/cellLink.js";

function Tracks({ setAlert, canEdit = false }) {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("year", {
      header: "Year",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Track",
      cell: cellLink,
    }),
    columnHelper.accessor("release", {
      header: "Release title",
      cell: (info) => cellLink(info, { id: "releaseId", path: "/releases" }),
    }),
    columnHelper.accessor("trackNumber", {
      header: "Track ID",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <GenericTable
      fetchUrl="/tracks"
      deleteUrl="/tracks"
      columns={columns}
      setAlert={setAlert}
      canEdit={canEdit}
      detailComponent={Track}
      createButtonLabel="Track"
      confirmDeleteText="Delete track?"
      confirmDeleteBody="Deleting this track will permanently erase it. This action cannot be undone. Are you sure you want to continue?"
    />
  );
}

export default Tracks;
