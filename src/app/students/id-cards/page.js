"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { CreditCard, Download, Printer, Users } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function IDCardsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSection, setSelectedSection] = useState("all");

  const students = Array.from({ length: 12 }, (_, i) => ({
    id: `STD${String(i + 1).padStart(5, "0")}`,
    name: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
    class: "Grade " + ((i % 6) + 1),
    section: ["A", "B", "C", "D"][i % 4],
    photo: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student ID Cards
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Generate and print student identification cards • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <SelectItem key={i} value={`Grade ${i}`}>Grade {i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sections" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  {["A", "B", "C", "D"].map(s => (
                    <SelectItem key={s} value={s}>Section {s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* ID Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 100 100">
                      <path
                        d="M20 20 L20 80 L50 80 L50 50 L80 50 L80 20 Z M30 30 L40 30 L40 70 L30 70 Z M60 30 L70 30 L70 40 L60 40 Z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="text-white font-bold text-lg">DRAIS</span>
                  </div>
                </div>
                <CardContent className="p-6 -mt-16">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden bg-gray-200">
                      <img src={student.photo} alt={student.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="mt-4 font-bold text-lg text-center">{student.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{student.id}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {student.class} - Section {student.section}
                    </p>
                    
                    <div className="w-full mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Valid Until: Dec 2025</span>
                        <span>v{DRAIS_VERSION}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Printer className="w-3 h-3 mr-2" />
                      Print Card
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
