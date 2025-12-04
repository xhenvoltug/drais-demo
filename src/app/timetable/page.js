"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Calendar,
  Plus,
  Filter,
  Clock,
  Users,
  BookOpen,
  GraduationCap,
  Download,
  Upload,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

// Time slots for the timetable
const timeSlots = [
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// Mock timetable data
const initialTimetable = {
  Monday: [
    { time: "08:00-09:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "09:00-10:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "10:00-11:00", subject: "Science", teacher: "Dr. James Wilson", class: "Grade 5A", room: "Lab 1" },
    { time: "11:00-12:00", subject: "Social Studies", teacher: "Ms. Emily Brown", class: "Grade 5A", room: "Room 103" },
    { time: "12:00-13:00", subject: "Lunch Break", teacher: "", class: "", room: "" },
    { time: "13:00-14:00", subject: "Physical Education", teacher: "Mr. Michael Davis", class: "Grade 5A", room: "Field" },
    { time: "14:00-15:00", subject: "Art", teacher: "Ms. Lisa Anderson", class: "Grade 5A", room: "Art Room" },
    { time: "15:00-16:00", subject: "Music", teacher: "Mr. David Miller", class: "Grade 5A", room: "Music Room" },
  ],
  Tuesday: [
    { time: "08:00-09:00", subject: "Science", teacher: "Dr. James Wilson", class: "Grade 5A", room: "Lab 1" },
    { time: "09:00-10:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "10:00-11:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "11:00-12:00", subject: "ICT", teacher: "Mr. Robert Taylor", class: "Grade 5A", room: "Computer Lab" },
    { time: "12:00-13:00", subject: "Lunch Break", teacher: "", class: "", room: "" },
    { time: "13:00-14:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "14:00-15:00", subject: "Library", teacher: "Ms. Patricia Thomas", class: "Grade 5A", room: "Library" },
    { time: "15:00-16:00", subject: "Study Hall", teacher: "", class: "Grade 5A", room: "Room 101" },
  ],
  Wednesday: [
    { time: "08:00-09:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "09:00-10:00", subject: "Science", teacher: "Dr. James Wilson", class: "Grade 5A", room: "Lab 1" },
    { time: "10:00-11:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "11:00-12:00", subject: "Social Studies", teacher: "Ms. Emily Brown", class: "Grade 5A", room: "Room 103" },
    { time: "12:00-13:00", subject: "Lunch Break", teacher: "", class: "", room: "" },
    { time: "13:00-14:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "14:00-15:00", subject: "Physical Education", teacher: "Mr. Michael Davis", class: "Grade 5A", room: "Field" },
    { time: "15:00-16:00", subject: "Art", teacher: "Ms. Lisa Anderson", class: "Grade 5A", room: "Art Room" },
  ],
  Thursday: [
    { time: "08:00-09:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "09:00-10:00", subject: "ICT", teacher: "Mr. Robert Taylor", class: "Grade 5A", room: "Computer Lab" },
    { time: "10:00-11:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "11:00-12:00", subject: "Science", teacher: "Dr. James Wilson", class: "Grade 5A", room: "Lab 1" },
    { time: "12:00-13:00", subject: "Lunch Break", teacher: "", class: "", room: "" },
    { time: "13:00-14:00", subject: "Social Studies", teacher: "Ms. Emily Brown", class: "Grade 5A", room: "Room 103" },
    { time: "14:00-15:00", subject: "Music", teacher: "Mr. David Miller", class: "Grade 5A", room: "Music Room" },
    { time: "15:00-16:00", subject: "Study Hall", teacher: "", class: "Grade 5A", room: "Room 101" },
  ],
  Friday: [
    { time: "08:00-09:00", subject: "English", teacher: "Mrs. Sarah Johnson", class: "Grade 5A", room: "Room 102" },
    { time: "09:00-10:00", subject: "Mathematics", teacher: "Mr. John Smith", class: "Grade 5A", room: "Room 101" },
    { time: "10:00-11:00", subject: "Science", teacher: "Dr. James Wilson", class: "Grade 5A", room: "Lab 1" },
    { time: "11:00-12:00", subject: "Physical Education", teacher: "Mr. Michael Davis", class: "Grade 5A", room: "Field" },
    { time: "12:00-13:00", subject: "Lunch Break", teacher: "", class: "", room: "" },
    { time: "13:00-14:00", subject: "Art", teacher: "Ms. Lisa Anderson", class: "Grade 5A", room: "Art Room" },
    { time: "14:00-15:00", subject: "Library", teacher: "Ms. Patricia Thomas", class: "Grade 5A", room: "Library" },
    { time: "15:00-16:00", subject: "Assembly", teacher: "", class: "All Classes", room: "Hall" },
  ],
};

const subjectColors = {
  Mathematics: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-400",
  English: "bg-green-100 text-green-800 border-green-300 dark:bg-green-950 dark:text-green-400",
  Science: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-400",
  "Social Studies": "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-400",
  ICT: "bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-400",
  "Physical Education": "bg-red-100 text-red-800 border-red-300 dark:bg-red-950 dark:text-red-400",
  Art: "bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-950 dark:text-pink-400",
  Music: "bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-400",
  Library: "bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950 dark:text-teal-400",
  "Lunch Break": "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-400",
  "Study Hall": "bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-900 dark:text-slate-400",
  Assembly: "bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950 dark:text-violet-400",
};

export default function TimetablePage() {
  const [timetable, setTimetable] = useState(initialTimetable);
  const [selectedClass, setSelectedClass] = useState("Grade 5A");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDragStart = (e, day, index) => {
    setDraggedItem({ day, index });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetDay, targetIndex) => {
    e.preventDefault();
    if (!draggedItem) return;

    const newTimetable = { ...timetable };
    const sourceItem = newTimetable[draggedItem.day][draggedItem.index];
    const targetItem = newTimetable[targetDay][targetIndex];

    // Swap the items
    newTimetable[draggedItem.day][draggedItem.index] = targetItem;
    newTimetable[targetDay][targetIndex] = sourceItem;

    setTimetable(newTimetable);
    setDraggedItem(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Class Timetable
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage weekly schedules and class sessions • v{DRAIS_VERSION}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Session</DialogTitle>
                  <DialogDescription>Schedule a new class session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day.toLowerCase()}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Slot</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.start} value={`${slot.start}-${slot.end}`}>
                            {slot.start} - {slot.end}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="e.g., Mathematics" />
                  </div>
                  <div className="space-y-2">
                    <Label>Teacher</Label>
                    <Input placeholder="Teacher name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Room</Label>
                    <Input placeholder="e.g., Room 101" />
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Add Session</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Label className="mb-2 block">Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grade 5A">Grade 5A</SelectItem>
                    <SelectItem value="Grade 5B">Grade 5B</SelectItem>
                    <SelectItem value="Grade 6A">Grade 6A</SelectItem>
                    <SelectItem value="Grade 6B">Grade 6B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label className="mb-2 block">Teacher</Label>
                <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Teachers</SelectItem>
                    <SelectItem value="john">Mr. John Smith</SelectItem>
                    <SelectItem value="sarah">Mrs. Sarah Johnson</SelectItem>
                    <SelectItem value="james">Dr. James Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label className="mb-2 block">Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Sessions</p>
                  <h3 className="text-2xl font-bold mt-2">40</h3>
                </div>
                <Calendar className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Teachers</p>
                  <h3 className="text-2xl font-bold mt-2">9</h3>
                </div>
                <Users className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Subjects</p>
                  <h3 className="text-2xl font-bold mt-2">11</h3>
                </div>
                <BookOpen className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Hours/Week</p>
                  <h3 className="text-2xl font-bold mt-2">40</h3>
                </div>
                <Clock className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timetable Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Timetable - {selectedClass}</CardTitle>
            <CardDescription>Drag and drop sessions to reschedule (UI demo only)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                    <th className="border border-gray-200 dark:border-gray-700 p-3 text-left min-w-[120px]">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="border border-gray-200 dark:border-gray-700 p-3 text-center min-w-[200px]"
                      >
                        <div className="font-semibold">{day}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, slotIndex) => (
                    <tr key={slotIndex}>
                      <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium text-sm bg-gray-50 dark:bg-gray-900">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            {slot.start}
                            <br />
                            {slot.end}
                          </span>
                        </div>
                      </td>
                      {days.map((day) => {
                        const session = timetable[day][slotIndex];
                        const colorClass = subjectColors[session?.subject] || subjectColors["Study Hall"];

                        return (
                          <td
                            key={day}
                            className="border border-gray-200 dark:border-gray-700 p-2"
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, day, slotIndex)}
                          >
                            {session && (
                              <motion.div
                                draggable={session.subject !== "Lunch Break"}
                                onDragStart={(e) => handleDragStart(e, day, slotIndex)}
                                whileHover={{ scale: 1.02 }}
                                className={`p-3 rounded-lg border-2 cursor-move ${colorClass} transition-all`}
                              >
                                <div className="font-semibold text-sm mb-1">{session.subject}</div>
                                {session.teacher && (
                                  <div className="text-xs opacity-80 flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {session.teacher}
                                  </div>
                                )}
                                {session.room && (
                                  <div className="text-xs opacity-80 flex items-center gap-1 mt-1">
                                    <GraduationCap className="w-3 h-3" />
                                    {session.room}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.keys(subjectColors).map((subject) => (
                <Badge key={subject} className={subjectColors[subject]}>
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
