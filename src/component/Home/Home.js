import React from 'react'
import "./Home.css";


export default function Home({ step, progress, onNextStep, onPreviousStep }) {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <img src="/images/logo.png" alt="Logo" className="logo fade-in" />
        <h1 className="fade-in">Welcome to Our Registration Process</h1>
        <p className="fade-in">
          Follow the steps to complete your registration in just a few minutes.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-indicator fade-in">
        <p>Step {step > 5 ? 5: step} of 5</p>
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Next Button */}
      <div className="button-container">
        {/* Previous Button */}
        <button
          className="prev-btn fade-in"
          onClick={onPreviousStep}
          disabled={step === 0}  // Disable on first step
        >
          Previous
        </button>

        {/* Next Button */}
        <button
          className="next-btn fade-in"
          onClick={onNextStep}
        >
          {step === 5 ? "Complete" : "Next Step"}
        </button>
      </div>

    </div>
  );
};


