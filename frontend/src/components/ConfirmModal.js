import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ExclamationCircleFill } from "react-bootstrap-icons";

function ConfirmModal({
  id,
  showModal,
  handleCloseModal,
  onConfirmDelete,
  title = "Confirm action",
  body = "Are you sure you want to continue?",
  cancelLabel = "Cancel",
  confirmLabel = "Do it",
}) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      contentClassName="bg-dark"
    >
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title className="bg-dark text-light">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <ExclamationCircleFill color="#dc3445" className="me-2" />
            {title}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">{body}</Modal.Body>
      <Modal.Footer className="bg-dark text-light">
        <Button variant="outline-secondary" onClick={handleCloseModal}>
          {cancelLabel}
        </Button>
        <Button
          className="text-light"
          variant="outline-danger"
          onClick={() => {
            onConfirmDelete(id);
            handleCloseModal();
          }}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;
