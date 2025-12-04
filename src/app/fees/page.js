"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { DollarSign, Search, Plus, Download, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function FeesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const stats = [
    {
      name: "Total Expected",
      value: "UGX 1.2B",
      change: "+12.5%",
      trend: "up",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Total Collected",
      value: "UGX 987M",
      change: "+8.3%",
      trend: "up",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Pending",
      value: "UGX 213M",
      change: "-3.2%",
      trend: "down",
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Defaulters",
      value: "342",
      change: "+5.1%",
      trend: "up",
      color: "from-red-500 to-red-600",
    },
  ];

  const transactions = Array.from({ length: 50 }, (_, i) => ({
    id: `FEE${String(i + 1).padStart(6, "0")}`,
    studentId: `STD${String(Math.floor(Math.random() * 4180) + 1).padStart(5, "0")}`,
    studentName: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
    class: `Grade ${(i % 6) + 1}`,
    term: `Term ${(i % 3) + 1} - 2025`,
    amount: Math.floor(Math.random() * 500000) + 100000,
    paid: Math.floor(Math.random() * 400000),
    balance: 0,
    status: ["Paid", "Partial", "Pending"][i % 3],
    date: `2025-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    paymentMethod: ["Cash", "Mobile Money", "Bank Transfer"][i % 3],
  })).map(t => ({ ...t, balance: t.amount - t.paid }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Fees Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and manage school fees transactions • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm font-semibold ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Fee Transactions</CardTitle>
                    <CardDescription>Complete history of all fee-related transactions</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                        <Plus className="w-4 h-4 mr-2" />
                        New Transaction
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Fee Transaction</DialogTitle>
                        <DialogDescription>Record a new fee payment or bill</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Student ID</Label>
                          <Input placeholder="Enter student ID" />
                        </div>
                        <div className="space-y-2">
                          <Label>Transaction Type</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bill">Bill</SelectItem>
                              <SelectItem value="payment">Payment</SelectItem>
                              <SelectItem value="adjustment">Adjustment</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Amount</Label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="cash">Cash</SelectItem>
                              <SelectItem value="momo">Mobile Money</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600">
                          Save Transaction
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by student name or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-sm">Transaction ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Student</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Class</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Term</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Paid</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Balance</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.slice(0, 20).map((transaction, index) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.02 }}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          <td className="py-3 px-4 text-sm font-mono">{transaction.id}</td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium">{transaction.studentName}</p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">{transaction.studentId}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{transaction.class}</td>
                          <td className="py-3 px-4 text-sm">{transaction.term}</td>
                          <td className="py-3 px-4 text-sm font-semibold">
                            UGX {transaction.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-green-600 font-semibold">
                            UGX {transaction.paid.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm">
                            <span className={transaction.balance > 0 ? "text-red-600 font-semibold" : "text-green-600"}>
                              UGX {transaction.balance.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                transaction.status === "Paid" ? "default" :
                                transaction.status === "Partial" ? "warning" : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                            {transaction.date}
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bills">
            <Card>
              <CardHeader>
                <CardTitle>Fee Bills</CardTitle>
                <CardDescription>Outstanding and issued fee bills</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Bills interface - Filter by class, term, and status
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Payment Records</CardTitle>
                <CardDescription>All fee payments received</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Payment history with receipts and payment methods
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adjustments">
            <Card>
              <CardHeader>
                <CardTitle>Fee Adjustments</CardTitle>
                <CardDescription>Discounts, waivers, and fee modifications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  Adjustment records with authorization details
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
