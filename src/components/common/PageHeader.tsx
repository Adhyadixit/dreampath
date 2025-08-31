
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-dreampath-primary to-dreampath-dark pt-24 pb-16 md:py-20 text-white">
      <div className="container-wide px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{title}</h1>
        {description && (
          <p className="text-base sm:text-lg md:text-xl text-dreampath-light max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
