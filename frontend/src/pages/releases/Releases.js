import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Table } from "react-bootstrap";

import Release from "./Release.js";
import ConfirmModal from "../../components/ConfirmModal.js";
import Spinner from "../../components/Spinner/Spinner.js";

import mainClasses from "../pages.module.scss";

function Releases({ setAlert }) {
  //////////////
  // useHooks //
  //////////////

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState();

  const [id, setId] = useState();

  ////////////////
  // useEffects //
  ////////////////

  useEffect(fetchData, [setAlert]);

  /////////////
  // Returns //
  /////////////

  return (
    <div className={mainClasses["fade-in"]}>
      <Spinner loading={loading} />
      <div className="container">
        <h1 className="my-5">Releases</h1>
      </div>
      {search && <Release setAlert={setAlert} reFetch={fetchData} />}
      <div className="container">
        <ConfirmModal
          id={id}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          onConfirmDelete={(id) => handleDelete(id)}
          title="Delete release?"
          body="Deleting this release will permanently erase it and its related tracks. This action cannot be undone. Are you sure you want to continue?"
          cancelLabel="No, keep release"
          confirmLabel="Yes, Delete release"
        />
        {response && response.length > 0 && (
          <Table bordered hover striped variant="dark">
            <thead>
              <tr>
                <th>Title</th>
                <th>Format</th>
                <th>Year</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(response) &&
                response.map((release) => {
                  const { id, title, type, year } = release;
                  return (
                    <tr key={id}>
                      <td className="position-relative">
                        <Link to={`?id=${id}`} className="stretched-link">
                          {title}
                        </Link>
                      </td>
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
        )}
        <Button
          onClick={handleAdd}
          variant="outline-primary"
          className="text-light"
        >
          Create new release
        </Button>
      </div>
    </div>
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
        fetchData();
      }
    } catch (error) {
      setAlert({ danger: error.message });
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
        const res = await axios.get("/releases");
        setResponse(res.data);
      } catch (error) {
        setAlert({ danger: error.message });
      } finally {
        setLoading(false);
      }
    })();
  }
}

export default Releases;
