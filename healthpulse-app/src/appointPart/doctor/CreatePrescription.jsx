import React, { useEffect, useState, useRef } from "react";
import { Card, CardBody, Form, Input, Label, Button } from "reactstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import PrescriptionService from "../service/PrescriptionService";
import { getCurrentUserDetail } from "../../auth";

const CreatePrescription = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [prescription, setPrescription] = useState({
    doctorId: "",
    patientId: "",
    prescription: "",
  });

  const [user, setUser] = useState(undefined);

  // Field changed function
  const fieldChanged = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  // Content changed function for JoditEditor
  const contentFieldChanged = (newContent) => {
    setPrescription({ ...prescription, prescription: newContent });
  };

  // Reset form function
  const resetForm = () => {
    setPrescription({
      doctorId: "",
      patientId: "",
      prescription: "",
    });
    setContent("");
  };

  // Create prescription function
  const createPrescription = (e) => {
    e.preventDefault();
    console.log("form submitted", prescription);

    if (user && user.id) {
      prescription["creatorId"] = user.id;
    } else {
      toast.error("User not logged in");
      return;
    }

    if (prescription.doctorId.trim() === "") {
      toast.error("Please enter doctor ID");
      return;
    }
    if (prescription.patientId.trim() === "") {
      toast.error("Please enter patient ID");
      return;
    }
    if (prescription.prescription.trim() === "") {
      toast.error("Please enter prescription details");
      return;
    }

    // Submit the form to the server
    PrescriptionService.createPrescription(prescription)
      .then((data) => {
        console.log(data);
        toast.success("Prescription created successfully");
        resetForm(); // Reset the form after successful prescription creation
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      });
  };

  //getting current user

  useEffect(() => {
    setUser(getCurrentUserDetail());
  }, []);

  return (
    <div
      className="wrapper"
      style={{ margin: "0 auto", maxWidth: "1200px", padding: "20px" }}
    >
      <Card
        className="mt-2"
        style={{
          boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
          width: "70%",
        }}
      >
        <CardBody style={{ padding: "20px" }}>
          <h3 className="text-center">Create a New Prescription</h3>
          <Form onSubmit={createPrescription} style={{ width: "100%" }}>
            <div className="my-3">
              <Label for="doctorId">Doctor ID</Label>
              <Input
                type="text"
                id="doctorId"
                placeholder="Enter Doctor ID"
                name="doctorId"
                value={prescription.doctorId}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="patientId">Patient ID</Label>
              <Input
                type="text"
                id="patientId"
                placeholder="Enter Patient ID"
                name="patientId"
                value={prescription.patientId}
                onChange={fieldChanged}
              />
            </div>
            <div className="my-3">
              <Label for="prescription">Prescription Details</Label>
              <JoditEditor
                ref={editor}
                value={content}
                onChange={contentFieldChanged}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
                style={{ minHeight: "300px", width: "100%" }}
              />
            </div>
            <div className="button-container text-center">
              <Button
                type="submit"
                className="small-button button me-2"
                color="primary"
              >
                Create Prescription
              </Button>
              <Button
                type="button"
                className="small-button button reset-button"
                color="danger"
                onClick={resetForm}
              >
                Reset
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreatePrescription;
