import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button.js';

const AddItemForm = () => {
  const [formData, setFormData] = useState({ title: '', link: '' });

  // Handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL;
      // POST to my backend
      const res = await axios.post(`${backendUrl}/add_item`, {
        title: formData.title,
        link: formData.link,
        contributor: ''
      });
      console.log('Form submitted:', formData);
    } catch (err) {
      console.log('Error submitting form:', err);
    }
  };

  // Styles for the input box
  const inputStyle = {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '50px',
    border: '1px solid #ccc',
    margin: '10px',
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="item title"
        value={formData.title}
        onChange={handleInputChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        id="link"
        name="link"
        placeholder="(optional) item link"
        value={formData.link}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <Button type="submit" buttonText="add" />
    </form>
  );
};

export default AddItemForm;
