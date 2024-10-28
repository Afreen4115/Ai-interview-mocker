"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link"; // Import Link from next/link

const Header: React.FC = () => {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]); // Add path to the dependency array

  return (
    <div className="flex p-4 items-center justify-between bg-violet-50 shadow-sm">
      <Image src="/logo.svg" width={180} height={100} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <li>
          <Link href="/dashboard">
            <span
              className={`hover:text-primary hover:font-bold text-xl transition-all cursor-pointer ${
                path === "/dashboard" ? "text-primary font-bold" : ""
              }`}
            >
              Dashboard
            </span>
          </Link>
        </li>

        <li>
          <Link href="/dashboard/how">
            <span
              className={`hover:text-primary hover:font-bold text-xl transition-all cursor-pointer ${
                path === "/dashboard/how" ? "text-primary font-bold" : ""
              }`}
            >
              How it works?
            </span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/about">
            <span
              className={`hover:text-primary hover:font-bold text-xl transition-all cursor-pointer ${
                path === "/dashboard/about" ? "text-primary font-bold" : ""
              }`}
            >
              About Us
            </span>
          </Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
