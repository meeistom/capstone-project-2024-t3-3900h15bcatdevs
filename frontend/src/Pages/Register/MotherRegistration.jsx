import { React } from "react";
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
  };

  const handleLastNameOnChange = (e) => {
    setMomLastName(e.target.value);
  };

  return (
    <>
      <div className="register-details-container d-flex flex-column">
        <div className="title align-self-center">
          <h2>{"Mother Details"}</h2>
        </div>
        <div className="register-form-label">MRN</div>
        <Form.Control
          type="number"
          name="mom-mrn"
          placeholder="Enter MRN"
          value={momMRN}
          maxLength={4}
          onChange={(e) => setMomMRN(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">First Name</div>
        <Form.Control
          type="text"
          name="mom-fname"
          placeholder="Enter First Name"
          value={momFirstName}
          onChange={(e) => handleFirstNameOnChange(e)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">Last Name</div>
        <Form.Control
          type="text"
          name="mom-lname"
          placeholder="Enter Last Name"
          value={momLastName}
          onChange={(e) => handleLastNameOnChange(e)}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
