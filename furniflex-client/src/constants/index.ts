
import { IBlogPost, TCategory } from "@/types/global.type";
import { BarChart, Briefcase, Calendar, HomeIcon, Notebook, Sun } from "lucide-react";

export const App_Name='FurniFlex'
  export const categories: TCategory[] = [
    {
      title: "Rocking Chair",
      path: "/product/category/Rocking-Chair",
      show: true,
    },
    {
      title: "Executive Chair",
      path: "/product/category/Executive-Chair",
      show: true,
    },
    {
      title: "Presentation Chair",
      path: "/product/category/Presentation-Chair",
      show: true,
    },
    {
      title: "Task Chair",
      path: "/product/category/Task-Chair",
      show: true,
    },
    {
      title: "Slide Chair",
      path: "/product/category/Slide-Chair",
      show: true,
    },
    {
      title: "Lounge Chair",
      path: "/product/category/Lounge-Chair",
      show: true,
    },
  ];


  export const blogData: IBlogPost[] = [
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
      icon: BarChart,
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