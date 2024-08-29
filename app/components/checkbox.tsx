import React from "react";

interface CheckboxProps {
  value: number;
  isChecked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ value, isChecked, onChange }) => {
  return (
    <button
      className={`flex items-center justify-center w-10 h-10 border-2 border-black rounded-md cursor-pointer ${
        isChecked ? "bg-yellow-500 text-white" : "bg-white"
      }`}
      onClick={onChange}
      role="checkbox"
      aria-checked={isChecked ? "true" : "false"}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {}}
        className="hidden"
      />
      <span className="text-lg">{value}</span>
    </button>
  );
};

export default Checkbox;
