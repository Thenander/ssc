import React from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function TrackList({ tracks = [], title }) {
  return (
    <div>
      {title && (
        <div>
          <h3 className="mt-0">Tracklist - {title.value.split(" - ")[0]}</h3>
        </div>
      )}

      <Table hover variant="dark">
        <tbody>
          {tracks.map((props) => {
            const { id, title } = props;
            return (
              <tr key={id}>
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
    </div>
  );
}

export default TrackList;
