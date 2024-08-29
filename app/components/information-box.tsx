import React from "react";

interface InformationBoxProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const InformationBox: React.FC<InformationBoxProps> = ({
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={`border-2 border-black p-4 rounded-md bg-orange-300 shadow-md ${className}`}
    >
      {title && (
        <h2 className="text-lg font-semibold mb-2 text-orange-800">{title}</h2>
      )}
      <div>{children}</div>
    </div>
  );
};

export default InformationBox;
