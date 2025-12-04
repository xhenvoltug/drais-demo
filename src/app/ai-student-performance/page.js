"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Users, Award, AlertTriangle, Target, Sparkles } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AIStudentPerformancePage() {
  const performanceData = [
    { month: "Jan", avgScore: 72, predicted: 74 },
    { month: "Feb", avgScore: 75, predicted: 77 },
    { month: "Mar", avgScore: 78, predicted: 80 },
    { month: "Apr", avgScore: 76, predicted: 79 },
    { month: "May", avgScore: 80, predicted: 82 },
    { month: "Jun", avgScore: 82, predicted: 84 },
    { month: "Jul", predicted: 85 },
    { month: "Aug", predicted: 86 },
  ];

  const classPerformance = [
    { class: "Grade 1", current: 78, potential: 85, risk: 8 },
    { class: "Grade 2", current: 76, potential: 83, risk: 12 },
    { class: "Grade 3", current: 81, potential: 88, risk: 5 },
    { class: "Grade 4", current: 79, potential: 86, risk: 10 },
    { class: "Grade 5", current: 83, potential: 90, risk: 4 },
    { class: "Grade 6", current: 80, potential: 87, risk: 7 },
  ];

  const insights = [
    {
      title: "Top Performers Identified",
      description: "128 students consistently scoring above 90% - recommend advanced track",
      type: "success",
      icon: Award,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50",
    },
    {
      title: "At-Risk Students",
      description: "45 students predicted to fail end-of-term exams - immediate intervention needed",
      type: "warning",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50",
    },
    {
      title: "Improving Classes",
      description: "Grade 3-B shows 15% improvement in Math - teaching methods effective",
      type: "info",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
    },
    {
      title: "Subject-Specific Gaps",
      description: "Science scores down 8% in Grade 4 - schedule review sessions",
      type: "alert",
      icon: TrendingDown,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-amber-900/50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Student Performance Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Predictive insights and performance trends • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${insight.bgColor} border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <insight.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{insight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                      <Button size="sm" variant="outline" className="mt-4">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Prediction Chart */}
        <Card>
          <CardHeader>
            <CardTitle>AI Performance Prediction</CardTitle>
            <CardDescription>Current vs. AI-predicted average scores (next 2 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={3} name="Current Avg Score" />
                <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" name="AI Prediction" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Class-by-Class Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Class Performance Potential</CardTitle>
            <CardDescription>AI assessment of current performance vs. achievable potential</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="current" fill="#3b82f6" name="Current Avg %" />
                <Bar dataKey="potential" fill="#10b981" name="AI Potential %" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 space-y-3">
              {classPerformance.map((cls, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-semibold">{cls.class}</div>
                    <Badge variant="outline">Gap: {cls.potential - cls.current}%</Badge>
                    <Badge className={cls.risk > 10 ? "bg-red-100 text-red-800" : cls.risk > 5 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}>
                      {cls.risk}% at risk
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost">Analyze</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
            <CardDescription>Actionable steps to improve student performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Create advanced placement program for 128 top-performing students",
              "Schedule remedial classes for 45 at-risk students before exams",
              "Replicate Grade 3-B teaching methods across other Math classes",
              "Organize Science review sessions for Grade 4 (8% performance drop)",
              "Implement peer tutoring program - pair top performers with struggling students",
              "Conduct teacher training on data-driven instruction methods",
            ].map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm flex-1">{rec}</p>
                <Button size="sm" variant="outline">Apply</Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
