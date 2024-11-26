import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Alert from "../../components/Alert.js";
import Spinner from "../../components/Spinner/Spinner.js";
import axios from "axios";
import ConfirmModal from "../../components/ConfirmModal.js";
import Release from "./Release.js";

// let count = 0;

function Releases({ setSuccess }) {
  const { search } = useLocation();
  // console.log("rendering:", ++count);

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const [response, setResponse] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState();

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

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
    <>
      {search && <Release setSuccess={setSuccess} reFetch={fetchData} />}
      <div className="container mt-5">
        <ConfirmModal
          id={id}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          onConfirmDelete={(id) => handleDelete(id)}
          title="Delete release?"
          body="Deleting this release will permanently erase it. This action cannot be undone. Are you sure you want to continue?"
          cancelLabel="No, keep release"
          confirmLabel="Yes, Delete release"
        />
        <Table /* bordered */ hover striped variant="dark">
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
                    <td className="position-relative">
                      <Link to={`?id=${id}`} className="stretched-link">
                        {title}
                      </Link>
                    </td>
                    <td>{artist}</td>
                    <td>{type}</td>
                    <td>{year}</td>
                    <td style={{ width: "0" }}>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        className="text-nowrap text-light"
                        onClick={() => {
                          setId(id);
                          handleShowModal(true);
                        }}
                      >
                        Delete release
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Button
          onClick={handleAdd}
          variant="outline-primary"
          className="text-light"
        >
          Add new release
        </Button>
      </div>
    </>
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
