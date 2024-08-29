import React, { useState } from "react";
import { useInterview } from "~/store/appContext";

const CandidateInformation: React.FC = () => {
  const { candidateInfo, setCandidateInfo } = useInterview();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCandidateInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`border-2 border-black p-4 rounded-md mb-4 ${isCollapsed ? "bg-blue-400" : "bg-blue-500"} transition-all duration-300`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggleCollapse}
        role="button"
      >
        <h2
          className={`text-xl font-bold mb-2 ${isCollapsed ? "text-blue-800" : "text-white"}`}
        >
          Interview Details
        </h2>
        <span
          className={`text-2xl ${isCollapsed ? "text-white" : "text-white"}`}
        >
          {isCollapsed ? "▲" : "▼"}
        </span>
      </div>
      {!isCollapsed && (
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={candidateInfo.name}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="yearsOfExperience"
            >
              Years of Experience
            </label>
            <input
              id="yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              value={candidateInfo.yearsOfExperience ?? ""}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="level">
              Expected Level
            </label>
            <div className="flex gap-2">
              {[7, 8, 9, 10, 11, 12].map((level) => (
                <button
                  key={level}
                  className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md cursor-pointer ${
                    candidateInfo.expectedLevel === level
                      ? "bg-gray-800 text-white"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    setCandidateInfo((prev) => ({
                      ...prev,
                      expectedLevel: level,
                    }))
                  }
                  role="checkbox"
                  aria-checked={
                    candidateInfo.expectedLevel === level ? "true" : "false"
                  }
                  name="level"
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="interviewer"
            >
              Interviewer
            </label>
            <input
              id="interviewer"
              name="interviewer"
              type="text"
              value={candidateInfo.interviewer}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="interviewDate"
            >
              Interview Date
            </label>
            <input
              id="interviewDate"
              name="interviewDate"
              type="date"
              value={candidateInfo.interviewDate ?? ""}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="interviewTime"
            >
              Interview Time
            </label>
            <input
              id="interviewTime"
              name="interviewTime"
              type="time"
              value={candidateInfo.interviewTime ?? ""}
              onChange={handleChange}
              className="border-2 border-black p-2 rounded-md w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateInformation;
