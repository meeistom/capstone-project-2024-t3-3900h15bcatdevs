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

  const babyPageIsValid = () => {
    return Object.values(babyForm).every((field) => field !== '');
  };

  const momPageIsValid = () => {
    return momForm.mrn !== '';
  };

  useEffect(() => {
    if (momPageIsValid() && babyPageIsValid()) {
      setValidForm(true);
    } else setValidForm(false);
  }, [momForm, babyForm]);

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{'Baby Details'}</h2>
        </div>
        <div className="register-form-label">Baby MRN</div>
        <Form.Control
          type="number"
          name="baby-mrn"
          placeholder="Enter MRN"
          value={babyForm.mrn}
          maxLength={4}
          onChange={(e) => handleChange(e, 'mrn')}
        />
        <Form.Text className="text-muted"></Form.Text>
        {!momChecked && (
          <>
            <div className="register-form-label">Mother MRN</div>
            <Form.Control
              type="number"
              name="mom-mrn"
              placeholder="Enter MRN"
              value={momForm.mrn}
              maxLength={4}
              onChange={(e) => handleMomChange(e)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </>
        )}
        <div className="register-form-label">First Name</div>
        <Form.Control
          type="text"
          name="baby-fname"
          placeholder="Enter First Name"
          value={babyForm.first_name}
          onChange={(e) => handleChange(e, 'first_name')}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">Last Name</div>
        <Form.Control
          type="text"
          name="baby-lname"
          placeholder="Enter Last Name"
          value={babyForm.last_name}
          onChange={(e) => handleChange(e, 'last_name')}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
