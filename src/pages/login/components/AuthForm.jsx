import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import "./index.css";
import arrow from "../../../assets/loginPage/ArrowUUpLeft.svg";

const AuthForm = ({ isSignUp, onSubmit, error, setActiveForm }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("validation_invalid_email"))
      .required(t("validation_email_required")),
    password: Yup.string()
      .required(t("validation_password_required"))
      .min(6, t("validation_password_min_length")),
    confirmPassword: isSignUp
      ? Yup.string()
          .oneOf(
            [Yup.ref("password"), null],
            t("validation_passwords_must_match")
          )
          .required(t("validation_confirm_password_required"))
      : Yup.string().notRequired(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleBackClick = () => {
    navigate("/");
  };

  const onSubmitHandler = async (data) => {
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <p className="form-subtitle">
        {isSignUp ? t("form_register_subtitle") : t("form_signin_subtitle")}
      </p>
      <div className="input-box">
        <input
          type="text"
          placeholder={t("form_email_placeholder")}
          {...register("email")}
        />
        {errors.email && (
          <p className="error-message">{errors.email.message}</p>
        )}

        {isSignUp && (
          <>
            <input
              type="password"
              placeholder={t("form_password_placeholder")}
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}

            <input
              type="password"
              placeholder={t("form_confirm_password_placeholder")}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </>
        )}

        {!isSignUp && (
          <input
            type="password"
            placeholder={t("form_password_placeholder")}
            {...register("password")}
          />
        )}
        {!isSignUp && errors.password && (
          <p className="error-message">{errors.password.message}</p>
        )}
      </div>

      <div className="buttons-box">
        <button type="button" className="button-back" onClick={handleBackClick}>
          <img src={arrow} alt={t("button_back_alt")} />
          {t("button_back")}
        </button>
        <button type="submit" className="button-login" disabled={isSubmitting}>
          {isSubmitting
            ? t("button_loading")
            : isSignUp
            ? t("button_sign_up")
            : t("button_login")}
        </button>
      </div>
      {!isSignUp && (
        <p
          className="forgot-link"
          onClick={() => setActiveForm("forgotPassword")}
        >
          {t("link_forgot_password")}
        </p>
      )}
    </form>
  );
};

export default AuthForm;
