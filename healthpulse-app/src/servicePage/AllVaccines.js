import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import "../style/servicePage/AllVaccines.css";
import base_url from "../api/bootapi";
import axios from "axios";

const AllVaccine = () => {
  const [vaccines, setVaccines] = useState([]);
  const [updateForm, setUpdateForm] = useState(false);
  const [currentVaccine, setCurrentVaccine] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleDelete = (id) => {
    axios
      .delete(`${base_url}/vaccines/${id}`)
      .then(() => {
        setVaccines(vaccines.filter((vaccine) => vaccine.id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`${base_url}/vaccines/${currentVaccine.id}`, formData) // Send PUT request with vaccine ID and data
      .then((response) => {
        console.log("Vaccine updated:", response.data);
        setVaccines(
          vaccines.map((vaccine) =>
            vaccine.id === currentVaccine.id
              ? { ...vaccine, ...formData }
              : vaccine
          )
        );
        setUpdateForm(false); // Hide the update form
        setCurrentVaccine(null); // Clear the current vaccine
      })
      .catch((error) => {
        console.error("Error updating vaccine:", error);
      });
  };

  // Function to load AllVaccines
  const getAllVaccinesFromServer = () => {
    axios
      .get(`${base_url}/vaccines`)
      .then((resp) => {
        setVaccines(resp.data); // Set the vaccines state
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllVaccinesFromServer();
  }, []); // Adding [] as dependency array to fetch data only once

  const showUpdateForm = (vaccine) => {
    setCurrentVaccine(vaccine);
    setFormData({
      title: vaccine.title,
      description: vaccine.description,
    });
    setUpdateForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="vaccine-container">
      <h1>All Vaccines</h1>
      <p>List of vaccines are as follows</p>
      {updateForm && (
        <div className="update-form">
          <h2>Update Vaccine</h2>
          <Form>
            <FormGroup>
              <label htmlFor="title">Title</label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="description">Description</label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button color="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button color="secondary" onClick={() => setUpdateForm(false)}>
              Cancel
            </Button>
          </Form>
        </div>
      )}
      {vaccines.length > 0
        ? vaccines.map((vaccine) => (
            <Card key={vaccine.id} className="vaccine-card">
              <CardBody>
                <CardTitle tag="h5">{vaccine.title}</CardTitle>
                <CardText>{vaccine.description}</CardText>
                <ButtonGroup>
                  <Button
                    color="danger"
                    onClick={() => handleDelete(vaccine.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => showUpdateForm(vaccine)}
                  >
                    Update
                  </Button>
                </ButtonGroup>
              </CardBody>
            </Card>
          ))
        : "No vaccines available"}
    </div>
  );
};

export default AllVaccine;
