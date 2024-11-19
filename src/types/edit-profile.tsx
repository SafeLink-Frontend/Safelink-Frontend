export interface Question {
  id: string;
  question: string;
}

export interface Answer {
  questionId: {
    id: string;
    question: string;
  };
  answer: string;
}

export interface FormState {
  username: string;
  about: string;
  firstName: string;
  lastName: string;
  cover: File | null | string;
  profile: File | null | string;
  professionalPictures: (string | File)[];
  workPictures: (string | File)[];
  leisurePictures: (string | File)[];
  address: string;
  country: string;
  state: string;
  zip: string;
  email: string;
  phone1: string;
  phone2: string;
  answers: Record<string, string>;
}

export interface ImageUploaderProps {
  label: string;
  name: string;
  value: File | null | string | (string | File)[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (index?: number) => void;
  multiple?: boolean;
  required?: boolean;
}
