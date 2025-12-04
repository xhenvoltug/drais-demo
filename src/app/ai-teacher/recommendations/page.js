"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Lightbulb, Search, AlertCircle, TrendingUp, Target, Users, BookOpen, Brain, Sparkles, CheckCircle } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AIRecommendationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const recommendationTypes = ["All Types", "Student Support", "Subject Improvement", "Teaching Strategy", "Intervention"];

  const studentsNeedingAttention = [
    {
      id: 1,
      name: "Sarah Nakato",
      class: "S4A",
      avatar: "SN",
      issues: ["Poor attendance (68%)", "Low math scores (52%)", "Missing assignments"],
      priority: "high",
      aiSuggestions: [
        "Schedule one-on-one tutoring sessions",
        "Contact parents about attendance",
        "Assign peer mentor from S5",
      ],
      confidence: 92,
    },
    {
      id: 2,
      name: "John Okello",
      class: "S5B",
      avatar: "JO",
      issues: ["Declining grades in Physics", "Attendance dropping", "Exam anxiety"],
      priority: "high",
      aiSuggestions: [
        "Provide exam preparation workshops",
        "Recommend counseling services",
        "Extra practice problems with step-by-step solutions",
      ],
      confidence: 88,
    },
    {
      id: 3,
      name: "Mary Achieng",
      class: "S3A",
      avatar: "MA",
      issues: ["Struggling with Chemistry", "Group work participation low"],
      priority: "medium",
      aiSuggestions: [
        "Pair with stronger Chemistry student",
        "Visual learning aids for complex concepts",
        "Encourage participation with smaller groups",
      ],
      confidence: 85,
    },
    {
      id: 4,
      name: "Peter Mukasa",
      class: "S2C",
      avatar: "PM",
      issues: ["Reading comprehension below grade level", "Homework completion 60%"],
      priority: "medium",
      aiSuggestions: [
        "Reading intervention program",
        "Simplified assignment instructions",
        "Parent involvement in homework routine",
      ],
      confidence: 90,
    },
    {
      id: 5,
      name: "Grace Nalongo",
      class: "S5A",
      avatar: "GN",
      issues: ["High absenteeism", "Social isolation concerns"],
      priority: "high",
      aiSuggestions: [
        "Wellness check with school counselor",
        "Facilitate peer support group",
        "Flexible catch-up arrangements",
      ],
      confidence: 87,
    },
  ];

  const subjectImprovements = [
    {
      subject: "Mathematics",
      class: "S4A",
      currentAvg: 65,
      targetAvg: 75,
      studentsAffected: 12,
      weakAreas: ["Algebra", "Word Problems", "Graphing"],
      recommendations: [
        "Dedicate 30 minutes weekly to algebra drills",
        "Use real-world examples for word problems",
        "Interactive graphing software demonstrations",
        "Weekly formative assessments to track progress",
      ],
      impact: "high",
      timeline: "6 weeks",
      confidence: 91,
    },
    {
      subject: "Physics",
      class: "S5B",
      currentAvg: 58,
      targetAvg: 70,
      studentsAffected: 15,
      weakAreas: ["Mechanics", "Electricity", "Wave Theory"],
      recommendations: [
        "More hands-on lab experiments",
        "Video simulations for abstract concepts",
        "Peer teaching sessions for top performers",
        "Supplementary reading materials",
      ],
      impact: "high",
      timeline: "8 weeks",
      confidence: 89,
    },
    {
      subject: "English",
      class: "S2B",
      currentAvg: 68,
      targetAvg: 75,
      studentsAffected: 10,
      weakAreas: ["Essay Structure", "Grammar", "Vocabulary"],
      recommendations: [
        "Weekly essay writing practice",
        "Grammar worksheets with immediate feedback",
        "Vocabulary building games",
        "Reading club to improve comprehension",
      ],
      impact: "medium",
      timeline: "5 weeks",
      confidence: 86,
    },
    {
      subject: "Chemistry",
      class: "S3A",
      currentAvg: 71,
      targetAvg: 80,
      studentsAffected: 8,
      weakAreas: ["Chemical Equations", "Stoichiometry"],
      recommendations: [
        "Step-by-step equation balancing tutorials",
        "Mole concept visualization tools",
        "Practice problems with increasing difficulty",
        "Small group problem-solving sessions",
      ],
      impact: "medium",
      timeline: "4 weeks",
      confidence: 88,
    },
  ];

  const teachingStrategies = [
    {
      strategy: "Flipped Classroom for S4 Sciences",
      description: "Students watch lecture videos at home, class time for problem-solving",
      benefits: ["More interactive class time", "Students learn at own pace", "Personalized support"],
      implementation: ["Record 15-minute topic videos", "Create practice worksheets", "Dedicate class to Q&A"],
      expectedImpact: "+12% average scores",
      confidence: 84,
    },
    {
      strategy: "Peer Teaching Program",
      description: "Top students mentor struggling peers in specific subjects",
      benefits: ["Reinforces learning for mentors", "Personalized help for mentees", "Builds community"],
      implementation: ["Identify top 20% performers", "Match with struggling students", "Weekly 30-min sessions"],
      expectedImpact: "+8% for struggling students",
      confidence: 90,
    },
    {
      strategy: "Gamification of Math Practice",
      description: "Use point systems and leaderboards for math exercises",
      benefits: ["Increased engagement", "Friendly competition", "Immediate feedback"],
      implementation: ["Set up digital platform", "Weekly challenges", "Reward top performers"],
      expectedImpact: "+15% homework completion",
      confidence: 87,
    },
  ];

  const interventions = [
    {
      title: "Attendance Recovery Program",
      targetGroup: "Students with <75% attendance",
      studentsAffected: 23,
      actions: [
        "Weekly check-ins with affected students",
        "Parent communication protocol",
        "Flexible catch-up sessions",
        "Identify and address root causes",
      ],
      expectedOutcome: "Bring attendance to 85% within 6 weeks",
      priority: "high",
      confidence: 89,
    },
    {
      title: "Exam Anxiety Workshop Series",
      targetGroup: "S4 & S5 students reporting stress",
      studentsAffected: 34,
      actions: [
        "Bi-weekly mindfulness sessions",
        "Study skills workshops",
        "Mock exam practice",
        "Counselor-led stress management",
      ],
      expectedOutcome: "15% improvement in exam performance",
      priority: "medium",
      confidence: 82,
    },
  ];

  const stats = [
    { label: "Students Needing Support", value: studentsNeedingAttention.length.toString(), icon: Users, color: "from-orange-500 to-red-500" },
    { label: "Subject Improvements", value: subjectImprovements.length.toString(), icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Teaching Strategies", value: teachingStrategies.length.toString(), icon: Lightbulb, color: "from-blue-500 to-cyan-500" },
    { label: "Active Interventions", value: interventions.length.toString(), icon: Target, color: "from-purple-500 to-pink-500" },
  ];

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              AI Recommendations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Intelligent insights to improve student outcomes</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${stat.color} text-white`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="w-8 h-8 text-white/80" />
                  </div>
                  <p className="text-white/80 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-1">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Students Needing Attention */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          Students Needing Extra Attention
        </h2>
        <div className="space-y-4">
          {studentsNeedingAttention.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500">
                        <div className="w-full h-full flex items-center justify-center text-white font-bold">
                          {student.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <CardDescription>{student.class}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getPriorityBadge(student.priority)}>
                      {student.priority} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Identified Issues:</p>
                      <ul className="space-y-1">
                        {student.issues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4">
                      <div className="flex items-start gap-2 mb-3">
                        <Brain className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-sm">AI-Powered Suggestions:</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Confidence: {student.confidence}%</p>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {student.aiSuggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Implement Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subject-Specific Improvements */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Subject Performance Improvement Plans
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {subjectImprovements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{improvement.subject} - {improvement.class}</CardTitle>
                      <CardDescription>{improvement.studentsAffected} students affected • {improvement.timeline}</CardDescription>
                    </div>
                    <Badge className={improvement.impact === 'high' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}>
                      {improvement.impact} impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Current Average</span>
                      <span className="font-bold text-red-600">{improvement.currentAvg}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Target Average</span>
                      <span className="font-bold text-green-600">{improvement.targetAvg}%</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Weak Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {improvement.weakAreas.map((area, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                      <p className="text-sm font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        Recommended Actions:
                      </p>
                      <ul className="space-y-1">
                        {improvement.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <CheckCircle className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">AI Confidence:</span>
                      <span className="font-bold text-purple-600">{improvement.confidence}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Teaching Strategies */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          Recommended Teaching Strategies
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {teachingStrategies.map((strategy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{strategy.strategy}</CardTitle>
                  <CardDescription>{strategy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Benefits:</p>
                      <ul className="space-y-1">
                        {strategy.benefits.map((benefit, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <Target className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                        Expected Impact: {strategy.expectedImpact}
                      </p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                        AI Confidence: {strategy.confidence}%
                      </p>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Implementation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interventions */}
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Suggested Interventions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {interventions.map((intervention, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{intervention.title}</CardTitle>
                      <CardDescription>{intervention.targetGroup} • {intervention.studentsAffected} students</CardDescription>
                    </div>
                    <Badge className={getPriorityBadge(intervention.priority)}>
                      {intervention.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Action Plan:</p>
                      <ul className="space-y-1">
                        {intervention.actions.map((action, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">
                        Expected Outcome:
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        {intervention.expectedOutcome}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                        AI Confidence: {intervention.confidence}%
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      Launch Intervention
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • AI-Powered Educational Recommendations
      </div>
    </div>
  );
}
