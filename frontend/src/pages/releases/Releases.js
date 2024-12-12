import { createColumnHelper } from "@tanstack/react-table";

import GenericTable from "../../components/GenericTable/GenericTable.js";
import Release from "./Release.js";
import cellLink from "../../util/cellLink.js";

function Releases({ setAlert, canEdit = false }) {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("year", {
      header: "Year",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("title", {
      header: "Release",
      cell: cellLink,
    }),
    columnHelper.accessor("type", {
      header: "Format",
      cell: (info) => info.getValue(),
    }),
  ];

  return (
    <GenericTable
      fetchUrl="/releases"
      deleteUrl="/releases"
      columns={columns}
      setAlert={setAlert}
      canEdit={canEdit}
      detailComponent={Release}
      createButtonLabel="Release"
      confirmDeleteText="Delete release?"
      confirmDeleteBody="Deleting this release will permanently erase it and its related tracks. This action cannot be undone. Are you sure you want to continue?"
    />
  );
}

export default Releases;
