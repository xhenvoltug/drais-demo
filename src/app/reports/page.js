"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Download, FileText, BarChart3, TrendingUp, DollarSign, Users, GraduationCap } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ReportsPage() {
  const attendanceData = [
    { month: "Jan", present: 92, absent: 8 },
    { month: "Feb", present: 94, absent: 6 },
    { month: "Mar", present: 91, absent: 9 },
    { month: "Apr", present: 93, absent: 7 },
    { month: "May", present: 95, absent: 5 },
    { month: "Jun", present: 96, absent: 4 },
  ];

  const examData = [
    { grade: "A", count: 850 },
    { grade: "B", count: 1450 },
    { grade: "C", count: 1200 },
    { grade: "D", count: 520 },
    { grade: "F", count: 180 },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#6366f1"];

  const reports = [
    { name: "Student Attendance Report", icon: Users, color: "from-blue-500 to-blue-600", records: 4180 },
    { name: "Exam Results Summary", icon: GraduationCap, color: "from-green-500 to-green-600", records: 4200 },
    { name: "Fee Collection Report", icon: DollarSign, color: "from-purple-500 to-purple-600", records: 5847 },
    { name: "Performance Analytics", icon: TrendingUp, color: "from-amber-500 to-orange-600", records: 3200 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate comprehensive reports and insights • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Quick Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-xl transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${report.color} rounded-xl flex items-center justify-center mb-4`}>
                    <report.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{report.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{report.records.toLocaleString()} records</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-3 h-3 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="exams">Exam Results</TabsTrigger>
            <TabsTrigger value="fees">Fee Collection</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Attendance Report</CardTitle>
                    <CardDescription>Monthly attendance trends across all classes</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={attendanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" fill="#10b981" name="Present %" />
                    <Bar dataKey="absent" fill="#ef4444" name="Absent %" />
                  </BarChart>
                </ResponsiveContainer>

                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average Attendance</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">93.5%</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Present Days</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">168K</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Absent Days</p>
                    <p className="text-3xl font-bold text-red-600 mt-2">12K</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Exam Results Report</CardTitle>
                    <CardDescription>Grade distribution for Term 1 - 2025</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={examData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `Grade ${entry.grade}: ${entry.count}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {examData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {examData.map((grade, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Grade {grade.grade}</span>
                          <span className="text-gray-600 dark:text-gray-400">{grade.count} students</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(grade.count / 4200) * 100}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle>Fee Collection Report</CardTitle>
                <CardDescription>Payment tracking and defaulters list</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Fee collection analytics with charts and defaulter tracking
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics Report</CardTitle>
                <CardDescription>Subject-wise and class-wise performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Comprehensive performance analysis with trends and predictions
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
