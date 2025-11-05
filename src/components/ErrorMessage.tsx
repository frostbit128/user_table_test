import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="bg-red-50 border border-red-200 rounded p-6 max-w-md">
        <h3 className="m-0 mb-2 text-red-600">Error</h3>
        <p className="m-0 text-gray-600">{message}</p>
      </div>
    </div>
  );
};

