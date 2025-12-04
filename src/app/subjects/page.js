"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BookOpen, Plus, Edit, Trash2, Award } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function SubjectsPage() {
  const subjects = [
    { id: 1, name: "Mathematics", code: "MAT", teacher: "Dr. James Wilson", classes: 6, students: 450, color: "from-blue-500 to-blue-600" },
    { id: 2, name: "English", code: "ENG", teacher: "Mrs. Sarah Johnson", classes: 6, students: 450, color: "from-green-500 to-green-600" },
    { id: 3, name: "Science", code: "SCI", teacher: "Mr. John Smith", classes: 6, students: 450, color: "from-purple-500 to-purple-600" },
    { id: 4, name: "Social Studies", code: "SST", teacher: "Ms. Mary Nambi", classes: 6, students: 450, color: "from-amber-500 to-orange-600" },
    { id: 5, name: "Physical Education", code: "PE", teacher: "Mr. David Okello", classes: 6, students: 450, color: "from-red-500 to-red-600" },
    { id: 6, name: "Art & Design", code: "ART", teacher: "Mrs. Grace Nalongo", classes: 4, students: 300, color: "from-pink-500 to-pink-600" },
    { id: 7, name: "Music", code: "MUS", teacher: "Mr. Peter Wasswa", classes: 4, students: 300, color: "from-indigo-500 to-indigo-600" },
    { id: 8, name: "Computer Studies", code: "ICT", teacher: "Dr. Alice Namusoke", classes: 6, students: 450, color: "from-teal-500 to-teal-600" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Subjects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage curriculum subjects and assignments • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Subjects</p>
                  <p className="text-3xl font-bold mt-2">{subjects.length}</p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Teachers</p>
                  <p className="text-3xl font-bold mt-2">8</p>
                </div>
                <Award className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
                  <p className="text-3xl font-bold mt-2">{subjects.reduce((sum, s) => sum + s.classes, 0)}</p>
                </div>
                <BookOpen className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50 cursor-pointer hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add New</p>
                  <p className="text-lg font-bold mt-2">Create Subject</p>
                </div>
                <Plus className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${subject.color}`} />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{subject.name}</h3>
                      <Badge variant="outline" className="mt-2">{subject.code}</Badge>
                    </div>
                    <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-lg flex items-center justify-center`}>
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Teacher:</span>
                      <span className="font-medium">{subject.teacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Classes:</span>
                      <Badge>{subject.classes}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <Badge variant="outline">{subject.students}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
