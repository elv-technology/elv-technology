'use client';

import type { FormEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export function ChatInput({ value, onChange, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center z-10">
      <div className="flex-1 relative">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type your message..."
          aria-label="Type your message"
          className="w-full bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-red-600/20 focus:outline-none placeholder:text-gray-400"
        />
      </div>
      <Button type="submit" disabled={!value.trim()} className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50">
        <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
      </Button>
    </form>
  );
}
