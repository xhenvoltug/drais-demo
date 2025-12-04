"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { DRAIS_VERSION } from "@/lib/version";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  FileText,
  Lightbulb,
  Play,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Target,
  AlertTriangle,
  DollarSign,
  Fingerprint,
  BarChart3,
  MessageSquare,
  Calendar,
  CreditCard,
  Shield,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Documentation content database
const docContent = {
  "ai-copilot": {
    title: "AI Copilot & Predictions",
    icon: Brain,
    color: "from-purple-500 to-pink-600",
    level: "Advanced",
    readTime: "18 min",
    lastUpdated: "December 2025",
    description: "Harness AI-powered insights to predict student performance, forecast fees collection, and receive automated recommendations for interventions.",
    sections: [
      {
        title: "Overview",
        content: "The AI Copilot is DRAIS's most advanced feature, leveraging machine learning to analyze patterns across student performance, attendance, fees, and behavior. It provides predictive insights with 94% accuracy and automated recommendations.",
      },
      {
        title: "Key Features",
        items: [
          { title: "Student Risk Analysis", desc: "Identifies students at risk of falling behind based on attendance, performance, fees status, and behavioral patterns." },
          { title: "Performance Predictions", desc: "Forecasts term results with class-level and individual student predictions." },
          { title: "Financial Forecasting", desc: "Predicts fee collection rates and revenue projections for budget planning." },
          { title: "Automated Alerts", desc: "Real-time notifications for critical situations with recommended actions." },
          { title: "Resource Recommendations", desc: "AI-generated suggestions for budget allocation and infrastructure improvements." },
        ]
      },
      {
        title: "Step-by-Step Workflow",
        steps: [
          { step: 1, title: "Access AI Copilot Dashboard", desc: "Navigate to AI Copilot from the sidebar. View 4 predictive insight cards showing students at risk, attendance alerts, fees forecast, and discipline trends." },
          { step: 2, title: "Review Predictive Insights", desc: "Each card displays AI confidence scores (87-94%). Click any card to see detailed breakdowns and charts." },
          { step: 3, title: "Analyze Students at Risk", desc: "Review the table of 47 students identified by AI with risk scores. Filter by class, subject, or term." },
          { step: 4, title: "Explore Decision Insights", desc: "Click 'Decision Insights' to see student interventions, resource allocations, and term predictions with recommended actions." },
          { step: 5, title: "Respond to AI Alerts", desc: "AI alerts appear automatically in the bottom-right corner. High-priority alerts (fees, attendance) show first with confidence scores and recommended actions." },
          { step: 6, title: "Implement Recommendations", desc: "Click 'Implement Intervention Plan' or 'Approve & Implement' to acknowledge AI suggestions. Track outcomes in analytics." },
        ]
      },
      {
        title: "Best Practices",
        tips: [
          "Review AI Copilot dashboard daily to stay ahead of potential issues",
          "Act on high-priority alerts (94% confidence) within 24 hours for maximum impact",
          "Cross-reference AI predictions with teacher observations for validation",
          "Use resource allocation recommendations during budget planning cycles",
          "Export AI reports monthly to track prediction accuracy and institutional trends",
        ]
      },
      {
        title: "Interactive Example",
        example: {
          scenario: "AI detects 47 students with payment delays",
          confidence: "94%",
          recommendation: "Immediate follow-up via SMS and parent meetings",
          expectedImpact: "72% payment recovery within 2 weeks",
        }
      }
    ],
    relatedDocs: [
      { title: "Analytics Dashboard", slug: "analytics" },
      { title: "Student Management", slug: "students" },
      { title: "Financial Reports", slug: "reports-finance" },
    ]
  },
  "biometric": {
    title: "Biometric Attendance",
    icon: Fingerprint,
    color: "from-green-500 to-emerald-600",
    level: "Advanced",
    readTime: "10 min",
    lastUpdated: "December 2025",
    description: "Modern biometric attendance tracking using fingerprint and face recognition technology for accurate, tamper-proof attendance records.",
    sections: [
      {
        title: "Overview",
        content: "Biometric attendance eliminates proxy attendance and manual errors. Students use fingerprint scanners or face recognition for instant check-in. Real-time data syncs to teacher dashboards and parent portals.",
      },
      {
        title: "Key Features",
        items: [
          { title: "Fingerprint Scanning", desc: "Fast, accurate fingerprint recognition with 99.8% accuracy rate." },
          { title: "Face ID Recognition", desc: "Camera-based facial recognition for touchless attendance in pandemic situations." },
          { title: "Real-time Sync", desc: "Attendance data updates instantly across all dashboards and parent apps." },
          { title: "Tamper-Proof Records", desc: "Biometric data prevents proxy attendance and manipulation." },
          { title: "Multi-Device Support", desc: "Works with dedicated scanners, tablets, and smartphones." },
        ]
      },
      {
        title: "Step-by-Step Workflow",
        steps: [
          { step: 1, title: "Navigate to Biometric Attendance", desc: "Go to Attendance → Biometric from sidebar. Select class or grade level." },
          { step: 2, title: "Choose Scan Method", desc: "Select Fingerprint or Face ID mode. Device will activate scanning interface." },
          { step: 3, title: "Student Check-In", desc: "Student places finger on scanner or looks at camera. System processes biometric data within 0.5 seconds." },
          { step: 4, title: "Confirmation", desc: "Green checkmark animation confirms successful scan. Student name displays with photo and timestamp." },
          { step: 5, title: "View Daily Report", desc: "Real-time attendance table updates showing present/absent students with percentages per class." },
          { step: 6, title: "Generate Reports", desc: "Export biometric attendance data for payroll, compliance, or parent communication." },
        ]
      },
      {
        title: "Best Practices",
        tips: [
          "Enroll all students during first week of term for smooth operations",
          "Keep biometric devices clean for optimal scanning accuracy",
          "Use Face ID mode during flu season to reduce physical contact",
          "Review daily reports before 10am to identify absences early",
          "Enable parent SMS notifications for automatic absence alerts",
        ]
      },
      {
        title: "Interactive Example",
        example: {
          scenario: "Morning attendance for S3 class (48 students)",
          scanTime: "Average 0.4 seconds per student",
          totalTime: "Complete class scan in under 2 minutes",
          accuracy: "99.8% match rate, 0% proxy attendance",
        }
      }
    ],
    relatedDocs: [
      { title: "Attendance Tracking", slug: "attendance" },
      { title: "Student Management", slug: "students" },
      { title: "Analytics Dashboard", slug: "analytics" },
    ]
  },
  "quick-start": {
    title: "Quick Start Guide",
    icon: Zap,
    color: "from-yellow-500 to-orange-600",
    level: "Beginner",
    readTime: "10 min",
    lastUpdated: "December 2025",
    description: "Get up and running with DRAIS in minutes. This guide covers essential setup steps and your first tasks.",
    sections: [
      {
        title: "Welcome to DRAIS",
        content: "DRAIS is your all-in-one school management platform. This quick start guide will walk you through core features and get you productive immediately.",
      },
      {
        title: "First Steps",
        steps: [
          { step: 1, title: "Access Your Dashboard", desc: "Login with credentials provided by your admin. You'll land on the main dashboard showing key metrics." },
          { step: 2, title: "Complete Your Profile", desc: "Click your avatar → Profile Settings. Add your photo, contact info, and notification preferences." },
          { step: 3, title: "Explore the Sidebar", desc: "Navigation is organized by function: Students, Attendance, Exams, Fees, etc. Click any section to explore." },
          { step: 4, title: "Try the Search", desc: "Press Ctrl+K (Cmd+K on Mac) to search for students, classes, or features instantly." },
          { step: 5, title: "Set Up Notifications", desc: "Go to Settings → Notifications to choose email/SMS alerts for attendance, fees, exams." },
        ]
      },
      {
        title: "Essential Features",
        items: [
          { title: "Dashboard", desc: "Your command center with real-time metrics, charts, and quick actions." },
          { title: "Student Management", desc: "Add, edit, search 4000+ student records with advanced filters." },
          { title: "Attendance", desc: "Mark attendance manually, via biometric, or bulk import." },
          { title: "Messaging", desc: "Send announcements to parents, students, or staff instantly." },
        ]
      },
      {
        title: "Pro Tips",
        tips: [
          "Use keyboard shortcuts: Ctrl+K for search, Ctrl+D for dashboard",
          "Enable dark mode from top-right toggle for reduced eye strain",
          "Pin frequently-used features to your dashboard for quick access",
          "Check AI Copilot daily for predictive insights and alerts",
          "Export reports weekly to track institutional progress",
        ]
      },
    ],
    relatedDocs: [
      { title: "Dashboard Overview", slug: "dashboard" },
      { title: "User Roles & Permissions", slug: "roles-overview" },
      { title: "System Requirements", slug: "requirements" },
    ]
  },
  "students": {
    title: "Student Management",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    level: "Intermediate",
    readTime: "12 min",
    lastUpdated: "December 2025",
    description: "Comprehensive student lifecycle management from admission to graduation with advanced search, filters, and bulk operations.",
    sections: [
      {
        title: "Overview",
        content: "Student Management is the foundation of DRAIS. Track 4000+ students with detailed profiles, academic history, attendance records, fees status, and parent/guardian information.",
      },
      {
        title: "Key Capabilities",
        items: [
          { title: "Student Profiles", desc: "Complete records with photos, contact info, medical history, and emergency contacts." },
          { title: "Academic Tracking", desc: "View term results, subject performance, teacher comments, and progression history." },
          { title: "Attendance History", desc: "Detailed attendance records with charts showing trends and patterns." },
          { title: "Fees Management", desc: "Track payment history, outstanding balances, and payment plans." },
          { title: "Bulk Operations", desc: "Import/export via CSV, mass updates, class promotions, and report generation." },
        ]
      },
      {
        title: "Common Tasks",
        steps: [
          { step: 1, title: "Add New Student", desc: "Click '+ New Student' → Fill admission form → Upload photo → Assign class → Save." },
          { step: 2, title: "Search Students", desc: "Use search bar (Ctrl+K) or advanced filters by class, gender, age, status, fees balance." },
          { step: 3, title: "Edit Profile", desc: "Click student → Edit → Update fields → Save changes. History is auto-logged in audit trail." },
          { step: 4, title: "View Performance", desc: "Student profile → Academic tab → See term results, subject performance charts, teacher comments." },
          { step: 5, title: "Generate Reports", desc: "Select students → Actions → Generate Reports → Choose template → Export as PDF or Excel." },
        ]
      },
      {
        title: "Best Practices",
        tips: [
          "Upload student photos during admission for easy identification",
          "Update emergency contacts annually at start of term",
          "Use student tags/categories for scholarships, boarding, etc.",
          "Enable parent portal access for fee-paying parents",
          "Archive graduated students annually to maintain database performance",
        ]
      },
    ],
    relatedDocs: [
      { title: "Attendance Tracking", slug: "attendance" },
      { title: "Fee Management", slug: "fees" },
      { title: "Parent Portal", slug: "parent-portal" },
    ]
  },
  "payments": {
    title: "Payment Processing",
    icon: CreditCard,
    color: "from-pink-500 to-rose-600",
    level: "Advanced",
    readTime: "15 min",
    lastUpdated: "December 2025",
    description: "Seamless integration with MTN Mobile Money and Airtel Money for automated fee collection with real-time reconciliation.",
    sections: [
      {
        title: "Overview",
        content: "DRAIS integrates with Uganda's leading mobile money platforms to enable parents to pay school fees directly from their phones. Payments reconcile automatically with student accounts.",
      },
      {
        title: "Supported Payment Methods",
        items: [
          { title: "MTN Mobile Money", desc: "Direct integration with MTN MoMo API for instant payments and confirmations." },
          { title: "Airtel Money", desc: "Airtel Money integration with SMS confirmation and auto-posting to ledgers." },
          { title: "Bank Transfers", desc: "Manual posting of bank transfers with reference number matching." },
          { title: "Cash Payments", desc: "Generate receipts for cash payments at school office." },
        ]
      },
      {
        title: "Payment Workflow",
        steps: [
          { step: 1, title: "Parent Receives Invoice", desc: "System auto-generates fee invoices at term start. Sent via SMS/email with payment instructions." },
          { step: 2, title: "Initiate Mobile Money", desc: "Parent dials *165# (MTN) or *185# (Airtel) → Enter school payment code → Enter amount → Confirm." },
          { step: 3, title: "Real-time Processing", desc: "Payment processes in 10-30 seconds. DRAIS receives API callback with transaction details." },
          { step: 4, title: "Auto-Reconciliation", desc: "System matches payment to student account using phone number or reference code. Updates balance instantly." },
          { step: 5, title: "Confirmation", desc: "Parent receives SMS receipt. Student account shows updated balance. Admin sees payment in dashboard." },
          { step: 6, title: "Reports & Analytics", desc: "View daily collections, outstanding balances, payment trends in Financial Reports." },
        ]
      },
      {
        title: "Best Practices",
        tips: [
          "Send fee invoices 2 weeks before term deadline for better collection rates",
          "Enable SMS reminders for parents with outstanding balances",
          "Reconcile daily to catch failed transactions early",
          "Use payment plans for parents requesting installments",
          "Export transaction logs monthly for accounting and audits",
        ]
      },
    ],
    relatedDocs: [
      { title: "Fee Management", slug: "fees" },
      { title: "Financial Reports", slug: "reports-finance" },
      { title: "Parent Portal", slug: "parent-portal" },
    ]
  },
};

