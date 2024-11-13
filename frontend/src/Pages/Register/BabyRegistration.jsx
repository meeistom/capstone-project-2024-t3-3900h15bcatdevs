import { React, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

export { BabyRegistration };

function BabyRegistration({
  momChecked,
  momForm,
  setMomForm,
  babyForm,
  setBabyForm,
  setValidForm
}) {
  const handleChange = (e, name) => {
    const value = e.target.value;
    setBabyForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMomChange = (e) => {
    const value = e.target.value;
    setMomForm((prev) => ({
      ...prev,
      mrn: value
    }));
  };

  useEffect(() => {
    const isValid =
      momForm.mrn?.length === 4 &&
      babyForm.mrn?.length === 4 &&
      babyForm.first_name &&
      babyForm.last_name;
    setValidForm(isValid);
  }, [momForm, babyForm, setValidForm]);

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{'Baby Details'}</h2>
        </div>
        <Form noValidate>
          <Form.Group className="d-flex flex-column">
            <div className="register-form-label">Baby MRN*</div>
            <Form.Control
              type="number"
              name="baby-mrn"
              placeholder="Enter MRN"
              value={babyForm.mrn}
              maxLength={4}
              onChange={(e) => handleChange(e, 'mrn')}
              isInvalid={babyForm.mrn?.length !== 4}
            />
            {babyForm.mrn?.length !== 4 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                MRN must be exactly 4 digits.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {!momChecked && (
            <>
              <Form.Group className="d-flex flex-column">
                <div className="register-form-label">Mother MRN*</div>
                <Form.Control
                  type="number"
                  name="mom-mrn"
                  placeholder="Enter MRN"
                  value={momForm.mrn}
                  maxLength={4}
                  onChange={(e) => handleMomChange(e)}
                  isInvalid={momForm.mrn?.length !== 4}
                />
              </Form.Group>
              {momForm.mrn?.length !== 4 && (
                <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                  MRN must be exactly 4 digits.
                </Form.Control.Feedback>
              )}
            </>
          )}
          <Form.Group className="d-flex flex-column">
            <div className="register-form-label">First Name*</div>
            <Form.Control
              type="text"
              name="baby-fname"
              placeholder="Enter First Name"
              value={babyForm.first_name}
              onChange={(e) => handleChange(e, 'first_name')}
              isInvalid={babyForm.first_name?.length === 0}
            />
            {babyForm.first_name?.length === 0 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                Please enter baby&apos;s first name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group>
            <div className="register-form-label">Last Name*</div>
            <Form.Control
              type="text"
              name="baby-lname"
              placeholder="Enter Last Name"
              value={babyForm.last_name}
              onChange={(e) => handleChange(e, 'last_name')}
              isInvalid={babyForm.last_name?.length === 0}
            />
            {babyForm.last_name?.length === 0 && (
              <Form.Control.Feedback type="invalid" className="fs-6 mt-1 feedback">
                Please enter baby&apos;s last name.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
