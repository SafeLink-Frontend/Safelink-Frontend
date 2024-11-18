import { useFetch } from "@/hooks/useFetch";
import Toast, { toast } from "react-hot-toast";
import axios, { AxiosInstance } from "axios";
import { clearUserData, getAccessToken } from "./userDetails";
import { PaymentPlan } from "@/types/PaymentPlan";
import { Answer, Question } from "@/types/Question";
import { User } from "@/types/user";
import { SubscriptionStatus } from "@/types/SubscriptionStatus";
import { Product, UserProduct } from "@/types/product";

//const { fetch } = useFetch();

// export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
export const baseUrl = "http://localhost:3001/api/v1";

export const createApiInstance = (): AxiosInstance => {
  const accessToken = getAccessToken();

  const api = axios.create({
    baseURL: baseUrl,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          // Handle token expiration or unauthorized access
          clearUserData();
          window.location.href = "/login";
        } else if (error.response.status >= 500) {
          console.error(
            "Server error:",
            error.response.data?.message || "Unknown server error"
          );
        }
      } else if (error.request) {
        console.error("Network error: No response received from server");
      } else {
        console.error("Unexpected error:", error.message);
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const handleGoogleLogin = async (
  router: any,
  googleResponse: any,
  setUser: any
) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/google`, {
      token: googleResponse.credential,
    });
    console.log("google sign in response", response);
    toast.success("google sign in successful");
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    setUser(response.data.user);
    router.replace("/");
  } catch (error) {
    console.log("google sign in failed", error);
    toast.error("Google sign in failed");
  }
};

export const fetchMyInventory = async () => {
  const api = await createApiInstance();
  const response = await api.get(`/inventory/user`);
  return response.data.data; // Assuming your API response has data here
};

export const generateShareableLink = async () => {
  const api = await createApiInstance();
  const response = await api.get(`/user/shareable-link`);
  // console.log("sl", response);
  return response.data.data; // Assuming your API response has data here
};

export const fetchSingleInventory = async (
  id: string | null
): Promise<UserProduct | null> => {
  // Toast.dismiss();
  try {
    const response = await axios.get(`${baseUrl}/inventory/${id}`);
    console.log("Inventory response:", response);

    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    // Toast.error("Error fetching inventory");
    return null;
  }
};

export const fetchUserInventory = async (id: string): Promise<any[] | null> => {
  try {
    const response = await axios.get(`${baseUrl}/inventory/user/${id}`);
    console.log("Inventory response:", response);

    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching inventory:", error);

    return null;
  }
};

export const fetchInventoryBySearch = async (
  query: string
): Promise<any[] | null> => {
  Toast.dismiss();
  try {
    //const api = await createApiInstance();
    // const formData = new FormData();
    // formData.append("query", query);

    const response = await axios.post(
      "https://safelink-search-api.onrender.com/search",
      { query },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Inventory search response:", response);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching search inventory:", error);
    //Toast.error("Error fetching inventory");
    return null;
  }
};

export const updateProfile = async (data: any, router: any, setUser: any) => {
  Toast.dismiss();
  const api = await createApiInstance();
  try {
    const response = await api.put(`/user`, data);
    console.log("rr", response.data.data);
    if (response.status === 200) {
      if (typeof window !== "undefined") {
        // localStorage.setItem("user", JSON.stringify(response.data.data));
        const user: User = response.data.data;
        setUser(user);
        Toast.success("Profile updated successfully");

        setTimeout(() => {
          if (user.subscriptionStatus === SubscriptionStatus.FREE) {
            router.push("/pricing");
          } else {
            router.push("/profile");
          }
        }, 2000);
      }
    } else {
      //console.log()
      Toast.error("Error updating profile");
    }
  } catch (e) {
    console.error("Error updating profile:", e);
    Toast.error("Error updating profile");
    return null;
  }
};

export const addInventory = async (data: any, router: any) => {
  Toast.dismiss();
  const api = await createApiInstance();
  try {
    const response = await api.post(`/inventory`, data);
    console.log("rr", response);
    if (response.status === 200 || response.status === 201) {
      Toast.success("Inventory added successfully");
    } else {
      console.log("error addidng inventory", response);
      Toast.error("Error adding inventory");
    }
  } catch (e) {
    console.error("Error adding inventory:", e);
    Toast.error("Error adding inventory");
    return null;
  }
};

export const fetchQuestions = async (
  router: any
): Promise<Question[] | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await axios.get(`${baseUrl}/questions`);
    console.log("Questions response:", response);

    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    Toast.error("Error fetching questions");
    return null;
  }
};

export const submitAnswer = async (
  questionId: string,
  answer: string,
  router: any
) => {
  Toast.dismiss();
  const api = await createApiInstance();
  try {
    const response = await api.post(`/questions/${questionId}/answer`, {
      answer,
    });
    console.log("submitted answer response", response);
    if (response.status === 200 || response.status === 201) {
      //Toast.success("Answer submitted successfully");
      console.log("Answer submitted successfully");
    } else {
      console.log("Error submitting answer");
      return;
    }
  } catch (e) {
    console.error("Error submitting answer:", e);
    Toast.error("Error submitting answer");
    return null;
  }
};

export const fetchQuestionsAnswers = async (
  router: any
): Promise<Answer[] | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await api.get(`/questions/answer`);
    //console.log("Questions and Answers response:", response);

    const data = response.data.data;

    return data;
  } catch (error) {
    console.log("Error fetching question and answers:", error);
    //Toast.error("Error fetching question and answers:");
    return null;
  }
};

export const fetchQuestionsAnswersByUserId = async (
  id: string
): Promise<any[] | null> => {
  // toast.dismiss();
  try {
    const response = await axios.get(`${baseUrl}/questions/answer/user/${id}`);
    console.log("Questions and Answers response:", response);

    const data = response.data.data;

    return data;
  } catch (error) {
    console.error("Error fetching question and answers:", error);
    //Toast.error("Error fetching question and answers:");
    return null;
  }
};

export const fetchUsers = async (): Promise<User[] | null> => {
  const response = await axios.get(`${baseUrl}/user/complete-profiles`); //complete-profiles
  return response.data.data; // Assuming your API response has data here
};

export const fetchUser = async (router: any): Promise<any[] | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await api.get(`/user/`);
    console.log("User response:", response);

    const data = response.data.data;
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    //Toast.error("Error fetching user");
    return null;
  }
};

export const fetchUserById = async (id: string): Promise<User | null> => {
  // Toast.dismiss();
  try {
    const response = await axios.get(`${baseUrl}/user/${id}`);
    // console.log("User response:", response);

    const data = response.data.data as User;
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    // Toast.error("Error fetching user");
    return null;
  }
};

export const fetchUserByUsername = async (
  username: string
): Promise<User | null> => {
  // Toast.dismiss();
  try {
    console.log("username", username);
    const response = await axios.get(`${baseUrl}/user/profile/${username}`);
    // console.log("User response:", response);

    const data = response.data.data as User;
    return data;
  } catch (error) {
    console.log("Error fetching user:", error);
    // Toast.error("Error fetching user");
    return null;
  }
};

export const getSubscriptionPlans = async (
  router: any
): Promise<PaymentPlan[] | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await api.get("/subscription/plan");
    console.log("Subscription plans response:", response);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    Toast.error("Error fetching subscription plans");
    return null;
  }
};

export const initiateSubcription = async (
  router: any,
  id: string
): Promise<any | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await api.post("/subscription/subscribe", {
      planId: id,
    });
    console.log("payment initiation response:", response);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error initiating payment:", error);
    Toast.error("Error initiating payment");
    return null;
  }
};

export const updateProfilePicture = async (
  router: any,
  image: File
): Promise<any | null> => {
  Toast.dismiss();
  try {
    const api = await createApiInstance();
    const response = await api.post("/profile/profile-picture", {
      image,
    });
    console.log("image upload response", response);

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error Updating profile picture:", error);
    Toast.error("Error Updating profile picture");
    return null;
  }
};

export const handleRequestResetLink = async (email: string) => {
  try {
    toast.dismiss();
    const response = await axios.post(`${baseUrl}/auth/reset-password/link`, {
      email,
    }); // Replace with your API endpoint
    toast.success(
      response.data.message || "Reset link sent! Check your email."
    );
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred.");
  }
};

export const handleResetPassword = async (
  router: any,
  password: string,
  confirmPassword: string,
  token: string
) => {
  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.patch(`${baseUrl}/auth/reset-password`, {
      password,
      confirmPassword,
      token,
    }); // Replace with your API endpoint
    toast.success(response.data.message || "Password reset successfully!");
    router.push("/login"); // Redirect to login page
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "An error occurred.");
  }
};

// try {
//   const response = await axios.post("/api/listing", data);
//   console.log(response.data);
// } catch (error) {
//   console.error("There was an error!", error);
// }
