import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/index";
import toast from "react-hot-toast";

const LoginForm = ({ setActiveForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.alert.value);

  const onSubmit = async ({ email, password }) => {
    debugger;
    try {
      await dispatch(authActions.login({ email, password }));
      navigate("/account");
    } catch (error) {}
  };

  return (
    <>
      <AuthForm
        isSignUp={false}
        onSubmit={onSubmit}
        error={alert}
        setActiveForm={setActiveForm} // Передаем setActiveForm для переключения форм
      />
    </>
  );
};

export default LoginForm;
