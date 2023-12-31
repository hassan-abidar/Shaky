"use client";
import React from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, User } from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./free-counter";

const montserrat = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation", // Change this to the correct href for Conversation.
    color: "text-pink-500",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image", // Change this to the correct href for Image Generation.
    color: "text-green-500",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video", // Change this to the correct href for Video Generation.
    color: "text-orange-500",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music", // Change this to the correct href for Music Generation.
    color: "text-emerald-500",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    href: "/code", // Change this to the correct href for Conversation.
    color: "text-blue-500",
  },
  {
    label: "Chat with the developer",
    icon: User,
    href: "/chat-with-dev", // Change this to the correct href for Settings.
    color: "text-yellow-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings", // Change this to the correct href for Settings.
    color: "text-white-500",
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14 ">
          <div className="relative w-8 h-8 mr-4">
            <Image fill alt="Logo" src="/logo_f.png" />
          </div>
          <h1 className={cn("text-2xl font-bold ", montserrat.className)}>
            Shaky 
          </h1>
          {isPro && (
            <Badge variant="premium" className="uppercase text-sm py-1 ">
              pro
            </Badge>
          )}
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathname===route.href ? "text-white bg-white/10" : "text-zinc")}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
