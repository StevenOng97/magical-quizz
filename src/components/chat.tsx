"use client";

import { cn } from "@/lib/utils";
import { ChatPanel } from "@/components/chat-panel";
import { EmptyScreen } from "@/components/empty-screen";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { useAIState, useUIState } from "ai/rsc";
import { useRouter } from "next/navigation";
import { Message } from "@/lib/chat/actions";
import { useScrollAnchor } from "@/lib/hooks/use-scroll-anchor";
import { ChatList } from "./chat-list";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

export function Chat({ id, className }: ChatProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [aiState] = useAIState();
  const [messages] = useUIState();

  const [_, setNewChatId] = useLocalStorage("quizzId", id);

  useEffect(() => {
    const messagesLength = aiState.messages?.length;
    if (messagesLength === 2) {
      router.refresh();
    }
  }, [aiState.messages, router]);

  useEffect(() => {
    setNewChatId(id);
  });

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor();

  return (
    <div
      className="flex flex-col w-full justify-between peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
      ref={scrollRef}
    >
      <div
        className={cn("overflow-y-scroll p-4 grow", className)}
        ref={messagesRef}
      >
        {messages.length ? <ChatList messages={messages} /> : <EmptyScreen />}
        <div
          className="h-px"
          ref={visibilityRef}
        />
      </div>
      <ChatPanel
        id={id}
        input={input}
        setInput={setInput}
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}
