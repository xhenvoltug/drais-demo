"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Search, GraduationCap, Calendar, Mail, Phone } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AlumniPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const alumni = Array.from({ length: 120 }, (_, i) => ({
    id: `ALM${String(i + 1).padStart(5, "0")}`,
    name: ["James Okello", "Sarah Nambi", "John Mukasa", "Mary Nalongo"][i % 4],
    graduationYear: 2020 + (i % 5),
    lastClass: `Grade 6 - ${["A", "B", "C", "D"][i % 4]}`,
    currentStatus: ["University Student", "Employed", "Entrepreneur", "Further Studies"][i % 4],
    email: `student${i + 1}@email.com`,
    phone: `+256 ${700 + (i % 100)} ${String(Math.floor(Math.random() * 1000000)).padStart(6, "0")}`,
  }));

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Alumni Directory
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track and connect with former students • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Total Alumni", value: alumni.length, color: "from-blue-500 to-blue-600" },
            { label: "Class of 2024", value: alumni.filter(a => a.graduationYear === 2024).length, color: "from-green-500 to-green-600" },
            { label: "University Students", value: alumni.filter(a => a.currentStatus === "University Student").length, color: "from-purple-500 to-purple-600" },
            { label: "Employed", value: alumni.filter(a => a.currentStatus === "Employed").length, color: "from-amber-500 to-orange-600" },
          ].map((stat, index) => (
            <Card key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950/50 dark:to-gray-900/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search alumni by name, year, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Alumni Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.slice(0, 12).map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {person.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{person.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">{person.id}</p>
                      <Badge variant="outline" className="mt-2">
                        Class of {person.graduationYear}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>{person.lastClass}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{person.currentStatus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{person.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="w-4 h-4" />
                      <span>{person.phone}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
