import AuthForm from "./AuthForm";
import { alertActions, userActions } from "../../../store";
import { useDispatch } from "react-redux";

const SignUpForm = () => {
  const dispatch = useDispatch();

  async function onSubmit(data) {
    debugger;
    dispatch(alertActions.clear());
    try {
      await dispatch(userActions.register(data)).unwrap();

      // redirect to login page and display success alert
      // history.navigate("/account");
      dispatch(
        alertActions.success({
          message: "Registration successful",
          showAfterRedirect: true,
        })
      );
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return <AuthForm isSignUp={true} onSubmit={onSubmit} />;
};

export default SignUpForm;
