"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "../../../utils/Gemini";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment"; // Ensure moment is imported
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [jsonResponse, setJsonResponse] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. Please give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT} interview questions and answers in JSON format. Give question and answer as fields in JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      const parsedResponse = JSON.parse(MockJsonResp);
      setJsonResponse(MockJsonResp);

      // Insert into the database
      const resp = await db
        .insert(mockInterview)
        .values({
          mockId: uuidv4(),
          jsonMocResp: MockJsonResp,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          jobPosition: jobPosition,
          createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: mockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0]?.mockId}`);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
      setJobPosition("");
      setJobDesc("");
      setJobExperience("");
    }
  };

  return (
    <>
      <div
        className="mt-10 p-10 border rounded-lg bg-secondary hover:scale-105 hover:bg-primary hover:text-white hover:opacity-80 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center flex items-center justify-center gap-2">
          <CirclePlus /> Add New
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing.
            </DialogTitle>
          </DialogHeader>
          <div>
            <h2 className="text-gray-500">
              Add Details about your job position/role, Job description, and
              years of experience.
            </h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-7 my-2">
              <label htmlFor="jobPosition">Job Role/Job Position</label>
              <Input
                id="jobPosition"
                placeholder="Ex. Full Stack Developer"
                required
                onChange={(e) => setJobPosition(e.target.value)}
                value={jobPosition} // Controlled input
              />
            </div>
            <div className="my-3">
              <label htmlFor="jobDesc">
                Job Description/Tech Stack (In Short)
              </label>
              <Textarea
                id="jobDesc"
                placeholder="Ex. React, Angular, NodeJs, MySQL, etc."
                required
                onChange={(e) => setJobDesc(e.target.value)}
                value={jobDesc} // Controlled input
              />
            </div>
            <div className="my-3">
              <label htmlFor="jobExperience">Years of Experience</label>
              <Input
                id="jobExperience"
                placeholder="Ex. 5"
                type="number"
                max="40"
                required
                onChange={(e) => setJobExperience(e.target.value)}
                value={jobExperience} // Controlled input
              />
            </div>
            <div className="flex gap-5 justify-end mt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Generating From AI
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewInterview;
