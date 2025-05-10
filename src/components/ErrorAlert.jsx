// ErrorAlert.jsx - A reusable component for displaying error messages
import React from "react";

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="error-alert">
      <div className="error-content">
        <strong>Error!</strong> {message}
        {onClose && (
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
