import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import { fakeBackend } from "../../../fake-backend";

const SignUpForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async ({ email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await fakeBackend.register(email, password);
    if (result.success) {
      // Успешная регистрация
      navigate("/login"); // Переход на страницу входа после регистрации
    } else {
      alert(result.message); // Отображение сообщения об ошибке
    }
  };

  return <AuthForm isSignUp={true} onSubmit={handleSubmit} />;
};

export default SignUpForm;
