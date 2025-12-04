"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Search, TrendingUp, Users, ArrowUpCircle } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function PromoteStudentsPage() {
  const [selectedClass, setSelectedClass] = useState("");
  const [promoteToClass, setPromoteToClass] = useState("");

  const classes = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6"];
  
  const students = Array.from({ length: 450 }, (_, i) => ({
    id: `STD${String(i + 1).padStart(5, "0")}`,
    name: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
    currentClass: "Grade 3",
    section: ["A", "B", "C", "D"][i % 4],
    avgScore: 75 + Math.floor(Math.random() * 20),
    attendance: 85 + Math.floor(Math.random() * 15),
    status: "Eligible",
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Promote Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Bulk promote students to next grade • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Promotion Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Promotion Settings</CardTitle>
            <CardDescription>Select class and promotion criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Current Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Promote To</Label>
                <Select value={promoteToClass} onValueChange={setPromoteToClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Academic Year</Label>
                <Select defaultValue="2025">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <TrendingUp className="w-4 h-4 mr-2" />
                Preview Eligible Students
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpCircle className="w-4 h-4 mr-2" />
                    Promote Selected
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Promotion</DialogTitle>
                    <DialogDescription>
                      You are about to promote {students.length} students from Grade 3 to Grade 4
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        ⚠️ This action cannot be undone. Please review the list carefully before proceeding.
                      </p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-teal-600">
                      Confirm Promotion
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-3xl font-bold mt-2">{students.length}</p>
                </div>
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Eligible</p>
                  <p className="text-3xl font-bold mt-2">{students.filter(s => s.status === "Eligible").length}</p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-3xl font-bold mt-2">82%</p>
                </div>
                <ArrowUpCircle className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Attendance</p>
                  <p className="text-3xl font-bold mt-2">93%</p>
                </div>
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students List */}
        <Card>
          <CardHeader>
            <CardTitle>Eligible Students for Promotion</CardTitle>
            <CardDescription>Students meeting promotion criteria (Avg Score ≥ 60%, Attendance ≥ 75%)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Student ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Current Class</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Avg Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Attendance</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 20).map((student, index) => (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-3 px-4">
                        <input type="checkbox" className="rounded" defaultChecked />
                      </td>
                      <td className="py-3 px-4 text-sm font-mono">{student.id}</td>
                      <td className="py-3 px-4 text-sm font-medium">{student.name}</td>
                      <td className="py-3 px-4 text-sm">{student.currentClass} - {student.section}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600">{student.avgScore}%</td>
                      <td className="py-3 px-4 text-sm">{student.attendance}%</td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{student.status}</Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
