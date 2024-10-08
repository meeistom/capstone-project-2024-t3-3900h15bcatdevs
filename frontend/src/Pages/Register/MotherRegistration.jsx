import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Form from "react-bootstrap/Form";

export { MotherRegistration };

function MotherRegistration() {
  return (
    <>
      <div className="register-details-container">
        <div className="title">
          <h2>{"Mother Details"}</h2>
        </div>
        <div className="form-label">MRN</div>
        <Form.Control type="email" placeholder="Enter MRN" />
        <Form.Text className="text-muted"></Form.Text>
        <div className="form-label">First Name</div>
        <Form.Control type="email" placeholder="Enter First Name" />
        <Form.Text className="text-muted"></Form.Text>
        <div className="form-label">Last Name</div>
        <Form.Control type="email" placeholder="Enter Last Name" />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
