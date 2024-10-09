import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'; 
import "../index.css";
import scanner from "../Assets/scanner.png";
import { Form } from "./Form.jsx";
import confirmCheck from "../Assets/confirm-check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export { Modal };

function Modal({ closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  const [scannedValue, setScannedValue] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("")
  const [motherData, setMotherData] = useState(null);
  let title, body, footer;

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
      // console.log("Input field focused"); // for debug
    }
  }, []);

  const fetchMotherDetails = barcode => {
    const url = `http://localhost:5001/database/fetch_mother/${barcode}`;
    axios.get(url)
      .then(response => {
        setMotherData(response.data);
        console.log('Mother data fetched:', response.data);
        setModalVersion("addMilk2"); 
      })
      .catch(error => console.error('Error fetching mother data:', error));
  };

  const handleInput = (event) => {
    const barcode = event.target.value;
    setScannedValue(barcode);
    fetchMotherDetails(barcode);
  };


  // const handleInput = () => {
  //   setScannedValue(scannerInputRef.current.value);
  //   // console.log(scannedValue); // for debug
  //   if (scannedValue.length >= 8) {
  //     // this will be changed later on to data matching
  //     setModalVersion("addMilk2");
  //   }
  // };

  const handleSubmitMilkInfo = () => {
    if (!expiryDate || !expressDate) {
      // for debug
      // console.log(expiryDate)
      // console.log(expressDate)
      alert("Please fill in all relevant infomation");
    } else {
      setModalVersion("addMilk3");
    }
  }

  const printImage = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`<img src="${scanner}" alt="scanner" style="max-width: 100%;" />`);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintAndMovePage = () => {
    printImage();
    setModalVersion("addMilk4");
  }

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
      body = (
        <>
          <Form motherData={motherData} expiryDate={expiryDate} expressDate={expressDate} setExpressDate={setExpressDate} setExpiryDate={setExpiryDate}/>
        </>
      )
      footer = (
        <div id="btn-group">
         <button onClick={() => closeModal(false)} type="button" class="btn btn-outline-primary">Cancel</button>
         <button type="button" class="btn btn-primary" onClick={handleSubmitMilkInfo}>Preview Sticker</button>
        </div>
      )
      break;
    case "addMilk3":
      title = "Sticker Preview"
      body = <img src={scanner} alt="scanner" />
      footer = (
        <div id="btn-group">
          <button onClick={() => setModalVersion("addMilk4")} type="button" class="btn btn-outline-primary">Back to Edit</button>
          <button type="button" class="btn btn-primary" onClick={handlePrintAndMovePage}>Confirm and Print</button>
        </div>
      )
      break;
    case "addMilk4":
      title = "Milk Added Successfully";
      body = (
        <div className="milk-confirmed">
          <div>
            Milk from the Mother was added. You may close the pop up now.
          </div>
          <img
            src={confirmCheck}
            alt="Confirmation Icon"
            className="confirm-img"
          />
        </div>
      );
      footer = (
        <div id="btn-group">
          <button onClick={printImage} type="button" class="btn btn-outline-primary">Reprint</button>
          <Button onClick={() => closeModal(false)}>Return Home</Button>
        </div>
      )
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
