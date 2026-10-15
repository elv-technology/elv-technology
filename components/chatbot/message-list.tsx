'use client';

import type { RefObject } from 'react';
import { Bot } from 'lucide-react';
import { MessageBubble } from './message-bubble';
import type { Message } from './use-chatbot';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: RefObject<HTMLDivElement>;
  onSend: (text: string) => void;
  onLeadComplete: () => void;
}

export function MessageList({ messages, isTyping, messagesEndRef, onSend, onLeadComplete }: MessageListProps) {
  return (
    <div className="flex-1 bg-[#F9FAFB] p-5 overflow-y-auto space-y-5">
      {messages.map((msg, msgIndex) => {
        const isLastBotMessage = msg.sender === 'bot' && messages.slice(msgIndex + 1).every(m => m.sender !== 'bot');
        return (
          <MessageBubble
            key={msg.id}
            msg={msg}
            isLastBotMessage={isLastBotMessage}
            onSend={onSend}
            onLeadComplete={onLeadComplete}
          />
        );
      })}
      {isTyping && (
        <div className="flex justify-start">
          <div className="flex items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center shadow-sm p-1 text-red-600">
              <Bot size={20} />
            </div>
            <div className="bg-white border border-gray-100 px-4 py-4 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.6s]"></span>
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-bounce [animation-duration:0.6s] [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
