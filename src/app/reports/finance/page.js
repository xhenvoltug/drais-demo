"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Printer,
  FileText,
  Calendar,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Wallet,
  Building,
  BarChart3,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function FinancialReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024");
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Summary metrics
  const summaryMetrics = [
    {
      title: "Total Income",
      value: "UGX 9.8B",
      change: "+24.5%",
      trend: "up",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
    },
    {
      title: "Total Expenses",
      value: "UGX 6.2B",
      change: "+12.3%",
      trend: "up",
      icon: TrendingDown,
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
    },
    {
      title: "Net Profit",
      value: "UGX 3.6B",
      change: "+48.7%",
      trend: "up",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      title: "Outstanding Fees",
      value: "UGX 1.4B",
      change: "-15.2%",
      trend: "down",
      icon: Wallet,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];

  // Monthly income & expenses
  const monthlyData = [
    { month: "Jan", income: 750000000, expenses: 480000000, profit: 270000000 },
    { month: "Feb", income: 820000000, expenses: 510000000, profit: 310000000 },
    { month: "Mar", income: 890000000, expenses: 540000000, profit: 350000000 },
    { month: "Apr", income: 950000000, expenses: 580000000, profit: 370000000 },
    { month: "May", income: 1020000000, expenses: 620000000, profit: 400000000 },
    { month: "Jun", income: 880000000, expenses: 560000000, profit: 320000000 },
    { month: "Jul", income: 760000000, expenses: 490000000, profit: 270000000 },
    { month: "Aug", income: 980000000, expenses: 600000000, profit: 380000000 },
    { month: "Sep", income: 1050000000, expenses: 650000000, profit: 400000000 },
    { month: "Oct", income: 920000000, expenses: 590000000, profit: 330000000 },
    { month: "Nov", income: 960000000, expenses: 610000000, profit: 350000000 },
    { month: "Dec", income: 890000000, expenses: 570000000, profit: 320000000 },
  ];

  // Income breakdown
  const incomeBreakdown = [
    { category: "Tuition Fees", amount: 6800000000, percentage: 69.4, color: "#3b82f6" },
    { category: "Boarding Fees", amount: 1500000000, percentage: 15.3, color: "#8b5cf6" },
    { category: "Transport", amount: 800000000, percentage: 8.2, color: "#10b981" },
    { category: "Uniform Sales", amount: 450000000, percentage: 4.6, color: "#f59e0b" },
    { category: "Other Income", amount: 250000000, percentage: 2.5, color: "#6b7280" },
  ];

  // Expense breakdown
  const expenseBreakdown = [
    { category: "Salaries & Wages", amount: 3200000000, percentage: 51.6, color: "#ef4444" },
    { category: "Utilities", amount: 950000000, percentage: 15.3, color: "#f97316" },
    { category: "Maintenance", amount: 720000000, percentage: 11.6, color: "#eab308" },
    { category: "Supplies", amount: 680000000, percentage: 11.0, color: "#84cc16" },
    { category: "Other Expenses", amount: 650000000, percentage: 10.5, color: "#6b7280" },
  ];

  // Recent transactions
  const recentTransactions = [
    { id: "TXN-2024-5847", date: "2024-12-03", description: "Tuition Fee Payment - P5A", type: "income", amount: 2500000, status: "completed" },
    { id: "TXN-2024-5846", date: "2024-12-03", description: "Staff Salary Payment - November", type: "expense", amount: 280000000, status: "completed" },
    { id: "TXN-2024-5845", date: "2024-12-02", description: "Boarding Fee Payment - S2B", type: "income", amount: 1800000, status: "completed" },
    { id: "TXN-2024-5844", date: "2024-12-02", description: "Electricity Bill - November", type: "expense", amount: 45000000, status: "completed" },
    { id: "TXN-2024-5843", date: "2024-12-01", description: "Transport Fee Payment - P3C", type: "income", amount: 800000, status: "completed" },
    { id: "TXN-2024-5842", date: "2024-12-01", description: "Lab Equipment Purchase", type: "expense", amount: 12000000, status: "pending" },
    { id: "TXN-2024-5841", date: "2024-11-30", description: "Uniform Sale - Multiple Students", type: "income", amount: 3200000, status: "completed" },
    { id: "TXN-2024-5840", date: "2024-11-30", description: "Food Supplies", type: "expense", amount: 25000000, status: "completed" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Financial Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive financial analytics and statements
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800"
              >
                <option value="2024">Year 2024</option>
                <option value="2023">Year 2023</option>
                <option value="q4-2024">Q4 2024</option>
                <option value="q3-2024">Q3 2024</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowPrintModal(true)}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${metric.bgColor} border-0 overflow-hidden relative`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${metric.color} opacity-10 rounded-full -mr-16 -mt-16`} />
              <CardContent className="p-6 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                    <metric.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${
                      metric.trend === "up"
                        ? "border-green-500 text-green-600"
                        : "border-red-500 text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Income Statement Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Income Statement (2024)
          </CardTitle>
          <CardDescription>Monthly income, expenses, and profit trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
              <Tooltip
                formatter={(value) => `UGX ${(value / 1000000).toFixed(1)}M`}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={3} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} name="Net Profit" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income & Expense Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Income Breakdown
            </CardTitle>
            <CardDescription>Revenue sources distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomeBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {incomeBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `UGX ${(value / 1000000).toFixed(1)}M`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {incomeBreakdown.map((item) => (
                <div key={item.category} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.category}</span>
                  </div>
                  <span className="font-bold">UGX {(item.amount / 1000000).toFixed(1)}M</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-600" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Expenditure categories distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={expenseBreakdown} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis type="number" tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                <YAxis dataKey="category" type="category" width={120} />
                <Tooltip
                  formatter={(value) => `UGX ${(value / 1000000).toFixed(1)}M`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Recent Transactions
          </CardTitle>
          <CardDescription>Latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-3 font-medium text-sm">Transaction ID</th>
                  <th className="text-left p-3 font-medium text-sm">Date</th>
                  <th className="text-left p-3 font-medium text-sm">Description</th>
                  <th className="text-left p-3 font-medium text-sm">Type</th>
                  <th className="text-right p-3 font-medium text-sm">Amount</th>
                  <th className="text-center p-3 font-medium text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((txn, index) => (
                  <motion.tr
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="p-3 font-mono text-sm text-gray-600 dark:text-gray-400">{txn.id}</td>
                    <td className="p-3 text-sm">{txn.date}</td>
                    <td className="p-3 text-sm">{txn.description}</td>
                    <td className="p-3">
                      <Badge className={txn.type === "income" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {txn.type === "income" ? "Income" : "Expense"}
                      </Badge>
                    </td>
                    <td className={`p-3 text-right font-bold ${txn.type === "income" ? "text-green-600" : "text-red-600"}`}>
                      {txn.type === "income" ? "+" : "-"}UGX {txn.amount.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant="outline" className={txn.status === "completed" ? "border-green-500 text-green-600" : "border-orange-500 text-orange-600"}>
                        {txn.status}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Print Modal */}
      <Dialog open={showPrintModal} onOpenChange={setShowPrintModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Print Preview - Financial Report</DialogTitle>
          </DialogHeader>
          <div className="p-6 bg-white dark:bg-gray-900">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">DRAIS Financial Report</h2>
              <p className="text-gray-600">Period: {selectedPeriod}</p>
            </div>
            <div className="space-y-4">
              {summaryMetrics.map((metric) => (
                <div key={metric.title} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{metric.title}:</span>
                  <span className="font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                Print Document
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowPrintModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Financial Reports
      </div>
    </div>
  );
}
