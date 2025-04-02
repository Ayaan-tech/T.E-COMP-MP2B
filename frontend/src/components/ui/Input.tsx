import React from "react";

interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; 
}

const Input: React.FC<InputProps> = ({ label, type = "text", value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default Input;
