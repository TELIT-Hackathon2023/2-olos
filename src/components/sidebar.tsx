"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import {
  User2Icon,
  Settings
  } from "lucide-react";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Administration",
    icon: User2Icon,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/" className="flex items-center pl-3 mb-14">
          <h1
            className={cn(
              "text-2xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500",
              montserrat.className
            )}
          >
            Tardis Chatbot
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
