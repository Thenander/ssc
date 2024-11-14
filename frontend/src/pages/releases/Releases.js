import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function Releases() {
  const [releases, setReleases] = useState();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Table bordered hover striped className="container mt-5">
      <thead>
        <tr>
          <th>Title</th>
          <th>Artist</th>
          <th>Format</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {releases.map((release) => {
          return (
            <tr key={release.id}>
              <td>{release.title}</td>
              <td>{release.artist}</td>
              <td>{release.type}</td>
              <td>{release.year}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  async function fetchData() {
    const response = await axios.get("http://localhost:8080/api/V1/releases");
    console.log("response", response);
    if (!response || response.err) {
      // code...
      return;
    }
    setReleases(response.data);
  }
}

export default Releases;
