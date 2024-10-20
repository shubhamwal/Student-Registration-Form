import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as Yup from 'yup';
import "./Address.css";

export default function Address({ onComplete }) {
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [isPassportOpen, setIsPassportOpen] = useState(false);

  const currentDate = new Date();

  const validationSchema = Yup.object().shape({
    nativeCountry: Yup.string().required('Native Country is required'),
    nativeState: Yup.string().required('Native State is required'),
    nativeCity: Yup.string().required('Native City is required'),
    postalCode: Yup.string()
      .matches(/^[0-9]{5}$/, 'Postal Code must be 5 digits')
      .required('Postal Code is required'),
    passportNo: Yup.string().required('Passport No. is required'),
    passportExpiry: Yup.date()
      .nullable()
      .required('Passport Expiry is required')
      .min(currentDate, 'Passport Expiry must be in the future'),
  });

  const initialValues = {
    nativeCountry: '',
    nativeState: '',
    nativeCity: '',
    postalCode: '',
    passportNo: '',
    passportExpiry: null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    setSubmitting(false);
    onComplete(values); // Notify the parent about the completion
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, values }) => (
        <Form className="address-passport-form">

          {/* Address Section */}
          <div className={`accordion-section ${isAddressOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => setIsAddressOpen(!isAddressOpen)}>
              <h3>Address Information</h3>
              <span>{isAddressOpen ? '-' : '+'}</span>
            </div>
            {isAddressOpen && (
              <div className="accordion-content">
                {/* Native Country */}
                <div className="form-group">
                  <label htmlFor="nativeCountry">Native Country <span className="required">*</span></label>
                  <Field as="select" name="nativeCountry" className="form-control">
                    <option value="" label="Select Country" />
                    <option value="India" label="India" />
                    <option value="USA" label="USA" />
                    {/* Add more options here */}
                  </Field>
                  <ErrorMessage name="nativeCountry" component="div" className="error-message" />
                </div>

                {/* Native State */}
                <div className="form-group">
                  <label htmlFor="nativeState">Native State <span className="required">*</span></label>
                  <Field as="select" name="nativeState" className="form-control">
                    <option value="" label="Select State" />
                    <option value="Maharashtra" label="Maharashtra" />
                    <option value="California" label="California" />
                    {/* Add more options here */}
                  </Field>
                  <ErrorMessage name="nativeState" component="div" className="error-message" />
                </div>

                {/* Native City */}
                <div className="form-group">
                  <label htmlFor="nativeCity">Native City <span className="required">*</span></label>
                  <Field as="select" name="nativeCity" className="form-control">
                    <option value="" label="Select City" />
                    <option value="Mumbai" label="Mumbai" />
                    <option value="Los Angeles" label="Los Angeles" />
                    {/* Add more options here */}
                  </Field>
                  <ErrorMessage name="nativeCity" component="div" className="error-message" />
                </div>

                {/* Postal Code */}
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code <span className="required">*</span></label>
                  <Field name="postalCode" type="text" className="form-control" />
                  <ErrorMessage name="postalCode" component="div" className="error-message" />
                </div>
              </div>
            )}
          </div>

          {/* Passport Section */}
          <div className={`accordion-section ${isPassportOpen ? 'open' : ''}`}>
            <div className="accordion-header" onClick={() => setIsPassportOpen(!isPassportOpen)}>
              <h3>Passport Information</h3>
              <span>{isPassportOpen ? '-' : '+'}</span>
            </div>
            {isPassportOpen && (
              <div className="accordion-content">
                {/* Passport No */}
                <div className="form-group">
                  <label htmlFor="passportNo">Passport No. <span className="required">*</span></label>
                  <Field name="passportNo" type="text" className="form-control" />
                  <ErrorMessage name="passportNo" component="div" className="error-message" />
                </div>

                {/* Passport Expiry */}
                <div className="form-group">
                  <label htmlFor="passportExpiry">Passport Expiry <span className="required">*</span></label>
                  <DatePicker
                    selected={values.passportExpiry}
                    onChange={(date) => setFieldValue('passportExpiry', date)}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    placeholderText="Select Passport Expiry"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <ErrorMessage name="passportExpiry" component="div" className="error-message" />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
