'use client';

import { useState, useRef, useEffect } from 'react';
import { X, User, Send, Bot, Phone, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence, motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const CustomBotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Base shape (Head, Ears, Antenna, Tail) */}
    <path fill="currentColor" d="
      M 6 38 h 9 v 24 h -9 z
      M 85 38 h 9 v 24 h -9 z
      M 46 16 h 8 v 9 h -8 z
      M 50 5 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 25 25
      H 75
      A 10 10 0 0 1 85 35
      V 65
      A 10 10 0 0 1 75 75
      H 55
      L 35 92
      V 75
      H 25
      A 10 10 0 0 1 15 65
      V 35
      A 10 10 0 0 1 25 25
      Z
    " />
    {/* Eyes and Mouth (White) */}
    <path fill="white" d="
      M 35 39 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 65 39 a 6 6 0 1 0 0 12 a 6 6 0 1 0 0 -12 z
      M 33 58
      H 67
      A 17 17 0 0 1 33 58
      Z
    " />
  </svg>
);
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isMarkdown?: boolean;
  captureLead?: boolean;
  suggestions?: string[];
}

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

function LeadForm({ onComplete }: { onComplete: () => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'New Lead from Chatbot',
          message: formData.message,
          source: 'chatbot',
          isNotRobot: true
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(onComplete, 3000);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-100 p-5 rounded-2xl text-green-900 text-sm animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <span className="font-bold">Sent Successfully!</span>
        </div>
        <p className="opacity-90 leading-relaxed font-medium">Our team will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm space-y-3 mt-2 animate-in slide-in-from-top-2">
      {error && (
        <div className="bg-red-50 border border-red-100 p-2 rounded-lg text-red-600 text-[10px] font-bold text-center">
          {error}
        </div>
      )}
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Name</label>
        <input
          required
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
        <input
          required
          type="email"
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Phone Number</label>
        <input
          required
          type="tel"
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Message</label>
        <textarea
          required
          rows={2}
          className="w-full text-sm border-b border-gray-100 py-1 focus:border-red-500 outline-none transition-colors resize-none"
          value={formData.message}
          onChange={e => setFormData({ ...formData, message: e.target.value })}
          placeholder="How can we help you?"
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white text-xs h-9 rounded-lg shadow-sm"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export default function Chatbot() {
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
        id: uuidv4(),
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

  const playNotificationSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
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
    } catch (e) {
      console.log('Audio playback blocked by browser policy');
    }
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      <div className="fixed bottom-6 right-4 sm:right-6 z-[200] flex flex-row items-center pointer-events-none">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto mr-4 select-none bg-white text-gray-800 text-sm px-5 py-3 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 relative hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <p className="font-medium whitespace-nowrap">AI ETS Assistant</p>
              </div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rotate-45 border-t border-r border-gray-100"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="pointer-events-auto group relative flex items-center justify-center transition-all text-red-600 hover:text-red-700 drop-shadow-[0_10px_20px_rgba(220,38,38,0.4)]"
          aria-label="Open AI ETS Assistant Chatbot"
        >
          {isOpen ? (
            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-red-600 shadow-lg border border-red-500">
              <X className="w-8 h-8 text-white" />
            </div>
          ) : (
            <CustomBotIcon className="w-[68px] h-[68px] transition-transform group-hover:scale-105 group-hover:-rotate-6" />
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 sm:w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl flex flex-col overflow-hidden border border-gray-100 z-[200]"
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-5 text-white shadow-md relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden p-2 text-red-600">
                    <Bot size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg leading-tight">AI ETS Assistant</h3>
                    <div className="flex items-center gap-1.5 opacity-90 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                      <span className="text-xs font-medium">Online & Ready</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-[#F9FAFB] p-5 overflow-y-auto space-y-5">
              {messages.map((msg, msgIndex) => {
                const isLastBotMessage = msg.sender === 'bot' && messages.slice(msgIndex + 1).every(m => m.sender !== 'bot');
                return (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden shadow-sm ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-white border border-gray-100 p-1 text-red-600'}`}>
                        {msg.sender === 'user' ? <User size={14} className="text-gray-500" /> : <Bot size={20} />}
                      </div>
                      <div className={`px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.sender === 'user' ? 'bg-red-600 text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'}`}>
                        <div className="whitespace-pre-wrap">{msg.sender === 'user' ? msg.text : formatBotMessage(msg.text)}</div>
                        {msg.captureLead && (
                          <div className="space-y-4">
                            <LeadForm onComplete={() => addMessage("Our team will contact you shortly. Thank you! \n\nYou can also reach us directly at **+971 2 441 8186** or **info@etssmart.com**.", 'bot')} />
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
                                onClick={() => sendMessage("Can I get a call back?")}
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
                                    onClick={() => sendMessage(suggestion)}
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

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center z-10">
              <div className="flex-1 relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-[14px] text-gray-900 focus:ring-2 focus:ring-red-600/20 focus:outline-none placeholder:text-gray-400"
                />
              </div>
              <Button type="submit" disabled={!inputValue.trim()} className="h-12 w-12 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition-all active:scale-95 disabled:opacity-50">
                <Send size={18} className="translate-x-[1px] translate-y-[1px]" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
