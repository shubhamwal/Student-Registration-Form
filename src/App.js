import { useState } from "react";
import Academics from "./component/Academics/Academics";
import Address from "./component/Address/Address";
import BackgroundInfo from "./component/BackgroundInfo/BackgroundInfo";
import Education from "./component/Education/Education";
import PersonalInfo from "./component/PersonalInfo/PersonalInfo";
import Home from "./component/Home/Home";
import Summary from "./component/Summary/Summary";
import Confirmation from "./component/Confirmation/Confirmation";

function App() {
  const [step, setStep] = useState(0);
  console.log(step, "step")
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    personalInfo: {},
    address: {},
    academics: {},
    education: {},
    backgroundInfo: {},
  });
  console.log(formData, formData)


  const handleProgressUpdate = (newStep, data) => {
    const formattedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value instanceof Date ? value.toLocaleDateString() : value,
      ])
    );
    setStep(newStep);
    setProgress((newStep / 6) * 100); // Update the progress percentage
    setFormData((prevData) => ({
      ...prevData,
      ...formattedData,
    }));
    if (newStep <= 5) {
      setProgress((newStep / 5) * 100); // Update the progress percentage
    }


  };



  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Show a confirmation prompt before final submission
    const confirmation = window.confirm("Are you sure you want to submit?");
    if (confirmation) {
      setStep(6);
      console.log("Final Data Submitted: ", formData);

      // Handle final submission logic here
    }
  };

  return (
    <div className="App">
      <Home
        step={step}
        progress={progress}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
      />
      {step === 0 && (
        <PersonalInfo onComplete={(data) => handleProgressUpdate(1, { personalInfo: data })} />
      )}
      {step === 1 && (
        <Address onComplete={(data) => handleProgressUpdate(2, { address: data })} />
      )}
      {step === 2 && <Academics onComplete={(data) => handleProgressUpdate(3, { academics: data })} />}
      {step === 3 && <Education onComplete={(data) => handleProgressUpdate(4, { education: data })} />}
      {step === 4 && (
        <BackgroundInfo onComplete={(data) => handleProgressUpdate(5, { backgroundInfo: data })} />
      )}
      {step === 5 && (
        <Summary
          formData={formData}
          onBack={() => setStep(step - 1)}
          onSubmit={handleSubmit}
        />
      )}
      {step === 6 && <Confirmation formData={formData} />} {/* Show confirmation */}



    </div>
  );
}

export default App;
