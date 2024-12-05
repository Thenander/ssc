import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { Button, Container, Table } from "react-bootstrap";

import Release from "./Release.js";
import ConfirmModal from "../../components/ConfirmModal.js";
import Spinner from "../../components/Spinner/Spinner.js";

import mainClasses from "../pages.module.scss";
import isAuthorized from "../../util/isAuthorized.js";

function Releases({ setAlert, canEdit }) {
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
      <Container>
        <h1>Releases</h1>
      </Container>
      {search && (
        <Release setAlert={setAlert} reFetch={fetchData} canEdit={canEdit} />
      )}
      <Container>
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
          <>
            <TableHeader />
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Release</th>
                  <th>Format</th>
                  <th>Year</th>
                  {canEdit && <th></th>}
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
                        {canEdit && (
                          <td style={{ width: "0" }}>
                            <Button
                              disabled={!canEdit}
                              size="sm"
                              variant="danger"
                              className="text-nowrap text-light"
                              onClick={() => {
                                setId(id);
                                handleShowModal(true);
                              }}
                            >
                              Delete release
                            </Button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </>
        )}
        {response && canEdit && (
          <Button
            disabled={!canEdit}
            onClick={handleAdd}
            variant="primary"
            className="mb-5"
          >
            Create new release
          </Button>
        )}
      </Container>
    </div>
  );

  //////////////
  // Handlers //
  //////////////

  function handleAdd() {
    const isAuthorizedUser = isAuthorized(canEdit, setAlert);
    if (!isAuthorizedUser) {
      return;
    }
    isAuthorizedUser && navigate(`${pathname}?id=new`);
  }

  async function handleDelete(id) {
    const isAuthorizedUser = isAuthorized(canEdit, setAlert);
    if (!isAuthorizedUser) {
      return;
    }
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

  /////////////////
  // TableHeader //
  /////////////////

  function TableHeader() {
    if (!search) {
      return null;
    }
    return <h3>All releases</h3>;
  }
}

export default Releases;
