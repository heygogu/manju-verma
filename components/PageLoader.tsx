import React from "react";

const PageLoader = () => {
  return (
    <div className="animate-in fade-in-50 duration-500">
      <div className="w-full h-[calc(100vh-20vh)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-primary border-r-2 "></div>
      </div>
    </div>
  );
};

export default PageLoader;