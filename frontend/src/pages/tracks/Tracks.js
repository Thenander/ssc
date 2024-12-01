import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Table } from "react-bootstrap";

import Track from "./Track.js";
import Alert from "../../components/Alert.js";
import ConfirmModal from "../../components/ConfirmModal.js";
import Spinner from "../../components/Spinner/Spinner.js";

function Tracks({ setAlert }) {
  //////////////
  // useHooks //
  //////////////

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState();
  console.log("response", response);
  const [error, setError] = useState();
  const [id, setId] = useState();

  ////////////////
  // useEffects //
  ////////////////

  useEffect(fetchData, []);

  /////////////
  // Returns //
  /////////////

  if (error) {
    return <Alert type="danger" message={error} />;
  }

  return (
    <>
      <Spinner loading={loading} />
      <div className="container my-5">
        <h1 className="m-0">Tracks</h1>
      </div>
      {search && <Track setAlert={setAlert} reFetch={fetchData} />}
      <div className="container">
        <ConfirmModal
          id={id}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          onConfirmDelete={(id) => handleDelete(id)}
          title="Delete track?"
          body="Deleting this track will permanently erase it. This action cannot be undone. Are you sure you want to continue?"
          cancelLabel="No, keep track"
          confirmLabel="Yes, Delete track"
        />
        {response && response.length && (
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Release</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(response) &&
                response.map((track) => {
                  const { id, title, release, releaseId, year } = track;
                  return (
                    <tr key={id}>
                      <td className="position-relative">
                        <Link to={`?id=${id}`} className="stretched-link">
                          {title}
                        </Link>
                      </td>
                      <td>
                        <Link to={`/releases?id=${releaseId}`}>{release}</Link>
                      </td>
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
                          Delete track
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        )}
        <Button
          onClick={handleAdd}
          variant="outline-primary"
          className="text-light"
        >
          Create new track
        </Button>
      </div>
    </>
  );

  //////////////
  // Handlers //
  //////////////

  function handleAdd() {
    navigate(`${pathname}?id=new`);
  }

  async function handleDelete(id) {
    try {
      setLoading(true);
      const response = await axios.delete(`${pathname}?id=${id}`);
      if (response.data.affectedRows) {
        setAlert({ success: "Deleted successfully" });
        navigate(pathname);
        fetchData();
      }
    } catch (err) {
      setError("Cannot delete");
    } finally {
      setLoading(false);
    }
  }

  function handleCloseModal() {
    return setShowModal(false);
  }

  function handleShowModal() {
    return setShowModal(true);
  }

  ///////////
  // Fetch //
  ///////////

  function fetchData() {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("/tracks");
        setResponse(res.data);
      } catch (err) {
        setError("Cannot fetch data");
      } finally {
        setLoading(false);
      }
    })();
  }
}

export default Tracks;
