import React, { useState } from 'react';

import WaterTracking from './WaterTracking';

const suggestedIntake = 2000; // Example suggested intake
const currentIntake = 1500; // Example current intake
const dailyIntake = [2000, 1500, 1800, 1900, 1600, 1700, 2000, 1500, 1800, 1900, 1600, 1700, 2000, 1500, 1800, 1900, 1600, 1700, 2000, 1500, 1800, 1900]; 

const WaterIntakeForm: React.FC = () => {
  const [age, setAge] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [mealsPerDay, setMealsPerDay] = useState<number | ''>('');
  const [waterIntake, setWaterIntake] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    if (age && weight) {
      const waterIntakeInOunces = weight * 2/3;
      const waterIntakeInMl = waterIntakeInOunces * 29.5735;
      setWaterIntake(Number(waterIntakeInMl.toFixed(0)));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateWaterIntake();
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {waterIntake == null && <div>      
        <h1 className="text-2xl font-bold mb-4">Water Intake Calculator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Meals per Day</label>
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
      </form></div>}
      {waterIntake !== null && (
        <div>
          <p className="text-lg font-bold">Recommended Water Intake: {waterIntake.toFixed(2)} mL or {(waterIntake/250).toFixed(2)} cups per day</p>
          <WaterTracking currentIntake={currentIntake} suggestedIntake={waterIntake} dailyIntake={dailyIntake} />
        </div>
      )}
    </div>
  );
};

export default WaterIntakeForm;
