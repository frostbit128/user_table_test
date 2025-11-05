import React from 'react';

interface FilterInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({ value, onChange, placeholder = 'Filter users...'}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full max-w-md px-3 py-3 text-base border border-gray-300 rounded focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

