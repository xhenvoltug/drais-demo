"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  ShieldAlert, Search, Filter, Calendar, User, 
  AlertTriangle, Clock, CheckCircle, XCircle 
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function SuspendedStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterReason, setFilterReason] = useState("all");

  // Mock suspended students data
  const suspendedStudents = [
    { id: 1, name: "John Okello", admNo: "S2024/1234", class: "S4A", reason: "Fighting", duration: "5 days", startDate: "2024-11-28", endDate: "2024-12-03", status: "active" },
    { id: 2, name: "Mary Achieng", admNo: "S2024/2456", class: "S3B", reason: "Bullying", duration: "7 days", startDate: "2024-11-25", endDate: "2024-12-02", status: "completed" },
    { id: 3, name: "Peter Mukasa", admNo: "S2024/3789", class: "S2C", reason: "Vandalism", duration: "10 days", startDate: "2024-11-20", endDate: "2024-11-30", status: "completed" },
    { id: 4, name: "Grace Nalongo", admNo: "S2024/4012", class: "S5A", reason: "Cheating", duration: "3 days", startDate: "2024-12-01", endDate: "2024-12-04", status: "active" },
    { id: 5, name: "David Ssemakula", admNo: "S2024/5234", class: "S1A", reason: "Truancy", duration: "5 days", startDate: "2024-11-27", endDate: "2024-12-02", status: "completed" },
    { id: 6, name: "Sarah Nakato", admNo: "S2024/6456", class: "S4B", reason: "Fighting", duration: "7 days", startDate: "2024-11-29", endDate: "2024-12-06", status: "active" },
    { id: 7, name: "James Ochieng", admNo: "S2024/7678", class: "S3A", reason: "Disrespect", duration: "4 days", startDate: "2024-11-26", endDate: "2024-11-30", status: "completed" },
    { id: 8, name: "Alice Namugga", admNo: "S2024/8901", class: "S2B", reason: "Substance Use", duration: "14 days", startDate: "2024-11-22", endDate: "2024-12-06", status: "active" },
    { id: 9, name: "Robert Kato", admNo: "S2024/9123", class: "S5B", reason: "Theft", duration: "10 days", startDate: "2024-11-24", endDate: "2024-12-04", status: "active" },
    { id: 10, name: "Betty Namusoke", admNo: "S2024/0345", class: "S1B", reason: "Bullying", duration: "6 days", startDate: "2024-11-25", endDate: "2024-12-01", status: "completed" },
  ];

  const stats = [
    { label: "Total Suspended", value: "127", icon: ShieldAlert, color: "from-red-500 to-orange-500" },
    { label: "Active Cases", value: "45", icon: AlertTriangle, color: "from-orange-500 to-amber-500" },
    { label: "Completed", value: "82", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { label: "Avg Duration", value: "6.8 days", icon: Clock, color: "from-blue-500 to-purple-500" },
  ];

  const reasons = ["all", "Fighting", "Bullying", "Vandalism", "Cheating", "Truancy", "Disrespect", "Substance Use", "Theft"];
  const classes = ["all", "S1A", "S1B", "S2A", "S2B", "S2C", "S3A", "S3B", "S4A", "S4B", "S5A", "S5B"];

  const filteredStudents = suspendedStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || student.class === filterClass;
    const matchesReason = filterReason === "all" || student.reason === filterReason;
    return matchesSearch && matchesClass && matchesReason;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Suspended Students
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage and track student suspensions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
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

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls === "all" ? "All Classes" : cls}</option>
              ))}
            </select>
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {reasons.map(reason => (
                <option key={reason} value={reason}>{reason === "all" ? "All Reasons" : reason}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Suspended Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Suspension Records ({filteredStudents.length})</CardTitle>
          <CardDescription>Currently tracked suspension cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Student</th>
                  <th className="text-left py-3 px-4 font-semibold">Class</th>
                  <th className="text-left py-3 px-4 font-semibold">Reason</th>
                  <th className="text-left py-3 px-4 font-semibold">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold">Period</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, idx) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.admNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{student.class}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {student.reason}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">{student.duration}</td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p>{student.startDate}</p>
                        <p className="text-gray-500">to {student.endDate}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {student.status === "active" ? (
                        <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {student.status === "active" && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            Lift
                          </Button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Suspension Management
      </div>
    </div>
  );
}
