import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import scanner from "../Assets/scanner.png";
import confirmCheck from "../Assets/confirm-check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export { Modal };

function Modal({ closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  let title, body, footer;
  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
      // console.log("Input field focused"); // for debug
    }
  }, []);

  const handleInput = () => {
    const scannedValue = scannerInputRef.current.value;
    // console.log(scannedValue); // for debug
    if (scannedValue.length >= 8) {
      // this will be changed later on to data matching
      setModalVersion("addMilk2");
    }
  };

  // handle which version of modal is rendered
  switch (modalVersion) {
    case "addMilk1":
      title = "Please scan the mother's barcode";
      body = (
        <>
          <input
            type="text"
            className="scanner-input"
            ref={scannerInputRef}
            onChange={handleInput}
          ></input>
          <img src={scanner} alt="scanner" />
        </>
      );
      footer = "Waiting for scan...";
      break;
    case "addMilk2":
      title = "Confirm Infomation";
      body = "this will be a form";
      footer = (
        <>
          <div>and this will be two btns</div>
          <Button onClick={() => setModalVersion("addMilkComplete")}>
            Next
          </Button>
        </>
      );
      break;
    case "addMilkComplete":
      title = "Added Milk Successfully";
      body = (
        <>
          <div>
            Milk from the Mother was added. You may close the pop up now.
          </div>
          <img src={confirmCheck} alt="Confirmation Icon" />
        </>
      );
      footer = <Button onClick={() => closeModal(false)}>Return Home</Button>;
      break;
  }
  return (
    <>
      <div className="modal-background">
        <div className="modal-container">
          <div className="modal-close-btn">
            <button onClick={() => closeModal(false)}>
              <FontAwesomeIcon className="close-btn" icon={faXmark} />
            </button>
          </div>
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="body">{body}</div>
          <div className="footer">{footer}</div>
        </div>
      </div>
    </>
  );
}
