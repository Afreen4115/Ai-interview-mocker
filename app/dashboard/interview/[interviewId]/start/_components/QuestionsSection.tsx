import { Lightbulb, Volume2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MockInterviewQuestion {
  question: string;
  answer: string;
}

interface QuestionsSectionProps {
  mockInterviewQuestions: MockInterviewQuestion[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const textToSpeech = (text: string, onStart: () => void, onEnd: () => void) => {
  if ("speechSynthesis" in window) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.onstart = onStart; // Call onStart when speaking starts
    speech.onend = onEnd; // Call onEnd when speaking ends
    window.speechSynthesis.speak(speech);
  } else {
    alert("Sorry, your browser doesn't support text to speech");
  }
};

const QuestionsSection: React.FC<QuestionsSectionProps> = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track if currently speaking

  const handleSpeak = () => {
    textToSpeech(
      mockInterviewQuestions[activeQuestionIndex]?.question,
      () => setIsSpeaking(true), // Set speaking state to true on start
      () => setIsSpeaking(false) // Reset speaking state to false on end
    );
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((question, index) => (
            <h1
              key={index} // Add a key prop
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
              onClick={() => setActiveQuestionIndex(index)} // Update active index on click
            >
              Question #{index + 1}
            </h1>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">
        {mockInterviewQuestions[activeQuestionIndex]?.question}
      </h2>
      <Volume2
        className={`cursor-pointer ${
          isSpeaking ? "text-red-700" : "text-black"
        }`} // Change color based on speaking state
        onClick={handleSpeak} // Use the handleSpeak function
      />
      <div className="border rounded-lg p-5 bg-blue-100 my-10">
        <h2 className="gap-2 flex items-center text-primary">
          <Lightbulb />
          <strong>Note: </strong>
        </h2>
        <h2 className="text-sm text-primary my-2">
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </h2>
      </div>
    </div>
  );
};

export default QuestionsSection;
