import React, { ReactNode } from "react";
import Header from "./_components/Header";

interface HowItWorksLayoutProps {
  children: ReactNode;
}

const HowItWorksLayout: React.FC<HowItWorksLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
};

export default HowItWorksLayout;
