import { Answer } from "@/types/Question";
import React from "react";

const QA = ({ questions }: { questions: Answer[] }) => {
  return (
    <section className="px-[20px] lg:px-[40px] xxl:px-[80px] mb-8 lg:mb-12 xxl:mb-16">
      <div className="text-[18px] lg:text-[24px] xxl:text-[30px] font-medium my-4 lg:my-6 xxl:my-8 leading-7 lg:leading-9 xxl:leading-10">
        Question and Answers
      </div>
      <div className="flex flex-row gap-4 lg:gap-6 xxl:gap-8 overflow-x-auto lg:flex-wrap lg:overflow-x-visible">
        {questions.map((qa, index) => (
          <div
            key={index}
            className="bg-black min-w-[30vw] w-[30vw] sm:min-w-[80vw] sm:w-[80vw] lg:w-auto lg:min-w-0 lg:flex-1 lg:basis-[45%] xxl:basis-[30%] text-white p-4 lg:p-6 xxl:p-8 rounded-xl"
          >
            <div className="text-[14px] lg:text-[16px] xxl:text-[18px] text-primary leading-6 lg:leading-7 xxl:leading-8 font-medium mb-2 lg:mb-3 xxl:mb-4 ">
              {qa.questionId.question}
            </div>
            <p className="text-[13px] lg:text-[15px] xxl:text-[17px] font-normal leading-6 lg:leading-7 xxl:leading-8">
              {qa.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QA;
