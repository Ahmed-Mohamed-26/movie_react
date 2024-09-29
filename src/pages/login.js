import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const LoginPage = () => {
  const translation = useSelector((state) => state.language.translate);

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailErr: "",
    passwordErr: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory(); // لاستخدام إعادة التوجيه

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
            ? "Please enter a valid email address."
            : "",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          passwordErr:
            value.length < 8 ? "Password must be at least 8 characters." : "",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // تحقق مما إذا كان البريد الإلكتروني وكلمة المرور موجودين في localStorage
    const user = users.find(
      (u) => u.email === details.email && u.password === details.password
    );

    if (!details.email || !details.password) {
      setErrors({
        ...errors,
        emailErr: !details.email ? "Email is required." : errors.emailErr,
        passwordErr: !details.password
          ? "Password is required."
          : errors.passwordErr,
      });
      return;
    }

    if (user) {
      // تسجيل الدخول بنجاح، تخزين الحالة في localStorage
      localStorage.setItem("isActive", true);

      // إعادة التوجيه إلى الصفحة الرئيسية
      history.push("/home");
      console.log("Login successful!");
    } else {
      setErrors({
        ...errors,
        passwordErr: "Invalid email or password.",
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-dark text-dark">
      <div
        className="bg-white p-5 rounded-3 shadow w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4 ">{translation.login}</h2>
        <form onSubmit={handleSubmit}>
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
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className={`form-control ${
                  errors.passwordErr ? "is-invalid" : ""
                }`}
                name="password"
                placeholder={`${translation.please_Enter_your_Password}`}
                value={details.password}
                onChange={handleForm}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleShowPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.passwordErr && (
              <div className="invalid-feedback">{errors.passwordErr}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={errors.emailErr || errors.passwordErr}
          >
            {translation.login}
          </button>

          <div className="text-center">
            <a href="#" className="text-muted">
              {translation.Forgot_your_password}
            </a>
          </div>

          <div className="text-center mt-2">
            <Link to="/register" className="text-muted">
              {translation.Don_have_an_account}
              <Link to="/register" className="text-primary">
                {translation.Sign_up_nowt}
              </Link>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
