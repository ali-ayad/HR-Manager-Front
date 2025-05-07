import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authentication } from "../../Api/AuthApi/AuthApi";
import { App } from "antd";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp(); // ✅ Correctly consumes AntD context

  const login = async (values) => {
    try {
      setLoading(true);
      const response = await Authentication(values);

      if (!response?.data?.token) {
        const msg =
          response?.data?.message === "Invalid credentials"
            ? "Incorrect email or password. Please try again."
            : "An error occurred during login.";

        message.warning(msg);
        return;
      }

      const token = response.data.token;
      localStorage.setItem("authToken", `Bearer ${token}`);

      message.success("Login successful!");

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error.message);
      message.error("Server connection failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};
