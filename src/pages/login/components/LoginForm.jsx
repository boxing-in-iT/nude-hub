import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/index";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.alert.value);

  const onSubmit = async ({ email, password }) => {
    try {
      await dispatch(authActions.login({ email, password }));
      navigate("/account");
    } catch (error) {
      // Ошибка уже обработана в authActions.login и сохранена в состоянии alert
    }
  };

  return (
    <>
      <AuthForm isSignUp={false} onSubmit={onSubmit} error={alert} />
    </>
  );
};

export default LoginForm;
