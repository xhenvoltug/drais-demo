"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Mail, Search, Inbox as InboxIcon, Send, Trash2, Star, Clock } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import Link from "next/link";

export default function MessagingInboxPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const messages = [
    {
      id: 1,
      sender: "Principal Office",
      subject: "End of Term Arrangements",
      preview: "Dear staff, please note the following arrangements for end of term...",
      date: "2024-12-04 09:30",
      status: "unread",
      priority: "high",
      hasAttachment: true
    },
    {
      id: 2,
      sender: "John Okello (Parent)",
      subject: "Student Progress Inquiry",
      preview: "Good morning, I would like to inquire about my daughter's progress in...",
      date: "2024-12-03 14:20",
      status: "read",
      priority: "normal",
      hasAttachment: false
    },
    {
      id: 3,
      sender: "Finance Department",
      subject: "Fee Payment Reminder",
      preview: "This is a reminder that the following students have pending fees...",
      date: "2024-12-03 11:15",
      status: "unread",
      priority: "normal",
      hasAttachment: true
    },
    {
      id: 4,
      sender: "Mary Achieng (Teacher)",
      subject: "Science Lab Request",
      preview: "Hi, I need to book the science lab for S4A practical session next...",
      date: "2024-12-02 16:45",
      status: "read",
      priority: "low",
      hasAttachment: false
    },
    {
      id: 5,
      sender: "Head of Department",
      subject: "Urgent: Staff Meeting Tomorrow",
      preview: "All HODs are required to attend an urgent meeting tomorrow at 2pm...",
      date: "2024-12-02 13:00",
      status: "unread",
      priority: "high",
      hasAttachment: false
    },
    {
      id: 6,
      sender: "Library System",
      subject: "Overdue Books Notification",
      preview: "The following books are now overdue and need to be returned...",
      date: "2024-12-01 10:00",
      status: "read",
      priority: "normal",
      hasAttachment: true
    },
    {
      id: 7,
      sender: "Peter Mukasa (Student)",
      subject: "Permission for Sports Day",
      preview: "Dear Sir/Madam, I would like to request permission to participate...",
      date: "2024-11-30 15:30",
      status: "read",
      priority: "low",
      hasAttachment: false
    },
  ];

  const stats = [
    { label: "Total Messages", value: "342", icon: Mail, color: "from-blue-500 to-purple-500" },
    { label: "Unread", value: "47", icon: InboxIcon, color: "from-green-500 to-emerald-500" },
    { label: "Sent", value: "156", icon: Send, color: "from-amber-500 to-orange-500" },
    { label: "Archived", value: "139", icon: Clock, color: "from-gray-500 to-slate-500" },
  ];

  const statuses = ["all", "unread", "read"];

  const filteredMessages = messages.filter(msg => {
    const matchesSearch = msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         msg.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || msg.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "high": return "text-red-600";
      case "low": return "text-gray-400";
      default: return "text-blue-600";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inbox
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your messages</p>
            </div>
          </div>
        </div>
        <Link href="/messaging/compose">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Send className="w-4 h-4 mr-2" />
            Compose Message
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by sender or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Messages" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
          <CardDescription>Your inbox messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredMessages.map((message, idx) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  message.status === "unread"
                    ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 font-medium hover:shadow-md"
                    : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 flex-shrink-0">
                    <AvatarFallback className={`${
                      message.status === "unread"
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                        : "bg-gradient-to-br from-gray-400 to-gray-500 text-white"
                    }`}>
                      {message.sender.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-1">
                        <p className={`font-semibold ${message.status === "unread" ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}>
                          {message.sender}
                        </p>
                        {message.hasAttachment && (
                          <Badge variant="outline" className="text-xs">📎</Badge>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{message.date}</span>
                    </div>
                    <p className={`mb-2 ${message.status === "unread" ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"}`}>
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                      {message.preview}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${
                        message.priority === "high" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                        message.priority === "low" ? "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400" :
                        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}>
                        {message.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="ghost">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Messaging System
      </div>
    </div>
  );
}
