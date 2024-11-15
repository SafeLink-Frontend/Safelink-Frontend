export const getAccessToken = () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken;
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

export const saveAccessToken = (token: string) => {
  try {
    localStorage.setItem("accessToken", token);
    console.log("token saved");
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

export const clearUserData = () => {
  try {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      //await SecureStore.deleteItemAsync("refreshToken");
      localStorage.removeItem("userDetails");
      console.log("User data cleared successfully");
    }
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};
