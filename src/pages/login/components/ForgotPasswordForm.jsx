import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
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
      <h2>{t("forget_password")}</h2>
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
