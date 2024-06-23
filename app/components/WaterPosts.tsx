import { FaComment, FaShare, FaThumbsUp } from 'react-icons/fa';

import React from 'react';

interface Post {
  name: string;
  time: string;
  amountDrank: string;
  videoUrl: string;
}

const posts: Post[] = [
  {
    name: 'Alice',
    time: '2 hours ago',
    amountDrank: '500ml',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    name: 'Bob',
    time: '4 hours ago',
    amountDrank: '750ml',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  {
    name: 'Alice',
    time: '2 hours ago',
    amountDrank: '500ml',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    name: 'Bob',
    time: '4 hours ago',
    amountDrank: '750ml',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4',
  },
  // Add more posts as needed
];

const WaterPosts: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md" style={{ maxHeight: '90vh' , overflowY:"scroll"}}>
      <h2 className="text-xl font-bold mb-4">Water Drinking Posts</h2>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-2">
              <div className="flex-shrink-0">
                <img
                  src={`https://via.placeholder.com/50?text=${post.name.charAt(0)}`}
                  alt={post.name}
                  className="w-12 h-12 rounded-full"
                />
              </div>
              <div>
                <p className="font-bold">{post.name}</p>
                <p className="text-sm text-gray-600">{post.time}</p>
                <p className="text-sm text-gray-600">Drank: {post.amountDrank}</p>
              </div>
            </div>
            <video className="w-full rounded-lg" controls>
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
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
