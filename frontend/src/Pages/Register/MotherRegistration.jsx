import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

export { MotherRegistration };

function MotherRegistration({ momForm, setMomForm, setValidForm }) {
  const handleChange = (e, name) => {
    const value = e.target.value;
    setMomForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const isValid = momForm.mrn?.length === 4 && momForm.first_name && momForm.last_name;
    setValidForm(isValid);
  }, [momForm, setValidForm]);

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{'Mother Details'}</h2>
        </div>
        <Form noValidate>
          <Form.Group className="d-flex flex-column">
            <div className="register-form-label">MRN*</div>
            <Form.Control
              type="number"
              name="mom-mrn"
              placeholder="Enter MRN"
              value={momForm.mrn}
              maxLength={4}
              onChange={(e) => handleChange(e, 'mrn')}
              isInvalid={momForm.mrn?.length !== 4}
            />
            {momForm.mrn?.length !== 4 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                MRN must be exactly 4 digits.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="d-flex flex-column">
            <div className="register-form-label">First Name*</div>
            <Form.Control
              type="text"
              name="mom-fname"
              placeholder="Enter First Name"
              value={momForm.first_name}
              onChange={(e) => handleChange(e, 'first_name')}
              isInvalid={momForm.first_name?.length === 0}
            />
            {momForm.first_name?.length === 0 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                Please enter mother&apos;s first name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="d-flex flex-column">
            <div className="register-form-label">Last Name*</div>
            <Form.Control
              type="text"
              name="mom-lname"
              placeholder="Enter Last Name"
              value={momForm.last_name}
              onChange={(e) => handleChange(e, 'last_name')}
              isInvalid={momForm.last_name?.length === 0}
            />
            {momForm.last_name?.length === 0 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                Please enter mother&apos;s last name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
