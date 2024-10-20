import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./BackgroundInfo.css";


export default function BackgroundInfo({ onComplete }) {
  const validationSchema = Yup.object({
    visaRejection: Yup.string().required("Visa rejection status is required"),
    educationGap: Yup.string().required("Please select an option for education gap"),
  });
  return (
    <Formik
      initialValues={{
        visaRejection: "",
        educationGap: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onComplete(values);
      }}
    >
      {() => (
        <Form className="background-info-form">
          {/* Visa Rejection Status (Yes/No) */}
          <div className="form-group visa-rejection-group">
            <label htmlFor="visaRejection">
              Visa Rejection Status
              <span className="required">*</span>
              <span className="tooltip-icon" data-tooltip="Please indicate if your visa has been rejected before.">
                ?
              </span>
            </label>
            <div className="radio-group">
              <Field
                type="radio"
                name="visaRejection"
                value="Yes"
                id="visaYes"
                className="radio-bounce"
              />
              <label htmlFor="visaYes">Yes</label>

              <Field
                type="radio"
                name="visaRejection"
                value="No"
                id="visaNo"
                className="radio-bounce"
              />
              <label htmlFor="visaNo">No</label>
            </div>
            <ErrorMessage name="visaRejection" component="div" className="error-message" />
          </div>

          {/* Gap in Education */}
          <div className="form-group">
            <label htmlFor="educationGap">
              Gap in Education
              <span className="required">*</span>
              <span className="tooltip-icon" data-tooltip="Select the duration of any gaps in your education.">
                ?
              </span>
            </label>
            <Field as="select" name="educationGap" className="form-control">
              <option value="" label="Select gap duration" />
              <option value="None" label="None" />
              <option value="1 Year" label="1 Year" />
              <option value="2 Years" label="2 Years" />
              <option value="3+ Years" label="3+ Years" />
            </Field>
            <ErrorMessage name="educationGap" component="div" className="error-message" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </Form>
      )}
    </Formik>

  )
}
