"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Lightbulb, Brain, Target, Users, DollarSign, Calendar } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AIInsightsPage() {
  const insights = [
    {
      category: "Student Performance",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50",
      insights: [
        { text: "Grade 3-B shows 15% improvement in Math over the last month", type: "success", priority: "high" },
        { text: "12 students in Grade 5 are at risk of failing end-of-term exams", type: "warning", priority: "critical" },
        { text: "Science performance dropped 8% across Grade 4 - recommend review sessions", type: "alert", priority: "medium" },
        { text: "Top 10% students consistently score above 90% - consider advanced placement", type: "success", priority: "low" },
      ]
    },
    {
      category: "Financial Trends",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50",
      insights: [
        { text: "Fee collection rate improved by 12% this term compared to last term", type: "success", priority: "high" },
        { text: "342 students have pending fees totaling UGX 213M - send automated reminders", type: "warning", priority: "critical" },
        { text: "Mobile Money payments increased by 45% - consider reducing cash handling", type: "success", priority: "medium" },
        { text: "Peak payment period: Week 1 of each month (78% of collections)", type: "info", priority: "low" },
      ]
    },
    {
      category: "Attendance Patterns",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50",
      insights: [
        { text: "Overall attendance: 94.3% - exceeds national average of 87%", type: "success", priority: "high" },
        { text: "Monday attendance 6% lower than other weekdays - investigate patterns", type: "warning", priority: "medium" },
        { text: "23 students have <75% attendance this month - trigger parent meetings", type: "alert", priority: "critical" },
        { text: "Grade 5-A maintains 98% attendance - highest across all classes", type: "success", priority: "low" },
      ]
    },
    {
      category: "Predictive Analytics",
      icon: Brain,
      color: "from-amber-500 to-orange-600",
      bgColor: "from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50",
      insights: [
        { text: "AI predicts 87% pass rate for upcoming exams based on current trends", type: "info", priority: "high" },
        { text: "Expected fee collection: UGX 325M next month (based on 6-month pattern)", type: "info", priority: "medium" },
        { text: "Attendance likely to drop 4% during upcoming rainy season (historical data)", type: "warning", priority: "low" },
        { text: "Recommended: Schedule extra revision classes for 45 at-risk students", type: "alert", priority: "critical" },
      ]
    },
  ];

  const stats = [
    { name: "Active Insights", value: "16", icon: Sparkles, color: "from-blue-500 to-blue-600" },
    { name: "Critical Alerts", value: "4", icon: AlertCircle, color: "from-red-500 to-red-600" },
    { name: "Success Indicators", value: "6", icon: CheckCircle, color: "from-green-500 to-green-600" },
    { name: "Recommendations", value: "10", icon: Lightbulb, color: "from-amber-500 to-orange-600" },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical": return "text-red-600 bg-red-50 dark:bg-red-950/30";
      case "high": return "text-orange-600 bg-orange-50 dark:bg-orange-950/30";
      case "medium": return "text-blue-600 bg-blue-50 dark:bg-blue-950/30";
      case "low": return "text-gray-600 bg-gray-50 dark:bg-gray-800/30";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-800/30";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning": return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case "alert": return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "info": return <Lightbulb className="w-5 h-5 text-blue-600" />;
      default: return <Sparkles className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-600" />
            AI Insights Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Intelligent recommendations and predictive analytics • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{stat.name}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Insights Categories */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="critical">Critical Only</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {insights.map((category, catIndex) => (
              <motion.div
                key={catIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <Card className={`bg-gradient-to-br ${category.bgColor} border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600 transition-all`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle>{category.category}</CardTitle>
                        <CardDescription>{category.insights.length} insights available</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.insights.map((insight, insightIndex) => (
                      <motion.div
                        key={insightIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (catIndex * 0.1) + (insightIndex * 0.05) }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {getTypeIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{insight.text}</p>
                        </div>
                        <Badge className={getPriorityColor(insight.priority)}>
                          {insight.priority.toUpperCase()}
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="critical">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Critical Alerts Requiring Immediate Action
                </CardTitle>
                <CardDescription>High-priority issues detected by AI analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.flatMap(cat => 
                  cat.insights.filter(i => i.priority === "critical").map((insight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-l-4 border-red-600"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{insight.text}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Category: {cat.category}</p>
                      </div>
                      <Button size="sm" variant="outline">Take Action</Button>
                    </motion.div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Suggested actions to improve school operations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Schedule remedial classes for struggling students in Math and Science",
                  "Implement automated fee reminders via SMS for defaulters",
                  "Recognize and reward Grade 5-A for exceptional attendance",
                  "Prepare for predicted attendance drop during rainy season",
                  "Consider advanced placement program for top-performing students",
                  "Reduce cash handling by promoting Mobile Money payments",
                  "Conduct parent-teacher meetings for students with <75% attendance",
                  "Organize review sessions before upcoming end-of-term exams",
                  "Analyze Monday attendance patterns and implement engagement strategies",
                  "Celebrate 12% improvement in fee collection with finance team",
                ].map((rec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg cursor-pointer hover:shadow-md transition-all"
                  >
                    <Target className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm font-medium flex-1">{rec}</p>
                    <Button size="sm" variant="ghost">
                      Implement
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI-Powered Quick Actions
            </CardTitle>
            <CardDescription>One-click actions based on AI insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Send Fee Reminders", color: "from-green-600 to-teal-600" },
                { name: "Schedule Meetings", color: "from-blue-600 to-purple-600" },
                { name: "Generate Reports", color: "from-amber-600 to-orange-600" },
                { name: "Contact Parents", color: "from-red-600 to-pink-600" },
              ].map((action, idx) => (
                <motion.div key={idx} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                  <Button className={`w-full h-20 bg-gradient-to-r ${action.color} text-white shadow-lg hover:shadow-xl`}>
                    {action.name}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
