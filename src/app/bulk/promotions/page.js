"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpCircle, Users, GraduationCap, CheckCircle, AlertCircle, TrendingUp, Calendar } from "lucide-react";

export default function BulkPromotionsPage() {
  const [selectedTerm, setSelectedTerm] = useState("term-3-2025");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const promotionData = [
    { fromClass: "S.1", toClass: "S.2", students: 45, passed: 42, failed: 3, passRate: 93 },
    { fromClass: "S.2", toClass: "S.3", students: 42, passed: 40, failed: 2, passRate: 95 },
    { fromClass: "S.3", toClass: "S.4", students: 38, passed: 35, failed: 3, passRate: 92 },
    { fromClass: "S.4", toClass: "S.5", students: 35, passed: 33, failed: 2, passRate: 94 },
    { fromClass: "S.5", toClass: "S.6", students: 30, passed: 28, failed: 2, passRate: 93 },
  ];

  const totalStudents = promotionData.reduce((acc, item) => acc + item.students, 0);
  const totalPassed = promotionData.reduce((acc, item) => acc + item.passed, 0);
  const totalFailed = promotionData.reduce((acc, item) => acc + item.failed, 0);

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-4 rounded-xl">
              <ArrowUpCircle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Bulk Student Promotions</h1>
              <p className="text-orange-100 mt-1">Promote students to the next academic level</p>
            </div>
          </div>
        </motion.div>

        {/* Term Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Select Academic Term
              </CardTitle>
              <CardDescription>Choose the term to process promotions for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["term-1-2025", "term-2-2025", "term-3-2025"].map((term) => (
                  <motion.div
                    key={term}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTerm(term)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTerm === term
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <p className="font-semibold capitalize">{term.replace(/-/g, " ")}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {term === "term-3-2025" && "Current Term"}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Promotion Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Promotion Summary</CardTitle>
              <CardDescription>Based on academic performance and attendance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalStudents}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Eligible for Promotion</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalPassed}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Not Eligible</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">{totalFailed}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Overall Pass Rate</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((totalPassed / totalStudents) * 100)}%
                  </p>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Class-by-Class Breakdown</h3>
                {promotionData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-lg">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {item.fromClass} → {item.toClass}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.students} students
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {item.passRate}% Pass Rate
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Eligible</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            {item.passed} students
                          </span>
                        </div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-950/30 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Not Eligible</p>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <span className="font-semibold text-red-600 dark:text-red-400">
                            {item.failed} students
                          </span>
                        </div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Action Required</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Review Cases
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Promotion Criteria */}
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Promotion Criteria</h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Minimum 50% overall average across all subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>At least 75% attendance throughout the term</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>No more than 2 failed core subjects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Good discipline record (no suspensions)</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setShowConfirmation(true)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Promote {totalPassed} Students
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Review Individual Cases
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowConfirmation(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Confirm Bulk Promotion</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You are about to promote <strong>{totalPassed} students</strong> to their next academic level.
                    This action will update class assignments and notify parents.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      onClick={() => setShowConfirmation(false)}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
