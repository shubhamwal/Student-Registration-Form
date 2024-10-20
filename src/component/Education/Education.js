import React from 'react'
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Education.css";


export default function Education({ onComplete }) {
  const validationSchema = Yup.object({
    qualifications: Yup.array().of(
      Yup.object({
        qualification: Yup.string().required("Qualification is required"),
        institution: Yup.string().required("Institution/Board/University is required"),
        percentage: Yup.number()
          .required("Percentage is required")
          .min(0, "Percentage must be at least 0")
          .max(100, "Percentage must be less than or equal to 100"),
        passingYear: Yup.number()
          .required("Passing year is required")
          .min(1900, "Year too far back")
          .max(new Date().getFullYear(), "Invalid year"),
        country: Yup.string().required("Country is required"),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        qualifications: [
          {
            qualification: "",
            institution: "",
            percentage: "",
            passingYear: "",
            country: "",
          },
        ],
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        onComplete(values);

      }}
    >
      {({ values }) => (
        <Form className="educational-background-form">
          <FieldArray name="qualifications">
            {({ insert, remove, push }) => (
              <div>
                {values.qualifications.length > 0 &&
                  values.qualifications.map((qualification, index) => (
                    <div key={index} className="qualification-section fade-slide-in">
                      <h3>Qualification {index + 1}</h3>

                      {/* Qualification Field */}
                      <div className="form-group">
                        <label htmlFor={`qualifications.${index}.qualification`}>Qualification <span className="required">*</span></label>
                        <Field
                          name={`qualifications.${index}.qualification`}
                          placeholder="e.g., Bachelor's Degree"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.qualification`} component="div" className="error-message" />
                      </div>

                      {/* Institution/Board/University */}
                      <div className="form-group">
                        <label htmlFor={`qualifications.${index}.institution`}>Institution/Board/University <span className="required">*</span></label>
                        <Field
                          name={`qualifications.${index}.institution`}
                          placeholder="e.g., University of XYZ"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.institution`} component="div" className="error-message" />
                      </div>

                      {/* Percentage */}
                      <div className="form-group">
                        <label htmlFor={`qualifications.${index}.percentage`}>Percentage <span className="required">*</span></label>
                        <Field
                          name={`qualifications.${index}.percentage`}
                          type="number"
                          placeholder="e.g., 85"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.percentage`} component="div" className="error-message" />
                      </div>

                      {/* Passing Year */}
                      <div className="form-group">
                        <label htmlFor={`qualifications.${index}.passingYear`}>Passing Year <span className="required">*</span></label>
                        <Field
                          name={`qualifications.${index}.passingYear`}
                          type="number"
                          placeholder="e.g., 2020"
                          className="form-control"
                        />
                        <ErrorMessage name={`qualifications.${index}.passingYear`} component="div" className="error-message" />
                      </div>

                      {/* Country */}
                      <div className="form-group">
                        <label htmlFor={`qualifications.${index}.country`}>Country <span className="required">*</span></label>
                        <Field
                          name={`qualifications.${index}.country`}
                          as="select"
                          className="form-control"
                        >
                          <option value="" label="Select Country" />
                          <option value="USA" label="USA" />
                          <option value="India" label="India" />
                          <option value="Canada" label="Canada" />
                        </Field>
                        <ErrorMessage name={`qualifications.${index}.country`} component="div" className="error-message" />
                      </div>

                      {/* Remove Button */}
                      <div className="form-group remove-btn-group">
                        {values.qualifications.length > 1 && (
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => remove(index)}
                          >
                            Remove Qualification
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                {/* Add Another Qualification Button */}
                <button
                  type="button"
                  className="add-btn"
                  onClick={() =>
                    push({
                      qualification: "",
                      institution: "",
                      percentage: "",
                      passingYear: "",
                      country: "",
                    })
                  }
                >
                  Add Another Qualification
                </button>
              </div>
            )}
          </FieldArray>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </Form>
      )}
    </Formik>

  )
}
