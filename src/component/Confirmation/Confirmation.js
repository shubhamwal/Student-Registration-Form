import React, { useEffect } from 'react';
import { saveAs } from "file-saver";
import JSConfetti from "js-confetti";
import "./Confirmation.css"; // Ensure this CSS file is correctly linked

export default function Confirmation({ formData }) {

    useEffect(() => {
        // Trigger confetti only once when the component mounts
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti();
    }, []);

    const handleDownload = () => {
        const summaryData = `
          Personal Information:
          ---------------------
          Name: ${formData.personalInfo.firstName} ${formData.personalInfo.middleName} ${formData.personalInfo.lastName}
          Mobile No: ${formData.personalInfo.mobileNo}
          Email: ${formData.personalInfo.email}
          Gender: ${formData.personalInfo.gender}
          DOB: ${new Date(formData.personalInfo.dob).toLocaleDateString()}
          Marital Status: ${formData.personalInfo.maritalStatus}

          Address:
          --------
          Country: ${formData.address.nativeCountry}
          State: ${formData.address.nativeState}
          City: ${formData.address.nativeCity}
          Postal Code: ${formData.address.postalCode}
          Passport No: ${formData.address.passportNo}
          Passport Expiry: ${new Date(formData.address.passportExpiry).toLocaleDateString()}

          Academics:
          ----------
          Interested Country: ${formData.academics.interestedCountry}
          English Test: ${formData.academics.englishTest}
          Test Score: ${formData.academics.testScore}

          Education:
          ----------
          ${formData.education.qualifications
                .map(
                    (qualification, index) =>
                        `
            Qualification ${index + 1}:
            Qualification: ${qualification.qualification}
            Institution: ${qualification.institution}
            Percentage: ${qualification.percentage}
            Passing Year: ${qualification.passingYear}
            Country: ${qualification.country}
          `
                )
                .join("\n")}

          Background Information:
          -----------------------
          Visa Rejection: ${formData.backgroundInfo.visaRejection}
          Education Gap: ${formData.backgroundInfo.educationGap}
        `;

        const blob = new Blob([summaryData], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "FormSummary.txt");
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="confirmation-container">
            <h2 className="celebrate-message">Submission Successful!</h2>
            <p className="next-steps">
                Your registration has been completed. Please download or print a copy of your submitted information for future reference.
            </p>

            <div className="summary-section">
                <h3>Personal Information</h3>
                <p><strong>Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.middleName} {formData.personalInfo.lastName}</p>
                <p><strong>Mobile No:</strong> {formData.personalInfo.mobileNo}</p>
                <p><strong>Email:</strong> {formData.personalInfo.email}</p>
                <p><strong>Gender:</strong> {formData.personalInfo.gender}</p>
                <p><strong>DOB:</strong> {new Date(formData.personalInfo.dob).toLocaleDateString()}</p>
                <p><strong>Marital Status:</strong> {formData.personalInfo.maritalStatus}</p>

                <h3>Address</h3>
                <p><strong>Country:</strong> {formData.address.nativeCountry}</p>
                <p><strong>State:</strong> {formData.address.nativeState}</p>
                <p><strong>City:</strong> {formData.address.nativeCity}</p>
                <p><strong>Postal Code:</strong> {formData.address.postalCode}</p>
                <p><strong>Passport No:</strong> {formData.address.passportNo}</p>
                <p><strong>Passport Expiry:</strong> {new Date(formData.address.passportExpiry).toLocaleDateString()}</p>

                <h3>Academics</h3>
                <p><strong>Interested Country:</strong> {formData.academics.interestedCountry}</p>
                <p><strong>English Test:</strong> {formData.academics.englishTest}</p>
                <p><strong>Test Score:</strong> {formData.academics.testScore}</p>

                <h3>Education</h3>
                {formData.education.qualifications.map((qualification, index) => (
                    <div key={index}>
                        <p><strong>Qualification {index + 1}:</strong></p>
                        <p><strong>Qualification:</strong> {qualification.qualification}</p>
                        <p><strong>Institution:</strong> {qualification.institution}</p>
                        <p><strong>Percentage:</strong> {qualification.percentage}</p>
                        <p><strong>Passing Year:</strong> {qualification.passingYear}</p>
                        <p><strong>Country:</strong> {qualification.country}</p>
                    </div>
                ))}

                <h3>Background Information</h3>
                <p><strong>Visa Rejection:</strong> {formData.backgroundInfo.visaRejection}</p>
                <p><strong>Education Gap:</strong> {formData.backgroundInfo.educationGap}</p>
            </div>

            <div className="button-group">
                <button className="download-btn" onClick={handleDownload}>Download Summary</button>
                <button className="print-btn" onClick={handlePrint}>Print Summary</button>
            </div>
        </div>
    );
};
