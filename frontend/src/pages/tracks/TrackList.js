import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TrackList({ tracks = [], title }) {
  return (
    <>
      {title && (
        <div style={{ position: "relative", width: "fit-content" }}>
          <h3>
            {/* <div className={classes["h3-link"]}> */}
            <Link to={`/releases?id=${title.key}`}>
              {title.value} - Tracklist
            </Link>
            {/* </div> */}
          </h3>
        </div>
      )}
      <Table size="sm" bordered hover variant="dark">
        <thead>
          <tr>
            <th style={{ width: "0", whiteSpace: "nowrap" }}>Track ID</th>
            <th className="px-2">Title</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((props) => {
            console.log(props);

            const { id, title, trackNumber } = props;
            return (
              <tr key={id}>
                <td>{trackNumber}</td>
                <td className="px-2 position-relative">
                  <Link to={`/tracks?id=${id}`} className="stretched-link">
                    {title}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* <Table bordered hover striped variant="dark">
        <thead>
          <tr>
            <th style={{ width: "0", whiteSpace: "nowrap" }}>Track ID</th>
            <th>Tracklist</th>
            <th>Release</th>
            <th style={{ width: "0", whiteSpace: "nowrap" }}>Format</th>
            <th style={{ width: "0", whiteSpace: "nowrap" }}>Year</th>
          </tr>
        </thead>
        <tbody>
          {relaseTracks.map(
            ({ id, trackNumber, title, releaseTitle, format, year }) => {
              return (
                <tr key={id}>
                  <td className="position-relative">{trackNumber}</td>
                  <td className="position-relative">{title}</td>
                  <td className="position-relative">{releaseTitle}</td>
                  <td className="position-relative">{format}</td>
                  <td className="position-relative">{year}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </Table> */}
    </>
  );
}

export default TrackList;
