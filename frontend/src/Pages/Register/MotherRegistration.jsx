import { React, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Form from "react-bootstrap/Form";

export { MotherRegistration };

function MotherRegistration({
  momMRN,
  setMomMRN,
  momFirstName,
  setMomFirstName,
  momLastName,
  setMomLastName,
}) {
  const handleFirstNameOnChange = (e) => {
    setMomFirstName(e.target.value);
    console.log(momFirstName);
  };

  const handleLastNameOnChange = (e) => {
    setMomLastName(e.target.value);
    console.log(momLastName);
  };

  return (
    <>
      <div className="register-details-container">
        <div className="title">
          <h2>{"Mother Details"}</h2>
        </div>
        <div className="register-form-label">MRN</div>
        <Form.Control
          type="number"
          placeholder="Enter MRN"
          value={momMRN}
          onChange={(e) => setMomMRN(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">First Name</div>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={momFirstName}
          onChange={(e) => handleFirstNameOnChange(e)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">Last Name</div>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={momLastName}
          onChange={(e) => handleLastNameOnChange(e)}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
