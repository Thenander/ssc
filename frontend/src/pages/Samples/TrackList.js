import React from "react";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

function TrackList({ tracks }) {
  return (
    <>
      <h3 className="mt-0">Tracks</h3>
      <Table hover bordered variant="dark">
        <thead>
          <tr>
            <th style={{ width: "0px", whiteSpace: "nowrap" }}>Year</th>
            <th>Track</th>
            <th>Release title</th>
            <th>Track ID</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((props) => {
            const {
              releaseId,
              trackId,
              year,
              trackTitle,
              releaseTitle,
              trackNumber,
            } = props;
            return (
              <tr key={`${releaseId}-${trackId}`}>
                <td>{year}</td>
                <td className="position-relative">
                  <Link to={`/tracks?id=${trackId}`} className="stretched-link">
                    {trackTitle}
                  </Link>
                </td>
                <td className="position-relative">
                  <Link
                    to={`/releases?id=${releaseId}`}
                    className="streched-link"
                  >
                    {releaseTitle}
                  </Link>
                </td>
                <td>{trackNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TrackList;
