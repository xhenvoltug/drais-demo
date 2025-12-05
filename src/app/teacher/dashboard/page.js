"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  GraduationCap, UserCheck, FileEdit, MessageSquare, Calendar, Clock,
  Users, BookOpen, TrendingUp, CheckCircle, AlertCircle, Bell
} from "lucide-react";
import Link from "next/link";

export default function TeacherDashboard() {
  const teacherName = "Mr. John Smith";
  const todaySchedule = [
    { time: "08:00 - 09:00", subject: "Mathematics", class: "S.3A", room: "Room 101" },
    { time: "09:00 - 10:00", subject: "Physics", class: "S.4B", room: "Lab 2" },
    { time: "11:00 - 12:00", subject: "Mathematics", class: "S.2C", room: "Room 101" },
    { time: "14:00 - 15:00", subject: "Physics", class: "S.3B", room: "Lab 2" },
  ];

  const assignedClasses = [
    { name: "S.3A Mathematics", students: 42, avgScore: 78, attendance: 95 },
    { name: "S.4B Physics", students: 38, avgScore: 72, attendance: 92 },
    { name: "S.2C Mathematics", students: 45, avgScore: 85, attendance: 97 },
    { name: "S.3B Physics", students: 40, avgScore: 75, attendance: 94 },
  ];

  const quickStats = [
    { label: "Classes Today", value: "4", icon: Calendar, color: "from-blue-500 to-cyan-600" },
    { label: "Total Students", value: "165", icon: Users, color: "from-purple-500 to-pink-600" },
    { label: "Unread Messages", value: "12", icon: MessageSquare, color: "from-green-500 to-emerald-600" },
    { label: "Pending Tasks", value: "3", icon: AlertCircle, color: "from-orange-500 to-amber-600" },
  ];

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-2xl p-6 md:p-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, {teacherName}!</h1>
          <p className="text-indigo-100">Here's your schedule for today, December 4, 2025</p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`bg-gradient-to-r ${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/teacher/attendance">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-800 cursor-pointer"
                >
                  <UserCheck className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Take Attendance</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Mark student attendance for today</p>
                </motion.div>
              </Link>

              <Link href="/teacher/marks-entry">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-800 cursor-pointer"
                >
                  <FileEdit className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Enter Marks</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Record student exam results</p>
                </motion.div>
              </Link>

              <Link href="/teacher/messages">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-xl border-2 border-green-200 dark:border-green-800 cursor-pointer"
                >
                  <MessageSquare className="w-8 h-8 text-green-600 dark:text-green-400 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">Messages</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View and send messages</p>
                  <Badge className="mt-2 bg-red-500 text-white">12 new</Badge>
                </motion.div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Today's Schedule
              </CardTitle>
              <Badge className="bg-blue-600 text-white">{todaySchedule.length} classes</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todaySchedule.map((session, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-3 rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{session.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{session.class} • {session.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{session.time}</p>
                    <Button size="sm" variant="outline" className="mt-1">
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Classes Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Class Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignedClasses.map((cls, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{cls.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cls.students} students</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Avg Score</p>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{cls.avgScore}%</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Attendance</p>
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">{cls.attendance}%</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Exam papers submitted</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">S.3A Mathematics mid-term papers graded successfully</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Lesson plan approved</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your Physics lesson plan for next week has been approved</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Reminder: Staff meeting</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Department meeting tomorrow at 3:00 PM in Staff Room</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
