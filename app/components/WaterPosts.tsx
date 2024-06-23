import { FaComment, FaShare, FaThumbsUp } from "react-icons/fa";

import React from "react";
import { useUser } from "../context/UserContext";

interface Post {
  name: string;
  time: string;
  amountDrank: string;
  videoUrl: string;
}

const posts: Post[] = [
  {
    name: "Ibrakhim",
    time: "2 hours ago",
    amountDrank: "330ml",
    videoUrl:
      "https://cdn.discordapp.com/attachments/1112251049160491100/1254297479474577408/IMG_3091.mov?ex=6678fb0e&is=6677a98e&hm=18603da6080af9a40fb5413a9a00b4255f125c194e3a465e039386bffe7f932f&",
  },
  {
    name: "Xavier",
    time: "4 hours ago",
    amountDrank: "388ml",
    videoUrl:
      "https://cdn.discordapp.com/attachments/1112251049160491100/1254297479034441729/IMG_3093.mov?ex=6678fb0e&is=6677a98e&hm=d62e5a7b4d946e6b7314e55b03a95a74afcd592c91be94c7ba9258fa11edd448&",
  },
  {
    name: "Rian",
    time: "2 hours ago",
    amountDrank: "500ml",
    videoUrl:
      "https://cdn.discordapp.com/attachments/1112251049160491100/1254297479873167400/IMG_3090.mov?ex=6678fb0e&is=6677a98e&hm=83e5af0f72a992390e788c6da5c3aabeb519aba9cc28c4ee3a6f56a93f8c040f&",
  },
  {
    name: "William",
    time: "4 hours ago",
    amountDrank: "750ml",
    videoUrl:
      "https://cdn.discordapp.com/attachments/1112251049160491100/1254297480393392210/IMG_3089.mov?ex=6678fb0f&is=6677a98f&hm=a1d1999700ee38d34f48d7596018100f2805411219aab6ca4f1056b66b54a6d7&",
  },
  // Add more posts as needed
];

const WaterPosts: React.FC = () => {
  const { user, setUser } = useUser();

  return (
    <div
      className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md"
      style={{ maxHeight: "77vh", overflowY: "scroll" }}
    >
      <h2 className="text-xl font-bold mb-4">Water Drinking Posts</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-shrink-0">
                <img
                  src={`https://via.placeholder.com/50?text=${post.name.charAt(
                    0
                  )}`}
                  alt={post.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <p className="font-bold">{post.name}</p>
                <p className="text-sm text-gray-600">{post.time}</p>
                <p className="text-sm text-gray-600">
                  Drank: {post.amountDrank}
                </p>
              </div>
            </div>
            {user.currentIntake === 0 ? (
              <>
                <p>Drink your water to view!</p>
                <img src="https://t3.ftcdn.net/jpg/00/64/77/16/360_F_64771693_ncondhOJwNdvLjBfeIwswLqhsavUSSY5.jpg"></img>
              </>
            ) : (
              <video className="w-full rounded-lg" controls>
                <source src={post.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div className="flex justify-around mt-2">
              <button className="flex items-center space-x-2 text-blue-600">
                <FaThumbsUp />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600">
                <FaComment />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 text-blue-600">
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaterPosts;
