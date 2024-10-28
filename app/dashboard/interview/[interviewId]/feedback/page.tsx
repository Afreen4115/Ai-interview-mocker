"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface FeedbackProps {
  params: Promise<{
    interviewId: string;
  }>;
}

interface FeedbackItem {
  id: number;
  mockIdRef: string;
  question: string;
  correctAns: string | null;
  userAns: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
  createdAt: string | null;
}

const Feedback: React.FC<FeedbackProps> = ({ params }) => {
  const { interviewId } = React.use(params);
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, [interviewId]);

  const GetFeedback = async (): Promise<void> => {
    try {
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);

      setFeedbackList(result);

      // Calculate average rating
      const ratings = result
        .map((item) => parseFloat(item.rating ?? "0"))
        .filter((rating) => !isNaN(rating));
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null;

      setAverageRating(avgRating);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="font-bold text-2xl text-gray-600">
        Here is your Interview Feedback
      </h2>
      <h2 className="text-primary text-lg my-10">
        Your overall interview rating:{" "}
        <strong>
          {averageRating ? `${averageRating.toFixed(1)}/10` : "N/A"}
        </strong>
      </h2>

      <h2 className="text-sm text-gray-500">
        Find below interview question with correct answer, Your answer and
        feedback for improvement
      </h2>
      {feedbackList.map((item, index) => (
        <Collapsible key={index} className="mt-7">
          <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full">
            {item.question} <ChevronsUpDown className="h-5 w-5" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="flex flex-col gap-2">
              <h2 className="p-2 text-red-400 border rounded-lg">
                <strong>Rating:</strong> {item.rating}
              </h2>
              <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                <strong>User Answer: </strong> {item.userAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                <strong>Correct Answer: </strong> {item.correctAns}
              </h2>
              <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-blue-900">
                <strong>Feedback: </strong> {item.feedback}
              </h2>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button
        onClick={() => router.replace("/dashboard")}
        className="mt-10 bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary"
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
