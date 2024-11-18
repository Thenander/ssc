import React from "react";
import { Table } from "react-bootstrap";
import Alert from "../../components/Alert.js";
import useGet from "../../useHooks/useGet.js";
import Spinner from "../../components/Spinner/Spinner.js";
import { Link } from "react-router-dom";

function Releases() {
  const { response, error, loading } = useGet("/releases");

  if (error) {
    return <Alert type="danger" message={error} />;
  }

  if (loading) {
    return (
      <div className="position-relative py-5">
        <Spinner />
      </div>
    );
  }

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
        {response &&
          response.map((release) => {
            const { id, title, artist, type, year } = release;
            return (
              <tr key={id}>
                <td>
                  <Link to={`${id}`}>{title}</Link>
                </td>
                <td>{artist}</td>
                <td>{type}</td>
                <td>{year}</td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default Releases;
