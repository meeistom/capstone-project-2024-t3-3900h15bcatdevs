import React, { useState, useEffect } from "react";
import { ViewInfoForm } from "./ViewInfoForm";
import { Modal } from "./Modal";
import Button from "react-bootstrap/Button";
import { URL } from "../constants";

import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { toUnix, dateTimeToString, unixToTimeStr, unixToDatetimeLocal } from "../Utils/utils";

export { ViewInfoModal };

function ViewInfoModal({ info, closeModal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [expressDate, setExpressDate] = useState(unixToDatetimeLocal(info.express_time));
  const [expiryDate, setExpiryDate] = useState(unixToDatetimeLocal(info.expiration_time));
  const [notes, setNotes] = useState(info.extra_notes);
  const [milkType, setMilkType] = useState(info.milk_type);
  const [storageType, setStorageType] = useState(info.storage_type);
  const [storageLocation, setStorageLocation] = useState(info.storage_location);
  const [additive, setAdditive] = useState(info.additives);

  const handleSave = () => {
    // const updatedInfo = {
    //   baby_mrn: info.baby_mrn,
    //   baby_name: info.baby_name,
    //   express_time: expressDate,
    //   expiration_time: expiryDate,
    //   extra_notes: notes,
    //   milk_type: milkType,
    //   storage_type: storageType,
    //   additives: additive,
    // };

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
      title={isEditing ? "Edit Milk Entry" : `Milk ID #${info.uid}`}
      body={
        <ViewInfoForm
          created={dateTimeToString(unixToDatetimeLocal(info.created_at))}
          babyMRN={info.baby_mrn}
          babyName={info.baby_name}
          expressDate={expressDate}
          setExpressDate={setExpressDate}
          expiryDate={expiryDate}
          setExpiryDate={setExpiryDate}
          notes={notes}
          setNotes={setNotes}
          milkType={milkType}
          setMilkType={setMilkType}
          storageType={storageType}
          setStorageType={setStorageType}
          storageLocation={storageLocation}
          setStorageLocation={setStorageLocation}
          additive={additive}
          setAdditive={setAdditive}
          isEditing={isEditing}
          uid={info.uid}
        />
      }
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
