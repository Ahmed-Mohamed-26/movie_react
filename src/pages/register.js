import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Register = () => {
  const translation = useSelector((state) => state.language.translate);
  const [details, setDetails] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    emailErr: "",
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    confirmPasswordErr: "",
  });

  const history = useHistory(); // استخدام useHistory لإعادة التوجيه

  const handleForm = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });

    switch (name) {
      case "email":
        setErrors({
          ...errors,
          emailErr: !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
            ? "Please enter a valid email address"
            : "",
        });
        break;
      case "name":
        setErrors({
          ...errors,
          nameErr: value.length === 0 ? "This field is required" : "",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          passwordErr: !value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
          )
            ? "Password must be at least 8 characters long, contain at least one lowercase, one uppercase, one digit and one special character"
            : "",
        });
        break;
      case "confirmPassword":
        setErrors({
          ...errors,
          confirmPasswordErr:
            value !== details.password ? "Passwords do not match" : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email already exists
    const emailExists = users.find((user) => user.email === details.email);

    if (emailExists) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailErr: "This email is already registered",
      }));
      return;
    }

    if (
      !errors.emailErr &&
      !errors.nameErr &&
      !errors.passwordErr &&
      !errors.confirmPasswordErr
    ) {
      // Save user data in localStorage
      const newUser = {
        email: details.email,
        password: details.password,
      };
      localStorage.setItem("users", JSON.stringify([...users, newUser]));

      console.log("Registration successful!");

      
      history.push("/");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-dark">
      <div
        className="bg-white p-5 rounded-3 shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">{translation.Register}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{translation.Name}</label>
            <input
              type="text"
              className={`form-control ${errors.nameErr ? "is-invalid" : ""}`}
              name="name"
              placeholder={`${translation.please_Enter_your_Name}`}
              value={details.name}
              onChange={handleForm}
            />
            {errors.nameErr && (
              <div className="invalid-feedback">{errors.nameErr}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{translation.Email}</label>
            <input
              type="email"
              className={`form-control ${errors.emailErr ? "is-invalid" : ""}`}
              name="email"
              placeholder={`${translation.please_Enter_your_Email}`}
              value={details.email}
              onChange={handleForm}
            />
            {errors.emailErr && (
              <div className="invalid-feedback">{errors.emailErr}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{translation.Password}</label>
            <input
              type="password"
              className={`form-control ${
                errors.passwordErr ? "is-invalid" : ""
              }`}
              name="password"
              placeholder={`${translation.please_Enter_your_Password}`}
              value={details.password}
              onChange={handleForm}
            />
            {errors.passwordErr && (
              <div className="invalid-feedback">{errors.passwordErr}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">{translation.Confirm_Password}</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPasswordErr ? "is-invalid" : ""
              }`}
              name="confirmPassword"
              placeholder={`${translation.please_Enter_your_Confirm}`}
              value={details.confirmPassword}
              onChange={handleForm}
            />
            {errors.confirmPasswordErr && (
              <div className="invalid-feedback">
                {errors.confirmPasswordErr}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={
              errors.emailErr ||
              errors.nameErr ||
              errors.passwordErr ||
              errors.confirmPasswordErr
            }
          >
            {translation.register}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-muted">
              {translation.Already_have_an_account_Login}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
