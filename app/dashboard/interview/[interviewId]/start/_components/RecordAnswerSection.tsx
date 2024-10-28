import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Disc2, Mic } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/Gemini";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

interface MockInterviewQuestion {
  question: string;
  answer: string;
}

interface InterviewData {
  mockId: string;
  jsonMocResp: string;
}

interface RecordAnswerSectionProps {
  mockInterviewQuestions: MockInterviewQuestion[];
  activeQuestionIndex: number;
  interviewData: InterviewData | null;
}

const RecordAnswerSection: React.FC<RecordAnswerSectionProps> = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}) => {
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();

  useEffect(() => {
    if (results.length > 0) {
      const lastResult = results[results.length - 1];
      if (typeof lastResult !== "string") {
        setUserAnswer((prevAns) => prevAns + lastResult.transcript + " ");
      }
    }
  }, [results]);

  useEffect(() => {
    if (error) {
      console.error("Speech recognition error:", error);
    }
  }, [error]);
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      recordUserAnswer();
    }
  }, [userAnswer]);

  const handleStartStop = async () => {
    setIsLoading(true);
    if (isRecording) {
      await stopSpeechToText();
      if (userAnswer?.length < 10) {
        // toast("Error saving your answer, please record again.");
        setIsLoading(false);
        return;
      }
      await recordUserAnswer(); // Call the new function to handle DB insertion
    } else {
      await startSpeechToText();
    }
    setIsLoading(false);
  };

  const recordUserAnswer = async () => {
    console.log(userAnswer);
    const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Please rate from 1 to 10 and provide feedback in JSON format with "rating" and "feedback" fields.`;

    const result = await chatSession.sendMessage(feedbackPrompt);
    let mockJsonResp = result.response.text();

    // Clean up the response to keep only JSON
    mockJsonResp = mockJsonResp
      .replace("```json", "")
      .replace("```", "")
      .trim();

    const JsonFeedbackResp = JSON.parse(mockJsonResp);
    console.log("JSON feedback response:", JsonFeedbackResp);

    if (interviewData) {
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress || "not provided",
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (resp) {
        toast("User answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
      setResults([]);
    } else {
      toast("Interview data is not available.");
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex mt-20 flex-col my-20 justify-center items-center bg-gray-800 rounded-lg p-5 relative">
        <Image
          src="/webcam.jpeg"
          alt="Webcam Preview"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        className={`transition-opacity duration-300 hover:opacity-80 ${
          isRecording
            ? "bg-white text-red-500 hover:bg-white border rounded-lg"
            : "bg-gray-100 hover:bg-primary text-primary border rounded-lg hover:text-white"
        }`}
        onClick={handleStartStop}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <Mic className="mr-2" />
            Loading...
          </span>
        ) : isRecording ? (
          <span className="flex items-center">
            <Disc2 className="mr-2" /> Recording...
          </span>
        ) : (
          <span className="flex items-center">
            <Mic className="mr-2" />
            Record Answer
          </span>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
