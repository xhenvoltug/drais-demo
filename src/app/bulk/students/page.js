"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, FileSpreadsheet, Users, AlertCircle, CheckCircle, X, Eye, Trash2 } from "lucide-react";

export default function BulkStudentsPage() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Dummy preview data
  const previewData = [
    { id: 1, name: "John Doe", class: "S.1", dob: "2010-05-12", gender: "Male", status: "valid" },
    { id: 2, name: "Jane Smith", class: "S.2", dob: "2009-08-23", gender: "Female", status: "valid" },
    { id: 3, name: "Bob Wilson", class: "", dob: "2011-02-15", gender: "Male", status: "error" },
    { id: 4, name: "Alice Brown", class: "S.1", dob: "invalid", gender: "Female", status: "error" },
    { id: 5, name: "Charlie Davis", class: "S.3", dob: "2008-11-30", gender: "Male", status: "valid" },
    { id: 6, name: "Emma Wilson", class: "S.2", dob: "2009-07-18", gender: "Female", status: "valid" },
    { id: 7, name: "Frank Miller", class: "S.1", dob: "2010-03-25", gender: "Male", status: "valid" },
    { id: 8, name: "Grace Lee", class: "", dob: "2009-09-12", gender: "Female", status: "error" },
    { id: 9, name: "Henry Taylor", class: "S.4", dob: "2007-12-08", gender: "Male", status: "valid" },
    { id: 10, name: "Ivy Chen", class: "S.3", dob: "2008-06-14", gender: "Female", status: "valid" },
    { id: 11, name: "Jack Robinson", class: "S.2", dob: "2009-10-22", gender: "Male", status: "valid" },
    { id: 12, name: "Kelly White", class: "S.1", dob: "2010-04-17", gender: "Female", status: "valid" },
  ];

  const totalPages = Math.ceil(previewData.length / itemsPerPage);
  const paginatedData = previewData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const validCount = previewData.filter(d => d.status === "valid").length;
  const errorCount = previewData.filter(d => d.status === "error").length;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setShowPreview(true);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Bulk Student Update</h1>
              <p className="text-blue-100 mt-1">Import and update multiple students at once</p>
            </div>
          </div>
        </motion.div>

        {/* Download Template Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-blue-600" />
                Step 1: Download Template
              </CardTitle>
              <CardDescription>Get the Excel template to fill student data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Excel Template
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Sample Data
                </Button>
              </div>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Template includes:</strong> Student Name, Class, Date of Birth, Gender, Guardian Name, 
                  Guardian Phone, Address, Previous School, Medical Info
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-purple-600" />
                Step 2: Upload Filled Template
              </CardTitle>
              <CardDescription>Drag and drop or click to upload your Excel file</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-all cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-16 h-16 mx-auto text-purple-600 dark:text-purple-400 mb-4" />
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Drop your Excel file here
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
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2 border-pink-200 dark:border-pink-800">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Eye className="w-5 h-5 text-pink-600" />
                        Step 3: Preview & Validate
                      </CardTitle>
                      <CardDescription>Review imported data before proceeding</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Records</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{previewData.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Valid Records</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">{validCount}</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
                      <p className="text-2xl font-bold text-red-600 dark:text-red-400">{errorCount}</p>
                    </div>
                  </div>

                  {/* Preview Table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Row</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Name</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Class</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">DOB</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Gender</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row) => (
                          <tr
                            key={row.id}
                            className={`border-t border-gray-200 dark:border-gray-700 ${
                              row.status === "error" ? "bg-red-50 dark:bg-red-950/20" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`}
                          >
                            <td className="px-4 py-3 text-sm">{row.id}</td>
                            <td className="px-4 py-3 text-sm font-medium">{row.name}</td>
                            <td className="px-4 py-3 text-sm">
                              {row.class || <span className="text-red-500">Missing</span>}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {row.dob === "invalid" ? (
                                <span className="text-red-500">Invalid Date</span>
                              ) : (
                                row.dob
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm">{row.gender}</td>
                            <td className="px-4 py-3 text-sm">
                              {row.status === "valid" ? (
                                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Valid
                                </Badge>
                              ) : (
                                <Badge className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  Error
                                </Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, previewData.length)} of {previewData.length} records
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={currentPage === page ? "bg-gradient-to-r from-blue-600 to-purple-600" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" disabled={errorCount > 0}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Proceed with Import ({validCount} records)
                    </Button>
                    <Button variant="outline">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear All
                    </Button>
                  </div>

                  {errorCount > 0 && (
                    <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-800 dark:text-red-300">Found {errorCount} errors</p>
                          <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                            Please fix the highlighted rows before proceeding. Common issues: missing class, invalid dates, empty required fields.
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
