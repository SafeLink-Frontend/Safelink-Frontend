import { Answer } from "@/types/Question";
import React from "react";

const QA = ({ questions }: { questions: Answer[] }) => {
  return (
    <section className="px-[20px] lg:px-[40px] mb-8 lg:mb-12 2xl:mb-16">
      <div className="text-[18px] lg:text-[24px] 2xl:text-[30px] font-medium my-4 lg:my-6 2xl:my-8 leading-7 lg:leading-9 2xl:leading-10">
        Question and Answers
      </div>
      <div className="flex flex-row gap-4 lg:gap-6 2xl:gap-8 overflow-x-auto lg:flex-wrap lg:overflow-x-visible">
        {questions.map((qa, index) => (
          <div
            key={index}
            className="bg-black min-w-[80vw] w-[80vw]  lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-[45%] 2xl:basis-[30%] text-white p-4 lg:p-6 2xl:p-8 rounded-xl"
          >
            <div className="text-[14px] lg:text-[16px] 2xl:text-[18px] text-primary leading-6 lg:leading-7 2xl:leading-8 font-medium mb-2 lg:mb-3 2xl:mb-4 ">
              {qa.questionId.question}
            </div>
            <p className="text-[13px] lg:text-[15px] 2xl:text-[17px] font-normal leading-6 lg:leading-7 2xl:leading-8">
              {qa.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QA;
