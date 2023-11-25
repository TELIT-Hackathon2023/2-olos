"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "ai/react";
import { Grid } from "react-loader-spinner";
import { welcomeMessage } from "@/lib/strings";
import Bubble from "@/components/chat/bubble";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  // Create a reference to the scroll area
  const scrollAreaRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when the messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <main className="h-screen bg-white p-6 flex flex-col w-full">
      <div className="flex flex-col gap-8 w-full items-center flex-grow max-h-full">
        <h1 className=" text-4xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500">
          Tardis Chatbot
        </h1>
        <div className="rounded-2xl border-purple-700 border-opacity-5  border lg:w-3/4 flex-grow flex flex-col bg-[url('/images/bg.png')] bg-cover max-h-[80%] px-8 py-4 w-[80%]">
          <ScrollArea className="h-[90%] pr-2 w-full" ref={scrollAreaRef}>
            <Bubble
              message={{
                role: "assistant",
                content: welcomeMessage,
                id: "initialai",
              }}
            />
            {messages.map((message) => (
              <Bubble key={message.id} message={message} />
            ))}
          </ScrollArea>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-center w-full space-x-2 z-10"
            >
              <Input
                placeholder="Type your message"
                value={input}
                onChange={handleInputChange}
              />
              <Button disabled={isLoading}>
                {isLoading ? (
                  <div className="flex gap-2 items-center">
                    <Grid
                      height={12}
                      width={12}
                      radius={5}
                      ariaLabel="grid-loading"
                      color="#fff"
                      ms-visible={true}
                    />
                    {"Loading..."}
                  </div>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
