import React from 'react';

interface User {
  rank: number;
  name: string;
  metric: string;
  profilePic: string;
}

interface LeaderboardProps {
  title: string;
  users: User[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, users }) => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="px-4 py-2">Rank</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Metric</th>
            <th className="px-4 py-2">Profile Pic</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.rank} className="border-t">
              <td className="px-4 py-2">{user.rank}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.metric}</td>
              <td className="px-4 py-2">
                <img src={user.profilePic} alt={`${user.name}'s profile`} className="w-8 h-8 rounded-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
