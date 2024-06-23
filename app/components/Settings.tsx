import React, { useState } from "react";

const Settings: React.FC = () => {
  const [name, setName] = useState("William Wang");
  const [email, setEmail] = useState("w559wang@uwaterloo.ca");
  const [notifications, setNotifications] = useState(true);
  const [bio, setBio] = useState("I like to drink water");

  const handleSave = () => {
    // Here you can add the logic to save the settings
    alert("Settings saved");
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
        <label className="block text-sm font-medium text-gray-700">
          Notifications
        </label>
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
        <label className="block text-sm font-medium text-gray-700">
          Other Setting
        </label>
        <input
          type="text"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
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
