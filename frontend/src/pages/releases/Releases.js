import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Alert from "../../components/Alert.js";
import Spinner from "../../components/Spinner/Spinner.js";
import axios from "axios";

let count = 0;

function Releases() {
  console.log("rendering:", ++count);

  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(fetchData, []);

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
                  <Link to={`?id=${id}`}>{title}</Link>
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

  function fetchData() {
    (async () => {
      try {
        const res = await axios.get("/releases");
        setResponse(res.data);
      } catch (err) {
        setError("Cannot fetch data");
      } finally {
        setLoading(false);
      }
    })();
  }
}

export default Releases;
