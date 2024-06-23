"use client"

import React, { useEffect, useState } from 'react';

import { useUser } from '../context/UserContext';

const Settings: React.FC = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [notifications, setNotifications] = useState(user.notifications);
  const [currentIntake, setCurrentIntake] = useState(user.currentIntake);
  const [suggestedIntake, setSuggestedIntake] = useState(user.suggestedIntake);
  const [dailyIntake, setDailyIntake] = useState(user.dailyIntake.join(','));

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setNotifications(user.notifications);
    setCurrentIntake(user.currentIntake);
    setSuggestedIntake(user.suggestedIntake);
    setDailyIntake(user.dailyIntake.join(','));
  }, [user]);

  const handleSave = () => {
    const dailyIntakeArray = dailyIntake.split(',').map(Number);
    setUser({ ...user, name, email, notifications, currentIntake, suggestedIntake, dailyIntake: dailyIntakeArray });
    alert('Settings saved');
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold mb-4">Settings</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Notifications</label>
        <div className="mt-1">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="form-checkbox"
            />
            <span className="ml-2">Enable Notifications</span>
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Current Water Intake (mL)</label>
        <input
          type="number"
          value={currentIntake}
          onChange={(e) => setCurrentIntake(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Suggested Water Intake (mL)</label>
        <input
          type="number"
          value={suggestedIntake}
          onChange={(e) => setSuggestedIntake(Number(e.target.value))}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Daily Water Intake (mL, comma separated)</label>
        <input
          type="text"
          value={dailyIntake}
          onChange={(e) => setDailyIntake(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        onClick={handleSave}
        className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md"
      >
        Save
      </button>
    </div>
  );
};

export default Settings;
