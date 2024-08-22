import { useState } from "react";
import { toast } from "react-hot-toast";
import useModalStore from "@/store/useModalStore";
import { object, string, InferType } from "yup";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { closeLogInModal } = useModalStore();

  const schema = object({
    email: string().required("Email is required").email("Invalid email format"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
  });

  const login = async (rawFormData: FormData) => {
    const formData = {
      email: rawFormData.get("email"),
      password: rawFormData.get("password"),
    };
    console.log("form data", formData);
    setIsLoading(true);
    try {
      await schema.validate(formData, { abortEarly: false });

      const response = await fetch(
        `https://cream-card-api.onrender.com/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        console.log("res", response, res);
        toast.error(res.error);
        // if (response.status === 404) {
        //   toast.error("The email or password is incorrect");
        // } else {
        //   toast.error("An error occurred during login");
        // }
        return;
      }

      const data = await response.json();
      console.log("response", data);
      toast.success("Logged in successfully");
      closeLogInModal();
      return { success: true, data };
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === "ValidationError") {
        toast.error(error.errors[0]);
      } else {
        toast.error(error.message || "An error occurred");
      }
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
}
