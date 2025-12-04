"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  BookOpen,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Target,
  Sparkles,
  ArrowRight,
  Brain,
  Zap,
  Award,
  CalendarDays,
  DollarSign,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AIInsightsPage() {
  const [selectedInsightType, setSelectedInsightType] = useState("all");

  // Student intervention recommendations
  const studentInterventions = [
    {
      id: 1,
      student: "Sarah Nakato",
      class: "P5A",
      priority: "high",
      concerns: ["Math performance declining", "Missing 3 assignments", "Attendance at 78%"],
      recommendations: [
        "Schedule one-on-one tutoring sessions for Mathematics",
        "Contact parents regarding attendance issues",
        "Assign peer mentor from P6 high performers",
        "Monitor progress weekly with subject teacher"
      ],
      expectedImpact: "85% chance of improvement within 4 weeks",
      confidence: 92,
    },
    {
      id: 2,
      student: "John Kamau",
      class: "S2B",
      priority: "high",
      concerns: ["Low engagement in English", "Discipline incident last week", "Fees partially paid"],
      recommendations: [
        "Engage with school counselor for behavioral support",
        "Arrange payment plan discussion with parents",
        "Enroll in English reading club for engagement",
        "Assign class prefect mentorship role to boost confidence"
      ],
      expectedImpact: "78% chance of behavioral improvement",
      confidence: 88,
    },
    {
      id: 3,
      student: "David Okello",
      class: "S3A",
      priority: "medium",
      concerns: ["Science scores below average", "Low attendance (72%)"],
      recommendations: [
        "Provide supplementary Science lab sessions",
        "Investigate reasons for attendance issues",
        "Pair with study group for collaborative learning"
      ],
      expectedImpact: "70% chance of grade improvement",
      confidence: 85,
    },
  ];

  // Resource allocation recommendations
  const resourceAllocations = [
    {
      id: 1,
      area: "Mathematics Department",
      issue: "82% of S1-S3 students struggling with algebra",
      recommendation: "Allocate 2 additional math teachers for remedial classes",
      budget: "UGX 12M per term",
      impact: "Expected 15% improvement in pass rates",
      timeline: "Implement by Week 2 of next term",
      confidence: 89,
      priority: "high",
    },
    {
      id: 2,
      area: "Science Laboratory",
      issue: "Practical sessions limited to 60% of required capacity",
      recommendation: "Upgrade lab equipment and extend lab hours by 40%",
      budget: "UGX 25M one-time investment",
      impact: "Increase practical engagement by 35%",
      timeline: "Complete within 6 weeks",
      confidence: 91,
      priority: "high",
    },
    {
      id: 3,
      area: "Library Services",
      issue: "Only 45% of students access library weekly",
      recommendation: "Introduce digital lending system and extend hours to weekends",
      budget: "UGX 8M setup + UGX 2M monthly",
      impact: "Projected 60% increase in library usage",
      timeline: "Deploy within 3 weeks",
      confidence: 86,
      priority: "medium",
    },
    {
      id: 4,
      area: "Boarding Facilities",
      issue: "Overcrowding in S4-S6 dormitories affecting study time",
      recommendation: "Renovate additional wing to reduce occupancy by 25%",
      budget: "UGX 45M capital expenditure",
      impact: "Improve student well-being and study quality",
      timeline: "Complete during holiday break",
      confidence: 94,
      priority: "medium",
    },
  ];

  // Term performance predictions
  const termPredictions = [
    {
      id: 1,
      class: "P7",
      currentAvg: 79.5,
      predictedAvg: 82.3,
      passRate: 94,
      predictedPassRate: 96,
      topPerformers: 12,
      atRisk: 3,
      insights: [
        "Strong momentum in Mathematics (+8% improvement trend)",
        "English language scores stabilizing around 85%",
        "Science practical scores showing upward trajectory"
      ],
      recommendations: [
        "Maintain current teaching strategies",
        "Focus remedial support on 3 at-risk students",
        "Introduce advanced challenges for top 12 performers"
      ],
    },
    {
      id: 2,
      class: "S3",
      currentAvg: 74.2,
      predictedAvg: 76.8,
      passRate: 87,
      predictedPassRate: 90,
      topPerformers: 18,
      atRisk: 9,
      insights: [
        "Physics and Chemistry showing improvement (+5%)",
        "History and Geography need additional focus",
        "Overall engagement up by 12% this term"
      ],
      recommendations: [
        "Deploy subject-specific intervention for humanities",
        "Increase practical lab sessions for sciences",
        "Monitor 9 at-risk students bi-weekly"
      ],
    },
    {
      id: 3,
      class: "S6",
      currentAvg: 81.7,
      predictedAvg: 84.5,
      passRate: 95,
      predictedPassRate: 97,
      topPerformers: 22,
      atRisk: 2,
      insights: [
        "Exceptional performance across all subjects",
        "Mock exam results 7% above national average",
        "University preparation workshops highly effective"
      ],
      recommendations: [
        "Continue intensive revision programs",
        "Arrange university entrance exam prep",
        "Provide scholarship application support for top performers"
      ],
    },
  ];

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-orange-100 text-orange-800 border-orange-300",
      low: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    return styles[priority] || styles.low;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Driven Decision Insights
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Actionable recommendations and strategic interventions powered by AI
            </p>
          </div>
        </div>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-sm">Insight Type:</span>
            <select
              value={selectedInsightType}
              onChange={(e) => setSelectedInsightType(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-800"
            >
              <option value="all">All Insights</option>
              <option value="students">Student Interventions</option>
              <option value="resources">Resource Allocation</option>
              <option value="predictions">Performance Predictions</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Student Interventions */}
      {(selectedInsightType === "all" || selectedInsightType === "students") && (
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Student Intervention Recommendations
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studentInterventions.map((intervention, index) => (
              <motion.div
                key={intervention.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{intervention.student}</CardTitle>
                        <CardDescription>{intervention.class}</CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge className={getPriorityBadge(intervention.priority)}>
                          {intervention.priority.toUpperCase()} PRIORITY
                        </Badge>
                        <Badge variant="outline" className="mt-2 border-purple-500 text-purple-600">
                          <Brain className="w-3 h-3 mr-1" />
                          AI {intervention.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Concerns */}
                    <div>
                      <p className="font-medium text-sm mb-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        Identified Concerns:
                      </p>
                      <ul className="space-y-1">
                        {intervention.concerns.map((concern, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <p className="font-medium text-sm mb-2 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        Recommended Actions:
                      </p>
                      <ul className="space-y-1">
                        {intervention.recommendations.map((rec, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Expected Impact */}
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Expected Impact:
                      </p>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        {intervention.expectedImpact}
                      </p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                      Implement Intervention Plan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Resource Allocation */}
      {(selectedInsightType === "all" || selectedInsightType === "resources") && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-orange-600" />
            Strategic Resource Allocation
          </h2>
          <div className="space-y-6">
            {resourceAllocations.map((allocation, index) => (
              <motion.div
                key={allocation.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        allocation.priority === "high" ? "from-red-500 to-orange-600" : "from-yellow-500 to-orange-600"
                      } flex items-center justify-center flex-shrink-0`}>
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{allocation.area}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{allocation.issue}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getPriorityBadge(allocation.priority)}>
                              {allocation.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="mt-2 border-purple-500 text-purple-600">
                              <Sparkles className="w-3 h-3 mr-1" />
                              {allocation.confidence}%
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Budget Required</p>
                            <p className="font-bold text-green-700 dark:text-green-400">{allocation.budget}</p>
                          </div>
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Expected Impact</p>
                            <p className="font-bold text-blue-700 dark:text-blue-400">{allocation.impact}</p>
                          </div>
                          <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Timeline</p>
                            <p className="font-bold text-purple-700 dark:text-purple-400">{allocation.timeline}</p>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                          <p className="font-medium text-sm mb-2 flex items-center gap-2">
                            <Lightbulb className="w-4 h-4 text-purple-600" />
                            AI Recommendation:
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {allocation.recommendation}
                          </p>
                        </div>

                        <div className="flex gap-3 mt-4">
                          <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600">
                            Approve & Implement
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Request More Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Term Performance Predictions */}
      {(selectedInsightType === "all" || selectedInsightType === "predictions") && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            Term Performance Predictions
          </h2>
          <div className="space-y-6">
            {termPredictions.map((prediction, index) => (
              <motion.div
                key={prediction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Class {prediction.class}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs opacity-90">Current Average</p>
                        <p className="text-2xl font-bold">{prediction.currentAvg}%</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-90">Predicted Average</p>
                        <p className="text-2xl font-bold">{prediction.predictedAvg}%</p>
                        <Badge className="mt-1 bg-white text-green-700">
                          +{(prediction.predictedAvg - prediction.currentAvg).toFixed(1)}%
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs opacity-90">Pass Rate</p>
                        <p className="text-2xl font-bold">{prediction.predictedPassRate}%</p>
                      </div>
                      <div>
                        <p className="text-xs opacity-90">At Risk / Top</p>
                        <p className="text-2xl font-bold">{prediction.atRisk} / {prediction.topPerformers}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* AI Insights */}
                      <div>
                        <p className="font-medium mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5 text-blue-600" />
                          AI-Detected Insights:
                        </p>
                        <ul className="space-y-2">
                          {prediction.insights.map((insight, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <TrendingUp className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Recommendations */}
                      <div>
                        <p className="font-medium mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-600" />
                          Strategic Recommendations:
                        </p>
                        <ul className="space-y-2">
                          {prediction.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      View Detailed Class Report
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Card */}
      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Insights Executive Summary
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                The AI Copilot has analyzed {studentInterventions.length} high-priority student cases requiring immediate intervention, 
                identified {resourceAllocations.length} strategic resource allocation opportunities with combined budget of UGX 90M, 
                and predicted performance improvements across {termPredictions.length} key classes. Implementation of these recommendations 
                is projected to increase overall school performance by 8-12% within one academic term.
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Generate Budget Proposal
                </Button>
                <Button size="sm" variant="outline">
                  <ArrowRight className="w-4 h-4 mr-1" />
                  Export All Insights
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • AI-Driven Decision Insights • Transforming Data into Action
      </div>
    </div>
  );
}
