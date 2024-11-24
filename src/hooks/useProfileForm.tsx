import { useState, useEffect, useCallback } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  fetchQuestions,
  fetchQuestionsAnswers,
  submitAnswer,
  updateProfile,
} from "@/lib/api";
import { Answer, FormState, Question } from "@/types/edit-profile";
import { User } from "@/types/user";
import { convertFilesToBase64, convertFileToBase64 } from "@/util/convertImage";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { SubscriptionData } from "@/types/SubscriptionStatus";

export const useProfileForm = (
  router: AppRouterInstance,
  initialUser: User | null | undefined,
  setUser: (user: any) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const queryClient = useQueryClient();
  const subscriptionData: SubscriptionData | undefined =
    queryClient.getQueryData(["subscription"]);
  const subscriptionStatus = subscriptionData?.plan.name;
  console.log("initial user", initialUser);

  const [form, setForm] = useState<FormState>({
    username: initialUser?.username || "",
    about: initialUser?.about || "",
    firstName: initialUser?.firstName || "",
    lastName: initialUser?.lastName || "",
    cover: initialUser?.coverPicture || null,
    profile: initialUser?.profilePicture || null,
    professionalPictures: initialUser?.professionalPictures || [],
    workPictures: initialUser?.workPictures || [],
    leisurePictures: initialUser?.leisurePictures || [],
    address: initialUser?.address || "",
    country: initialUser?.country || "Nigeria",
    state: initialUser?.state || "",
    zip: "",
    email: initialUser?.email || "",
    phoneNumber: initialUser?.phoneNumber || "",
    phone2: "",
    answers: {},
  });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [questionsData, answersData] = await Promise.all([
        fetchQuestions(router),
        fetchQuestionsAnswers(),
      ]);

      if (questionsData) {
        setQuestions(questionsData);
      }

      if (answersData) {
        const newAnswers: Record<string, string> = {};
        answersData.forEach((item: Answer) => {
          newAnswers[item.questionId.id] = item.answer;
        });
        setForm((prev) => ({ ...prev, answers: newAnswers }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const validateImage = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError("File size exceeds 5MB limit");
      return false;
    }
    return true;
  };

  // const handleChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     const { name, value, files } = e.target as HTMLInputElement;

  //     if (files) {
  //       if (!Array.from(files).every(validateImage)) {
  //         return;
  //       }

  //       setForm((prev) => ({
  //         ...prev,
  //         [name]: files.length === 1 ? files[0] : Array.from(files),
  //       }));
  //     } else {
  //       setForm((prev) => ({
  //         ...prev,
  //         [name]: value,
  //       }));
  //     }
  //   },
  //   []
  // );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const files = (e.target as HTMLInputElement).files;
    // console.log(form.phone1, form.address);

    if (files) {
      setForm((prevForm: any) => ({
        ...prevForm,
        [name]:
          name === "cover" || name === "profile"
            ? files[0]
            : [
                ...(prevForm[name] as File[] | string[]), // Retain existing pictures
                ...Array.from(files), // Add new pictures
              ],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [name]: value,
        },
      }));
    },
    []
  );

  const handleDelete = useCallback((name: keyof FormState, index?: number) => {
    setForm((prev) => {
      if (index !== undefined && Array.isArray(prev[name])) {
        // Handle deletion in arrays (e.g., professionalPictures, workPictures)
        const updatedFiles = [...(prev[name] as (File | string)[])];
        updatedFiles.splice(index, 1);
        return { ...prev, [name]: updatedFiles };
      }

      // Handle single image deletion (e.g., profile, cover)
      return { ...prev, [name]: null };
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("form", form);
    if (!initialUser?._id) {
      setError("User ID is missing");
      return;
    }

    // if (!form.profile) {
    //   setError("Please upload both cover and profile images.");
    //   toast.error("Please select a profile picture");
    //   return;
    // }

    // if (!form.cover) {
    //   setError("Please upload both cover and profile images.");
    //   toast.error("Please select a  cover picture");
    //   return;
    // }

    setIsLoading(true);
    setError(null);

    try {
      // Handle answers submission

      for (const [questionId, answer] of Object.entries(form.answers)) {
        if (answer && answer.trim() !== "") {
          await submitAnswer(questionId, answer, router);
          queryClient.invalidateQueries({ queryKey: ["my-answers"] });
        }
      }

      // Update profile
      console.log("form", form);
      const profilePictureBase64 =
        form.profile instanceof File
          ? await convertFileToBase64(form.profile)
          : form.profile;
      const coverPictureBase64 =
        form.cover instanceof File
          ? await convertFileToBase64(form.cover)
          : form.cover;
      const professionalPicturesBase64 = await convertFilesToBase64(
        form.professionalPictures as File[]
      );
      const workPicturesBase64 = await convertFilesToBase64(
        form.workPictures as File[]
      );
      const leisurePicturesBase64 = await convertFilesToBase64(
        form.leisurePictures as File[]
      );

      const response = await updateProfile(
        {
          ...form,
          profilePicture: profilePictureBase64,
          coverPicture: coverPictureBase64,
          professionalPictures: professionalPicturesBase64,
          workPictures: workPicturesBase64,
          leisurePictures: leisurePicturesBase64,
          _id: initialUser._id,
        },
        router,
        setUser,
        subscriptionStatus,
        queryClient
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    form,
    questions,
    handleChange,
    handleAnswerChange,
    handleDelete,
    handleSubmit,
  };
};
