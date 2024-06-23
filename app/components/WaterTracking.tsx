import React, { useState } from "react";

import Modal from "./Modal";

interface WaterTrackingProps {
  currentIntake: number;
  suggestedIntake: number;
  dailyIntake: number[];
}

const WaterTracking: React.FC<WaterTrackingProps> = ({
  currentIntake,
  suggestedIntake,
  dailyIntake,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedIntake, setSelectedIntake] = useState<number | null>(null);
  const [claudeResponse, setClaudeResponse] = useState<string>("");
  const currentIntakeInCups = (currentIntake / 240).toFixed(2);
  const suggestedIntakeInCups = (suggestedIntake / 240).toFixed(2);

  const daysInMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).getDay();

  const getDayColor = (intake: number) => {
    const intensity = intake / suggestedIntake;
    if (intensity >= 1) return "bg-blue-600";
    if (intensity >= 0.9) return "bg-blue-500";
    if (intensity >= 0.8) return "bg-blue-400";
    if (intensity >= 0.7) return "bg-blue-300";
    if (intensity >= 0.6) return "bg-blue-200";
    if (intensity >= 0.5) return "bg-blue-100";
    if (intensity > 0) return "bg-gray-300";
    return "bg-gray-100";
  };

  const handleClick = (day: number) => {
    setSelectedDay(day);
    setSelectedIntake(dailyIntake[day - 1] || 0);
  };

  const calendarCells = Array.from(
    { length: firstDayOfMonth + daysInMonth },
    (_, i) => {
      const day = i - firstDayOfMonth + 1;
      return day > 0 ? (
        <div
          key={i}
          className={`w-10 h-10 flex items-center justify-center ${getDayColor(
            dailyIntake[day - 1] || 0
          )} cursor-pointer`}
          onClick={() => handleClick(day)}
        >
          {day}
        </div>
      ) : (
        <div key={i} className="w-10 h-10" />
      );
    }
  );
  async function askClaude() {
    setClaudeResponse("Asking...");
    const response = await fetch("/api/claude", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemPrompt: `You are HydroBot. You will provide the user with insights about their water intake. Today's water intake (mL): ${currentIntake}. Suggested daily water intake (mL): ${suggestedIntake}. Daily intake for the past month of June 2024: ${dailyIntake.toString()}.`,
        textPrompt: "Summarize my water intake for today and the month.",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    setClaudeResponse(data.fullResponse);
  }

  return (
    <div
      className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md"
      style={{ maxHeight: "77vh", overflowY: "scroll" }}
    >
      <h2 className="text-xl font-bold mb-4">Water Tracking</h2>
      <p className="mt-4">{claudeResponse}</p>
      <button onClick={() => askClaude()}>Ask HydroBot</button>
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-64 bg-gray-200 rounded-lg overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-blue-600"
            style={{ height: `${(currentIntake / suggestedIntake) * 100}%` }}
          />
        </div>
        <div className="ml-4">
          <p className="text-xl font-bold">{currentIntake} mL</p>
          <p className="text-sm text-gray-500">({currentIntakeInCups} cups)</p>
          <p className="text-sm text-gray-500">
            Suggested: {suggestedIntake} mL ({suggestedIntakeInCups} cups)
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">Daily Intake (June 2024)</h3>
        <div className="grid grid-cols-7 gap-1">{calendarCells}</div>
      </div>
      <Modal
        isOpen={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        day={selectedDay}
        intake={selectedIntake}
      />
    </div>
  );
};

export default WaterTracking;
