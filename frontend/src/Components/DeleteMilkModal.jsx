import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { DeleteMilkModal };

function DeleteMilkModal({ closeModal, entry, deleteMilk }) {
  const [reason, setReason] = useState("expired");
  const [notes, setNotes] = useState("");

  return (
    <Modal
      show
      onHide={() => closeModal(false)}
      centered
      backdrop="static"
      id={`${entry.uid}-deletion-modal`}
    >
      <Modal.Header closeButton>
        <Modal.Title>Deletion Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Milk #{entry.uid} belongs to: <br /> {entry.baby_name}, baby of{" "}
          {entry.mother_name}
        </p>
        <Form.Group controlId="milk-removal-reason">
          <Form.Label>Reason for milk removal*</Form.Label>
          <Form.Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="expired">Expired</option>
            <option value="discharged">Baby discharged</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        {reason === "other" && (
          <Form.Group controlId="removal-notes" className="pt-2">
            <Form.Label>Notes*</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={() => closeModal(false)}>
          Close
        </Button>
        <Button
          variant="danger"
          disabled={reason === "other" && notes === ""}
          onClick={() => deleteMilk(entry.uid, reason, notes)}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
