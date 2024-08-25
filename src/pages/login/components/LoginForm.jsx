import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { useDispatch } from "react-redux";
import { alertActions, authActions } from "../../../store/index";
import history from "../../../helpers/history";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // function onSubmit({ email, password }) {
  //   return dispatch(authActions.login({ email, password }));
  // }

  const onSubmit = async ({ email, password }) => {
    try {
      debugger;
      await dispatch(authActions.login({ email, password }));
      navigate("/account");
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };
  return <AuthForm isSignUp={false} onSubmit={onSubmit} />;
};

export default LoginForm;
