"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Send, Upload, Users, User, Mail, Paperclip, Bold, Italic, List, Link2 } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function MessagingComposePage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipientType, setRecipientType] = useState("individual");

  const recipientGroups = [
    "All Staff",
    "All Parents",
    "All Students",
    "S1 Students",
    "S2 Students",
    "S3 Students",
    "S4 Students",
    "S5 Students",
    "Teachers",
    "Non-Teaching Staff",
    "HODs",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Send className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Compose Message
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Send messages to staff, parents, or students</p>
          </div>
        </div>
      </div>

      {/* Compose Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>New Message</CardTitle>
              <CardDescription>Fill in the details below to send your message</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recipient Type */}
              <div>
                <Label>Recipient Type</Label>
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => setRecipientType("individual")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      recipientType === "individual"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Individual</p>
                  </button>
                  <button
                    onClick={() => setRecipientType("group")}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      recipientType === "group"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Group</p>
                  </button>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <Label htmlFor="recipient">
                  {recipientType === "individual" ? "Recipient Email/Name" : "Select Group"}
                </Label>
                {recipientType === "individual" ? (
                  <Input
                    id="recipient"
                    placeholder="Search by name or email..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                ) : (
                  <select
                    className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  >
                    <option value="">Select a group...</option>
                    {recipientGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Subject */}
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              {/* Message Editor Toolbar */}
              <div>
                <Label>Message</Label>
                <div className="border rounded-lg dark:border-gray-700 overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 p-2 flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Bold className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Italic className="w-4 h-4" />
                    </Button>
                    <div className="w-px bg-gray-300 dark:bg-gray-700" />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <List className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Link2 className="w-4 h-4" />
                    </Button>
                    <div className="w-px bg-gray-300 dark:bg-gray-700" />
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
                  <textarea
                    className="w-full p-4 min-h-[300px] resize-none focus:outline-none dark:bg-gray-950"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>

              {/* Attachments */}
              <div>
                <Label>Attachments (Optional)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline">Save Draft</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Info Sidebar */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
            <CardHeader>
              <CardTitle className="text-lg">Message Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Keep subject lines clear and concise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Use group messaging for announcements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Proofread before sending</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600">✓</span>
                  <span>Include relevant attachments</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Recipients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["All Staff", "S4 Students", "All Parents", "Teachers", "HODs"].map((group, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setRecipientType("group");
                      setRecipient(group);
                    }}
                    className="w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">{group}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold mb-1">Message Stats</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                You've sent 156 messages this term
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Response Rate</span>
                  <span className="font-bold text-blue-600">87%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Avg. Response Time</span>
                  <span className="font-bold text-blue-600">2.3 hrs</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Messaging System
      </div>
    </div>
  );
}
