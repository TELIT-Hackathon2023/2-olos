"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex items-center">
        <div className="text-2xl font-bold text-ellipsis text-transparent bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500">
          Tardis Chatbot
        </div>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/chat" : "/sign-in"}>
          <Button className="rounded-full bg-gradient-to-r from-violet-800 to-fuchsia-500">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
