import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Alert from "../../components/Alert.js";
import Spinner from "../../components/Spinner/Spinner.js";
import axios from "axios";

let count = 0;

function Releases({ success, setSuccess }) {
  console.log("rendering:", ++count);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(fetchData, []);

  const handleAdd = () => {
    navigate(`${pathname}?id=new`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${pathname}?id=${id}`);
      if (response.data.affectedRows) {
        setSuccess("Deleted successfully");
        fetchData();
      }
    } catch (err) {
      setError("Cannot delete");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container mt-5">
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Format</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(response) &&
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
                  <td style={{ width: "0" }}>
                    <Button
                      size="sm"
                      variant="danger"
                      className="text-nowrap"
                      onClick={() => handleDelete(id)}
                    >
                      Remove release
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Button onClick={handleAdd}>Add new release</Button>
      <Alert
        type="success"
        message={success}
        onClose={() => setSuccess(null)}
      />
    </div>
  );

  function fetchData() {
    (async () => {
      try {
        const res = await axios.get("/releases");
        console.log("res", res);
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
