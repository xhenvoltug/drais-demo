"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, MessageSquare, AlertCircle, Save } from "lucide-react";

export default function SMSTemplates() {
  const [smsTemplate, setSmsTemplate] = useState({
    name: "",
    category: "fees",
    message: "Dear {{parent_name}}, fee payment for {{student_name}} in {{class}} is due. Amount: {{amount}}. Thank you."
  });

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const categories = ["Fees Reminder", "Absence Alert", "Exam Results", "General Announcement"];
  
  const placeholders = [
    "{{parent_name}}",
    "{{student_name}}",
    "{{class}}",
    "{{term}}",
    "{{amount}}",
    "{{school_name}}",
    "{{date}}",
    "{{grade}}"
  ];

  const savedTemplates = [
    { id: 1, name: "Fee Reminder", category: "Fees Reminder", message: "Dear {{parent_name}}, fee payment for {{student_name}} is due." },
    { id: 2, name: "Absence Notice", category: "Absence Alert", message: "{{student_name}} was absent on {{date}}. Please contact school." },
    { id: 3, name: "Results Ready", category: "Exam Results", message: "{{term}} results for {{student_name}} are ready. Visit school to collect." }
  ];

  const charCount = smsTemplate.message.length;
  const smsCount = Math.ceil(charCount / 160);

  const insertPlaceholder = (placeholder) => {
    setSmsTemplate({ ...smsTemplate, message: smsTemplate.message + " " + placeholder });
  };

  const mockPreviews = [
    {
      name: "John Doe",
      parent: "Mr. Smith",
      class: "S.3",
      amount: "UGX 500,000",
      preview: smsTemplate.message
        .replace(/{{parent_name}}/g, "Mr. Smith")
        .replace(/{{student_name}}/g, "John Doe")
        .replace(/{{class}}/g, "S.3")
        .replace(/{{amount}}/g, "UGX 500,000")
        .replace(/{{term}}/g, "Term 1-2025")
        .replace(/{{school_name}}/g, "Demo School")
        .replace(/{{date}}/g, new Date().toLocaleDateString())
    },
    {
      name: "Jane Smith",
      parent: "Mrs. Johnson",
      class: "S.4",
      amount: "UGX 550,000",
      preview: smsTemplate.message
        .replace(/{{parent_name}}/g, "Mrs. Johnson")
        .replace(/{{student_name}}/g, "Jane Smith")
        .replace(/{{class}}/g, "S.4")
        .replace(/{{amount}}/g, "UGX 550,000")
        .replace(/{{term}}/g, "Term 1-2025")
        .replace(/{{school_name}}/g, "Demo School")
        .replace(/{{date}}/g, new Date().toLocaleDateString())
    }
  ];

  const saveTemplate = () => {
    if (!smsTemplate.name) {
      alert("Please enter a template name");
      return;
    }
    const saved = JSON.parse(localStorage.getItem("drais_kitchen_sms_templates") || "[]");
    saved.push({ ...smsTemplate, id: Date.now() });
    localStorage.setItem("drais_kitchen_sms_templates", JSON.stringify(saved));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert("SMS template saved!");
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">SMS Templates</h1>
                <p className="text-green-100">Create SMS templates with character counting</p>
              </div>
            </div>
            <Button variant="secondary" onClick={saveTemplate}>
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Saved Templates */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Saved Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {savedTemplates.map(template => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedTemplate(template);
                      setSmsTemplate(template);
                    }}
                  >
                    <div className="font-semibold text-sm mb-1">{template.name}</div>
                    <Badge variant="outline" className="text-xs">{template.category}</Badge>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {template.message}
                    </p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={smsTemplate.category === cat ? "default" : "outline"}
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setSmsTemplate({ ...smsTemplate, category: cat })}
                  >
                    {cat}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SMS Editor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Template Name</Label>
                  <input
                    type="text"
                    placeholder="My SMS Template"
                    value={smsTemplate.name}
                    onChange={(e) => setSmsTemplate({ ...smsTemplate, name: e.target.value })}
                    className="w-full border-2 rounded-lg p-2 dark:bg-gray-900"
                  />
                </div>

                <div>
                  <Label>Placeholders (click to insert)</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {placeholders.map(ph => (
                      <Badge
                        key={ph}
                        variant="outline"
                        className="cursor-pointer hover:bg-green-100 dark:hover:bg-green-900"
                        onClick={() => insertPlaceholder(ph)}
                      >
                        {ph}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Message</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={charCount > 160 ? "destructive" : "default"}>
                        {charCount} / 160 chars
                      </Badge>
                      <Badge variant="outline">{smsCount} SMS</Badge>
                    </div>
                  </div>
                  <textarea
                    className="w-full border-2 rounded-lg p-3 min-h-[150px] dark:bg-gray-900"
                    placeholder="Type your SMS message here..."
                    value={smsTemplate.message}
                    onChange={(e) => setSmsTemplate({ ...smsTemplate, message: e.target.value })}
                    maxLength={306}
                  />
                  {charCount > 160 && (
                    <div className="flex items-center gap-2 mt-2 text-orange-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>Message will be sent as {smsCount} parts</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bulk Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Bulk Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="preview1">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="preview1">Student 1</TabsTrigger>
                    <TabsTrigger value="preview2">Student 2</TabsTrigger>
                  </TabsList>

                  {mockPreviews.map((preview, idx) => (
                    <TabsContent key={idx} value={`preview${idx + 1}`}>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><strong>Student:</strong> {preview.name}</div>
                          <div><strong>Parent:</strong> {preview.parent}</div>
                          <div><strong>Class:</strong> {preview.class}</div>
                          <div><strong>Amount:</strong> {preview.amount}</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 rounded-2xl shadow-lg max-w-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-xs opacity-80">SMS Preview</span>
                          </div>
                          <p className="text-sm leading-relaxed">{preview.preview}</p>
                          <div className="text-xs opacity-70 mt-2">
                            {preview.preview.length} characters • {Math.ceil(preview.preview.length / 160)} SMS
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-300">
                    <strong>Keep it short:</strong> SMS under 160 characters cost less and are more readable
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <p className="text-green-800 dark:text-green-300">
                    <strong>Personalize:</strong> Use placeholders like {'{{parent_name}}'} for better engagement
                  </p>
                </div>
                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-purple-800 dark:text-purple-300">
                    <strong>Clear CTA:</strong> Include clear instructions (e.g., "Visit school", "Pay by Friday")
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
