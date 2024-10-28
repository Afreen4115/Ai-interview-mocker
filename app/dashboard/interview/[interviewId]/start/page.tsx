"use client";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StartInterviewProps {
  params: {
    interviewId: string;
  };
}

interface InterviewData {
  mockId: string;
  jsonMocResp: string; // Assuming jsonMocResp is a JSON string
}

interface MockInterviewQuestion {
  question: string;
  answer: string; // Include answer field
}

const StartInterview: React.FC<StartInterviewProps> = ({ params }) => {
  const [interviewId, setInterviewId] = useState<string | undefined>();
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<
    MockInterviewQuestion[]
  >([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchInterviewId = async () => {
      const resolvedParams = await params;
      setInterviewId(resolvedParams.interviewId);
      await getInterviewDetails(resolvedParams.interviewId);
    };

    fetchInterviewId();
  }, [params]);

  const getInterviewDetails = async (id?: string) => {
    if (id) {
      try {
        const result = await db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.mockId, id));

        if (result.length > 0) {
          const jsonMockResp: MockInterviewQuestion[] = JSON.parse(
            result[0].jsonMocResp
          ); // Parse as an array
          // console.log("JSON mock response:", jsonMockResp);
          setMockInterviewQuestions(jsonMockResp); // Set as an array
          setInterviewData(result[0]);
          // console.log("Interview data set:", result[0]); // Log the whole interview data
        }
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    }
  };

  // Log interviewData whenever it changes
  // useEffect(() => {
  //   if (interviewData) {
  //     console.log("Current interviewData:", interviewData);
  //   }
  // }, [interviewData]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions */}
        <QuestionsSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          setActiveQuestionIndex={setActiveQuestionIndex}
        />
        {/* Video/Audio recording */}
        <RecordAnswerSection
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && (
          <Button
            className="bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestionIndex !== mockInterviewQuestions?.length - 1 && (
          <Button
            className="bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary"
            onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
          >
            Next Question
          </Button>
        )}
        {activeQuestionIndex === mockInterviewQuestions?.length - 1 && (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
            <Button className="bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary">
              End Interview
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
