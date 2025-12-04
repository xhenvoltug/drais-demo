"use client";

import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Sparkles, AlertCircle, CheckCircle, Target } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function AIFinancePage() {
  const collectionTrends = [
    { month: "Jan", collected: 245000, predicted: 250000, target: 277000 },
    { month: "Feb", collected: 268000, predicted: 275000, target: 292000 },
    { month: "Mar", collected: 282000, predicted: 290000, target: 300000 },
    { month: "Apr", collected: 295000, predicted: 305000, target: 310000 },
    { month: "May", collected: 310000, predicted: 320000, target: 322000 },
    { month: "Jun", collected: 325000, predicted: 335000, target: 333000 },
    { month: "Jul", predicted: 340000, target: 345000 },
    { month: "Aug", predicted: 350000, target: 355000 },
  ];

  const paymentMethods = [
    { method: "Mobile Money", current: 45, trending: "up", growth: 12 },
    { method: "Cash", current: 35, trending: "down", growth: -8 },
    { method: "Bank Transfer", current: 20, trending: "up", growth: 5 },
  ];

  const insights = [
    {
      title: "Fee Collection Improving",
      description: "12% increase this term - on track to reach UGX 335M next month",
      type: "success",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "342 Defaulters Identified",
      description: "UGX 213M pending - AI recommends automated SMS reminders",
      type: "warning",
      icon: AlertCircle,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "Mobile Money Surge",
      description: "45% of payments via Mobile Money - reduce cash handling costs",
      type: "info",
      icon: CheckCircle,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Peak Payment Period",
      description: "78% collections in Week 1 of month - optimize staffing",
      type: "info",
      icon: Target,
      color: "from-purple-500 to-purple-600",
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
            AI Finance Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Predictive financial insights and revenue optimization • v{DRAIS_VERSION}
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

        {/* Revenue Prediction */}
        <Card>
          <CardHeader>
            <CardTitle>AI Revenue Prediction</CardTitle>
            <CardDescription>Actual vs. predicted fee collection (next 2 months)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={collectionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `UGX ${value.toLocaleString()}`} />
                <Legend />
                <Area type="monotone" dataKey="collected" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Collected" />
                <Area type="monotone" dataKey="predicted" stackId="2" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} name="AI Prediction" />
                <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Payment Methods Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Analytics</CardTitle>
            <CardDescription>AI-tracked payment preferences and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{method.method}</span>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{method.current}% of payments</Badge>
                      <div className="flex items-center gap-1">
                        {method.trending === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`text-sm font-semibold ${method.trending === "up" ? "text-green-600" : "text-red-600"}`}>
                          {method.growth > 0 ? "+" : ""}{method.growth}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${method.current}%` }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className={`h-full rounded-full ${
                        method.trending === "up" ? "bg-gradient-to-r from-green-500 to-green-600" : "bg-gradient-to-r from-blue-500 to-blue-600"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <p className="text-sm">
                <Sparkles className="w-4 h-4 inline mr-2 text-purple-600" />
                <strong>AI Recommendation:</strong> Mobile Money adoption increasing rapidly. Consider: (1) Reducing cash handling infrastructure, (2) Negotiating better Mobile Money rates, (3) Training staff on digital payment support.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Financial Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Send automated SMS reminders to 342 defaulters (UGX 213M pending)",
              "Optimize staffing for Week 1 of each month (78% of collections occur then)",
              "Negotiate reduced Mobile Money transaction fees (45% of payments)",
              "Implement early payment discount incentives to accelerate collections",
              "Reduce cash handling infrastructure - shift focus to digital payments",
              "Predicted shortfall of UGX 5M next month - proactive follow-up required",
            ].map((rec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
              >
                <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm flex-1">{rec}</p>
                <Button size="sm" variant="outline">Implement</Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
