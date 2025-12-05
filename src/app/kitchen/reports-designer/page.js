"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Download, Trash2, Eye, Edit } from "lucide-react";

export default function ReportsDesigner() {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Exam Report Card", type: "exam", lastEdited: "2025-12-01" },
    { id: 2, name: "Fee Receipt", type: "receipt", lastEdited: "2025-11-28" },
    { id: 3, name: "School Invoice", type: "invoice", lastEdited: "2025-11-25" }
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const availableBlocks = [
    { id: "header", name: "Header Block", icon: "📝", color: "from-blue-500 to-blue-600" },
    { id: "logo", name: "Logo Block", icon: "🏫", color: "from-purple-500 to-purple-600" },
    { id: "ribbon", name: "Ribbon Banner", icon: "🎀", color: "from-pink-500 to-pink-600" },
    { id: "table", name: "Student Table", icon: "📊", color: "from-green-500 to-green-600" },
    { id: "signature", name: "Signature Block", icon: "✍️", color: "from-orange-500 to-orange-600" },
    { id: "comment", name: "Comment Block", icon: "💬", color: "from-cyan-500 to-cyan-600" },
    { id: "qr", name: "QR Code Block", icon: "📱", color: "from-indigo-500 to-indigo-600" }
  ];

  const createTemplate = () => {
    const name = prompt("Enter template name:");
    if (!name) return;
    
    const newTemplate = {
      id: Date.now(),
      name,
      type: "custom",
      lastEdited: new Date().toISOString().split('T')[0]
    };
    setTemplates([...templates, newTemplate]);
    localStorage.setItem("drais_kitchen_templates", JSON.stringify([...templates, newTemplate]));
  };

  const deleteTemplate = (id) => {
    if (confirm("Delete this template?")) {
      const updated = templates.filter(t => t.id !== id);
      setTemplates(updated);
      localStorage.setItem("drais_kitchen_templates", JSON.stringify(updated));
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Report Designer</h1>
                <p className="text-purple-100">Create custom report templates with drag-and-drop</p>
              </div>
            </div>
            <Button variant="secondary" onClick={createTemplate}>
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Block Palette */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Available Blocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {availableBlocks.map((block, idx) => (
                  <motion.div
                    key={block.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`bg-gradient-to-r ${block.color} text-white p-4 rounded-lg cursor-move`}
                    draggable
                  >
                    <div className="text-2xl mb-1">{block.icon}</div>
                    <div className="text-sm font-semibold">{block.name}</div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Template Library */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map(template => (
                  <div
                    key={template.id}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                        : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{template.name}</div>
                        <div className="text-xs text-gray-500">{template.lastEdited}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteTemplate(template.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Canvas</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedTemplate ? (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 min-h-[600px] bg-white dark:bg-gray-900">
                    <div className="text-center text-gray-500 mb-6">
                      <p className="text-sm">Drag blocks from the left panel onto this canvas</p>
                      <p className="text-xs mt-2">Template: {selectedTemplate.name}</p>
                    </div>
                    
                    {/* Simulated template structure */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <h2 className="text-2xl font-bold">School Name</h2>
                        <p className="text-sm">Academic Report Card</p>
                      </div>
                      
                      <div className="border-2 border-gray-300 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div><strong>Student:</strong> John Doe</div>
                          <div><strong>Class:</strong> S.3</div>
                          <div><strong>Term:</strong> 1-2025</div>
                          <div><strong>Position:</strong> 5/45</div>
                        </div>
                      </div>

                      <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th className="p-2 text-left">Subject</th>
                              <th className="p-2">Score</th>
                              <th className="p-2">Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr><td className="p-2">Mathematics</td><td className="p-2 text-center">85</td><td className="p-2 text-center">B</td></tr>
                            <tr className="bg-gray-50 dark:bg-gray-900"><td className="p-2">English</td><td className="p-2 text-center">92</td><td className="p-2 text-center">A</td></tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="border-t-2 border-gray-400 w-32 pt-1 text-xs text-center">Teacher Signature</div>
                        <div className="border-t-2 border-gray-400 w-32 pt-1 text-xs text-center">Parent Signature</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[600px] text-gray-500">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Select a template to start editing</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Properties Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate ? (
                  <>
                    <div>
                      <Label>Template Name</Label>
                      <Input value={selectedTemplate.name} readOnly />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Badge>{selectedTemplate.type}</Badge>
                    </div>
                    <div>
                      <Label>Last Edited</Label>
                      <Input value={selectedTemplate.lastEdited} readOnly />
                    </div>

                    <div className="space-y-2 pt-4 border-t">
                      <Button className="w-full" onClick={() => setShowPreview(true)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Export HTML
                      </Button>
                      <Button variant="outline" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Print Preview
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        <strong>Tip:</strong> Click on blocks in the canvas to edit their properties
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-gray-500 text-sm py-8">
                    Select a template to view properties
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Print Preview Modal */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPreview(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b">
                  <h2 className="text-2xl font-bold">Print Preview</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">A4 Size Simulation</p>
                </div>
                <div className="p-6">
                  <div className="bg-white border-2 shadow-lg mx-auto" style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}>
                    {/* Simulated A4 content */}
                    <div className="text-center mb-8">
                      <h1 className="text-3xl font-bold">School Name</h1>
                      <p className="text-lg">Academic Report Card</p>
                    </div>
                    <div className="mb-6">
                      <p><strong>Student:</strong> John Doe</p>
                      <p><strong>Class:</strong> S.3</p>
                      <p><strong>Term:</strong> 1-2025</p>
                    </div>
                    <p className="text-center text-gray-500 mt-20">Full report content here...</p>
                  </div>
                </div>
                <div className="p-6 border-t flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowPreview(false)}>Close</Button>
                  <Button>Print</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
