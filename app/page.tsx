import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link from next/link

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to AI Interview Mocker
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Want to test your Interview Skills?
      </p>
      <Link href="/dashboard">
        <Button className="bg-primary text-white transition-opacity duration-300 hover:opacity-80 hover:bg-primary">
          Go to Dashboard
        </Button>
      </Link>
    </main>
  );
}
