import React from 'react';

const Button = ({ type, buttonText }) => {
  const buttonStyle = {
    padding: '10px 16px',
    fontSize: '16px',
    borderRadius: '50px',
    borderStyle: 'none',
    background: '#000',
    color: '#fff'
  };

  return (
    <button type={type} style={buttonStyle}>
      {buttonText}
    </button>
  );
};

export default Button;