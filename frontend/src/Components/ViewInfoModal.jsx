import React, { useState, useEffect } from "react";
import { ViewInfoForm } from "./ViewInfoForm";
import { Modal } from "./Modal";
import Button from "react-bootstrap/Button";
import { URL } from "../constants";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { ViewInfoModal };

function ViewInfoModal({ info, closeModal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);

  const handleSave = () => {
    fetch(`${URL}/add_milk_entry`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setIsEditing(false);
        closeModal(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Modal
      id={info.uid || info.mrn}
      title={`Milk ID #${info.uid}`}
      body={<ViewInfoForm info={editedInfo} isEditing={isEditing} onChange={setEditedInfo} />}
      footer={
        <div id="btn-group" className="info-btn-group">
          <Button onClick={() => closeModal(false)} variant="outline-primary">
            Close
          </Button>
          <Button onClick={() => (isEditing ? handleSave() : setIsEditing(true))} variant="primary">
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      }
      closeModal={closeModal}
    />
  );
}
