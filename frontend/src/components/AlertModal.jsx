import React from "react";
import { Modal, Button } from "react-bootstrap";

const AlertModal = ({ show, onHide }) => {
  const styleAlert = {
    backgroundColor: "#c8f1eb",
    color: "#922424",
    borderRadius: "10px",
    border: "solid 4px  #4f9693",
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      style={{ backgroundColor: "#082837a3" }}
    >
      <div style={styleAlert}>
        <Modal.Header>
          <Modal.Title>You haven't assigned any task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Atleast Provide The Title!</Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} style={{ backgroundColor: "#082837" }}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default AlertModal;
