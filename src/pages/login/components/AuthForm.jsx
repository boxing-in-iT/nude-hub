import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./index.css";
import arrow from "../../../assets/loginPage/ArrowUUpLeft.svg";

const AuthForm = ({ isSignUp, onSubmit }) => {
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: isSignUp
      ? Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      : Yup.string().notRequired(),
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Back navigation handler
  const handleBackClick = () => {
    navigate("/"); // Navigate back to home or previous page
  };

  // Form submission handler
  const onSubmitHandler = async (data) => {
    await onSubmit(data); // Call parent onSubmit with form data
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <p className="form-subtitle">
        {isSignUp
          ? "Register for an account to access all features"
          : "Sign in to access all features"}
      </p>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your e-mail"
          {...register("email")}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}

        {isSignUp && (
          <>
            <input
              type="password"
              placeholder="Repeat your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </>
        )}
      </div>

      <div className="buttons-box">
        <button type="button" className="button-back" onClick={handleBackClick}>
          <img src={arrow} alt="Back arrow" />
          Back
        </button>
        <button type="submit" className="button-login" disabled={isSubmitting}>
          {isSubmitting ? "Loading..." : isSignUp ? "Sign up" : "Login"}
        </button>
      </div>
      {!isSignUp && <p className="forgot-link">Forgot password?</p>}
    </form>
  );
};

export default AuthForm;
