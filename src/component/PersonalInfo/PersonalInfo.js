import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Yup from 'yup';
import "./PersonalInfo.css";

export default function PersonalInfo({ onComplete }) {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    emergencyContactNo: Yup.string()
      .matches(/^[0-9]{10}$/, 'Emergency Contact number must be 10 digits')
      .required('Emergency Contact is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    maritalStatus: Yup.string().required('Marital Status is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.date()
      .required('Date of Birth is required')
      .test('age', 'You must be at least 10 years old', value => {
        if (!value) return false; // If the value is not provided
        const age = new Date().getFullYear() - value.getFullYear();
        const monthDiff = new Date().getMonth() - value.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < value.getDate())) {
          return age - 1 >= 10; // Ensure they are at least 10 years old
        }
        return age >= 10;
      }),
  });

  const initialValues = {
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNo: '',
    emergencyContactNo: '',
    email: '',
    maritalStatus: '',
    gender: '',
    dob: null,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    setSubmitting(false);
    onComplete(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, touched, errors }) => (
        <Form className="personal-info-form">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Title <span className="required">*</span></label>
            <Field as="select" name="title" className="form-control">
              <option value="" label="Select Title" />
              <option value="Mr." label="Mr." />
              <option value="Ms." label="Ms." />
              <option value="Mrs." label="Mrs." />
              <option value="Dr." label="Dr." />
            </Field>
            <ErrorMessage name="title" component="div" className="error-message" />
          </div>

          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">First Name <span className="required">*</span></label>
            <Field name="firstName" type="text" className="form-control" />
            <ErrorMessage name="firstName" component="div" className="error-message" />
          </div>

          {/* Middle Name */}
          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <Field name="middleName" type="text" className="form-control" />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Last Name <span className="required">*</span></label>
            <Field name="lastName" type="text" className="form-control" />
            <ErrorMessage name="lastName" component="div" className="error-message" />
          </div>

          {/* Mobile No. */}
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile No. <span className="required">*</span></label>
            <Field name="mobileNo" type="tel" className="form-control" />
            <ErrorMessage name="mobileNo" component="div" className="error-message" />
          </div>

          {/* Emergency Contact No. */}
          <div className="form-group">
            <label htmlFor="emergencyContactNo">Emergency Contact No. <span className="required">*</span></label>
            <Field name="emergencyContactNo" type="tel" className="form-control" />
            <ErrorMessage name="emergencyContactNo" component="div" className="error-message" />
          </div>

          {/* Student Email ID */}
          <div className="form-group">
            <label htmlFor="email">Student Email ID <span className="required">*</span></label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          {/* Marital Status */}
          <div className="form-group">
            <label htmlFor="maritalStatus">Marital Status <span className="required">*</span></label>
            <Field as="select" name="maritalStatus" className="form-control">
              <option value="" label="Select Marital Status" />
              <option value="Single" label="Single" />
              <option value="Married" label="Married" />
              <option value="Divorced" label="Divorced" />
              <option value="Widowed" label="Widowed" />
            </Field>
            <ErrorMessage name="maritalStatus" component="div" className="error-message" />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">Gender <span className="required">*</span></label>
            <Field as="select" name="gender" className="form-control">
              <option value="" label="Select Gender" />
              <option value="Male" label="Male" />
              <option value="Female" label="Female" />
              <option value="Other" label="Other" />
            </Field>
            <ErrorMessage name="gender" component="div" className="error-message" />
          </div>

          {/* Date of Birth (Calendar picker) */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth <span className="required">*</span></label>
            <DatePicker
              selected={values.dob}
              onChange={(date) => setFieldValue("dob", date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              placeholderText="Select your Date of Birth"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
            {errors.dob && touched.dob ? (
              <div className="error-message">{errors.dob}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};
