import React, { useState } from "react";

interface ToggleSwitchProps {
  initialValue?: boolean;
  onChange: (value: string) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onChange }) => {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    onChange(isOn ? "ejemplificó" : "definió");
    setIsOn((p) => !p);
  };

  return (
    <button
      className={`w-[52px] items-center cursor-pointer bg-white rounded-sm border-black border-2`}
      onClick={handleToggle}
      role="checkbox"
      aria-checked={isOn}
    >
      <span
        className={`w-6 py-1 px-2 flex items-center justify-center text-white font-bold transition-transform duration-300 transform ${isOn ? "translate-x-full" : "translate-x-0"} bg-blue-400`}
      >
        {isOn ? "D" : "E"}
      </span>
    </button>
  );
};

export default ToggleSwitch;
