import React from "react";
import { useInterview } from "~/store/appContext";
import ToggleSwitch from "./switch";

interface QuestionItemProps {
  id: number;
  children: React.ReactNode;
  onRate: (rating: string) => void;
  onRemove: (id: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  children,
  onRate,
  onRemove,
}) => {
  const { questions, setQuestions } = useInterview();

  const handleToggleChange = (value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, responseType: value } : q)),
    );
  };

  return (
    <div className="border-2 border-black p-4 mb-4 rounded-md bg-white hover:bg-gray-100">
      <div className="flex items-center mb-2">
        <div className="flex-grow">{children}</div>
        <button
          onClick={() => onRemove(id)}
          className="bg-red-500 text-white py-1 px-2 rounded-md border-2 border-black hover:bg-red-600 ml-2"
          tabIndex={-2}
        >
          Remove
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <select
          className="border-black border-2 py-1 px-2"
          onChange={(e) => onRate(e.target.value)}
          tabIndex={-1}
        >
          <option>Sin selección</option>
          <option>Supera las expectativas</option>
          <option>Cumple las expectativas</option>
          <option>Por debajo de las expectativas</option>
          <option>Inaceptable</option>
        </select>
        <ToggleSwitch onChange={handleToggleChange} />
      </div>
    </div>
  );
};

export default QuestionItem;
