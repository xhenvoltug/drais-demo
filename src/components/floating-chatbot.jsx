"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Knowledge base for DRAIS
const knowledgeBase = {
  drais: {
    keywords: ["drais", "what is drais", "about drais", "school management"],
    response: "DRAIS (Digital Records and Information System) is an advanced school management system designed to streamline educational administration. It handles student records, fees, attendance, assessments, timetables, and much more with AI-powered insights.",
  },
  xhenvolt: {
    keywords: ["xhenvolt", "developer", "who made", "creator"],
    response: "DRAIS is developed by Xhenvolt, a software development company specializing in educational technology solutions for schools in Uganda and East Africa.",
  },
  features: {
    keywords: ["features", "what can", "capabilities", "functions"],
    response: "DRAIS includes: Student Management, Fee Tracking, Attendance Monitoring, Academic Assessment, AI Teaching Assistant, Timetable Management, Library System, Messaging, Analytics Dashboard, and much more!",
  },
  pricing: {
    keywords: ["price", "cost", "pricing", "how much"],
    response: "DRAIS offers flexible pricing plans starting from UGX 500,000/term for small schools. Contact us for a customized quote based on your school's needs.",
  },
  demo: {
    keywords: ["demo", "trial", "test", "try"],
    response: "You're currently exploring the DRAIS demo interface! This is a fully functional UI showcase. Contact Xhenvolt for a personalized demo with your school's data.",
  },
  support: {
    keywords: ["support", "help", "contact", "assistance"],
    response: "Our support team is available 24/7. Email: support@xhenvolt.com | Phone: +256 700 000000. We also offer in-school training and onboarding.",
  },
};

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "bot",
      text: "👋 Hi! I'm the DRAIS Assistant. Ask me anything about DRAIS or Xhenvolt!",
    },
  ]);
  const [input, setInput] = useState("");

  const findResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
        return data.response;
      }
    }
    
    return "I am still learning... 🤔 Could you rephrase that, or ask about DRAIS features, Xhenvolt, pricing, or support?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", text: input };
    setMessages([...messages, userMessage]);

    const response = findResponse(input);
    
    setTimeout(() => {
      const botMessage = { id: Date.now() + 1, role: "bot", text: response };
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
              size="icon"
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </Button>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] shadow-2xl"
          >
            <Card className="h-full flex flex-col overflow-hidden border-2 border-blue-200 dark:border-blue-800">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold">DRAIS Assistant</h3>
                      <p className="text-xs text-blue-100">Always here to help</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : "bg-white dark:bg-gray-800 shadow-md"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Quick Questions */}
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {["What is DRAIS?", "Features?", "Pricing?"].map((q) => (
                    <Button
                      key={q}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(q)}
                      className="text-xs h-7"
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about DRAIS..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
