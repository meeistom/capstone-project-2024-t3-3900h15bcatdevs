import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { DeleteMilkModal };

function DeleteMilkModal({ closeModal, entry, deleteMilk }) {
  const [reason, setReason] = useState("expired");
  const [notes, setNotes] = useState("");

  return (
    <>
      <div
        id={`${entry.uid}-deletion-modal`}
        className="modal-background position-fixed d-flex justify-content-center align-items-center w-100 h-100"
      >
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Deletion Confirmation</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => closeModal(false)}
                ></button>
              </div>
              <div className="modal-body d-flex flex-column ">
                <p>
                  Milk #{entry.uid} belongs to: <br /> {entry.baby_name}, baby
                  of {entry.mother_name}
                </p>
                <div className="removal-form">
                  <Form.Label htmlFor="milk-storage" className="form-label">
                    Reason for milk removal*
                  </Form.Label>
                  <Form.Select
                    id="milk-removal-reason"
                    className="form-select form-select-sm"
                    defaultValue={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  >
                    <option value="expired">Expired</option>
                    <option value="discharged">Baby discharged</option>
                    <option value="other">Other</option>
                  </Form.Select>
                  {reason === "other" && (
                    <div className="removal-notes">
                      <Form.Label
                        htmlFor="removal-notes"
                        className="form-label pt-2"
                      >
                        Notes*
                      </Form.Label>
                      <textarea
                        className="form-control pt-2"
                        id="removal-notes"
                        rows="2"
                        value={notes}
                        onChange={(e) => {
                          setNotes(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  variant="secondary"
                  data-bs-dismiss="modal"
                  onClick={() => closeModal(false)}
                >
                  Close
                </Button>
                <Button
                  variant="danger"
                  disabled={reason === "other" && notes === ""}
                  onClick={() => deleteMilk(entry.uid, reason, notes)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
