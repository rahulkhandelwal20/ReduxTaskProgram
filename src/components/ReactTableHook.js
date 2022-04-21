import { useTable } from "react-table";
import React from "react";
function ReactTableHook() {
  const data = React.useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
        col3: "Good Morning",
      },
      {
        col1: "react-table",
        col2: "rocks",
        col3: "react-hooks",
      },
      {
        col1: "whatever",
        col2: "you want",
        col3: "useMemo",
      },
      {
        col1: "Rahul Khandelwal",
        col2: "rahulkhandelwal303@gmail.com",
        col3: "Contact Me",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Column f1",
        accessor: "col1", // accessor is the "key" in the data
      },
      {
        Header: "Column f2",
        accessor: "col2",
      },
      {
        Header: "Column f3",
        accessor: "col3",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ReactTableHook;
