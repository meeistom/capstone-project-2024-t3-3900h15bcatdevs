import React, { useState, useEffect } from 'react';
import { ViewInfoForm } from './ViewInfoForm';
import { Modal } from './Modal';
import Button from "react-bootstrap/Button";

export { ViewInfoModal };

function ViewInfoModal({ info, closeModal, version }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    switch (version) {
      case "viewMilk":
        setTitle(`Milk Entry: ${info.uid}`);
        setBody(<ViewInfoForm info={info} version={version}/>);
        setFooter(
          <>
           <div id="btn-group" className="info-btn-group">
            <Button onClick={() => closeModal(false)} variant="outline-primary">
              Cancel
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
        break;
      case "viewMother":
        setTitle("Mommy");
        setBody("mother details here");
        setFooter(
          <>
            <button onClick={closeModal}>Close</button>
          </>
        );
        break;
      default:
        setTitle("Details");
        setBody("Default details here");
        setFooter(
          <>
            <button onClick={closeModal}>Close</button>
          </>
        );
        break;
    }
  }, [version, closeModal]);


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