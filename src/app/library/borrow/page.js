"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { BookOpen, Search, Calendar, User, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function LibraryBorrowPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const borrowedBooks = [
    { 
      id: 1, 
      student: "Sarah Nakato", 
      admNo: "S2024/1234", 
      class: "S4A", 
      bookTitle: "Advanced Physics", 
      borrowDate: "2024-11-15", 
      dueDate: "2024-12-15", 
      status: "active",
      daysLeft: 11
    },
    { 
      id: 2, 
      student: "John Okello", 
      admNo: "S2024/2456", 
      class: "S5B", 
      bookTitle: "Things Fall Apart", 
      borrowDate: "2024-11-20", 
      dueDate: "2024-12-05", 
      status: "overdue",
      daysLeft: -1
    },
    { 
      id: 3, 
      student: "Mary Achieng", 
      admNo: "S2024/3789", 
      class: "S3A", 
      bookTitle: "Calculus Made Easy", 
      borrowDate: "2024-11-25", 
      dueDate: "2024-12-10", 
      status: "active",
      daysLeft: 6
    },
    { 
      id: 4, 
      student: "Peter Mukasa", 
      admNo: "S2024/4012", 
      class: "S2C", 
      bookTitle: "Python Programming", 
      borrowDate: "2024-10-28", 
      dueDate: "2024-11-28", 
      status: "returned",
      returnDate: "2024-11-27"
    },
    { 
      id: 5, 
      student: "Grace Nalongo", 
      admNo: "S2024/5234", 
      class: "S5A", 
      bookTitle: "Business Management", 
      borrowDate: "2024-11-18", 
      dueDate: "2024-12-02", 
      status: "overdue",
      daysLeft: -2
    },
    { 
      id: 6, 
      student: "David Ssemakula", 
      admNo: "S2024/6456", 
      class: "S1A", 
      bookTitle: "Romeo and Juliet", 
      borrowDate: "2024-11-28", 
      dueDate: "2024-12-28", 
      status: "active",
      daysLeft: 24
    },
    { 
      id: 7, 
      student: "Alice Namugga", 
      admNo: "S2024/7678", 
      class: "S4B", 
      bookTitle: "African Geography", 
      borrowDate: "2024-11-10", 
      dueDate: "2024-12-10", 
      status: "active",
      daysLeft: 6
    },
    { 
      id: 8, 
      student: "Robert Kato", 
      admNo: "S2024/8901", 
      class: "S3B", 
      bookTitle: "World History Encyclopedia", 
      borrowDate: "2024-10-15", 
      dueDate: "2024-11-15", 
      status: "returned",
      returnDate: "2024-11-14"
    },
  ];

  const stats = [
    { label: "Total Borrowed", value: "189", icon: BookOpen, color: "from-blue-500 to-purple-500" },
    { label: "Active", value: "142", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { label: "Overdue", value: "23", icon: AlertCircle, color: "from-red-500 to-orange-500" },
    { label: "Returned", value: "24", icon: Calendar, color: "from-gray-500 to-slate-500" },
  ];

  const statuses = ["all", "active", "overdue", "returned"];

  const filteredBooks = borrowedBooks.filter(book => {
    const matchesSearch = book.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.admNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || book.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status, daysLeft) => {
    if (status === "returned") {
      return <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400">Returned</Badge>;
    }
    if (status === "overdue") {
      return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Overdue</Badge>;
    }
    if (daysLeft <= 3) {
      return <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">Due Soon</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Active</Badge>;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Borrowed Books
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Track book borrowing and returns</p>
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
            <Search className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by student, book, or admission number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Borrowed Books Table */}
      <Card>
        <CardHeader>
          <CardTitle>Borrowing Records ({filteredBooks.length})</CardTitle>
          <CardDescription>Complete borrowing history and current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-semibold">Student</th>
                  <th className="text-left py-3 px-4 font-semibold">Class</th>
                  <th className="text-left py-3 px-4 font-semibold">Book Title</th>
                  <th className="text-left py-3 px-4 font-semibold">Borrow Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map((book, idx) => (
                  <motion.tr
                    key={book.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                            {book.student.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{book.student}</p>
                          <p className="text-sm text-gray-500">{book.admNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{book.class}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium">{book.bookTitle}</p>
                    </td>
                    <td className="py-3 px-4">{book.borrowDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span>{book.dueDate}</span>
                        {book.status !== "returned" && (
                          <span className={`text-xs ${book.daysLeft < 0 ? 'text-red-600' : book.daysLeft <= 3 ? 'text-orange-600' : 'text-gray-500'}`}>
                            {book.daysLeft < 0 ? `${Math.abs(book.daysLeft)} days overdue` : `${book.daysLeft} days left`}
                          </span>
                        )}
                        {book.status === "returned" && (
                          <span className="text-xs text-gray-500">Returned: {book.returnDate}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(book.status, book.daysLeft)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        {book.status !== "returned" && (
                          <Button size="sm" variant="outline" className="text-green-600">
                            Return
                          </Button>
                        )}
                        <Button size="sm" variant="outline">View</Button>
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
        DRAIS {DRAIS_VERSION} • Library Management System
      </div>
    </div>
  );
}
