export const Authentication = async (values) => {
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("authToken", data.token); // or any key you'd prefer
    }

    return { data };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
