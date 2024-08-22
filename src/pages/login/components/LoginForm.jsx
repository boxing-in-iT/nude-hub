import { useNavigate } from "react-router-dom";
import { fakeBackend } from "../../../fake-backend";
import AuthForm from "./AuthForm";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    const result = await fakeBackend.login(email, password);
    if (result.success) {
      // Успешный вход
      navigate("/dashboard"); // Переход на страницу после входа
    } else {
      alert(result.message); // Отображение сообщения об ошибке
    }
  };

  return <AuthForm isSignUp={false} onSubmit={handleSubmit} />;
};

export default LoginForm;
