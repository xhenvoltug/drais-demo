"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { MessageCircle, Send, Inbox, Users, Mail } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const conversations = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
    role: ["Parent", "Teacher", "Student", "Admin"][i % 4],
    lastMessage: "Thank you for the update on my child's progress...",
    time: `${Math.floor(Math.random() * 24)}h ago`,
    unread: i % 3 === 0 ? Math.floor(Math.random() * 5) + 1 : 0,
    avatar: ["JO", "SN", "JM", "MN"][i % 4],
  }));

  const messages = [
    { id: 1, sender: "James Okello", text: "Hello, I would like to discuss my child's performance", time: "10:30 AM", isMine: false },
    { id: 2, sender: "You", text: "Of course! When would be a good time for you?", time: "10:32 AM", isMine: true },
    { id: 3, sender: "James Okello", text: "Tomorrow afternoon would work well for me", time: "10:35 AM", isMine: false },
    { id: 4, sender: "You", text: "Perfect! I'll schedule a meeting for 2 PM tomorrow", time: "10:37 AM", isMine: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Messaging
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Communicate with students, parents, and staff • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
                  <p className="text-3xl font-bold mt-2">1,247</p>
                </div>
                <MessageCircle className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                  <p className="text-3xl font-bold mt-2">23</p>
                </div>
                <Inbox className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Chats</p>
                  <p className="text-3xl font-bold mt-2">45</p>
                </div>
                <Users className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50 cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Compose</p>
                      <p className="text-lg font-bold mt-2">New Message</p>
                    </div>
                    <Send className="w-10 h-10 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Compose Message</DialogTitle>
                <DialogDescription>Send a new message to students, parents, or staff</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Recipient Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="class">Entire Class</SelectItem>
                      <SelectItem value="parents">All Parents</SelectItem>
                      <SelectItem value="staff">Staff Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Input placeholder="Message subject" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md"
                    placeholder="Type your message..."
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Messaging Interface */}
        <Card className="h-[600px]">
          <CardContent className="p-0 h-full">
            <div className="grid grid-cols-3 h-full">
              {/* Conversations List */}
              <div className="col-span-1 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold">Conversations</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {conversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 cursor-pointer ${selectedConversation?.id === conv.id ? "bg-blue-50 dark:bg-blue-950/30" : ""}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {conv.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-sm truncate">{conv.name}</h4>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{conv.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{conv.lastMessage}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{conv.role}</Badge>
                            {conv.unread > 0 && (
                              <Badge variant="default" className="text-xs">{conv.unread} new</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="col-span-2 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {selectedConversation.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedConversation.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{selectedConversation.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.isMine ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[70%] px-4 py-2 rounded-lg ${
                              message.isMine
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.isMine ? "text-blue-100" : "text-gray-600 dark:text-gray-400"}`}>
                              {message.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex gap-2">
                        <Input placeholder="Type a message..." className="flex-1" />
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600 dark:text-gray-400">
                    <div className="text-center">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
