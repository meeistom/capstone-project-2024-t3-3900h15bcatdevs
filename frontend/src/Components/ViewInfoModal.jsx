import React, { useState, useEffect } from 'react';
import { ViewInfoForm } from './ViewInfoForm';
import { Modal } from './Modal';
import Button from "react-bootstrap/Button";

export { ViewInfoModal };

function ViewInfoModal({ info, closeModal }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    setTitle(`Milk Entry: ${info.uid}`);
    setBody(<ViewInfoForm info={info}/>);
    setFooter(
      <>
      <div id="btn-group" className="info-btn-group">
        <Button onClick={() => closeModal(false)} variant="outline-primary">
          Close
        </Button>
        <Button
          name="edit-milk"
          variant="primary"
        >
          Edit
        </Button>
      </div>
      </>
    );
  }, [])
  


  return (
    <>
      <Modal
        id={info.uid || info.mrn}
        title={title}
        body={body}
        footer={footer}
        closeModal={closeModal}
      />
    </>
  )
}