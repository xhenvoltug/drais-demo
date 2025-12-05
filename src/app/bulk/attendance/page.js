"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, FileSpreadsheet, Calendar, UserCheck, AlertCircle, CheckCircle, Clock } from "lucide-react";

export default function BulkAttendancePage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedDate, setSelectedDate] = useState("2025-12-04");

  const previewData = [
    { studentId: "STD001", name: "John Doe", class: "S.1", status: "Present", time: "08:00 AM", valid: true },
    { studentId: "STD002", name: "Jane Smith", class: "S.2", status: "Present", time: "08:05 AM", valid: true },
    { studentId: "STD003", name: "Bob Wilson", class: "S.1", status: "Late", time: "08:45 AM", valid: true },
    { studentId: "STD004", name: "Alice Brown", class: "", status: "Present", time: "08:00 AM", valid: false },
    { studentId: "STD005", name: "Charlie Davis", class: "S.3", status: "Absent", time: "-", valid: true },
    { studentId: "INVALID", name: "Unknown Student", class: "S.2", status: "Present", time: "08:00 AM", valid: false },
  ];

  const validRecords = previewData.filter(d => d.valid).length;
  const invalidRecords = previewData.filter(d => !d.valid).length;
  const presentCount = previewData.filter(d => d.status === "Present" && d.valid).length;
  const absentCount = previewData.filter(d => d.status === "Absent" && d.valid).length;
  const lateCount = previewData.filter(d => d.status === "Late" && d.valid).length;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setShowPreview(true);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Present: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      Absent: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
      Late: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
    };
    return styles[status] || "";
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Bulk Attendance Import</h1>
              <p className="text-cyan-100 mt-1">Import attendance records from external systems</p>
            </div>
          </div>
        </motion.div>

        {/* Date Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Select Attendance Date
              </CardTitle>
              <CardDescription>Choose the date for these attendance records</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Download Template */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                Step 1: Download Template
              </CardTitle>
              <CardDescription>Get the Excel template for attendance import</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button variant="outline">
                  View Format Guide
                </Button>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Required columns:</strong> Student ID, Student Name, Class, Status (Present/Absent/Late/Excused), 
                  Time (optional), Notes (optional)
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                Step 2: Upload Attendance Data
              </CardTitle>
              <CardDescription>Import your filled Excel file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="attendance-upload"
                />
                <label htmlFor="attendance-upload" className="cursor-pointer">
                  <Upload className="w-16 h-16 mx-auto text-purple-600 dark:text-purple-400 mb-4" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Drop attendance file here
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    or click to browse (.xlsx, .xls, .csv)
                  </p>
                  {uploadedFile && (
                    <Badge className="bg-green-600 text-white">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {uploadedFile.name}
                    </Badge>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Preview Section */}
        <AnimatePresence>
          {showPreview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle>Preview Attendance Records</CardTitle>
                  <CardDescription>Review before importing to system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{previewData.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Present</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{presentCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Absent</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{absentCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Late</p>
                      <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{lateCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 p-4 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Errors</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{invalidRecords}</p>
                    </div>
                  </div>

                  {/* Records Table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Student ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Class</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Time</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Validation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr
                            key={index}
                            className={`border-t border-gray-200 dark:border-gray-700 ${
                              !row.valid ? "bg-red-50 dark:bg-red-950/20" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <td className="px-4 py-3 text-sm font-mono">{row.studentId}</td>
                            <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                            <td className="px-4 py-3 text-sm">
                              {row.class || <span className="text-red-500">Missing</span>}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Badge className={getStatusBadge(row.status)}>
                                {row.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {row.time !== "-" && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {row.time}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {row.valid ? (
                                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Valid
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Invalid
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      disabled={invalidRecords > 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Import {validRecords} Records
                    </Button>
                    <Button variant="outline" onClick={() => setShowPreview(false)}>
                      Cancel
                    </Button>
                  </div>

                  {invalidRecords > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-300">
                            Found {invalidRecords} invalid records
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                            Please fix: Invalid student IDs, missing classes, or unknown students before importing.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
