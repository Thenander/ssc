import { createColumnHelper } from "@tanstack/react-table";

import GenericTable from "../../components/GenericTable/GenericTable.js";
import Source from "../Sources/Source.js";
import cellLink from "../../util/cellLink.js";

function Sources({ setAlert, canEdit = false }) {
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
      fetchUrl="/sources"
      deleteUrl="/sources"
      columns={columns}
      setAlert={setAlert}
      canEdit={canEdit}
      detailComponent={Source}
      createButtonLabel="Source"
      confirmDeleteText="Delete source?"
      confirmDeleteBody="Deleting this source will permanently erase it and its related samples. This action cannot be undone. Are you sure you want to continue?"
    />
  );
}

export default Sources;
