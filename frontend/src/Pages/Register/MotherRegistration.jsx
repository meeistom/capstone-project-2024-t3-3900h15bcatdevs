import { React } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.css";
import Form from "react-bootstrap/Form";

export { MotherRegistration };

function MotherRegistration() {
  return (
    <>
      <div className="mother-details-container">
        <h1>{"Mother Details"}</h1>
        <div className="mrn">MRN</div>
        <Form.Control type="email" placeholder="Enter MRN" />
        <Form.Text className="text-muted"></Form.Text>
        <div className="first-name">First Name</div>
        <Form.Control type="email" placeholder="Enter First Name" />
        <Form.Text className="text-muted"></Form.Text>
        <div className="last-name">Last Name</div>
        <Form.Control type="email" placeholder="Enter Last Name" />
        <Form.Text className="text-muted"></Form.Text>
      </div>
    </>
  );
}
