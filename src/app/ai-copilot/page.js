"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Calendar,
  Users,
  Target,
  Sparkles,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  TrendingUp,
  BookOpen,
  Activity,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function AICopilotDashboard() {
  const [selectedTerm, setSelectedTerm] = useState("Term 3, 2024");
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");

  // AI Predictive Insights
  const predictiveInsights = [
    {
      title: "Students at Risk",
      value: "47",
      description: "Students predicted to underperform this term",
      change: "+8 from last week",
      trend: "warning",
      icon: TrendingDown,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      confidence: 94,
    },
    {
      title: "Attendance Alerts",
      value: "12 Classes",
      description: "Classes below 90% attendance threshold",
      change: "-3 from last week",
      trend: "improving",
      icon: Calendar,
      color: "from-orange-500 to-yellow-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      confidence: 89,
    },
    {
      title: "Fees Collection Forecast",
      value: "UGX 2.1B",
      description: "Expected collection by term end",
      change: "+12% above target",
      trend: "positive",
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      confidence: 91,
    },
    {
      title: "Discipline Trends",
      value: "↓ 18%",
      description: "Predicted decrease in incidents",
      change: "Improvement trend detected",
      trend: "positive",
      icon: AlertTriangle,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      confidence: 87,
    },
  ];

  // Students at risk data
  const studentsAtRisk = [
    { name: "Sarah Nakato", class: "P5A", riskScore: 87, subjects: ["Math", "Science"], attendance: 78, fees: "Paid", avatar: "SN" },
    { name: "John Kamau", class: "S2B", riskScore: 82, subjects: ["English", "History"], attendance: 65, fees: "Partial", avatar: "JK" },
    { name: "Grace Atim", class: "P7C", riskScore: 79, subjects: ["Math"], attendance: 88, fees: "Paid", avatar: "GA" },
    { name: "David Okello", class: "S3A", riskScore: 76, subjects: ["Science", "Math"], attendance: 72, fees: "Outstanding", avatar: "DO" },
    { name: "Alice Nambi", class: "P6B", riskScore: 73, subjects: ["English"], attendance: 81, fees: "Paid", avatar: "AN" },
  ];

  // Performance prediction data
  const performancePrediction = [
    { month: "Sep", actual: 76, predicted: 78, target: 80 },
    { month: "Oct", actual: 78, predicted: 80, target: 80 },
    { month: "Nov", actual: 79, predicted: 81, target: 80 },
    { month: "Dec", actual: null, predicted: 82, target: 80 },
    { month: "Jan", actual: null, predicted: 83, target: 80 },
    { month: "Feb", actual: null, predicted: 85, target: 80 },
  ];

  // Attendance prediction by class level
  const attendancePrediction = [
    { level: "P1-P3", current: 95.2, predicted: 96.1, risk: "low" },
    { level: "P4-P7", current: 94.8, predicted: 95.5, risk: "low" },
    { level: "S1-S3", current: 88.5, predicted: 87.2, risk: "high" },
    { level: "S4-S6", current: 96.3, predicted: 97.0, risk: "low" },
  ];

  // Fees collection projection
  const feesProjection = [
    { week: "Week 1", collected: 320000000, projected: 350000000, target: 340000000 },
    { week: "Week 2", collected: 680000000, projected: 710000000, target: 680000000 },
    { week: "Week 3", collected: 1050000000, projected: 1080000000, target: 1020000000 },
    { week: "Week 4", collected: 1420000000, projected: 1480000000, target: 1360000000 },
    { week: "Week 5", collected: null, projected: 1850000000, target: 1700000000 },
    { week: "Week 6", collected: null, projected: 2100000000, target: 2040000000 },
  ];

  // Department performance radar
  const departmentRadar = [
    { subject: "Math", performance: 82, engagement: 88, attendance: 94 },
    { subject: "English", performance: 85, engagement: 92, attendance: 96 },
    { subject: "Science", performance: 79, engagement: 84, attendance: 91 },
    { subject: "History", performance: 87, engagement: 89, attendance: 95 },
    { subject: "Languages", performance: 83, engagement: 86, attendance: 93 },
  ];

  const getRiskBadge = (score) => {
    if (score >= 80) return { label: "High Risk", color: "bg-red-100 text-red-800 border-red-300" };
    if (score >= 70) return { label: "Medium Risk", color: "bg-orange-100 text-orange-800 border-orange-300" };
    return { label: "Low Risk", color: "bg-yellow-100 text-yellow-800 border-yellow-300" };
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              AI Copilot Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent predictions and actionable insights powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-2 border-purple-100 dark:border-purple-900">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-sm">AI Analysis Filters:</span>
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
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh AI
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600">
                <Download className="w-4 h-4 mr-2" />
                Export Insights
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Insights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {predictiveInsights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <Card className={`${insight.bgColor} border-0 overflow-hidden relative cursor-pointer`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${insight.color} opacity-10 rounded-full -mr-16 -mt-16`} />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insight.color} flex items-center justify-center shadow-lg`}>
                    <insight.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="border-purple-500 text-purple-600 mb-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI {insight.confidence}%
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{insight.title}</p>
                <p className="text-3xl font-bold mb-2">{insight.value}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{insight.description}</p>
                <Badge className={
                  insight.trend === "positive" ? "bg-green-100 text-green-800" :
                  insight.trend === "warning" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                }>
                  {insight.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Prediction */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Performance Prediction Model
            </CardTitle>
            <CardDescription>AI-predicted vs actual performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performancePrediction}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis domain={[70, 90]} />
                <Tooltip
                  formatter={(value) => value ? `${value}%` : "N/A"}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="#8b5cf6"
                  fill="url(#colorActual)"
                  name="Actual Performance"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="predicted"
                  stroke="#ec4899"
                  fill="url(#colorPredicted)"
                  name="AI Prediction"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Line type="monotone" dataKey="target" stroke="#6b7280" strokeDasharray="3 3" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fees Collection Projection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Fees Collection Projection
            </CardTitle>
            <CardDescription>AI-forecasted collection vs actual and target</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feesProjection}>
                <defs>
                  <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`} />
                <Tooltip
                  formatter={(value) => value ? `UGX ${(value / 1000000).toFixed(0)}M` : "N/A"}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="collected" fill="url(#colorCollected)" name="Collected" radius={[8, 8, 0, 0]} />
                <Bar dataKey="projected" fill="url(#colorProjected)" name="AI Projection" radius={[8, 8, 0, 0]} />
                <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeWidth={2} name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Department Performance Analysis
            </CardTitle>
            <CardDescription>Multi-dimensional performance metrics across departments</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={departmentRadar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Performance" dataKey="performance" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                <Radar name="Engagement" dataKey="engagement" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                <Radar name="Attendance" dataKey="attendance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Prediction by Level */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              Attendance Risk Analysis
            </CardTitle>
            <CardDescription>AI-predicted attendance trends by class level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendancePrediction.map((item, index) => (
                <motion.div
                  key={item.level}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{item.level}</span>
                    <Badge className={
                      item.risk === "low" ? "bg-green-100 text-green-800" :
                      item.risk === "medium" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {item.risk.toUpperCase()} RISK
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Current</p>
                      <p className="text-2xl font-bold text-blue-600">{item.current}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">AI Prediction</p>
                      <p className="text-2xl font-bold text-purple-600">{item.predicted}%</p>
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.predicted}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className={`h-full rounded-full ${
                        item.risk === "low" ? "bg-gradient-to-r from-green-500 to-emerald-600" :
                        item.risk === "medium" ? "bg-gradient-to-r from-yellow-500 to-orange-600" :
                        "bg-gradient-to-r from-red-500 to-rose-600"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students at Risk Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            High-Risk Students Requiring Intervention
          </CardTitle>
          <CardDescription>AI-identified students with performance concerns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-sm">Student</th>
                  <th className="text-left p-3 font-medium text-sm">Class</th>
                  <th className="text-center p-3 font-medium text-sm">Risk Score</th>
                  <th className="text-left p-3 font-medium text-sm">At-Risk Subjects</th>
                  <th className="text-center p-3 font-medium text-sm">Attendance</th>
                  <th className="text-center p-3 font-medium text-sm">Fees Status</th>
                  <th className="text-center p-3 font-medium text-sm">Action</th>
                </tr>
              </thead>
              <tbody>
                {studentsAtRisk.map((student, index) => {
                  const riskBadge = getRiskBadge(student.riskScore);
                  return (
                    <motion.tr
                      key={student.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                            {student.avatar}
                          </div>
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </td>
                      <td className="p-3">{student.class}</td>
                      <td className="p-3 text-center">
                        <Badge className={riskBadge.color}>{student.riskScore}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1 flex-wrap">
                          {student.subjects.map(subject => (
                            <Badge key={subject} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={student.attendance >= 85 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {student.attendance}%
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={
                          student.fees === "Paid" ? "bg-green-100 text-green-800" :
                          student.fees === "Partial" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {student.fees}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
                          <Target className="w-3 h-3 mr-1" />
                          Intervene
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Summary */}
      <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Copilot Summary
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Based on comprehensive data analysis, the AI Copilot has identified 47 students requiring immediate attention. 
                Primary concerns include declining attendance in S1-S3 classes and performance gaps in Mathematics and Science. 
                However, fees collection is trending 12% above target, and overall discipline incidents are projected to decrease by 18% this term.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  View Detailed Insights
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Export AI Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • AI Copilot Dashboard • Powered by Advanced Machine Learning
      </div>
    </div>
  );
}
