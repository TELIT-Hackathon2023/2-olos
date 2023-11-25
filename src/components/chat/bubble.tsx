"use client";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message } from "ai";
import { Grid } from "react-loader-spinner";
import ReactMarkdown from 'react-markdown';

export default function Bubble({
  message,
  loading = false,
}: {
  message: Message;
  loading?: boolean;
}) {

  interface CustomRendererProps {
    level?: number;
    href?: string;
    children?: ReactNode;
  }
  
  const renderers = {
    heading: ({ level, children }: CustomRendererProps) => {
      // Custom heading rendering
      return React.createElement(`h${level}`, { className: `custom-heading-${level}` }, children);
    },
    link: ({ href, children }: CustomRendererProps) => {
      // Custom link rendering
      return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
    },
    listItem: ({ children }: CustomRendererProps) => {
      // Custom list item rendering
      return <li style={{ listStyleType: 'circle' }}>{children}</li>;
    },
  };

  return (
    <div
      key={message.id}
      className={`flex gap-3 my-4 text-gray-600 text-sm flex-1 ${
        message.role === "user" ? " justify-end text-right" : ""
      }`}
    >
      {message.role === "user" ? (
        <div className="flex justify-end">
          <p className="leading-relaxed">
            <span className="block font-bold text-gray-700">You</span>
            {!loading && message.content}
            {loading && (
              <Grid
                height={12}
                width={12}
                radius={5}
                ariaLabel="grid-loading"
                color="#1a1a1a"
                ms-visible={true}
              />
            )}
          </p>
        </div>
      ) : (
        <div className="flex gap-2">
          <img
            src="images/assistant-avatar.png"
            className="h-12 w-12 rounded-full bg-pink-500"
          />
          <div className="leading-relaxed bg-white rounded-b-xl rounded-tr-xl text-black p-4 ">
            <span className="block font-bold text-gray-700">AI</span>
            {!loading && <ReactMarkdown>{message.content}</ReactMarkdown>}
            {loading && (
              <Grid
                height={12}
                width={12}
                radius={5}
                ariaLabel="grid-loading"
                color="#1a1a1a"
                ms-visible={true}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
