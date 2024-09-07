import { useState } from "react";
import { blogData } from "@/constants";

const Blog = () => {
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Our Latest Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogData.map((post) => {
          const Icon = post.icon;
          const isExpanded = expandedPostId === post.id;

          return (
            <div
              key={post.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-start"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 mb-4">
                <Icon size={24} className="text-gray-600" />
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-2">
                  By {post.author} on {post.date}
                </p>
                <p className="text-gray-700 mb-4">
                  {isExpanded
                    ? post.content
                    : `${post.content.substring(0, 100)}...`}
                </p>
                <button
                  onClick={() => toggleExpand(post.id)}
                  className="text-blue-500 hover:underline"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
