import React from "react";
import { Table } from "react-bootstrap";

const RELEASES = [
  {
    id: 1,
    title: "Configration 1",
    artist: "Cultivated Bimbo",
    year: 1991,
    format: "EP",
  },
  {
    id: 2,
    title: "Configration 2",
    artist: "Cultivated Bimbo",
    year: 1992,
    format: "EP",
  },
];

function Releases() {
  return (
    <Table bordered hover striped className="container mt-5">
      <thead>
        <tr>
          <th>Title</th>
          <th>Format</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {RELEASES.map((release) => {
          return (
            <tr key={release.id}>
              <td>{release.title}</td>
              <td>{release.format}</td>
              <td>{release.year}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Releases;
