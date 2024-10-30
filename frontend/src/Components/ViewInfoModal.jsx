import React, { useState, useEffect } from 'react';
import { ViewInfoForm } from './ViewInfoForm';
import { Modal } from './Modal';

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
            <button onClick={closeModal}>Close</button>
            <button>Edit</button>
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