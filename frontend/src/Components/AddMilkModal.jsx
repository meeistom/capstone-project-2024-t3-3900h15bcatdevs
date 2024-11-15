import React, { useEffect, useRef, useState } from 'react';
import { AddMilkForm } from './AddMilkForm.jsx';
import { Modal } from './Modal.jsx';
import { toUnix } from '../Utils/utils.jsx';
import { URL } from '../constants.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

import confirmCheck from '../Assets/confirm-check.png';
import scanner from '../Assets/scanner.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

export { AddMilkModal };

function AddMilkModal({ addMilk, closeModal, version }) {
  const scannerInputRef = useRef(null);
  const [modalVersion, setModalVersion] = useState(version);
  const [milkForm, setMilkForm] = useState({
    milk_type: 'ehm',
    storage_type: 'fridge',
    expiration_time: '',
    express_time: '',
    extra_notes: '',
    additives: ['none']
  });
  const [motherData, setMotherData] = useState(null);
  const [babyData, setBabyData] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState(null);
  const [footer, setFooter] = useState(null);
  const [labelPrint, setLabelPrint] = useState('');

  useEffect(() => {
    if (scannerInputRef.current) {
      scannerInputRef.current.focus();
    }
  }, []);

  const getBabyDetails = async (barcode) => {
    const url = `${URL}/babies?mrn=${barcode}`;
    try {
      const response = await axios.get(url);
      const mrn = response.data.mrn;
      const first_name = response.data.first_name;
      const last_name = response.data.last_name;
      setBabyData({ mrn, first_name, last_name });
      return response.data;
    } catch (error) {
      console.error('Error fetching baby data:', error);
      alert('Failed to fetch baby details with corresponding barcode. Please try again.');
      return null;
    }
  };

  const getMotherDetails = async (mother_mrn) => {
    const url = `${URL}/mothers?mrn=${mother_mrn}`;
    try {
      const response = await axios.get(url);
      const first_name = response.data.first_name;
      const last_name = response.data.last_name;
      setMotherData({ first_name, last_name });
      setModalVersion('addMilk2');
    } catch (error) {
      console.error('Error fetching Mother data:', error);
      alert('Failed to fetch mother details with corresponding mrn. Please try again.');
    }
  };

  const handleInput = async (event) => {
    const barcode = event.target.value;
    if (barcode.length === 4) {
      const babyDetails = await getBabyDetails(barcode);
      if (babyDetails && babyDetails.mother_mrn) {
        await getMotherDetails(babyDetails.mother_mrn);
      }
    }
  };

  const handleSubmitMilkInfo = async () => {
    const bottleDetails = {
      milk_type: milkForm.milk_type,
      express_time: toUnix(milkForm.express_time),
      expiration_time: toUnix(milkForm.expiration_time),
      storage_type: milkForm.storage_type,
      storage_location: 'level 1',
      volume_ml: 50,
      baby_mrn: babyData.mrn,
      extra_notes: milkForm.extra_notes,
      additives: milkForm.additives
    };
    axios
      .post(`${URL}/add_milk_entry`, bottleDetails)
      .then((response) => {
        addMilk(response.data);
      })
      .catch((error) => {
        console.error('Error posting bottle details:', error);
        alert('Failed to add bottle details. Please try again.');
      });
  };

  const generateLabel = async () => {
    const url = `${URL}/preview_milk_label`;
    const milkInfo = {
      first_name: babyData.first_name,
      last_name: babyData.last_name,
      milk_type: milkForm.milk_type,
      express_time: toUnix(milkForm.express_time),
      expiration_time: toUnix(milkForm.expiration_time),
      storage_type: milkForm.storage_type,
      storage_location: 'level 1',
      volume_ml: 50,
      mrn: babyData.mrn,
      extra_notes: milkForm.extra_notes,
      additives: milkForm.additives
    };
    try {
      const response = await axios.get(url, {
        params: {
          milk: JSON.stringify(milkInfo)
        }
      });
      setLabelPrint(response.data);
    } catch (e) {
      console.error('Error generating label', e);
    }
  };

  const printImage = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="data:image/png;base64,${labelPrint}" />`);
    printWindow.document.close();
    printWindow.print();
  };

  const handleCheckInput = async () => {
    if (!milkForm.expiration_time || !milkForm.express_time) {
      alert('Please fill in all relevant information');
    } else {
      await generateLabel();
      setModalVersion('addMilk3');
    }
  };

  const handlePrintAndMovePage = async () => {
    try {
      await handleSubmitMilkInfo();
      printImage();
    } catch (error) {
      console.error('Error submitting milk info:', error);
    } finally {
      setModalVersion('addMilk4');
    }
  };

  // Handles which version of modal is rendered
  useEffect(() => {
    switch (modalVersion) {
      case 'addMilk1':
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
        setFooter('Waiting for scan...');
        break;
      case 'addMilk2':
        setTitle('Confirm Information');
        setBody(
          <>
            <AddMilkForm
              babyMrn={babyData.mrn}
              motherData={motherData}
              milkForm={milkForm}
              setMilkForm={setMilkForm}
            />
          </>
        );
        setFooter(
          <div id="btn-group">
            <Button onClick={() => closeModal(false)} variant="outline-primary">
              Cancel
            </Button>
            <Button name="preview-sticker" onClick={handleCheckInput} variant="primary">
              Preview Sticker
            </Button>
          </div>
        );
        break;
      case 'addMilk3':
        setTitle('Sticker Preview');
        setBody(
          <>
            <img src={`data:image/png;base64,${labelPrint}`} />
          </>
        );
        setFooter(
          <div id="btn-group">
            <Button onClick={() => setModalVersion('addMilk2')} variant="outline-primary">
              Back to Edit
            </Button>
            <Button
              name="confirm-and-print"
              onClick={() => handlePrintAndMovePage()}
              variant="primary">
              Confirm and Print
            </Button>
          </div>
        );
        break;
      case 'addMilk4':
        setTitle('Milk Added Successfully');
        setBody(
          <div className="milk-confirmed d-flex justify-content-center align-items-center flex-column text-center gap-3">
            <p>Milk from the Mother was added. You may close the pop up now.</p>
            <img src={confirmCheck} alt="Confirmation Icon" className="confirm-img mt-5" />
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
  }, [modalVersion, milkForm, labelPrint]);

  return (
    <>
      <Modal
        id="add-milk-modal"
        title={title}
        body={body}
        footer={footer}
        size={'small'}
        closeModal={closeModal}
      />
    </>
  );
}
