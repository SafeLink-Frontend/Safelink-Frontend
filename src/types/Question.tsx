export interface Question {
  id: string;
  question: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: string;
}

export interface Answer {
  id: string;
  userId: string;
  answer: string;
  questionId: Question;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: string;
}
