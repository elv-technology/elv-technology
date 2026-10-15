'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isMarkdown?: boolean;
  captureLead?: boolean;
  suggestions?: string[];
}

const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.5);
  } catch {
    // Audio playback blocked by browser policy
  }
};

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [lastSentTime, setLastSentTime] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const addMessage = (text: string, sender: 'user' | 'bot', captureLead = false, suggestions?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        sender,
        timestamp: new Date(),
        captureLead,
        suggestions
      },
    ]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show tooltip shortly after page load, but do not auto-open the chat
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          playNotificationSound();
          addMessage(
            "Hi! 👋 I'm the AI ETS Assistant. I can help you with Security, AV, Networking, and Smart Home solutions in the UAE. \n\nWhat can I assist you with today?",
            'bot',
            false,
            ["Security & Surveillance", "Audio Visual Solutions", "Home Automation", "Network & Communications"]
          );
        }, 1500);
      }, 500);
    }
    // Greet only when the panel opens, not whenever messages change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    const now = Date.now();
    if (now - lastSentTime < 2000) return; // Throttle 2 seconds
    setLastSentTime(now);

    addMessage(userMessage, 'user');
    setInputValue('');
    setIsTyping(true);

    try {
      const history = messages.slice(-5).map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const response = await fetch('/api/public/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history }),
      });

      const data = await response.json();

      setIsTyping(false);
      playNotificationSound();
      addMessage(data.text, 'bot', data.captureLead, data.suggestions);

    } catch (error) {
      setIsTyping(false);
      addMessage("I apologize, but I encountered an error. Please contact us at +971 54 792 2800 for immediate assistance.", 'bot');
    }
  };

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const onLeadComplete = () => addMessage("Our team will contact you shortly. Thank you! \n\nYou can also reach us directly at **+971 2 441 8186** or **info@etssmart.com**.", 'bot');

  return {
    isOpen,
    setIsOpen,
    messages,
    inputValue,
    setInputValue,
    isTyping,
    showTooltip,
    setShowTooltip,
    messagesEndRef,
    sendMessage,
    handleSendMessage,
    onLeadComplete,
  };
}
