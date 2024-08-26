import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ForgotPasswordForm = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    // Логика для восстановления пароля
    console.log("Восстановление пароля для:", data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Forgot Password</h2>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}
      </div>
      <button type="submit" className="button-login" disabled={isSubmitting}>
        {isSubmitting ? "Loading..." : "Send reset link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
