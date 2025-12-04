"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  Calendar, TrendingUp, TrendingDown, Users, AlertCircle, 
  CheckCircle, Clock, Sun, CloudRain, Sparkles 
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AttendanceTrendsPage() {
  const [timeRange, setTimeRange] = useState("6months");

  // Monthly attendance trends
  const monthlyTrends = [
    { month: "Mar", rate: 94.2, present: 3938, absent: 242, late: 150 },
    { month: "Apr", rate: 95.1, present: 3976, absent: 204, late: 130 },
    { month: "May", rate: 93.8, present: 3921, absent: 259, late: 170 },
    { month: "Jun", rate: 94.5, present: 3950, absent: 230, late: 145 },
    { month: "Jul", rate: 92.7, present: 3875, absent: 305, late: 195 },
    { month: "Aug", rate: 94.9, present: 3967, absent: 213, late: 135 },
  ];

  // Weekly patterns
  const weeklyPatterns = [
    { day: "Monday", rate: 92.1, avg: 3853 },
    { day: "Tuesday", rate: 95.3, avg: 3987 },
    { day: "Wednesday", rate: 96.1, avg: 4017 },
    { day: "Thursday", rate: 95.8, avg: 4004 },
    { day: "Friday", rate: 93.4, avg: 3904 },
  ];

  // Class-wise attendance
  const classAttendance = [
    { class: "S1A", rate: 96.2, students: 45, avgAbsent: 2 },
    { class: "S1B", rate: 94.8, students: 43, avgAbsent: 2 },
    { class: "S2A", rate: 95.5, students: 48, avgAbsent: 2 },
    { class: "S2B", rate: 93.9, students: 46, avgAbsent: 3 },
    { class: "S3A", rate: 94.7, students: 42, avgAbsent: 2 },
    { class: "S3B", rate: 92.8, students: 41, avgAbsent: 3 },
    { class: "S4A", rate: 95.1, students: 50, avgAbsent: 2 },
    { class: "S4B", rate: 93.5, students: 48, avgAbsent: 3 },
    { class: "S5A", rate: 96.8, students: 38, avgAbsent: 1 },
    { class: "S5B", rate: 95.4, students: 40, avgAbsent: 2 },
  ];

  // Stats cards
  const stats = [
    { 
      label: "Overall Attendance", 
      value: "94.7%", 
      change: "+1.2%", 
      trend: "up",
      icon: Users, 
      color: "from-blue-500 to-purple-500" 
    },
    { 
      label: "Present Today", 
      value: "3,967", 
      change: "+45", 
      trend: "up",
      icon: CheckCircle, 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      label: "Absent Today", 
      value: "213", 
      change: "-12", 
      trend: "down",
      icon: AlertCircle, 
      color: "from-red-500 to-pink-500" 
    },
    { 
      label: "Late Arrivals", 
      value: "135", 
      change: "-8", 
      trend: "down",
      icon: Clock, 
      color: "from-amber-500 to-orange-500" 
    },
  ];

  // Students with poor attendance
  const poorAttendance = [
    { name: "John Okello", class: "S4A", rate: 68.5, daysAbsent: 45 },
    { name: "Mary Achieng", class: "S3B", rate: 71.2, daysAbsent: 41 },
    { name: "Peter Mukasa", class: "S2C", rate: 74.8, daysAbsent: 36 },
    { name: "Grace Nalongo", class: "S5A", rate: 69.3, daysAbsent: 44 },
    { name: "David Ssemakula", class: "S1A", rate: 72.6, daysAbsent: 39 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Attendance Trends Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Comprehensive attendance insights and patterns</p>
            </div>
          </div>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border rounded-lg dark:bg-gray-800"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="year">This Year</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Monthly Attendance Trends
            </CardTitle>
            <CardDescription>Attendance rates over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyTrends}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Area type="monotone" dataKey="rate" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRate)" name="Attendance %" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              Weekly Attendance Patterns
            </CardTitle>
            <CardDescription>Average attendance by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyPatterns}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="day" className="text-xs" />
                <YAxis className="text-xs" domain={[90, 100]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="rate" fill="url(#barGradient)" name="Attendance %" />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.9}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.9}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Class Performance & At-Risk Students */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Class-wise Attendance
            </CardTitle>
            <CardDescription>Attendance rates across all classes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classAttendance.map((cls, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-bold">{cls.class}</Badge>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cls.students} students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">{cls.rate}%</p>
                    <p className="text-xs text-gray-500">{cls.avgAbsent} avg absent</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Students with Poor Attendance
            </CardTitle>
            <CardDescription>Below 75% attendance rate - requires intervention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {poorAttendance.map((student, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-lg border-l-4 border-red-500"
                >
                  <div>
                    <p className="font-semibold">{student.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{student.class}</Badge>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {student.daysAbsent} days absent
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">{student.rate}%</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Contact Parent
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            AI-Powered Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <Sun className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Peak Attendance Days</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Wednesdays show highest attendance (96.1%). Consider scheduling important events midweek.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <CloudRain className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Seasonal Pattern Detected</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  July shows 2% dip in attendance. Rainy season impact - consider transport arrangements.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Monday Morning Challenge</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Mondays average 92.1% attendance - lowest of the week. Weekend activities may be factor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Top Performing Class</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  S5A leads with 96.8% attendance. Their class prefect system could be replicated.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Advanced Analytics Suite
      </div>
    </div>
  );
}
