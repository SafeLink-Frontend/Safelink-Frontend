import { Question } from "@/types/edit-profile";
import React from "react";

interface QuestionsFormProps {
  questions: Question[] | null;
  answers: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QuestionsForm: React.FC<QuestionsFormProps> = ({
  questions,
  answers,
  onChange,
}) => (
  <div className="flex flex-col items-center">
    {questions?.map((question) => (
      <div
        key={question.id}
        className="flex flex-col sm:w-full w-[60%] items-start my-2"
      >
        <label
          className="text-[#252625] font-medium text-[14px] mt-4 mb-1 leading-3"
          htmlFor={question.id}
        >
          {question.question}
        </label>
        <input
          className="border-[0.5px] border-[#A6A6A6] rounded w-full p-2 focus:outline-none"
          type="text"
          id={question.id}
          name={question.id}
          value={answers[question.id] || ""}
          onChange={onChange}
          maxLength={500}
        />
      </div>
    ))}
  </div>
);
