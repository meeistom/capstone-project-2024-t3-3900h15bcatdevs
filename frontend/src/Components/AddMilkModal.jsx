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
import { URL } from "../constants.jsx";

export { AddMilkModal };

function AddMilkModal({ addMilk, closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  const [expiryDate, setExpiryDate] = useState("");
  const [expressDate, setExpressDate] = useState("");
  const [milkType, setMilkType] = useState("");
  const [storageType, setStorageType] = useState("");
  const [notes, setNotes] = useState("");
  const [motherData, setMotherData] = useState(null);
  const [babyData, setBabyData] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const getBabyDetails = async (barcode) => {
    const url = `${URL}/babies?mrn=${barcode}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      setBabyData(response.data);
      console.log("Baby data fetched:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching baby data:", error);
      alert(
        "Failed to fetch baby details with corresponding barcode. Please try again."
      );
      return null;
    }
  };

  const getMotherDetails = async (mother_mrn) => {
    const url = `${URL}/mothers?mrn=${mother_mrn}`;
    console.log(url);
    try {
      const response = await axios.get(url);
      setMotherData(response.data);
      console.log("Mother data fetched:", response.data);
      setModalVersion("addMilk2");
    } catch (error) {
      console.log("Error fetching Mother data:", error);
      alert(
        "Failed to fetch mother details with corresponding mrn. Please try again."
      );
    }
  };
  const handleInput = async (event) => {
    const barcode = event.target.value;
    console.log(barcode);
    if (barcode.length === 4) {
      const babyDetails = await getBabyDetails(barcode);
      if (babyDetails && babyDetails.mother_mrn) {
        await getMotherDetails(babyDetails.mother_mrn);
      }
    }
  };

  const handleSubmitMilkInfo = async() => {
    const bottleDetails = {
      milk_type: milkType,
      express_time: new Date(expressDate).getTime() / 1000,
      expiration_time: new Date(expiryDate).getTime() / 1000,
      storage_type: storageType,
      storage_location: "level 1",
      volume_ml: 50,
      baby_mrn: babyData.mrn,
      extra_notes: notes,
    };
    axios
      .post(`${URL}/add_milk_entry`, bottleDetails)
      .then((response) => {
        console.log(`Bottle details added: ${response}`, response.data);
        addMilk(response.data);
        setModalVersion("addMilk4");
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
      alert("Please fill in all relevant information");
    } else {
      setModalVersion("addMilk3");
    }
  };

  const handlePrintAndMovePage = async() => {
    try {
      await handleSubmitMilkInfo();
      printImage();
    } catch (error) {
      console.error("Error submitting milk info:", error);
    }
  };

  const useEffectDependencies = [
    modalVersion,
    expressDate,
    expiryDate,
    milkType,
    storageType,
    notes,
  ];

  // Handles which version of modal is rendered
  useEffect(() => {
    switch (modalVersion) {
      case "addMilk1":
        setTitle("Please scan the baby's barcode");
        setBody(
          <>
            <Form.Control
              type="number"
              name="scanner-input"
              className="scanner-input"
              placeholder="Scan Barcode"
              ref={scannerInputRef}
              onChange={handleInput}
              maxLength={4}
              autoFocus
            />
            <img src={scanner} alt="scanner" className="mt-4" />
          </>
        );
        setFooter("Waiting for scan...");
        break;
      case "addMilk2":
        setTitle("Confirm Information");
        setBody(
          <>
            <AddMilkForm
              babyData={babyData}
              motherData={motherData}
              expiryDate={expiryDate}
              expressDate={expressDate}
              milkType={milkType}
              storageType={storageType}
              notes={notes}
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
            <Button
              name="preview-sticker"
              onClick={handleCheckInput}
              variant="primary"
            >
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
            <Button
              name="confirm-and-print"
              onClick={handlePrintAndMovePage}
              variant="primary"
            >
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
            <Button name="return-home" onClick={() => closeModal(false)}>
              Return Home
            </Button>
          </div>
        );
        break;
    }
  }, useEffectDependencies);

  return (
    <>
      <Modal
        id="add-milk-modal"
        title={title}
        body={body}
        footer={footer}
        closeModal={closeModal}
      />
    </>
  );
}
