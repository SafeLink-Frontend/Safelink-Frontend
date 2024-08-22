import { useState } from "react";
import { toast } from "react-hot-toast";
import useModalStore from "@/store/useModalStore";
import { object, string, InferType, ref } from "yup";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const { closeLogInModal } = useModalStore();

  const schema = object({
    email: string().required("Email is required").email("Invalid email format"),
    password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: string()
      .required("Please confirm your password")
      .oneOf([ref("password")], "Passwords must match"),
  });

  const signUp = async (rawFormData: FormData) => {
    console.log("form data", rawFormData);
    const formData = {
      email: rawFormData.get("email"),
      password: rawFormData.get("password"),
      confirmPassword: rawFormData.get("confirmPassword"),
    };
    setIsLoading(true);
    try {
      await schema.validate(formData, { abortEarly: false });

      const response = await fetch(
        `https://cream-card-api.onrender.com/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        //console.log("res", response);
        const res = await response.json();
        console.log("res", response, res);
        toast.error(res.error);
        // if (response.status === 400) {
        //   toast.error("The email has been used already");
        // } else {
        //   toast.error("An error occurred during sign up");
        // }
        return;
      }

      const data = await response.json();
      console.log("response", data);
      toast.success(
        data.message + " Check your email to continue your registration",
        { duration: 5000 }
      );
      closeLogInModal();
      return { success: true, data };
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.name === "ValidationError") {
        toast.error(error.errors[0]);
      } else {
        console.log("error", error);
        toast.error(error.message || "An error occurred");
      }
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading };
}
