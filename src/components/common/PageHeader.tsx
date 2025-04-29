
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-dreampath-primary to-dreampath-dark py-16 md:py-20 text-white">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-gray-100">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
