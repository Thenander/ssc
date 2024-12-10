import React, { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import ConfirmModal from "../../components/ConfirmModal.js";
import Spinner from "../../components/Spinner/Spinner.js";

import mainClasses from "../pages.module.scss";
import isAuthorized from "../../util/isAuthorized.js";

import Track from "./Track.js";

function Tracks({ setAlert, canEdit = false }) {
  //////////////
  // useHooks //
  //////////////

  const { pathname, search } = useLocation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState();
  const [id, setId] = useState();
  const header = search ? "Track details" : "Tracks";

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
        <h1>{header}</h1>
      </Container>
      {search && (
        <Track setAlert={setAlert} reFetch={fetchData} canEdit={canEdit} />
      )}
      <Container>
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
        {response && response.length > 0 && (
          <>
            <TableHeader />
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ width: "0", whiteSpace: "nowrap" }}>Track ID</th>
                  <th>Release</th>
                  <th>Year</th>
                  {canEdit && <th></th>}
                </tr>
              </thead>
              <tbody>
                {Array.isArray(response) &&
                  response.map((track) => {
                    const { trackNumber, id, title, release, releaseId, year } =
                      track;
                    return (
                      <tr key={id}>
                        <td className="position-relative">
                          <Link to={`?id=${id}`} className="stretched-link">
                            {title}
                          </Link>
                        </td>
                        <td>{trackNumber}</td>
                        <td className="position-relative">
                          <Link
                            to={`/releases?id=${releaseId}`}
                            className="stretched-link"
                          >
                            {release}
                          </Link>
                        </td>
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
                              Delete track
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
        {canEdit && (
          <Button
            disabled={!canEdit}
            onClick={handleAdd}
            variant="primary"
            className="text-light mb-5"
          >
            Create new track
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

      if (searchParams.get("id") === id) {
        navigate(pathname);
      }

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
        const res = await axios.get("/tracks");
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
    return <h3>All tracks</h3>;
  }
}

export default Tracks;
