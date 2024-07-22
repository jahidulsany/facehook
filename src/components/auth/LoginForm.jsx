import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Field from "../common/Field";

const  LoginForm = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: `User with email ${formData.email} is not found!`,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required!" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          id="'email"
          name="email"
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          id="'password"
          name="password"
        />
      </Field>

      <Field>
        <p className="text-red-500">{errors?.root?.random?.message}</p>
      </Field>

      <Field>
        <button
          className="auth-input bg-jsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Login
        </button>
      </Field>
    </form>
  );
};
export default LoginForm;
