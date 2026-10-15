'use client';

import { User, Bot, Phone, MessageSquare } from 'lucide-react';
import { LeadForm } from './lead-form';
import type { Message } from './use-chatbot';

const formatBotMessage = (text: string) => {
  if (!text) return '';
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-red-600">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

interface MessageBubbleProps {
  msg: Message;
  isLastBotMessage: boolean;
  onSend: (text: string) => void;
  onLeadComplete: () => void;
}

export function MessageBubble({ msg, isLastBotMessage, onSend, onLeadComplete }: MessageBubbleProps) {
  return (
    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
      <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-white border border-gray-100 p-1 text-red-600'}`}>
          {msg.sender === 'user' ? <User size={14} className="text-gray-500" /> : <Bot size={20} />}
        </div>
        <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
          <div className="whitespace-pre-wrap">{msg.sender === 'user' ? msg.text : formatBotMessage(msg.text)}</div>
          {msg.captureLead && (
            <div className="space-y-4">
              <LeadForm onComplete={onLeadComplete} />
            </div>
          )}

          {/* Contextual Suggestions + WhatsApp - only on last bot message, hidden while call-back form is showing */}
          {isLastBotMessage && !msg.captureLead && (
            <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-gray-50">
              {/* Live Chat WhatsApp Link */}
              <div className="flex gap-2 w-full">
                <a
                  href="https://wa.me/971547922800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <MessageSquare size={14} />
                  Live chat
                </a>
                <button
                  onClick={() => onSend("Can I get a call back?")}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <Phone size={14} />
                  Get a call back
                </button>
              </div>

              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {msg.suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => onSend(suggestion)}
                      className="px-3 py-1.5 bg-gray-50 border border-gray-100 hover:border-red-200 hover:text-red-600 text-gray-600 rounded-full text-[11px] font-medium transition-all active:scale-95 shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
