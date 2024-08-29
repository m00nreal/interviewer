import { MetaFunction } from "@remix-run/react";
import React, { useState } from "react";
import CandidateInformation from "~/components/candidate-information";
import InformationBox from "~/components/information-box";
import QuestionItem from "~/components/question-item";
import { useInterview } from "~/store/appContext";

export const meta: MetaFunction = () => {
  return [{ title: "Interview" }];
};

const InterviewPage: React.FC = () => {
  const {
    questions,
    addQuestion,
    rateQuestion,
    removeQuestion,
    exportToJson,
    exportToCsv,
    loadFromLocalTemplates,
  } = useInterview();

  const [newQuestionText, setNewQuestionText] = useState<string>("");
  const handleAddQuestion = () => {
    if (newQuestionText.trim()) {
      addQuestion(newQuestionText);
      setNewQuestionText("");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <CandidateInformation />
      <InformationBox title="Keep in mind!">
        Please make sure to ask questions that are reasonable for the expected
        level. As a suggestion, if the candidate is providing questions above
        the expected level, you can ask harder stuff.
      </InformationBox>
      <div className="flex mt-4">
        <button
          onClick={loadFromLocalTemplates}
          className="bg-orange-500 text-white py-2 px-4 rounded-md border-2 border-black hover:bg-orange-600 "
        >
          Load from template
        </button>
      </div>

      <div className="border-2 border-black p-4 rounded-md mt-4 bg-white">
        <h2 className="text-xl font-bold mb-4">Questions</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              placeholder="New question"
              className="border-2 border-black p-2 rounded-md w-full max-w-xs mr-4"
            />
            <button
              onClick={handleAddQuestion}
              className="bg-blue-500 text-white py-2 px-4 rounded-md border-2 border-black hover:bg-blue-600"
            >
              Add Question
            </button>
          </div>
        </form>
        {questions.map((q) => (
          <QuestionItem
            key={q.id}
            id={q.id}
            onRate={(rating) => rateQuestion(q.id, rating)}
            onRemove={(id) => removeQuestion(id)}
          >
            {q.content}
          </QuestionItem>
        ))}
        <div className="mt-4 flex items-center">
          <button
            onClick={exportToJson}
            className={`w-full text-white py-2 px-4 rounded-md border-2 border-black hover:bg-green-600 ${questions.length === 0 ? "bg-gray-400" : "bg-green-500"}`}
            disabled={questions.length === 0}
          >
            Export as template
          </button>
          <button
            onClick={exportToCsv}
            className={`w-full text-white py-2 px-4 rounded-md border-2 border-black hover:bg-yellow-600 ml-4 ${questions.length === 0 ? "bg-gray-400" : "bg-yellow-500"}`}
            disabled={questions.length === 0}
          >
            Export as CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;
