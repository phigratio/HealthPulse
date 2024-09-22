//This is the page where the doctor can create a prescription for the patient

import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import PrescriptionService from "../service/PrescriptionService";
import { getUser } from "../../service/user-service";
import { getCurrentUserDetail } from "../../auth";
import DrawingCanvas from "../../servicePage/DrawingCanvas";
import { PenTool } from "lucide-react";

import "./style/CreatePrescription.css";

const CreatePrescription = () => {
  const editor = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [useCanvas, setUseCanvas] = useState(false);
  const [extractedText, setExtractedText] = useState(""); // For showing the extracted text under canvas

  const toggleModal = () => setModalOpen(!isModalOpen);

  // Handle extracted text and insert it into the correct field
  const handleExtractedText = (extractedText) => {
    setExtractedText(extractedText); // Set the extracted text for display

    // Insert into the appropriate field
    if (activeField === "patientId") {
      setPrescription((prev) => ({ ...prev, patientId: extractedText })); // Insert into patient ID
    } else if (activeField === "prescription") {
      if (editor.current && editor.current.jodit) {
        const joditInstance = editor.current.jodit;
        joditInstance.selection.insertHTML(extractedText); // Insert into editor
        joditInstance.setEditorValue(joditInstance.getEditorValue()); // Ensure editor is updated

        setPrescription((prev) => ({
          ...prev,
          prescription: joditInstance.getEditorValue(), // Sync with state
        }));
      }
    }
    toggleModal(); // Close the modal after insertion
  };

  // Function to open canvas modal for a specific field
  const openDrawingCanvas = (field) => {
    setActiveField(field);
    toggleModal();
  };
  const [content, setContent] =
    useState(`<div style="flex: 1 1 0%; margin-right: 10px; color: rgb(0, 0, 0); font-family: Arial, sans-serif; font-size: medium; font-style: normal; font-weight: 400; letter-spacing: normal; text-align: start; background-color: rgb(255, 255, 255);">
  <p style="margin: 5px 0;">
    <strong>Name:</strong> {{doctorName}}
    <img src="http://localhost:3000/static/media/HealthPulseLogo3-removebg.3ffb080fbeacb295c538.png" width="89" height="89" style="vertical-align: middle; float: right;">
  </p>
  <p style="margin: 5px 0;">
    <strong>Specialization:</strong> {{doctorSpecialization}}
  </p>
  <p style="margin: 5px 0;">
    <strong>Phone:</strong> {{doctorPhone}}
  </p>
</div>

<table style="border-collapse: collapse; width: 100%;">
  <tbody>
    <tr>
      <td style="width: 50%;">
        <h4 class="d-header" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; line-height: 1.1; color: white; margin-top: 10px; margin-bottom: 10px; font-size: 18px; text-align: center; background: mediumseagreen; padding: 5px;">
          Symptoms
        </h4>
        <p><br></p>
        <p><br></p>
        <p><br></p>
        <p><br></p>
        <p><br></p>
        <p><br></p>
        <p><br></p>
        <p><br></p>
      </td>
      <td style="width: 50%; vertical-align: top;" rowspan="3">
        <span style="color: rgb(51, 51, 51); font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 2em;">
          R<sub style="font-size: 21px; line-height: 0; vertical-align: baseline; bottom: -0.25em;">x<br></sub>
        </span>
        <hr>
        <br>
      </td>
    </tr>
    <tr>
      <td>
        <h4 class="d-header" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; line-height: 1.1; color: white; margin-top: 10px; margin-bottom: 10px; font-size: 18px; text-align: center; background: mediumseagreen; padding: 5px;">
          Tests
        </h4>
        <br><br><br><br><br><br><br><br>
      </td>
    </tr>
    <tr>
      <td>
        <h4 class="d-header" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-weight: 800; line-height: 1.1; color: white; margin-top: 10px; margin-bottom: 10px; font-size: 18px; text-align: center; background: mediumseagreen; padding: 5px;">
          Advice
        </h4>
        <br><br><br><br><br><br><br><br>
      </td>
    </tr>
  </tbody>
</table>
  `);
  const [prescription, setPrescription] = useState({
    doctorId: "",
    patientId: "",
    prescription: "",
  });

  const [user, setUser] = useState(undefined);
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});

  // Field changed function
  const fieldChanged = (e) => {
    setPrescription({ ...prescription, [e.target.name]: e.target.value });
  };

  // Reset form function
  const resetForm = () => {
    setPrescription({
      doctorId: user.id || "", // Reset to the current user's ID
      patientId: "",
      prescription: "",
    });
    setContent(content); // Reset content to initial state with placeholders
  };

  // Create prescription function
  const createPrescription = (e) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error("User not logged in");
      return;
    }

    if (!prescription.patientId.trim()) {
      toast.error("Please enter patient ID");
      return;
    }
    if (!prescription.prescription.trim()) {
      toast.error("Please enter prescription details");
      return;
    }

    const prescriptionData = {
      ...prescription,
      creatorId: user.id,
    };

    // Submit the form to the server
    PrescriptionService.createPrescription(prescriptionData)
      .then((data) => {
        toast.success("Prescription created successfully");
        resetForm(); // Reset the form after successful prescription creation
      })
      .catch((error) => {
        toast.error("Something went wrong. Please try again.");
      });
  };

  // Getting current user
  useEffect(() => {
    const currentUser = getCurrentUserDetail();
    setUser(currentUser);
    if (currentUser && currentUser.id) {
      setPrescription((prev) => ({
        ...prev,
        doctorId: currentUser.id,
      }));

      // Fetch doctor details
      getUser(currentUser.id)
        .then((data) => {
          setDoctor(data);
          console.log(data);
        })
        .catch(() => {
          setDoctor({
            name: "Unknown",
            specialization: "Unknown",
            phone: "Unknown",
            address: "Unknown",
          });
        });

      // Fetch patient details if patientId is set
      if (prescription.patientId) {
        getUser(prescription.patientId)
          .then((data) => {
            setPatient(data);
          })
          .catch(() => {
            setPatient({
              name: "Unknown",
              dob: "Unknown",
              gender: "Unknown",
              address: "Unknown",
              phone: "Unknown",
            });
          });
      }
    }
  }, [prescription.patientId]);

  // Update content with user data
  useEffect(() => {
    if (doctor) {
      console.log("Doctor:", doctor);
      console.log("Name: " + doctor.name);

      let updatedContent = content;

      // if (doctor.name) {
      //   updatedContent = updatedContent.replace(
      //     "{{doctorName}}",
      //     doctor.name.trim()
      //   );
      // } else {
      //   updatedContent = updatedContent.replace("{{doctorName}}", "N/A");
      // }
      const name = String(doctor.name);
      console.log("Name 2:", name);

      updatedContent = updatedContent.replace("{{doctorName}}", name);

      if (doctor.specialization) {
        updatedContent = updatedContent.replace(
          "{{doctorSpecialization}}",
          doctor.specialization
        );
      } else {
        updatedContent = updatedContent.replace(
          "{{doctorSpecialization}}",
          "N/A"
        );
      }

      if (doctor.phone) {
        updatedContent = updatedContent.replace(
          "{{doctorPhone}}",
          doctor.phone
        );
      } else {
        updatedContent = updatedContent.replace("{{doctorPhone}}", "N/A");
      }

      // console.log("Updated Content:", updatedContent);
      setContent(updatedContent);
    }
  }, [doctor]);

  return (
    <div className="cp-wrapper">
      <Card className="cp-card shadow-sm border-0 mt-2">
        <CardBody>
          <h3 className="text-center">Create a New Prescription</h3>
          <Form onSubmit={createPrescription}>
            <div className="my-3">
              <Label for="doctorId">Doctor ID</Label>
              <Input
                type="text"
                id="doctorId"
                name="doctorId"
                value={prescription.doctorId}
                readOnly
              />
            </div>
            <div className="my-3 d-flex align-items-center">
              <div className="flex-grow-1">
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
              {/* <Button
                color="link"
                className="ms-2 p-0"
                onClick={() => openDrawingCanvas("patientId")}
              >
                <PenTool size={20} />
              </Button> */}
            </div>
            <div className="my-3">
              <Label for="prescription">Prescription Details</Label>
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    onChange={(newContent) => {
                      setContent(newContent);
                      setPrescription({
                        ...prescription,
                        prescription: newContent,
                      });
                    }}
                  />
                </div>
                {/* <Button
                  color="link"
                  className="ms-2 p-0"
                  onClick={() => openDrawingCanvas("prescription")}
                >
                  <PenTool size={20} />
                </Button> */}
              </div>
            </div>
            <Container className="text-center">
              <Button type="submit" color="primary">
                Create Prescription
              </Button>
              <Button
                type="reset"
                color="secondary"
                className="ms-2"
                onClick={resetForm}
              >
                Reset
              </Button>
            </Container>
          </Form>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Handwriting Canvas</ModalHeader>
        <ModalBody>
          <DrawingCanvas onExtract={handleExtractedText} />
          {extractedText && (
            <div className="mt-3">
              <h5>Extracted Text:</h5>
              <p>{extractedText}</p>
              console.log(extractedText);
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreatePrescription;
