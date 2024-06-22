"use client"

import React, { useState, useEffect } from 'react';

interface RecordButtonProps {
  isRecording: boolean;
  onToggleRecording: () => void;
  pending: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  onToggleRecording,
  pending,
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isRecording) {
      const timer = setTimeout(() => setAnimate(true), 100);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [isRecording]);

  return (
    <button
      onClick={onToggleRecording}
      className={`w-20 h-20 rounded-full border-4 flex items-center justify-center focus:outline-none transition-all duration-300 ${
        isRecording ? "bg-transparent" : "bg-transparent hover:bg-gray-200"
      } ${pending ? "border-blue-500 animate-spin" : "border-black"}`}
    >
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center ${
          isRecording ? "bg-transparent" : "bg-red-500"
        }`}
      >
        <div
          className={`${
            isRecording
              ? "w-8 h-8 rounded-sm bg-red-500"
              : "w-12 h-12 rounded-full bg-red-500"
          } ${animate ? "animate-record" : ""} transition-all duration-300`}
        ></div>
      </div>
    </button>
  );
};

export default RecordButton;