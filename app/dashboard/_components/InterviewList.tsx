"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq, desc } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

// Define the interface for the interview object
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

const InterviewList = () => {
  const { user } = useUser();
  // Specify the type of the state
  const [interviewList, setInterviewList] = useState<Interview[]>([]);

  const getInterviewList = async () => {
    const emailAddress = user?.primaryEmailAddress?.emailAddress;

    if (emailAddress) {
      const result = await db
        .select()
        .from(mockInterview)
        .where(eq(mockInterview.createdBy, emailAddress))
        .orderBy(desc(mockInterview.id));

      setInterviewList(result as Interview[]); // Ensure the result is typed correctly
    }
  };

  useEffect(() => {
    if (user) {
      getInterviewList();
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
      {/* Render the interview list */}
      {interviewList.map((interview, index) => (
        <InterviewItemCard key={index} interview={interview} />
      ))}
    </div>
  );
};

export default InterviewList;
