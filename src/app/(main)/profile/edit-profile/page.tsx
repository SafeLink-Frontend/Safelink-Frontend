"use client";
import Loading from "@/app/loading";
import { AddressForm } from "@/components/AddressForm";
import { ImageUploader } from "@/components/ImageUploader";
import { PersonalInfoForm } from "@/components/PersonalInfoForm";
import { QuestionsForm } from "@/components/QuestionsForm";
import { useProfileForm } from "@/hooks/useProfileForm";
import useUserStore from "@/store/useUserStore";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import React from "react";

function Page() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const querylient = useQueryClient();
  const user: User | undefined = querylient.getQueryData(["profile"]);

  const {
    isLoading,
    error,
    form,
    questions,
    handleChange,
    handleAnswerChange,
    handleDelete,
    handleSubmit,
  } = useProfileForm(router, user, setUser);

  if (isLoading) return <Loading />;

  return (
    <section className="px-4 py-8 sm:mt-8">
      <form onSubmit={handleSubmit}>
        <PersonalInfoForm form={form} onChange={handleChange} />

        <div className="flex flex-col items-center w-full">
          <ImageUploader
            label="Profile picture"
            name="profile"
            value={form.profile}
            onChange={handleChange}
            onDelete={() => handleDelete("profile")}
            multiple={false}
            // required={true}
          />

          <ImageUploader
            label="Cover picture"
            name="cover"
            value={form.cover}
            onChange={handleChange}
            onDelete={() => handleDelete("cover")}
            multiple={false}
            // required={true}
          />

          <ImageUploader
            label="Professional pictures"
            name="professionalPictures"
            value={form.professionalPictures}
            onChange={handleChange}
            onDelete={(index) => handleDelete("professionalPictures", index)}
            multiple={true}
          />

          <ImageUploader
            label="Work pictures"
            name="workPictures"
            value={form.workPictures}
            onChange={handleChange}
            onDelete={(index) => handleDelete("workPictures", index)}
            multiple={true}
          />

          <ImageUploader
            label="Leisure pictures"
            name="leisurePictures"
            value={form.leisurePictures}
            onChange={handleChange}
            onDelete={(index) => handleDelete("leisurePictures", index)}
            multiple={true}
          />
        </div>

        <AddressForm form={form} onChange={handleChange} />

        <QuestionsForm
          questions={questions}
          answers={form.answers}
          onChange={handleAnswerChange}
        />

        <button
          type="submit"
          className="bg-primary text-white rounded-md px-4 py-2 sm:ml-0 ml-[30%] lg:ml-[35%] mt-4"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}

export default Page;
