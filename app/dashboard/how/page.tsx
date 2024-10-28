import React from "react";
import Link from "next/link";

const HowItWorks: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center text-primary mb-4">
        How It Works?
      </h1>
      <div className="text-lg text-gray-700 mb-6">
        <p className="mb-4">
          Welcome to our AI Mock Interview Platform! Follow the simple steps
          below to get started with your interview preparation.
        </p>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <strong>Go to Dashboard:</strong> Click on the dashboard to begin
            the interview setup.
          </li>
          <li>
            <strong>Fill in the Details:</strong> Provide the necessary
            information about your job.
          </li>
          <li>
            <strong>Start the Interview:</strong> Begin the interview session
            and feel free to turn your camera on or off.
          </li>
          <li>
            <strong>Answer the Questions:</strong> Respond to the interview
            questions presented to you.
          </li>
          <li>
            <strong>Feedback:</strong> After completing the interview, you can
            find your feedback on the feedback page.
          </li>
        </ol>
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/dashboard" passHref>
          <button className="bg-primary text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            Go to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
