"use client";

import React, { useState } from "react";

const WaterIntakeForm: React.FC = () => {
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [mealsPerDay, setMealsPerDay] = useState<number | "">("");
  const [waterIntake, setWaterIntake] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    if (age && weight) {
      const weightInKg = weight / 2.2;
      const ageFactor = weightInKg * age;
      const waterInOunces = ageFactor / 28.3;
      const waterInCups = waterInOunces / 8;
      setWaterIntake(waterInCups);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateWaterIntake();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Water Intake Calculator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight (lbs)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Height
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Meals per Day
          </label>
          <input
            type="number"
            value={mealsPerDay}
            onChange={(e) => setMealsPerDay(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md"
        >
          Calculate
        </button>
      </form>
      {waterIntake !== null && (
        <div className="mt-4">
          <p className="text-lg font-bold">
            Recommended Water Intake: {waterIntake.toFixed(2)} cups per day
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterIntakeForm;
