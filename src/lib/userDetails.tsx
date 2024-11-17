export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null; // Ensure we're in the client environment
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

export const saveAccessToken = (token: string): void => {
  if (typeof window === "undefined") return; // Ensure we're in the client environment
  try {
    localStorage.setItem("accessToken", token);
    console.log("Access token saved successfully");
  } catch (error) {
    console.error("Error saving access token:", error);
  }
};

export const clearUserData = (): void => {
  if (typeof window === "undefined") return; // Ensure we're in the client environment
  try {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userDetails");

    console.log("User data cleared successfully");
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
