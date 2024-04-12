import React, { useState } from "react";
import * as Yup from "yup";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interest: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      interest: checked
        ? [...prevFormData.interest, name]
        : prevFormData.interest.filter((interest) => interest !== name),
    }));
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("first name is required"),
    lastName: Yup.string().required("last name is required"),
    email: Yup.string().email().required("email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "phone number must be 10 digits")
      .required("phone number is required"),
    password: Yup.string()
      .min(8, "minimum 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}!|<>]/,
        "password must contain at least one symbol"
      )
      .matches(/[0-9]/, "password must contain at least one number")
      .matches(/[a-z]/, "password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "password must contain at least one uppercase letter")
      .required("password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "password must match")
      .required("confirm password is required"),
    age: Yup.number()
      .typeError("age must be a number")
      .min(18, "you must be at least 18 year old")
      .max(100, "you can not be older than 100")
      .required("age is required"),
    gender: Yup.string().required("gender is required"),
    interest: Yup.array()
      .min(1, "select at least one intrest")
      .required("select at least one intrest"),
    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("form validated successfully ", formData);
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label htmlFor="firstName">First Name: </label>
          <input
            name="firstName"
            type="text"
            value={formData.firstName}
            placeholder="Enter Your First Name"
            onChange={handleChange}
          />
          {errors.firstName && <div className="error">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName">Last Name: </label>
          <input
            name="lastName"
            type="text"
            value={formData.lastName}
            placeholder="Enter Your Last Name"
            onChange={handleChange}
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter Your Email"
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number: </label>
          <input
            name="phoneNumber"
            type="number"
            value={formData.phoneNumber}
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <div className="error">{errors.phoneNumber}</div>
          )}
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="text"
            value={formData.password}
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="confirmPassword">confirm Password: </label>
          <input
            name="confirmPassword"
            type="text"
            value={formData.confirmPassword}
            placeholder="Confirm Your Password"
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="error">{errors.confirmPassword}</div>
          )}
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            name="age"
            type="number"
            value={formData.age}
            placeholder="Enter Your Age"
            onChange={handleChange}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>

        <div>
          <label htmlFor="gender">Select Your Gender: </label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <div className="error">{errors.gender}</div>}
        </div>

        <div>
          <label>Interests: </label>
          <label htmlFor="coding">
            <input
              type="checkbox"
              name="coding"
              checked={formData.interest.includes("coding")}
              onChange={handleCheckbox}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="sports"
              checked={formData.interest.includes("sports")}
              onChange={handleCheckbox}
            />
            Sports
          </label>
          <label>
            <input
              type="checkbox"
              name="reading"
              checked={formData.interest.includes("reading")}
              onChange={handleCheckbox}
            />
            Reading
          </label>
          {errors.interest && <div className="error">{errors.interest}</div>}
        </div>

        <div>
          <label htmlFor="birthDate">Birth Date: </label>
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && <div className="error">{errors.birthDate}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormWithYup;
