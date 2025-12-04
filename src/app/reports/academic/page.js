"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  AlertTriangle,
  Download,
  Printer,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  BookOpen,
  Award,
  Target,
  FileText,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AcademicReportsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedTerm, setSelectedTerm] = useState("Term 3, 2024");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Summary metrics
  const summaryMetrics = [
    {
      title: "Overall Pass Rate",
      value: "87.4%",
      change: "+5.2%",
      trend: "up",
      icon: Award,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Average Attendance",
      value: "94.8%",
      change: "+2.1%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Discipline Cases",
      value: "127",
      change: "-8.3%",
      trend: "down",
      icon: AlertTriangle,
      color: "from-red-500 to-rose-600",
    },
    {
      title: "Active Students",
      value: "4,247",
      change: "+3.1%",
      trend: "up",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-600",
    },
  ];

  // Class performance data
  const classPerformance = [
    { class: "P1", avgScore: 78.5, passRate: 92, attendance: 96.2, students: 180 },
    { class: "P2", avgScore: 76.2, passRate: 89, attendance: 95.8, students: 175 },
    { class: "P3", avgScore: 79.8, passRate: 94, attendance: 96.5, students: 182 },
    { class: "P4", avgScore: 74.3, passRate: 86, attendance: 94.3, students: 178 },
    { class: "P5", avgScore: 81.2, passRate: 95, attendance: 97.1, students: 185 },
    { class: "P6", avgScore: 77.6, passRate: 91, attendance: 95.4, students: 180 },
    { class: "P7", avgScore: 83.4, passRate: 96, attendance: 97.8, students: 190 },
    { class: "S1", avgScore: 72.8, passRate: 84, attendance: 93.6, students: 220 },
    { class: "S2", avgScore: 75.1, passRate: 87, attendance: 94.2, students: 215 },
    { class: "S3", avgScore: 78.9, passRate: 91, attendance: 95.7, students: 225 },
    { class: "S4", avgScore: 80.3, passRate: 93, attendance: 96.3, students: 218 },
    { class: "S5", avgScore: 76.4, passRate: 88, attendance: 94.8, students: 210 },
    { class: "S6", avgScore: 82.1, passRate: 95, attendance: 97.2, students: 205 },
  ];

  // Subject performance trends
  const subjectPerformance = [
    { month: "Aug", math: 75, english: 82, science: 78, history: 80 },
    { month: "Sep", math: 78, english: 84, science: 80, history: 82 },
    { month: "Oct", math: 80, english: 85, science: 82, history: 83 },
    { month: "Nov", math: 82, english: 87, science: 84, history: 85 },
    { month: "Dec", math: 84, english: 88, science: 86, history: 87 },
  ];

  // Attendance trends
  const attendanceTrends = [
    { week: "Week 1", p1_p3: 94.5, p4_p7: 95.2, s1_s3: 93.8, s4_s6: 96.1 },
    { week: "Week 2", p1_p3: 95.1, p4_p7: 96.0, s1_s3: 94.5, s4_s6: 96.8 },
    { week: "Week 3", p1_p3: 94.8, p4_p7: 95.7, s1_s3: 94.2, s4_s6: 96.5 },
    { week: "Week 4", p1_p3: 95.5, p4_p7: 96.3, s1_s3: 95.0, s4_s6: 97.2 },
    { week: "Week 5", p1_p3: 95.2, p4_p7: 96.1, s1_s3: 94.7, s4_s6: 96.9 },
    { week: "Week 6", p1_p3: 96.0, p4_p7: 96.8, s1_s3: 95.4, s4_s6: 97.5 },
  ];

  // Recent discipline cases
  const disciplineCases = [
    { id: "DC-2024-842", student: "John Kamau", class: "S3A", date: "2024-12-02", offense: "Late coming", severity: "minor", action: "Warning issued" },
    { id: "DC-2024-841", student: "Sarah Nakato", class: "P5B", date: "2024-12-01", offense: "Incomplete homework", severity: "minor", action: "Parent contacted" },
    { id: "DC-2024-840", student: "David Okello", class: "S2C", date: "2024-11-30", offense: "Disruptive behavior", severity: "moderate", action: "2-day suspension" },
    { id: "DC-2024-839", student: "Grace Atim", class: "P7A", date: "2024-11-29", offense: "Uniform violation", severity: "minor", action: "Warning issued" },
    { id: "DC-2024-838", student: "Michael Ssemakula", class: "S4B", date: "2024-11-28", offense: "Fighting", severity: "severe", action: "1-week suspension" },
    { id: "DC-2024-837", student: "Alice Nambi", class: "S1A", date: "2024-11-27", offense: "Cheating in exam", severity: "moderate", action: "Grade penalty" },
  ];

  const getSeverityBadge = (severity) => {
    const colors = {
      minor: "bg-yellow-100 text-yellow-800 border-yellow-300",
      moderate: "bg-orange-100 text-orange-800 border-orange-300",
      severe: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[severity] || colors.minor;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Academic Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive academic performance and attendance analytics
            </p>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-sm">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 text-sm"
              >
                <option>Term 3, 2024</option>
                <option>Term 2, 2024</option>
                <option>Term 1, 2024</option>
              </select>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 text-sm"
              >
                <option value="all">All Classes</option>
                <option value="primary">Primary Section</option>
                <option value="secondary">Secondary Section</option>
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800 text-sm"
              >
                <option value="all">All Subjects</option>
                <option value="math">Mathematics</option>
                <option value="english">English</option>
                <option value="science">Science</option>
              </select>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPrintModal(true)}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden relative">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-10 rounded-full -mr-16 -mt-16`} />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    {metric.trend === "up" ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subject Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Subject Performance Trends
            </CardTitle>
            <CardDescription>Average scores by subject over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 90]} />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="math" stroke="#3b82f6" strokeWidth={2} name="Mathematics" />
                <Line type="monotone" dataKey="english" stroke="#10b981" strokeWidth={2} name="English" />
                <Line type="monotone" dataKey="science" stroke="#f59e0b" strokeWidth={2} name="Science" />
                <Line type="monotone" dataKey="history" stroke="#8b5cf6" strokeWidth={2} name="History" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Attendance Trends by Level
            </CardTitle>
            <CardDescription>Weekly attendance rates across grade levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={attendanceTrends}>
                <defs>
                  <linearGradient id="colorP1P3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorP4P7" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorS1S3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorS4S6" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="week" />
                <YAxis domain={[92, 98]} />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="p1_p3" stroke="#3b82f6" fill="url(#colorP1P3)" name="P1-P3" />
                <Area type="monotone" dataKey="p4_p7" stroke="#10b981" fill="url(#colorP4P7)" name="P4-P7" />
                <Area type="monotone" dataKey="s1_s3" stroke="#f59e0b" fill="url(#colorS1S3)" name="S1-S3" />
                <Area type="monotone" dataKey="s4_s6" stroke="#8b5cf6" fill="url(#colorS4S6)" name="S4-S6" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            Class Performance Summary
          </CardTitle>
          <CardDescription>Detailed metrics for all classes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-sm">Class</th>
                  <th className="text-center p-3 font-medium text-sm">Students</th>
                  <th className="text-center p-3 font-medium text-sm">Avg Score</th>
                  <th className="text-center p-3 font-medium text-sm">Pass Rate</th>
                  <th className="text-center p-3 font-medium text-sm">Attendance</th>
                  <th className="text-center p-3 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((cls, index) => (
                  <motion.tr
                    key={cls.class}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="p-3 font-bold">{cls.class}</td>
                    <td className="p-3 text-center">{cls.students}</td>
                    <td className="p-3 text-center">
                      <Badge className="bg-blue-100 text-blue-800">{cls.avgScore}%</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className="bg-green-100 text-green-800">{cls.passRate}%</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge className="bg-orange-100 text-orange-800">{cls.attendance}%</Badge>
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className={cls.passRate >= 90 ? "border-green-500 text-green-600" : "border-yellow-500 text-yellow-600"}>
                        {cls.passRate >= 90 ? "Excellent" : "Good"}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Discipline Cases */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Recent Discipline Cases
          </CardTitle>
          <CardDescription>Latest disciplinary actions and incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-sm">Case ID</th>
                  <th className="text-left p-3 font-medium text-sm">Student</th>
                  <th className="text-left p-3 font-medium text-sm">Class</th>
                  <th className="text-left p-3 font-medium text-sm">Date</th>
                  <th className="text-left p-3 font-medium text-sm">Offense</th>
                  <th className="text-center p-3 font-medium text-sm">Severity</th>
                  <th className="text-left p-3 font-medium text-sm">Action Taken</th>
                </tr>
              </thead>
              <tbody>
                {disciplineCases.map((cases, index) => (
                  <motion.tr
                    key={cases.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-400">{cases.id}</td>
                    <td className="p-3 font-medium">{cases.student}</td>
                    <td className="p-3">{cases.class}</td>
                    <td className="p-3 text-sm">{cases.date}</td>
                    <td className="p-3">{cases.offense}</td>
                    <td className="p-3 text-center">
                      <Badge className={getSeverityBadge(cases.severity)}>
                        {cases.severity}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm">{cases.action}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Print Modal */}
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Print Preview - Academic Report</DialogTitle>
          </DialogHeader>
          <div className="p-6 bg-white dark:bg-gray-900">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">DRAIS Academic Report</h2>
              <p className="text-gray-600">{selectedTerm}</p>
            </div>
            <div className="space-y-4">
              {summaryMetrics.map((metric) => (
                <div key={metric.title} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{metric.title}:</span>
                  <span className="font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print Document
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowPrintModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Academic Reports
      </div>
    </div>
  );
}
