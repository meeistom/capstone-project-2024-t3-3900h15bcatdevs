import { React, useEffect } from 'react';
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

  const momPageIsValid = () => {
    return Object.values(momForm).every((field) => field !== '');
  };

  useEffect(() => {
    if (momPageIsValid()) {
      setValidForm(true);
    } else setValidForm(false);
  }, [momForm]);

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{'Mother Details'}</h2>
        </div>
        <div className="register-form-label">MRN</div>
        <Form.Control
          type="number"
          name="mom-mrn"
          placeholder="Enter MRN"
          value={momForm.mrn}
          maxLength={4}
          onChange={(e) => handleChange(e, 'mrn')}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">First Name</div>
        <Form.Control
          type="text"
          name="mom-fname"
          placeholder="Enter First Name"
          value={momForm.first_name}
          onChange={(e) => handleChange(e, 'first_name')}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">Last Name</div>
        <Form.Control
          type="text"
          name="mom-lname"
          placeholder="Enter Last Name"
          value={momForm.last_name}
          onChange={(e) => handleChange(e, 'last_name')}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
