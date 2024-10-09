import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Form from "react-bootstrap/Form";

export { BabyRegistration };

function BabyRegistration({
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
        <div className="form-label">MRN</div>
        <Form.Control
          type="text"
          placeholder="Enter MRN"
          value={babyMRN}
          onChange={(e) => setBabyMRN(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="form-label">First Name</div>
        <Form.Control
          type="text"
          placeholder="Enter First Name"
          value={babyFirstName}
          onChange={(e) => setBabyFirstName(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
        <div className="form-label">Last Name</div>
        <Form.Control
          type="text"
          placeholder="Enter Last Name"
          value={babyLastName}
          onChange={(e) => setBabyLastName(e.target.value)}
        />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
