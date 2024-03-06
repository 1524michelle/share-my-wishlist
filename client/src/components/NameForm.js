import React, { useState } from 'react';
import axios from 'axios';
import Button from './Button.js';

const NameForm = ({ type, wishlistUuid }) => {
  const [formData, setFormData] = useState({ name: '' });

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
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      // Convert form data to URLSearchParams for x-www-form-urlencoded encoding
      const formDataToSend = new URLSearchParams();
      formDataToSend.append('name', formData.name);

      // POST to my backend
      if (type === 'owner') {
        const res = await axios.post(`${backendUrl}/submit_event_title`, formDataToSend, config);
        console.log('Form submitted:', formData);
      } else if (type === 'contributor') {
        const res = await axios.post(`${backendUrl}/submit_contributor_name/${wishlistUuid}`, formDataToSend, config);
        console.log('Form submitted:', formData);
      } else {
        console.error('Unsupported form type');
        return;
      }
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

  // set button text
  let buttonText = "start your list >";
  if (type === 'contributor') {
    buttonText = "let's go! >";
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="enter your name here"
        value={formData.name}
        onChange={handleInputChange}
        style={inputStyle}
        required
      />
      <Button type="submit" buttonText={buttonText} />
    </form>
  );
};

export default NameForm;
