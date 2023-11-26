"use client";
import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Message } from "ai";
import { Grid } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";

export default function Bubble({
  message,
  loading = false,
  isFirst = false,
  id,
}: {
  message: Message;
  loading?: boolean;
  isFirst?: boolean;
  id: number | string;
}) {
  const rateResponse = async (rate: number) => {
    
    if(rate === -1) {
      document.getElementById('rateUp')?.remove()
    } else if(rate === 1) {
      document.getElementById('rateDown')?.remove()
    } else {
      return;
    }

    const data = {
      api_key: process.env.MENDABLE_API_KEY,
      message_id: id,
      rating_value: rate,
    };
    console.log(`Key: ${data.api_key} Id: ${data.api_key} Rate: ${data.rating_value}`);

    const req = await fetch("https://api.mendable.ai/v0/rateMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error:", error));
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
          <div className="leading-relaxed bg-white rounded-b-xl rounded-tr-xl text-black p-4 relative">
            {!isFirst && (
              <div className="flex gap-2 top-[1rem] left-10 absolute">
                <button
                  id="rateDown"
                  className="hover:scale-105"
                  onClick={() => rateResponse(-1)}
                >
                  👎
                </button>
                <button
                  className="hover:scale-105"
                  onClick={() => rateResponse(1)}
                  id="rateUp"
                >
                  👍
                </button>
              </div>
            )}
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
