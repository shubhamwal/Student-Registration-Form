import React from "react";
import "./Summary.css"; // Import the CSS for styling

const Summary = ({ formData, onBack, onSubmit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="summary-container fade-in">
      <h2>Review Your Information</h2>

      {Object.keys(formData).map((section, index) => (
        <div className="summary-section" key={index}>
          <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>

          {Object.entries(formData[section]).length === 0 ? (
            <p>No data available for this section.</p>
          ) : (
            Object.entries(formData[section]).map(([key, value], i) => {
              // Check if value is an array (like qualifications)
              if (Array.isArray(value)) {
                return (
                  <div key={i} className="nested-array">
                    {value.map((item, j) => (
                      <div key={j} className="array-item">
                        {Object.entries(item).map(([subKey, subValue], k) => (
                          <p key={k}>
                            <strong>{subKey.charAt(0).toUpperCase() + subKey.slice(1)}:</strong> {subValue}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                );
              } else if (typeof value === "object" && value !== null) {
                // Check if value is an object
                return (
                  <div key={i} className="nested-object">
                    {Object.entries(value).map(([subKey, subValue], j) => (
                      <p key={j}>
                        <strong>{subKey.charAt(0).toUpperCase() + subKey.slice(1)}:</strong> {subValue}
                      </p>
                    ))}
                  </div>
                );
              } else {
                // Format dates and handle other normal key-value pairs
                const formattedValue =
                  key.includes("dob") || key.includes("Expiry")
                    ? formatDate(value)
                    : value;

                return (
                  <p key={i}>
                    <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {formattedValue}
                  </p>
                );
              }
            })
          )}
        </div>
      ))}

      <div className="button-container">
        <button onClick={onBack} className="back-btn">Back</button>
        <button onClick={onSubmit} className="submit-btn bounce">Submit</button>
      </div>
    </div>
  );
};

export default Summary;
