"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, AlertCircle, Sparkles, Users, Sun, CloudRain } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AIAttendancePage() {
  const weeklyTrends = [
    { day: "Monday", actual: 88, predicted: 90, expected: 95 },
    { day: "Tuesday", actual: 94, predicted: 95, expected: 95 },
    { day: "Wednesday", actual: 93, predicted: 94, expected: 95 },
    { day: "Thursday", actual: 96, predicted: 97, expected: 95 },
    { day: "Friday", actual: 92, predicted: 93, expected: 95 },
  ];

  const monthlyPrediction = [
    { month: "Jan", actual: 92, predicted: null },
    { month: "Feb", actual: 94, predicted: null },
    { month: "Mar", actual: 91, predicted: null },
    { month: "Apr", actual: 93, predicted: null },
    { month: "May", actual: 95, predicted: null },
    { month: "Jun", actual: 96, predicted: null },
    { month: "Jul", actual: null, predicted: 91 },
    { month: "Aug", actual: null, predicted: 92 },
  ];

  const insights = [
    {
      title: "Excellent Overall Rate",
      description: "94.3% attendance - exceeds national average of 87%",
      type: "success",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Monday Attendance Drop",
      description: "6% lower than other weekdays - investigate patterns",
      type: "warning",
      icon: AlertCircle,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "At-Risk Students",
      description: "23 students with <75% attendance - trigger parent meetings",
      type: "alert",
      icon: Users,
      color: "from-red-500 to-red-600",
    },
    {
      title: "Seasonal Prediction",
      description: "4% drop expected during rainy season (Jul-Aug)",
      type: "info",
      icon: CloudRain,
      color: "from-blue-500 to-blue-600",
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
            AI Attendance Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Predictive attendance insights and pattern detection • v{DRAIS_VERSION}
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
              <Card className="hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${insight.color} rounded-xl flex items-center justify-center`}>
                      <insight.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{insight.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Weekly Pattern Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Patterns</CardTitle>
            <CardDescription>AI-detected patterns and anomalies</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="actual" fill="#3b82f6" name="Actual %" />
                <Bar dataKey="predicted" fill="#8b5cf6" name="AI Prediction %" />
                <Line type="monotone" dataKey="expected" stroke="#10b981" strokeWidth={2} name="Expected %" />
              </BarChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
              <p className="text-sm">
                <AlertCircle className="w-4 h-4 inline mr-2 text-amber-600" />
                <strong>Pattern Detected:</strong> Monday attendance consistently 6% below other weekdays. Possible causes: Weekend activities, longer commute after break, family scheduling conflicts.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Prediction */}
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Attendance Forecast</CardTitle>
            <CardDescription>AI prediction for next 2 months (rainy season impact)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={monthlyPrediction}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[85, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} name="Historical %" />
                <Line type="monotone" dataKey="predicted" stroke="#ef4444" strokeWidth={3} strokeDasharray="5 5" name="AI Forecast %" />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm">
                <CloudRain className="w-4 h-4 inline mr-2 text-blue-600" />
                <strong>Seasonal Insight:</strong> Historical data shows 4% attendance drop during rainy season (July-August). AI predicts similar pattern this year. Recommend proactive parent communication and transportation support.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* At-Risk Students */}
        <Card>
          <CardHeader>
            <CardTitle>At-Risk Students Alert</CardTitle>
            <CardDescription>23 students with attendance below 75% threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array.from({ length: 8 }, (_, i) => ({
                id: `STD${String(i + 1).padStart(5, "0")}`,
                name: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
                class: `Grade ${(i % 6) + 1}`,
                attendance: 65 + Math.floor(Math.random() * 10),
                absences: 12 + Math.floor(Math.random() * 8),
              })).map((student, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-600"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{student.id} • {student.class}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className="bg-red-100 text-red-800">{student.attendance}%</Badge>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{student.absences} absences</p>
                    </div>
                    <Button size="sm" variant="outline">Contact Parent</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Schedule parent-teacher meetings for 23 at-risk students (<75% attendance)",
              "Investigate Monday attendance drop - consider flexible start times",
              "Prepare for 4% attendance decline during rainy season (Jul-Aug)",
              "Recognize Grade 5-A for maintaining 98% attendance - highest in school",
              "Implement attendance incentive program for improved consistency",
              "Provide transportation support during rainy season for remote students",
            ].map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
              >
                <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
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
