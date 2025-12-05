"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Smartphone, Download, Eye, Send } from "lucide-react";

export default function EmailTemplates() {
  const [emailTemplate, setEmailTemplate] = useState({
    name: "",
    subject: "",
    preheader: "",
    headerBg: "#6366f1",
    body: "Dear {{student_name}},\n\nYour fee payment of {{amount}} for {{term}} is due.\n\nThank you,\n{{school_name}}",
    footerText: "© 2025 School Name. All rights reserved."
  });
  const [previewDevice, setPreviewDevice] = useState("desktop");

  const placeholders = [
    "{{student_name}}",
    "{{parent_name}}",
    "{{class}}",
    "{{term}}",
    "{{amount}}",
    "{{school_name}}",
    "{{date}}",
    "{{grade}}"
  ];

  const saveTemplate = () => {
    if (!emailTemplate.name) {
      alert("Please enter a template name");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("drais_kitchen_email_templates") || "[]");
    saved.push({ ...emailTemplate, id: Date.now(), createdAt: new Date().toISOString() });
    localStorage.setItem("drais_kitchen_email_templates", JSON.stringify(saved));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert("Email template saved!");
  };

  const insertPlaceholder = (placeholder) => {
    setEmailTemplate({ ...emailTemplate, body: emailTemplate.body + " " + placeholder });
  };

  const mockPreview = emailTemplate.body
    .replace(/{{student_name}}/g, "John Doe")
    .replace(/{{parent_name}}/g, "Mr. Smith")
    .replace(/{{class}}/g, "S.3")
    .replace(/{{term}}/g, "Term 1-2025")
    .replace(/{{amount}}/g, "UGX 500,000")
    .replace(/{{school_name}}/g, "Demo School")
    .replace(/{{date}}/g, new Date().toLocaleDateString())
    .replace(/{{grade}}/g, "A");

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Email Templates</h1>
                <p className="text-blue-100">Create reusable email templates with placeholders</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={saveTemplate}>
                <Download className="w-4 h-4 mr-2" />
                Save Template
              </Button>
              <Button variant="secondary">
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Template Name</Label>
                  <Input
                    placeholder="Fee Reminder Email"
                    value={emailTemplate.name}
                    onChange={(e) => setEmailTemplate({ ...emailTemplate, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Subject Line</Label>
                  <Input
                    placeholder="Fee Payment Reminder - {{term}}"
                    value={emailTemplate.subject}
                    onChange={(e) => setEmailTemplate({ ...emailTemplate, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Preheader Text</Label>
                  <Input
                    placeholder="Your payment is due soon"
                    value={emailTemplate.preheader}
                    onChange={(e) => setEmailTemplate({ ...emailTemplate, preheader: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Header Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={emailTemplate.headerBg}
                      onChange={(e) => setEmailTemplate({ ...emailTemplate, headerBg: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={emailTemplate.headerBg}
                      onChange={(e) => setEmailTemplate({ ...emailTemplate, headerBg: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Body</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Placeholders (click to insert)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {placeholders.map(ph => (
                      <Badge
                        key={ph}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900"
                        onClick={() => insertPlaceholder(ph)}
                      >
                        {ph}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Message</Label>
                  <textarea
                    className="w-full border-2 rounded-lg p-3 min-h-[200px] dark:bg-gray-900"
                    value={emailTemplate.body}
                    onChange={(e) => setEmailTemplate({ ...emailTemplate, body: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Footer Text</Label>
                  <Input
                    value={emailTemplate.footerText}
                    onChange={(e) => setEmailTemplate({ ...emailTemplate, footerText: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                    >
                      Desktop
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                    >
                      Mobile
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`mx-auto border-2 rounded-lg overflow-hidden ${previewDevice === "mobile" ? "max-w-sm" : "max-w-full"}`}>
                  {/* Email Header */}
                  <div
                    className="p-6 text-white text-center"
                    style={{ backgroundColor: emailTemplate.headerBg }}
                  >
                    <h2 className="text-2xl font-bold">School Name</h2>
                    {emailTemplate.preheader && (
                      <p className="text-sm opacity-90 mt-1">{emailTemplate.preheader}</p>
                    )}
                  </div>

                  {/* Email Body */}
                  <div className="p-6 bg-white dark:bg-gray-900">
                    <p className="whitespace-pre-line text-gray-800 dark:text-gray-200">{mockPreview}</p>
                  </div>

                  {/* Email Footer */}
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>{emailTemplate.footerText}</p>
                    <div className="flex justify-center gap-4 mt-2">
                      <a href="#" className="text-blue-600 hover:underline">Unsubscribe</a>
                      <a href="#" className="text-blue-600 hover:underline">Contact Us</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300">
                    <strong>Placeholders:</strong> Use {'{{placeholder_name}}'} to insert dynamic content
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-green-800 dark:text-green-300">
                    <strong>Subject Line:</strong> Keep under 50 characters for best mobile display
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-purple-800 dark:text-purple-300">
                    <strong>Preview:</strong> Test on both desktop and mobile views
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
