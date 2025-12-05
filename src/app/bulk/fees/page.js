"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Upload, Download, FileSpreadsheet, AlertCircle, CheckCircle, TrendingUp, TrendingDown, Percent } from "lucide-react";

export default function BulkFeesPage() {
  const [adjustmentType, setAdjustmentType] = useState("increase");
  const [adjustmentValue, setAdjustmentValue] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const classes = ["S.1", "S.2", "S.3", "S.4", "S.5", "S.6"];
  
  const previewData = [
    { class: "S.1", currentFee: 500000, newFee: 550000, students: 45, totalIncrease: 2250000 },
    { class: "S.2", currentFee: 520000, newFee: 572000, students: 42, totalIncrease: 2184000 },
    { class: "S.3", currentFee: 540000, newFee: 594000, students: 38, totalIncrease: 2052000 },
    { class: "S.4", currentFee: 560000, newFee: 616000, students: 35, totalIncrease: 1960000 },
  ];

  const totalRevenue = previewData.reduce((acc, item) => acc + item.totalIncrease, 0);

  const toggleClass = (className) => {
    setSelectedClasses(prev =>
      prev.includes(className)
        ? prev.filter(c => c !== className)
        : [...prev, className]
    );
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <DollarSign className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Bulk Fee Adjustments</h1>
              <p className="text-green-100 mt-1">Update fees across multiple classes at once</p>
            </div>
          </div>
        </motion.div>

        {/* Adjustment Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Configure Fee Adjustment</CardTitle>
              <CardDescription>Set the adjustment type and value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Adjustment Type */}
              <div className="space-y-3">
                <Label>Adjustment Type</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAdjustmentType("increase")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      adjustmentType === "increase"
                        ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Increase Fees</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Raise fees by percentage or amount</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAdjustmentType("decrease")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      adjustmentType === "decrease"
                        ? "border-red-500 bg-red-50 dark:bg-red-950/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                        <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <p className="font-semibold">Decrease Fees</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Reduce fees by percentage or amount</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Adjustment Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage (%)</Label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="percentage"
                      type="number"
                      placeholder="e.g., 10"
                      className="pl-10"
                      value={adjustmentValue}
                      onChange={(e) => setAdjustmentValue(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Fixed Amount (UGX)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="e.g., 50000"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Class Selection */}
              <div className="space-y-3">
                <Label>Select Classes</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {classes.map((className) => (
                    <motion.div
                      key={className}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleClass(className)}
                      className={`p-4 rounded-lg border-2 cursor-pointer text-center font-semibold transition-all ${
                        selectedClasses.includes(className)
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {className}
                      {selectedClasses.includes(className) && (
                        <CheckCircle className="w-4 h-4 mx-auto mt-2" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setShowPreview(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={!adjustmentValue || selectedClasses.length === 0}
              >
                Preview Changes
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Excel Import Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-purple-600" />
                Alternative: Upload Excel File
              </CardTitle>
              <CardDescription>Import custom fee adjustments from Excel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Filled Template
                </Button>
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
                  <CardTitle>Preview Fee Changes</CardTitle>
                  <CardDescription>Review the impact before applying</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Classes Affected</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{previewData.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {previewData.reduce((acc, item) => acc + item.students, 0)}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Additional Revenue</p>
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        UGX {totalRevenue.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Table */}
                  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                    <table className="w-full">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Class</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Current Fee</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">New Fee</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Students</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300">Total Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, index) => (
                          <tr key={index} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <td className="px-4 py-3 font-semibold">{row.class}</td>
                            <td className="px-4 py-3">UGX {row.currentFee.toLocaleString()}</td>
                            <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                              UGX {row.newFee.toLocaleString()}
                            </td>
                            <td className="px-4 py-3">{row.students}</td>
                            <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                              +UGX {row.totalIncrease.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Apply Fee Changes
                    </Button>
                    <Button variant="outline" onClick={() => setShowPreview(false)}>
                      Cancel
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-yellow-800 dark:text-yellow-300">Important Notice</p>
                        <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                          This will update fees for all students in the selected classes. Parents will be notified via SMS and email. 
                          This action cannot be undone easily.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
