import { createColumnHelper } from "@tanstack/react-table";

import GenericTable from "../../components/GenericTable/GenericTable.js";
import Sample from "./Sample.js";
import cellLink from "../../util/cellLink.js";

function Samples({ setAlert, canEdit = false }) {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("year", {
      header: "Year",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sample", {
      header: "Sample",
      cell: cellLink,
    }),
    columnHelper.accessor("source", {
      header: "Source",
      cell: (info) => cellLink(info, { id: "sourceId", path: "/sources" }),
    }),
  ];

  return (
    <GenericTable
      fetchUrl="/samples"
      deleteUrl="/samples"
      columns={columns}
      setAlert={setAlert}
      canEdit={canEdit}
      detailComponent={Sample}
      createButtonLabel="Sample"
      confirmDeleteText="Delete sample?"
      confirmDeleteBody="Deleting this sample will permanently erase it. This action cannot be undone. Are you sure you want to continue?"
    />
  );
}

export default Samples;
