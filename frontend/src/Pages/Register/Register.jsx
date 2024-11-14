import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

import { Navibar } from '../../Components/Navibar';
import { CheckboxButton } from '../../Components/CheckboxButton';
import { MotherRegistration } from './MotherRegistration';
import { BabyRegistration } from './BabyRegistration';
import { MilkRegistration } from './MilkRegistration';
import { ConfirmDetails } from './ConfirmDetails';
import { PreviewGeneratedLabel } from './PreviewGeneratedLabel';
import { NextButton } from '../../Components/NextButton';
import { BackButton } from '../../Components/BackButton';
import { Button } from 'react-bootstrap';
import { toUnix } from '../../Utils/utils';
import { URL } from '../../constants';

export { Register };

function Register() {
  const [currentPage, setCurrentPage] = useState(null);
  const [registerStarted, setRegisterStarted] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [renderedPage, setRenderedPage] = useState(null);
  const [momForm, setMomForm] = useState({
    mrn: '',
    first_name: '',
    last_name: ''
  });
  const [babyForm, setBabyForm] = useState({
    mrn: '',
    first_name: '',
    last_name: ''
  });
  const [milkForm, setMilkForm] = useState({
    milk_type: 'ehm',
    express_time: '',
    expiration_time: '',
    storage_type: 'fridge',
    additive: 'none',
    extra_notes: ''
  });
  const [labelPrint, setLabelPrint] = useState('');
  const [validForm, setValidForm] = useState(false);

  const navigate = useNavigate();

  const goToHome = async () => {
    try {
      if (checked.momPage) await submitMomInfo();
      if (checked.babyPage) await submitBabyInfo();
      if (checked.milkPage) await submitMilkInfo();
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      navigate('/');
    }
  };

  const nextPageToVisit = () => {
    setCurrentPage((currentPage) => currentPage + 1);
    setValidForm(false);
  };

  const prevPageToVisit = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const [checked, setChecked] = useState({
    momPage: false,
    babyPage: false,
    milkPage: false
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setChecked((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const startRegistration = () => {
    const pages = ['prePage'];

    if (checked.momPage) pages.push('momPage');
    if (checked.babyPage) pages.push('babyPage');
    if (checked.milkPage) pages.push('milkPage');

    if (pages.length <= 1) return;

    pages.push('confirm', 'preview');

    setSelectedPages(pages);
    setRegisterStarted(true);
    setCurrentPage(1);
    setValidForm(false);
  };

  const printImage = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`<img src="data:image/png;base64,${labelPrint}" />`);
    printWindow.document.close();
    printWindow.print();
  };

  const submitMomInfo = async () => {
    const url = `${URL}/add_mother`;
    try {
      await axios.post(url, momForm);
    } catch (e) {
      console.error('Unable to post mom info', e.response.data);
    }
  };

  const submitBabyInfo = async () => {
    const babyInfo = {
      ...babyForm,
      mother_mrn: momForm.mrn
    };

    const url = `${URL}/add_baby`;
    try {
      await axios.post(url, babyInfo);
    } catch (e) {
      console.error('Unable to post baby info', e.response.data);
    }
  };

  const submitMilkInfo = async () => {
    const bottleDetails = {
      milk_type: milkForm.milk_type,
      express_time: toUnix(milkForm.express_time),
      expiration_time: toUnix(milkForm.expiration_time),
      storage_type: milkForm.storage_type,
      storage_location: 'level 1',
      volume_ml: 50,
      baby_mrn: babyForm.mrn,
      extra_notes: milkForm.extra_notes,
      additives: milkForm.additive
    };
    console.log(bottleDetails);
    axios
      .post(`${URL}/add_milk_entry`, bottleDetails)
      .then((response) => {
        console.log(`Bottle details added: ${response}`, response.data);
      })
      .catch((error) => {
        console.log('Error posting bottle details:', error);
        alert('Failed to add bottle details. Please try again.');
      });
  };

  useEffect(() => {
    setValidForm(Object.values(checked).some((value) => value));
  }, [checked]);

  useEffect(() => {
    if (selectedPages[currentPage] === 'prePage') {
      setRegisterStarted(false);
    }
    if (selectedPages[currentPage] === 'confirm') {
      setValidForm(true);
      setRenderedPage(
        <ConfirmDetails
          momForm={momForm}
          babyForm={babyForm}
          milkForm={milkForm}
          checked={checked}
        />
      );
    }
    if (selectedPages[currentPage] === 'preview') {
      const milkInfo = {
        first_name: babyForm.first_name,
        last_name: babyForm.last_name,
        milk_type: milkForm.milk_type,
        express_time: toUnix(milkForm.express_time),
        expiration_time: toUnix(milkForm.expiration_time),
        storage_type: milkForm.storage_type,
        storage_location: milkForm.storage_type,
        volume_ml: 100,
        mrn: babyForm.mrn,
        additives: milkForm.additive,
        extra_notes: milkForm.extra_notes
      };
      setRenderedPage(
        <PreviewGeneratedLabel
          milkInfo={milkInfo}
          milkChecked={checked.milkPage}
          setLabelPrint={setLabelPrint}
        />
      );
    }
  }, [selectedPages, currentPage]);

  useEffect(() => {
    if (selectedPages[currentPage] === 'momPage') {
      setRenderedPage(
        <MotherRegistration momForm={momForm} setMomForm={setMomForm} setValidForm={setValidForm} />
      );
    }
  }, [selectedPages, currentPage, momForm, validForm]);

  useEffect(() => {
    if (selectedPages[currentPage] === 'babyPage') {
      setRenderedPage(
        <BabyRegistration
          momChecked={checked.momPage}
          momForm={momForm}
          setMomForm={setMomForm}
          babyForm={babyForm}
          setBabyForm={setBabyForm}
          setValidForm={setValidForm}
        />
      );
    }
  }, [selectedPages, currentPage, momForm, babyForm, validForm]);

  useEffect(() => {
    if (selectedPages[currentPage] === 'milkPage') {
      setRenderedPage(
        <MilkRegistration
          babyChecked={checked.babyPage}
          babyForm={babyForm}
          setBabyForm={setBabyForm}
          milkForm={milkForm}
          setMilkForm={setMilkForm}
          setValidForm={setValidForm}
        />
      );
    }
  }, [selectedPages, currentPage, milkForm, babyForm, validForm]);

  return (
    <>
      <Navibar />
      <section id="Register">
        <div className="register-page-container d-flex flex-column align-items-center h-100">
          <div className="register-title text-center">
            <h1>Register</h1>
          </div>

          {!registerStarted && (
            <>
              <div className="register-selection-container d-flex flex-column justify-content-between align-items-center">
                <div className="title fs-3 text-center position-relative">
                  <h2>{'What would you like to register?'}</h2>
                </div>
                <div className="checkbox-container d-flex fs-1 justify-content-center">
                  <CheckboxButton
                    id="toggle-check-mom"
                    name="momPage"
                    isChecked={checked.momPage}
                    onChange={handleCheckboxChange}>
                    Mother
                  </CheckboxButton>
                  <CheckboxButton
                    id="toggle-check-baby"
                    name="babyPage"
                    isChecked={checked.babyPage}
                    onChange={handleCheckboxChange}>
                    Baby
                  </CheckboxButton>
                </div>
                <div className="checkbox-container">
                  <CheckboxButton
                    id="toggle-check-milk"
                    name="milkPage"
                    isChecked={checked.milkPage}
                    onChange={handleCheckboxChange}>
                    Milk
                  </CheckboxButton>
                </div>
              </div>
              <div className="nav-button-container">
                <div className="back-button-container justify-content-start"></div>
                <div className="next-button-container justify-content-end">
                  <NextButton
                    id="start-rgstr-btn"
                    onClick={startRegistration}
                    disabled={!validForm}>
                    Next
                  </NextButton>
                </div>
              </div>
            </>
          )}

          {/* Navigation buttons */}
          {registerStarted && currentPage !== null && (
            <>
              <div className="rendered-page">{renderedPage}</div>
              <div className="nav-button-container">
                <div className="back-button-container justify-content-start">
                  {currentPage > 0 && (
                    <BackButton id="back-btn" onClick={prevPageToVisit}>
                      Back
                    </BackButton>
                  )}
                </div>
                <div className="next-button-container d-flex justify-content-end">
                  {currentPage < selectedPages.length - 1 && (
                    <NextButton id="next-btn" onClick={nextPageToVisit} disabled={!validForm}>
                      Next
                    </NextButton>
                  )}
                  {currentPage === selectedPages.length - 1 && (
                    <>
                      {checked.milkPage && (
                        <Button
                          name="rgstr-print-label"
                          variant="outline-primary"
                          size="lg"
                          onClick={printImage}>
                          Print Label
                        </Button>
                      )}

                      <Button name="return-home" variant="primary" size="lg" onClick={goToHome}>
                        Confirm and Return Home
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