// Default fallback content
const defaultContent = {
  title: "Documentation",
  icon: BookOpen,
  color: "from-gray-500 to-gray-600",
  level: "Beginner",
  readTime: "5 min",
  lastUpdated: "December 2025",
  description: "Learn how to use this feature effectively.",
  sections: [
    {
      title: "Overview",
      content: "This documentation is currently being developed. Check back soon for detailed guides and tutorials.",
    }
  ],
  relatedDocs: [
    { title: "Quick Start Guide", slug: "quick-start" },
    { title: "Dashboard Overview", slug: "dashboard" },
  ]
};

export default function DocDetailPage() {
  const params = useParams();
  const slug = params?.slug || "quick-start";
  const doc = docContent[slug] || defaultContent;
  const [copiedSection, setCopiedSection] = useState(null);

  const getLevelBadge = (level) => {
    const styles = {
      "Beginner": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
      "Intermediate": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
      "Advanced": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
    };
    return styles[level] || styles["Beginner"];
  };

  const copyToClipboard = (text, section) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className={`bg-gradient-to-r ${doc.color} text-white py-12`}>
        <div className="container mx-auto px-4">
          <Link href="/docs">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Documentation
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <doc.icon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">{doc.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={getLevelBadge(doc.level)}>
                    {doc.level}
                  </Badge>
                  <span className="text-sm text-white/80">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {doc.readTime}
                  </span>
                  <span className="text-sm text-white/80">
                    Updated {doc.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg text-white/90">
              {doc.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="space-y-8">
              {doc.sections?.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white dark:bg-gray-900">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center justify-between">
                        <span>{section.title}</span>
                        {section.content && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(section.content, index)}
                          >
                            {copiedSection === index ? (
                              <Check className="w-4 h-4 text-green-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {section.content && (
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {section.items && (
                        <div className="space-y-4">
                          {section.items.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                              className="flex gap-4"
                            >
                              <div className="flex-shrink-0">
                                <div className={`w-10 h-10 bg-gradient-to-br ${doc.color} rounded-lg flex items-center justify-center`}>
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {item.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {section.steps && (
                        <div className="space-y-6">
                          {section.steps.map((step, stepIndex) => (
                            <motion.div
                              key={stepIndex}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: stepIndex * 0.05 }}
                              className="flex gap-4"
                            >
                              <div className="flex-shrink-0">
                                <div className={`w-12 h-12 bg-gradient-to-br ${doc.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                  {step.step}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                                  {step.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {step.desc}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {section.tips && (
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-6 border-l-4 border-yellow-500">
                          <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-5 h-5 text-yellow-600" />
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              Pro Tips
                            </h4>
                          </div>
                          <ul className="space-y-3">
                            {section.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex gap-3 text-gray-700 dark:text-gray-300">
                                <Star className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-1" />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.example && (
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center gap-2 mb-4">
                            <Play className="w-5 h-5 text-blue-600" />
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              Interactive Example
                            </h4>
                          </div>
                          <div className="space-y-3">
                            {Object.entries(section.example).map(([key, value], exIndex) => (
                              <div key={exIndex} className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                  {value}
                                </span>
                              </div>
                            ))}
                          </div>
                          <Link href={slug === 'ai-copilot' ? '/ai-copilot' : slug === 'biometric' ? '/attendance/biometric' : '/dashboard'}>
                            <Button className={`w-full mt-4 bg-gradient-to-r ${doc.color}`}>
                              <Play className="w-4 h-4 mr-2" />
                              Try in Demo Dashboard
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`bg-gradient-to-r ${doc.color} rounded-xl p-8 text-white`}
              >
                <h3 className="text-2xl font-bold mb-3">Ready to Try It?</h3>
                <p className="text-white/90 mb-6">
                  Head to your dashboard and experience this feature in action.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      Browse More Docs
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4 space-y-6">
              {/* Table of Contents */}
              <Card className="bg-white dark:bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg">On This Page</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {doc.sections?.map((section, index) => (
                      <li key={index}>
                        <a
                          href={`#section-${index}`}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {section.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Documentation */}
              {doc.relatedDocs && doc.relatedDocs.length > 0 && (
                <Card className="bg-white dark:bg-gray-900">
                  <CardHeader>
                    <CardTitle className="text-lg">Related Docs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {doc.relatedDocs.map((related, index) => (
                        <li key={index}>
                          <Link href={`/docs/${related.slug}`}>
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                              <FileText className="w-4 h-4" />
                              {related.title}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Help Card */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <Lightbulb className="w-8 h-8 text-blue-600 mb-3" />
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Need Help?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Our AI assistant can answer questions about this feature in real-time.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        DRAIS {DRAIS_VERSION} • Documentation • {doc.title}
      </div>
    </div>
  );
}
