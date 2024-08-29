import React, { createContext, useContext, useState } from "react";
interface CandidateInfo {
  name: string;
  yearsOfExperience?: string;
  expectedLevel?: number;
  interviewer: string;
  interviewDate?: string;
  interviewTime?: string;
}
interface Question {
  id: number;
  content: string;
  rating: string;
  responseType?: string;
}
interface InterviewContextProps {
  candidateInfo: CandidateInfo;
  setCandidateInfo: React.Dispatch<React.SetStateAction<CandidateInfo>>;
  questions: Question[];
  addQuestion: (question: string) => void;
  rateQuestion: (id: number, rating: string) => void;
  removeQuestion: (id: number) => void;
  exportToJson: () => void;
  exportToCsv: () => void;
  loadFromTemplate: (jsonData: string) => void;
  loadFromLocalTemplates: () => void;
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleTemplateSelect: (e: React.FormEvent) => void;
}

const InterviewContext = createContext<InterviewContextProps | undefined>(
  undefined,
);

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [candidateInfo, setCandidateInfo] = useState<CandidateInfo>({
    name: "",
    yearsOfExperience: "",
    expectedLevel: undefined,
    interviewer: "",
    interviewDate: "",
    interviewTime: "",
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [template, setTemplate] = useState("");
  let nextId = questions.length
    ? Math.max(...questions.map((q) => q.id)) + 1
    : 1;

  const addQuestion = (question: string) => {
    setQuestions([
      ...questions,
      {
        id: nextId++,
        content: question,
        rating: "",
        responseType: "unspecified",
      },
    ]);
  };

  const rateQuestion = (id: number, rating: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, rating } : q)));
  };

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const exportToJson = () => {
    if (questions.length === 0) return;
    const parsedQuestions = questions.map((q) => ({
      ...q,
      rating: null,
      responseType: undefined,
    }));
    const data = JSON.stringify({ questions: parsedQuestions });
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToCsv = () => {
    const header = "question|rating|responseType\n";
    const rows = questions
      .map((q) => `${q.content}|${q.rating}|${q.responseType || "unspecified"}`)
      .join("\n");
    const csv = header + rows;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "interview_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadFromTemplate = (jsonData: string) => {
    const parsedData = JSON.parse(jsonData);
    setQuestions(parsedData.questions || []);
  };

  const loadFromLocalTemplates = () => {
    openModal();
  };

  const handleTemplateSelect = () => {
    if (template) {
      loadFromTemplate(template);
      closeModal();
    }
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <InterviewContext.Provider
      value={{
        candidateInfo,
        setCandidateInfo,
        questions,
        addQuestion,
        rateQuestion,
        removeQuestion,
        exportToJson,
        exportToCsv,
        loadFromTemplate,
        loadFromLocalTemplates,
        setQuestions,
        isModalOpen,
        openModal,
        closeModal,
        handleTemplateSelect,
      }}
    >
      {children}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Load a template JSON</h2>
            <textarea
              className="border-2 border-black w-full min-h-48"
              tabIndex={0}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
            />
            <button
              className="bg-blue-500 mb-1 text-white py-2 px-4 rounded-md border-2 border-black hover:bg-blue-600 w-full"
              value="submit"
              onClick={handleTemplateSelect}
            >
              Load
            </button>

            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md border-2 border-black hover:bg-red-600 w-full"
              value="close"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};
