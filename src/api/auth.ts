const API_URL = "http://localhost:5000";

export const signin = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    console.log("Login response:", data);
    if (!data.token || !data.name) {
      throw new Error("Invalid response format from server.");
    }

    return data;
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error("Invalid credentials");
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return response.json();
};
