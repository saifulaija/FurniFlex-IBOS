import { useState } from "react";
import { IBlogPost } from "@/types/global.type";
import {  Notebook, Calendar, Briefcase, Home, Sun, HomeIcon } from "lucide-react"; // Import icons from 

// Sample Blog Data
const blogData: IBlogPost[] = [
  {
    id: "1",
    title: "The Ultimate Guide to Choosing the Perfect Rocking Chair",
    author: "Jane Doe",
    date: "2024-09-10",
    content:
      "Discover the best tips and tricks for selecting the ideal rocking chair for your home. Learn about different materials, styles, and features to consider to ensure maximum comfort and style.",
    icon: HomeIcon,
  },
  {
    id: "2",
    title: "Top 5 Executive Chairs for a Productive Workspace",
    author: "John Smith",
    date: "2024-09-12",
    content:
      "Explore the top executive chairs that can enhance your productivity and comfort in the office. We review features, ergonomics, and design to help you make an informed decision.",
    icon: Briefcase,
  },
  {
    id: "3",
    title: "How Presentation Chairs Can Elevate Your Meeting Experience",
    author: "Emily Johnson",
    date: "2024-09-15",
    content:
      "Find out how the right presentation chair can make a significant difference in your meetings. From style to comfort, we discuss what to look for in a presentation chair.",
    icon: Notebook,
  },
  {
    id: "4",
    title: "The Benefits of Using Task Chairs for Everyday Work",
    author: "Michael Brown",
    date: "2024-09-18",
    content:
      "Learn about the benefits of task chairs and how they can improve your posture and productivity. We cover the essential features and tips for choosing the best task chair for your needs.",
    icon: Calendar,
  },
  {
    id: "5",
    title: "Slide Chairs: Combining Style and Functionality",
    author: "Sarah Davis",
    date: "2024-09-21",
    content:
      "Slide chairs offer a unique blend of style and functionality. Read about their advantages, the best use cases, and how they can enhance both your home and office spaces.",
    icon: Home,
  },
  {
    id: "6",
    title: "Why Lounge Chairs Are Essential for Relaxation",
    author: "David Wilson",
    date: "2024-09-24",
    content:
      "Discover the importance of lounge chairs for creating a relaxing environment at home. We explore different types, materials, and designs to help you find the perfect lounge chair for unwinding.",
    icon: Sun,
  },
];

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
