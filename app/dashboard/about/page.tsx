"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-4">About Us</h1>
      <Image
        src="/about.jpg" // Replace with your image path
        alt="AI Interview Mocker"
        width={600}
        height={400}
        className="rounded-lg shadow-md mb-4"
      />
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-4">
        Welcome to our AI Interview Mocker platform! We are dedicated to helping
        job seekers prepare for their interviews with realistic mock interview
        sessions powered by advanced AI technology. Our platform allows users to
        practice their interview skills in a stress-free environment, receive
        valuable feedback, and enhance their confidence before facing real-life
        interviews.
      </p>
      <p className="text-lg text-gray-700 max-w-2xl text-center mb-4">
        Our AI-driven mock interviews simulate various interview scenarios,
        providing questions tailored to your field and expertise. After each
        session, users can access detailed feedback, helping them identify areas
        for improvement and prepare effectively.
      </p>
      <Link href="/dashboard">
        <button className="bg-primary text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Go to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default AboutUs;
