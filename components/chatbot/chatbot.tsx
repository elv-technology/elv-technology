'use client';

import { X, Bot } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CustomBotIcon } from './bot-icon';
import { ChatInput } from './chat-input';
import { MessageList } from './message-list';
import { useChatbot } from './use-chatbot';

export default function Chatbot() {
  const {
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
  } = useChatbot();

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
          aria-label={isOpen ? "Close AI ETS Assistant Chatbot" : "Open AI ETS Assistant Chatbot"}
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
                <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat" className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>

            <MessageList
              messages={messages}
              isTyping={isTyping}
              messagesEndRef={messagesEndRef}
              onSend={sendMessage}
              onLeadComplete={onLeadComplete}
            />

            <ChatInput value={inputValue} onChange={setInputValue} onSubmit={handleSendMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
