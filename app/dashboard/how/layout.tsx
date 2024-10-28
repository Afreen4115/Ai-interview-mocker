// /app/how/layout.tsx
import React from "react";

const HowLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto p-4">
      <main>
        {children} {/* This is where the page content will be rendered */}
      </main>
    </div>
  );
};

export default HowLayout;
