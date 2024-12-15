import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import ReactTable from "../ReactTable/ReactTable.js";
import ConfirmModal from "../../components/ConfirmModal.js";

import isAuthorized from "../../util/isAuthorized.js";
import mainClasses from "../../pages/pages.module.scss";
import Loading from "../Loading.js";

function GenericTable({
  fetchUrl,
  deleteUrl,
  columns,
  setAlert,
  canEdit,
  detailComponent: DetailComponent,
  createButtonLabel,
  confirmDeleteText,
  confirmDeleteBody,
}) {
  const { pathname, search } = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [idToDelete, setIdToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const item = createButtonLabel.toLowerCase();

  const header = search
    ? `${createButtonLabel} details`
    : `${createButtonLabel}s`;

  const fetchDataCallback = useCallback(fetchData, [fetchUrl, setAlert]);

  useEffect(() => fetchDataCallback, [fetchDataCallback, setAlert]);

  const hasData = data && data.length > 0;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={mainClasses["fade-in"]}>
      <Container>
        <h1 className={search ? "visually-hidden" : ""}>{header}</h1>
      </Container>
      {search && DetailComponent && (
        <DetailComponent
          setAlert={setAlert}
          reFetch={fetchData}
          canEdit={canEdit}
        />
      )}
      <Container>
        <ConfirmModal
          id={idToDelete}
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          onConfirmDelete={handleDelete}
          title={confirmDeleteText}
          body={confirmDeleteBody}
          cancelLabel="No, keep it"
          confirmLabel="Yes, Delete"
        />
        {hasData && (
          <>
            {search && <h3>{`All ${item}s`}</h3>}
            <ReactTable
              columns={columns}
              data={data}
              canEdit={canEdit}
              setIdToDelete={setIdToDelete}
              showDeleteModalHandler={handleShowModal}
            />
          </>
        )}
        {canEdit && (
          <Button
            onClick={handleAdd}
            variant="primary"
            className={`${hasData ? "" : "mt-3"} mb-5`}
          >
            {`Create new ${createButtonLabel.toLowerCase()}`}
          </Button>
        )}
      </Container>
    </div>
  );

  async function fetchData() {
    try {
      setLoading(true);
      const response = await axios.get(fetchUrl);

      setData(response.data);
    } catch (error) {
      setAlert({ danger: error.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const isAuthorizedUser = isAuthorized(canEdit, setAlert);
    if (!isAuthorizedUser) return;

    try {
      setLoading(true);
      const response = await axios.delete(`${deleteUrl}?id=${id}`);
      if (searchParams.get("id") === id) navigate(pathname);

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

  function handleAdd() {
    if (!isAuthorized(canEdit, setAlert)) return;
    navigate(`${pathname}?id=new`);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleShowModal() {
    setShowModal(true);
  }
}

export default GenericTable;
