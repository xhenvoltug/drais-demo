"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { 
  TrendingUp, TrendingDown, Award, Target, Brain, 
  Users, BookOpen, AlertCircle, Sparkles, ArrowUpRight 
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function StudentPerformanceAnalyticsPage() {
  // Mock performance trend data
  const performanceTrends = [
    { month: "Jan", avgScore: 72, topScore: 95, passRate: 78 },
    { month: "Feb", avgScore: 74, topScore: 96, passRate: 80 },
    { month: "Mar", avgScore: 71, topScore: 94, passRate: 77 },
    { month: "Apr", avgScore: 76, topScore: 97, passRate: 82 },
    { month: "May", avgScore: 78, topScore: 98, passRate: 85 },
    { month: "Jun", avgScore: 75, topScore: 96, passRate: 81 },
    { month: "Jul", avgScore: 79, topScore: 99, passRate: 87 },
    { month: "Aug", avgScore: 81, topScore: 98, passRate: 89 },
  ];

  // Subject performance
  const subjectPerformance = [
    { subject: "Mathematics", avg: 78, students: 450 },
    { subject: "English", avg: 82, students: 450 },
    { subject: "Physics", avg: 75, students: 280 },
    { subject: "Chemistry", avg: 77, students: 280 },
    { subject: "Biology", avg: 80, students: 350 },
    { subject: "History", avg: 84, students: 380 },
    { subject: "Geography", avg: 81, students: 320 },
  ];

  // Class performance distribution
  const classDistribution = [
    { grade: "A (80-100)", count: 820, percentage: 19.6 },
    { grade: "B (70-79)", count: 1254, percentage: 30.0 },
    { grade: "C (60-69)", count: 1045, percentage: 25.0 },
    { grade: "D (50-59)", count: 710, percentage: 17.0 },
    { grade: "F (0-49)", count: 351, percentage: 8.4 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#6b7280'];

  // Stats cards
  const stats = [
    { 
      label: "Avg Performance", 
      value: "81.3%", 
      change: "+3.2%", 
      trend: "up",
      icon: Target, 
      color: "from-blue-500 to-purple-500" 
    },
    { 
      label: "Pass Rate", 
      value: "89.2%", 
      change: "+5.1%", 
      trend: "up",
      icon: Award, 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      label: "Top Performers", 
      value: "820", 
      change: "+12%", 
      trend: "up",
      icon: Sparkles, 
      color: "from-amber-500 to-orange-500" 
    },
    { 
      label: "At Risk Students", 
      value: "351", 
      change: "-8%", 
      trend: "down",
      icon: AlertCircle, 
      color: "from-red-500 to-pink-500" 
    },
  ];

  // Top performers
  const topPerformers = [
    { name: "Sarah Nakato", class: "S4A", avg: 98.5, subjects: 8 },
    { name: "John Okello", class: "S5B", avg: 97.8, subjects: 8 },
    { name: "Mary Achieng", class: "S3A", avg: 96.9, subjects: 7 },
    { name: "Peter Mukasa", class: "S4B", avg: 96.2, subjects: 8 },
    { name: "Grace Nalongo", class: "S5A", avg: 95.8, subjects: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Student Performance Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Comprehensive academic performance insights</p>
          </div>
        </div>
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

      {/* Performance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Performance Trends (8 Months)
            </CardTitle>
            <CardDescription>Average scores, top scores, and pass rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrends}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} name="Avg Score" />
                <Line type="monotone" dataKey="topScore" stroke="#10b981" strokeWidth={2} name="Top Score" />
                <Line type="monotone" dataKey="passRate" stroke="#f59e0b" strokeWidth={2} name="Pass Rate %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Subject Performance
            </CardTitle>
            <CardDescription>Average scores across subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="subject" className="text-xs" angle={-45} textAnchor="end" height={80} />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="avg" fill="url(#colorGradient)" name="Avg Score" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grade Distribution & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Grade Distribution
            </CardTitle>
            <CardDescription>Overall grade breakdown across 4,180 students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={classDistribution}
                      cx={100}
                      cy={100}
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {classDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {classDistribution.map((grade, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS[idx] }}></div>
                      <span className="font-medium">{grade.grade}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{grade.count}</p>
                      <p className="text-sm text-gray-500">{grade.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Top 5 Performers
            </CardTitle>
            <CardDescription>Highest achieving students this term</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((student, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      idx === 0 ? 'bg-gradient-to-br from-amber-500 to-yellow-500' :
                      idx === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                      idx === 2 ? 'bg-gradient-to-br from-orange-600 to-amber-700' :
                      'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{student.class} • {student.subjects} subjects</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">{student.avg}%</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <Button className="w-full mt-4 bg-gradient-to-r from-amber-500 to-orange-500">
              View Full Rankings <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Advanced Analytics Suite
      </div>
    </div>
  );
}
