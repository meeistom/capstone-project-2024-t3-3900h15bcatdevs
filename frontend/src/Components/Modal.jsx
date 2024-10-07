import React, { useEffect, useRef, useState } from 'react';
import "../index.css";
import scanner from "../Assets/scanner.png";
import { Form } from "./Form.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export { Modal };

function Modal({ closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  const [scannedValue, setScannedValue] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("")
  let title, body, footer;

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
      // console.log("Input field focused"); // for debug
    }
  }, [])
  
  const handleInput = () => {
    setScannedValue(scannerInputRef.current.value);
    // console.log(scannedValue); // for debug
    if (scannedValue.length >= 8) { // this will be changed later on to data matching
      setModalVersion("addMilk2");
    }
  }

  const handleSubmitMilkInfo = () => {
    if (!expiryDate || !expressDate) {
      // for debug
      // console.log(expiryDate)
      // console.log(expressDate)
      alert("Please fill in all relevant infomations^ ^");
    } else {
      setModalVersion("addMilk3");
    }
  }

  // handle which version of modal is rendered
  switch (modalVersion) {
    case "addMilk1":
      title = "Please scan the mother's barcode";
      body = (
        <>
          <input type="text" className="scanner-input" ref={scannerInputRef} onChange={handleInput}></input>
          <img src={scanner} alt="scanner" />
        </>
      );
      footer = "Waiting for scan...";
      break;
    case "addMilk2":
      title = "Confirm Infomation";
      body = (
        <>
          <Form mrn={scannedValue} expiryDate={expiryDate} expressDate={expressDate} setExpressDate={setExpressDate} setExpiryDate={setExpiryDate}/>
        </>
      )
      footer = (
        <>
         <button onClick={() => closeModal(false)} type="button" class="btn btn-outline-primary">Cancel</button>
         <button type="button" class="btn btn-primary" onClick={handleSubmitMilkInfo}>Confirm</button>
        </>
      )
      break;
    case "addMilk3":
      title = "sticker preview";
      body = "pretend im a picture";
      footer = "pretend im two btns";
      break;
    case "addMilk4":
      // prepared for merge conflict
  }
  return (
    <>
      <div className='modal-background'>
        <div className='modal-container'>
          <div className='modal-close-btn'>
            <button onClick={() => closeModal(false)}>
              <FontAwesomeIcon className='close-btn' icon={faXmark} />
            </button>
          </div>
          <div className='title'>
            <p>{title}</p>
          </div>
          <div className='body'>
            {body}
          </div>
          <div className='footer'>
            {footer}
          </div>
        </div>
      </div>
    </>
  )};