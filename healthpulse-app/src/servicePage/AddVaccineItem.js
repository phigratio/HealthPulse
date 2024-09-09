import React, { Fragment, useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import "../style/servicePage/AddVaccineItem.css"; // Adjust the path as neede
import axios from "axios";

const base_url = "http://localhost:5577";
const AddVaccineItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "", // Change from details to description to match the backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .post(`${base_url}/vaccines`, formData) // Send POST request to the backend
      .then((response) => {
        console.log("Vaccine added:", response.data);
        // Optionally clear the form or handle successful addition
        setFormData({
          title: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error adding vaccine:", error);
      });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
    });
  };

  return (
    <Fragment>
      <Form>
        <FormGroup>
          <label htmlFor="title">Title</label>
          <Input
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="description">Description</label>
          <Input
            type="textarea"
            placeholder="Enter description"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormGroup>
        <div className="button-group">
          <Button className="primary" onClick={handleSave}>
            Save
          </Button>
          <Button className="secondary" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AddVaccineItem;
