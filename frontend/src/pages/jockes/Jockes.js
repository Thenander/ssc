import React from "react";
import Table from "react-bootstrap/Table";

function Samples() {
  return (
    <div className="container mt-5">
      <h2 className="text-light mb-4">Tracks</h2>
      <h4 className="text-light">Tucker (US Edit)</h4>
      <p className="text-light">Blasting In Progress</p>
      <Table bordered hover striped variant="dark">
        <thead>
          <tr>
            <th style={{ verticalAlign: "middle" }}>Sample</th>
            <th style={{ verticalAlign: "middle" }}>Source</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LET THE RHYTHM HIT 'EM</td>
            <td>Eric & Rakim</td>
          </tr>
          <tr>
            <td>TALK RADIO</td>
            <td>Movie</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Samples;
