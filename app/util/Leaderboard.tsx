import React from "react";

interface User {
  waterIntake: number;
  rank: number;
  name: string;
  metric: number;
  profilePic: string;
}

interface LeaderboardProps {
  title: string;
  users: User[];
  type: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ title, users, type }) => {
  const sortFunction = (a: User, b: User) => {
    return type === 0 ? b.waterIntake - a.waterIntake : b.metric - a.metric;
  };

  const sortedUsersDescending = users.sort(sortFunction);

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
          {sortedUsersDescending.map((user, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">
                {type === 0 ? user.waterIntake : user.metric}{" "}
                {type === 0 ? " mL" : " days"}
              </td>
              <td className="px-4 py-2">
                <img
                  src={user.profilePic}
                  alt={`${user.name}'s profile`}
                  className="w-10 h-10 rounded-full"
                  style={{ objectFit: "cover" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
