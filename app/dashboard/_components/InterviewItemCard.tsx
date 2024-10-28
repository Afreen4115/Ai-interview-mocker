// app/_components/InterviewItemCard.tsx
"use client"; // Ensure this is a client component
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for the App Router
import React from "react";

// Define the type for the interview prop
interface Interview {
  id: number;
  jsonMocResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string | null;
  mockId: string;
}

interface InterviewItemCardProps {
  interview: Interview;
}

const InterviewItemCard: React.FC<InterviewItemCardProps> = ({ interview }) => {
  const router = useRouter(); // Initialize useRouter

  const handleFeedback = () => {
    router.push(`/dashboard/interview/${interview.mockId}/feedback`);
  };

  const handleStart = () => {
    router.push(`/dashboard/interview/${interview.mockId}`);
  };

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview.jobPosition}</h2>
      <h2 className="text-sm text-gray-700">
        {interview.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-500">
        Created At: {interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Button
          className="w-full"
          size="sm"
          variant="outline"
          onClick={handleFeedback}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary"
          onClick={handleStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
