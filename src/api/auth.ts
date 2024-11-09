const API_URL = "http://localhost:5000";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // Check if the response status is ok (status code 2xx)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed"); // Throw custom error message
    }

    // If response is OK, parse the response JSON
    return response.json();
  } catch (error) {
    // Catch any errors, including network errors
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
