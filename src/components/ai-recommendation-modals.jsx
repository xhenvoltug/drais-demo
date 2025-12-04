"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  DollarSign,
  Calendar,
  BookOpen,
  X,
  CheckCircle,
  Brain,
  Sparkles,
  TrendingDown,
  Users,
} from "lucide-react";

// Mock alerts - in real app, this would come from AI analysis
const mockAlerts = [
  {
    id: 1,
    type: "fees",
    priority: "high",
    title: "Fees Collection Alert",
    description: "15 students in S3A have outstanding fees totaling UGX 18.5M",
    icon: DollarSign,
    color: "from-red-500 to-rose-600",
    actions: [
      "Send automated payment reminder to parents",
      "Schedule meeting with finance officer",
      "Arrange flexible payment plan"
    ],
    confidence: 94,
  },
  {
    id: 2,
    type: "attendance",
    priority: "high",
    title: "Attendance Risk Detected",
    description: "S2B class attendance dropped to 87% this week (below 90% threshold)",
    icon: Calendar,
    color: "from-orange-500 to-yellow-600",
    actions: [
      "Contact class teacher for investigation",
      "Send attendance reminder to parents",
      "Schedule class meeting to address concerns"
    ],
    confidence: 91,
  },
  {
    id: 3,
    type: "performance",
    priority: "medium",
    title: "Performance Decline Alert",
    description: "8 students showing consistent decline in Mathematics over past 3 weeks",
    icon: TrendingDown,
    color: "from-purple-500 to-pink-600",
    actions: [
      "Arrange remedial Math sessions",
      "Assign peer tutors from top performers",
      "Review teaching methodology with department head"
    ],
    confidence: 88,
  },
  {
    id: 4,
    type: "discipline",
    priority: "medium",
    title: "Behavioral Pattern Detected",
    description: "Increase in late arrivals in P5 section (32 incidents this week)",
    icon: AlertTriangle,
    color: "from-blue-500 to-cyan-600",
    actions: [
      "Implement morning assembly incentive program",
      "Engage with parents of repeat offenders",
      "Review transport schedules for delays"
    ],
    confidence: 85,
  },
  {
    id: 5,
    type: "exam",
    priority: "low",
    title: "Mock Exam Results Analysis",
    description: "P7 mock exam performance 5% below expected benchmark",
    icon: BookOpen,
    color: "from-green-500 to-emerald-600",
    actions: [
      "Intensify revision sessions for weak areas",
      "Conduct one-on-one consultations",
      "Provide additional practice materials"
    ],
    confidence: 82,
  },
];

export default function AIRecommendationModals() {
  const [alerts, setAlerts] = useState([]);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState([]);

  // Simulate receiving AI alerts after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      // Show high priority alerts first
      const highPriorityAlerts = mockAlerts.filter(a => a.priority === "high");
      if (highPriorityAlerts.length > 0 && !acknowledgedAlerts.includes(highPriorityAlerts[0].id)) {
        setCurrentAlert(highPriorityAlerts[0]);
        setShowModal(true);
      }
    }, 3000); // Show first alert after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setAlerts(mockAlerts.filter(alert => !acknowledgedAlerts.includes(alert.id)));
  }, [acknowledgedAlerts]);

  const handleDismiss = () => {
    setShowModal(false);
    setCurrentAlert(null);
  };

  const handleAcknowledge = () => {
    if (currentAlert) {
      setAcknowledgedAlerts([...acknowledgedAlerts, currentAlert.id]);
      setShowModal(false);
      
      // Show next high priority alert if available
      const remainingHighPriority = mockAlerts.filter(
        a => a.priority === "high" && !acknowledgedAlerts.includes(a.id) && a.id !== currentAlert.id
      );
      
      if (remainingHighPriority.length > 0) {
        setTimeout(() => {
          setCurrentAlert(remainingHighPriority[0]);
          setShowModal(true);
        }, 5000);
      } else {
        setCurrentAlert(null);
      }
    }
  };

  const handleShowAlert = (alert) => {
    setCurrentAlert(alert);
    setShowModal(true);
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-800 border-red-300",
      medium: "bg-orange-100 text-orange-800 border-orange-300",
      low: "bg-yellow-100 text-yellow-800 border-yellow-300",
    };
    return styles[priority] || styles.low;
  };

  return (
    <>
      {/* Floating Alert Indicator */}
      <AnimatePresence>
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="relative">
              {/* Pulse animation */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 bg-purple-500 rounded-full blur-xl"
              />
              
              <button
                onClick={() => alerts.length > 0 && handleShowAlert(alerts[0])}
                className="relative w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
              >
                <Brain className="w-7 h-7 text-white" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Recommendation Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <AnimatePresence mode="wait">
            {currentAlert && (
              <motion.div
                key={currentAlert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DialogHeader>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentAlert.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <currentAlert.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <DialogTitle className="text-xl mb-2">{currentAlert.title}</DialogTitle>
                          <div className="flex items-center gap-2">
                            <Badge className={getPriorityBadge(currentAlert.priority)}>
                              {currentAlert.priority.toUpperCase()} PRIORITY
                            </Badge>
                            <Badge variant="outline" className="border-purple-500 text-purple-600">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Confidence {currentAlert.confidence}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Alert Description */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <DialogDescription className="text-base">
                      {currentAlert.description}
                    </DialogDescription>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold">AI-Recommended Actions:</h3>
                    </div>
                    <div className="space-y-2">
                      {currentAlert.actions.map((action, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/50 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{action}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* AI Analysis Insight */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm mb-1">AI Analysis Insight:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {currentAlert.type === "fees" && "Historical data shows that early intervention increases collection rates by 35% within 2 weeks."}
                          {currentAlert.type === "attendance" && "Pattern analysis indicates similar drops correlate with upcoming holidays or weather conditions."}
                          {currentAlert.type === "performance" && "Students showing this pattern typically respond well to personalized intervention within 3-4 weeks."}
                          {currentAlert.type === "discipline" && "Behavioral trends suggest this is a temporary spike that can be addressed through targeted engagement."}
                          {currentAlert.type === "exam" && "Comparative analysis shows this gap can be closed with focused revision in identified weak areas."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={handleDismiss}
                      variant="outline"
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Dismiss for Now
                    </Button>
                    <Button
                      onClick={handleAcknowledge}
                      className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-600"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Acknowledge & Proceed
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* Alert Summary Panel (appears when clicking the floating button) */}
      {alerts.length > 0 && !showModal && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-24 right-24 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 z-30 hidden group-hover:block"
          >
            <h3 className="font-bold mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Active AI Alerts ({alerts.length})
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {alerts.slice(0, 5).map((alert) => (
                <button
                  key={alert.id}
                  onClick={() => handleShowAlert(alert)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <alert.icon className="w-4 h-4 text-gray-600" />
                    <p className="font-medium text-sm">{alert.title}</p>
                  </div>
                  <Badge className={getPriorityBadge(alert.priority)} size="sm">
                    {alert.priority}
                  </Badge>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
