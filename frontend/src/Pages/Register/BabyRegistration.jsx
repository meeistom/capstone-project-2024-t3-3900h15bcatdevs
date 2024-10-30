import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Form from "react-bootstrap/Form";

export { BabyRegistration };

function BabyRegistration({
  momChecked,
  momMRN,
  setMomMRN,
  babyMRN,
  setBabyMRN,
  babyFirstName,
  setBabyFirstName,
  babyLastName,
  setBabyLastName,
}) {
  return (
    <>
      <div className="register-details-container">
        <div className="title">
          <h2>{"Baby Details"}</h2>
        </div>
        <div className="register-form-label">Baby MRN</div>
        <Form.Control
          type="number"
          name="baby-mrn"
          placeholder="Enter MRN"
          value={babyMRN}
          maxLength={4}
          onChange={(e) => setBabyMRN(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        {!momChecked && (
          <>
            <div className="register-form-label">Mother MRN</div>
            <Form.Control
              type="number"
              name="mom-mrn"
              placeholder="Enter MRN"
              value={momMRN}
              maxLength={4}
              onChange={(e) => setMomMRN(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </>
        )}
        <div className="register-form-label">First Name</div>
        <Form.Control
          type="text"
          name="baby-fname"
          placeholder="Enter First Name"
          value={babyFirstName}
          onChange={(e) => setBabyFirstName(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="register-form-label">Last Name</div>
        <Form.Control
          type="text"
          name="baby-lname"
          placeholder="Enter Last Name"
          value={babyLastName}
          onChange={(e) => setBabyLastName(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
