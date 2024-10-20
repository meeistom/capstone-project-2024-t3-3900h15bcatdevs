import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AddMilkForm } from "./AddMilkForm.jsx";
import { Modal } from "./Modal.jsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import confirmCheck from "../Assets/confirm-check.png";
import sticker from "../Assets/milk1_label.png";
import scanner from "../Assets/scanner.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

export { AddMilkModal };

function AddMilkModal({ closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  const [scannedValue, setScannedValue] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("");
  const [milkType, setMilkType] = useState("ehm");
  const [storageType, setStorageType] = useState("fridge");
  const [notes, setNotes] = useState("");
  const [motherData, setMotherData] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const fetchMotherDetails = (barcode) => {
    const url = `http://localhost:5001/database/fetch_mother/${barcode}`;
    axios
      .get(url)
      .then((response) => {
        setMotherData(response.data);
        console.log("Mother data fetched:", response.data);
        setModalVersion("addMilk2");
      })
      .catch((error) => {
        console.log("Error fetching mother data:", error);
        alert(
          "Failed to fetch mother details with corresponding barcode. Please try again."
        );
      });
  };

  const handleInput = (event) => {
    const barcode = event.target.value;
    console.log(event.target.value);
    setScannedValue(barcode);
    if (barcode.length == 13) {
      setModalVersion("addMilk2");
      fetchMotherDetails(barcode);
    }
  };

  const handleSubmitMilkInfo = () => {
    const bottleDetails = {
      milk_type: milkType,
      bottle_quantity: 1,
      express_time: expressDate,
      storage_method: storageType,
      storage_location: "level 1",
      extra_notes: notes,
      mother_id: motherData[0],
    };

    const url = "http://localhost:5001/database/insert_bottle";
    axios
      .post(url, bottleDetails)
      .then((response) => {
        console.log("Bottle details added:");
        setModalVersion("addMilk3");
      })
      .catch((error) => {
        console.log("Error posting bottle details:", error);
        alert("Failed to add bottle details. Please try again.");
      });
  };

  const printImage = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      `<img src="${sticker}" alt="sticker" style="max-width: 100%;" />`
    );
    printWindow.document.close();
    printWindow.print();
  };

  const handleCheckInput = () => {
    if (!expiryDate || !expressDate) {
      alert("Please fill in all relevant infomation");
    } else {
      handleSubmitMilkInfo();
    }
  };

  const handlePrintAndMovePage = () => {
    printImage();
    setModalVersion("addMilk4");
  };

  // Handles which version of modal is rendered
  useEffect(() => {
    switch (modalVersion) {
      case "addMilk1":
        setTitle("Please scan the mother's barcode");
        setBody(
          <>
            <Form.Control
              type="number"
              className="scanner-input"
              placeholder="Scan Barcode"
              ref={scannerInputRef}
              onChange={handleInput}
              maxLength={13}
            />
            <img src={scanner} alt="scanner" className="mt-4" />
          </>
        );
        setFooter("Waiting for scan...");
        break;
      case "addMilk2":
        setTitle("Confirm Infomation");
        setBody(
          <>
            <AddMilkForm
              motherData={motherData}
              setExpressDate={setExpressDate}
              setExpiryDate={setExpiryDate}
              setMilkType={setMilkType}
              setStorageType={setStorageType}
              setNotes={setNotes}
            />
          </>
        );
        setFooter(
          <div id="btn-group">
            <Button onClick={() => closeModal(false)} variant="outline-primary">
              Cancel
            </Button>
            <Button onClick={handleCheckInput} variant="primary">
              Preview Sticker
            </Button>
          </div>
        );
        break;
      case "addMilk3":
        setTitle("Sticker Preview");
        setBody(
          <img src={sticker} alt="sticker" className="preview-sticker my-4" />
        );
        setFooter(
          <div id="btn-group">
            <Button
              onClick={() => setModalVersion("addMilk2")}
              variant="outline-primary"
            >
              Back to Edit
            </Button>
            <Button onClick={handlePrintAndMovePage} variant="primary">
              Confirm and Print
            </Button>
          </div>
        );
        break;
      case "addMilk4":
        setTitle("Milk Added Successfully");
        setBody(
          <div className="milk-confirmed d-flex justify-content-center align-items-center flex-column text-center gap-3">
            <p>Milk from the Mother was added. You may close the pop up now.</p>
            <img
              src={confirmCheck}
              alt="Confirmation Icon"
              className="confirm-img mt-5"
            />
          </div>
        );
        setFooter(
          <div id="btn-group">
            <Button onClick={printImage} variant="outline-primary">
              Reprint
            </Button>
            <Button onClick={() => closeModal(false)}>Return Home</Button>
          </div>
        );
        break;
    }
  }, [modalVersion]);

  return (
    <>
      <Modal
        title={title}
        body={body}
        footer={footer}
        closeModal={closeModal}
      />
    </>
  );
}
