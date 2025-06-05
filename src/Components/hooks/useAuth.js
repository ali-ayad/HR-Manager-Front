import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App } from "antd";
import { useAuthenticateMutation } from "../../Api/AuthApi/AuthApi"; // adjust path as needed

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [authenticate] = useAuthenticateMutation();

const login = async (values) => {
  try {
    setLoading(true);

    const data = await authenticate(values).unwrap();

    if (!data?.accessToken || !data?.refreshToken) {
      const msg =
        data?.message === "Invalid credentials"
          ? "Incorrect email or password. Please try again."
          : "An error occurred during login.";

      message.warning(msg);
      return;
    }

    // Save both tokens
    localStorage.setItem("accessToken", `Bearer ${data.accessToken}`);
    localStorage.setItem("refreshToken", data.refreshToken); // raw token — don't prefix "Bearer"

    message.success("Login successful!");
    navigate("/", { replace: true });

  } catch (error) {
    console.error("Login error:", error);
    message.error("Server connection failed. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return { login, loading };
};
