"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { GraduationCap, Plus, Edit, Trash2 } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function ClassesPage() {
  const classes = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Grade ${Math.floor(i / 4) + 1}`,
    section: ["A", "B", "C", "D"][i % 4],
    classTeacher: ["Mr. John Smith", "Mrs. Sarah Johnson", "Dr. James Wilson"][i % 3],
    students: Math.floor(Math.random() * 50) + 30,
    subjects: Math.floor(Math.random() * 5) + 8,
    room: `Room ${i + 101}`,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Classes Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage classes, sections, and assignments • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Classes</p>
                  <p className="text-3xl font-bold mt-2">{classes.length}</p>
                </div>
                <GraduationCap className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                  <p className="text-3xl font-bold mt-2">{classes.reduce((sum, c) => sum + c.students, 0)}</p>
                </div>
                <GraduationCap className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Class Size</p>
                  <p className="text-3xl font-bold mt-2">{Math.floor(classes.reduce((sum, c) => sum + c.students, 0) / classes.length)}</p>
                </div>
                <GraduationCap className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-950/50 dark:to-orange-900/50 cursor-pointer hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add New</p>
                      <p className="text-lg font-bold mt-2">Create Class</p>
                    </div>
                    <Plus className="w-10 h-10 text-amber-600" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>Add a new class to the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Class Name</Label>
                  <Input placeholder="e.g., Grade 1" />
                </div>
                <div className="space-y-2">
                  <Label>Section</Label>
                  <Input placeholder="e.g., A" />
                </div>
                <div className="space-y-2">
                  <Label>Class Teacher</Label>
                  <Input placeholder="Teacher name" />
                </div>
                <div className="space-y-2">
                  <Label>Room Number</Label>
                  <Input placeholder="e.g., Room 101" />
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Class
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, index) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {cls.name} - {cls.section}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.room}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Class Teacher:</span>
                      <span className="font-medium">{cls.classTeacher}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Students:</span>
                      <Badge>{cls.students}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subjects:</span>
                      <Badge variant="outline">{cls.subjects}</Badge>
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
