import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { AES } from "crypto-js";
import { LoginInput } from "../../components";
import styles from "./Login.module.css";
import commonStyles from "../../common.module.css";

interface LoginProps {
  onLogin: () => void;
}

type FormData = {
  username: string;
  password: string;
};

const Login = ({ onLogin }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      const encryptedToken = AES.encrypt(
        `token-${data.username}`,
        "secret key"
      ).toString();
      localStorage.setItem("token", encryptedToken);
      onLogin();
      setLoading(false);
    },
    [onLogin]
  );

  return (
    <>
      <h1 className={styles.login__title}>Login to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
        <LoginInput
          label="Username"
          id="username"
          register={register("username", { required: "Username is required" })}
          error={errors.username?.message}
        />
        <LoginInput
          label="Password"
          id="password"
          type="password"
          register={register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
              message: `Password must be 6-20 characters and include at least one
                uppercase letter, one lowercase letter, and one number.`,
            },
          })}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className={commonStyles.commonButton}
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default Login;
