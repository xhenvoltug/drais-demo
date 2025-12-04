"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  AlertTriangle, Plus, Search, TrendingDown, TrendingUp, 
  Scale, FileText, Calendar, User 
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function DisciplinePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Mock discipline records
  const disciplineRecords = [
    { id: 1, student: "John Okello", admNo: "S2024/1234", class: "S4A", infraction: "Fighting", action: "3-day suspension", date: "2024-11-28", severity: "high" },
    { id: 2, student: "Mary Achieng", admNo: "S2024/2456", class: "S3B", infraction: "Late to class", action: "Warning letter", date: "2024-11-29", severity: "low" },
    { id: 3, student: "Peter Mukasa", admNo: "S2024/3789", class: "S2C", infraction: "Vandalism", action: "7-day suspension + repair costs", date: "2024-11-27", severity: "high" },
    { id: 4, student: "Grace Nalongo", admNo: "S2024/4012", class: "S5A", infraction: "Cheating in exam", action: "Exam nullified + 2-day suspension", date: "2024-11-30", severity: "medium" },
    { id: 5, student: "David Ssemakula", admNo: "S2024/5234", class: "S1A", infraction: "Uniform violation", action: "Written warning", date: "2024-12-01", severity: "low" },
    { id: 6, student: "Sarah Nakato", admNo: "S2024/6456", class: "S4B", infraction: "Bullying", action: "5-day suspension + counseling", date: "2024-11-26", severity: "high" },
    { id: 7, student: "James Ochieng", admNo: "S2024/7678", class: "S3A", infraction: "Disrespect to teacher", action: "Apology letter + detention", date: "2024-11-25", severity: "medium" },
    { id: 8, student: "Alice Namugga", admNo: "S2024/8901", class: "S2B", infraction: "Skipping class", action: "Parent meeting", date: "2024-11-28", severity: "medium" },
    { id: 9, student: "Robert Kato", admNo: "S2024/9123", class: "S5B", infraction: "Theft", action: "10-day suspension + police report", date: "2024-11-24", severity: "high" },
    { id: 10, student: "Betty Namusoke", admNo: "S2024/0345", class: "S1B", infraction: "Phone in class", action: "Phone confiscated", date: "2024-12-02", severity: "low" },
  ];

  const stats = [
    { label: "Total Cases", value: "847", icon: AlertTriangle, color: "from-red-500 to-orange-500", trend: "+12%" },
    { label: "This Month", value: "127", icon: Calendar, color: "from-orange-500 to-amber-500", trend: "+8%" },
    { label: "High Severity", value: "43", icon: Scale, color: "from-purple-500 to-pink-500", trend: "-5%" },
    { label: "Resolved", value: "804", icon: FileText, color: "from-green-500 to-emerald-500", trend: "+15%" },
  ];

  const infractions = ["all", "Fighting", "Bullying", "Vandalism", "Cheating", "Late to class", "Uniform violation", "Disrespect", "Theft", "Phone in class", "Skipping class"];

  const filteredRecords = disciplineRecords.filter(record => {
    const matchesSearch = record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.admNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || record.infraction === filterType;
    return matchesSearch && matchesType;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "high": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "medium": return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "low": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Discipline Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Track infractions and actions taken</p>
            </div>
          </div>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-red-600 to-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Infraction
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record New Infraction (UI Only)</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Student Name</Label>
                <Input placeholder="Search student..." />
              </div>
              <div>
                <Label>Infraction Type</Label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-800">
                  {infractions.filter(i => i !== "all").map(inf => (
                    <option key={inf} value={inf}>{inf}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Action Taken</Label>
                <Input placeholder="e.g., 3-day suspension" />
              </div>
              <div>
                <Label>Severity</Label>
                <select className="w-full px-3 py-2 border rounded-md dark:bg-gray-800">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <Label>Notes</Label>
                <textarea className="w-full px-3 py-2 border rounded-md dark:bg-gray-800" rows={3} placeholder="Additional details..."></textarea>
              </div>
              <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600" onClick={() => setDialogOpen(false)}>
                Record Infraction (UI Only)
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    {stat.trend.startsWith('+') ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={stat.trend.startsWith('+') ? "text-green-600" : "text-red-600"}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by student name or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {infractions.map(inf => (
                <option key={inf} value={inf}>{inf === "all" ? "All Infractions" : inf}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Discipline Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Discipline Records ({filteredRecords.length})</CardTitle>
          <CardDescription>Complete history of disciplinary actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Student</th>
                  <th className="text-left py-3 px-4 font-semibold">Class</th>
                  <th className="text-left py-3 px-4 font-semibold">Infraction</th>
                  <th className="text-left py-3 px-4 font-semibold">Action Taken</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Severity</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, idx) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                            {record.student.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{record.student}</p>
                          <p className="text-sm text-gray-500">{record.admNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{record.class}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium">{record.infraction}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm">{record.action}</p>
                    </td>
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={getSeverityColor(record.severity)}>
                        {record.severity.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
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
        DRAIS {DRAIS_VERSION} • Discipline Management System
      </div>
    </div>
  );
}
