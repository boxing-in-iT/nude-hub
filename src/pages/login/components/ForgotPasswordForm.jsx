import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import arrow from "../../../assets/loginPage/ArrowUUpLeft.svg";
import { useNavigate } from "react-router-dom";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="forget-password-title">{t("forget_password")}</h2>
      <p className="forget-password-subtitle">
        Forgot your password?
        <br /> It happens to the best of us. But don't worry, we're here to help
        you reset it.
      </p>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter your email"
          {...register("email")}
        />
      </div>
      <p className="forget-password-instructions">
        After clicking "Reset", we will send you an email with instructions to
        reset your password. Please check your email and follow the provided
        instructions.
      </p>
      <div className="buttons-box">
        <button type="button" className="button-back" onClick={handleBackClick}>
          <img src={arrow} alt={t("button_back_alt")} />
          {t("button_back")}
        </button>
        <button type="submit" className="button-login" disabled={isSubmitting}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
