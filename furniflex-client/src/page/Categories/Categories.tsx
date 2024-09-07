import React from "react";

import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TCategory } from "@/types/global.type";

interface CategoriesProps {
  categories: TCategory[];
}

const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  return (
    <Card className="max-w-7xl mx-auto p-6 md:p-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Explore Our Categories
      </h2>
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .filter((category) => category.show !== false) // Only show categories where 'show' is true or undefined
          .map((category, index) => (
            <Link to={category.path} key={index}>
              <div className="p-4 border rounded-md hover:shadow-lg transition-shadow duration-200">
                <h3 className="text-lg font-medium mb-2">{category.title}</h3>
                <p className="text-sm text-gray-500">
                  Discover more about our {category.title.toLowerCase()}s.
                </p>
              </div>
            </Link>
          ))}
      </div>
    </Card>
  );
};

export default Categories;
