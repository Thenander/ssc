import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import classes from "./ReactTable.module.scss";

function ReactTable({
  columns,
  data,
  canEdit = false,
  setIdToDelete,
  showDeleteModalHandler,
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table bordered hover striped variant="dark">
      <thead>{head()}</thead>
      <tbody>{body()}</tbody>
    </Table>
  );

  function head() {
    return table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header, index) => (
          <th
            key={header.id}
            style={{
              ...(index === 0 ? { width: "0", whiteSpace: "nowrap" } : {}),
            }}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </th>
        ))}
        {/* Show empty header for DeleteButton */}
        {canEdit && <th style={{ width: "0" }}></th>}
      </tr>
    ));
  }

  function body() {
    return table.getRowModel().rows.map((row) => (
      <tr key={row.id}>
        {row.getVisibleCells().map((cell, index, arr) => {
          return (
            <td
              key={cell.id}
              className={classes["linked-cell"]}
              style={{
                ...(index === 0 ? { width: "0" } : {}),
                ...(index === 0 || index === arr.length - 1
                  ? { whiteSpace: "nowrap" }
                  : {}),
              }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          );
        })}
        {canEdit && <td>{deleteButton(row)}</td>}
      </tr>
    ));
  }

  function deleteButton(row) {
    return (
      <Button
        disabled={!canEdit}
        size="sm"
        variant="danger"
        onClick={() => onClickDeleteHandler(row)}
      >
        Delete
      </Button>
    );
  }

  function onClickDeleteHandler(row) {
    setIdToDelete(row.original.id);
    showDeleteModalHandler(true);
  }
}

export default ReactTable;
