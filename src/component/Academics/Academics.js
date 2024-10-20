import React, { useState } from 'react';
import './Academics.css'; // Import your CSS file

export default function Academics({ onComplete }) {
  const [interestedCountry, setInterestedCountry] = useState("");
  const [englishTest, setEnglishTest] = useState("");
  const [testScore, setTestScore] = useState("");
  const [educationBoard, setEducationBoard] = useState("");

  // Handlers for dropdown changes
  const handleCountryChange = (e) => {
    setInterestedCountry(e.target.value);
  };

  const handleEnglishTestChange = (e) => {
    setEnglishTest(e.target.value);
    // Reset scores and education board when test changes
    setTestScore("");
    setEducationBoard("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: Add basic validation here
    if (!interestedCountry || !englishTest || (englishTest !== "None" && !testScore) || (englishTest === "None" && !educationBoard)) {
      alert("Please fill out all required fields.");
      return;
    }

    if (englishTest !== "None") {
      if (!/^\d+$/.test(testScore)) {
        alert("Test Score must be a number.");
        return;
      }

      if (parseInt(testScore, 10) > 100) {
        alert("Test Score must not exceed 100.");
        return;
      }
    }

    if (englishTest === "None" && !/^[a-zA-Z\s]+$/.test(educationBoard)) {
      alert("Education Board Details must contain only letters.");
      return;
    }


    // Create an object with the form data
    const formData = {
      interestedCountry,
      englishTest,
      testScore: englishTest !== "None" ? testScore : "",
      educationBoard: englishTest === "None" ? educationBoard : "",
    };

    console.log("Form Data Submitted:", formData);
    // Call the onComplete function
    onComplete(formData);
  };

  return (
    <form className="academic-interests-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="interestedCountry">
          Interested Country <span className="required">*</span>
        </label>
        <select
          id="interestedCountry"
          value={interestedCountry}
          onChange={handleCountryChange}
          className="form-control"
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="englishTest">
          English Proficiency Test <span className="required">*</span>
        </label>
        <select
          id="englishTest"
          value={englishTest}
          onChange={handleEnglishTestChange}
          className="form-control"
        >
          <option value="">Select Test</option>
          <option value="TOEFL">TOEFL</option>
          <option value="IELTS">IELTS</option>
          <option value="None">None</option>
        </select>
      </div>

      {/* Conditional Test Score Field */}
      {englishTest && englishTest !== "None" && (
        <div className="form-group conditional-field fade-in">
          <label htmlFor="testScore">
            Test Score <span className="required">*</span>
          </label>
          <input
            type="text"
            id="testScore"
            value={testScore}
            onChange={(e) => setTestScore(e.target.value)}
            className="form-control"
          />
        </div>
      )}

      {/* Conditional Education Board Field */}
      {englishTest === "None" && (
        <div className="form-group conditional-field fade-in">
          <label htmlFor="educationBoard">
            Education Board Details <span className="required">*</span>
          </label>
          <input
            type="text"
            id="educationBoard"
            value={educationBoard}
            onChange={(e) => setEducationBoard(e.target.value)}
            className="form-control"
          />
        </div>
      )}

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
}
