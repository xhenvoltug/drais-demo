"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter, Download, Sparkles, Clock, Users, Target, BookMarked, ChevronDown } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function AILessonPlansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  const classes = ["All Classes", "S1A", "S1B", "S2A", "S2B", "S3A", "S3B", "S4A", "S4B", "S5A", "S5B"];
  const subjects = ["All Subjects", "Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science"];
  const difficulties = ["All Difficulties", "Low", "Medium", "High"];

  const lessonPlans = [
    {
      id: 1,
      topic: "Newton's Laws of Motion",
      subject: "Physics",
      class: "S4A",
      difficulty: "Medium",
      duration: "2 hours",
      objectives: ["Understand the three laws of motion", "Apply laws to real-world scenarios", "Conduct practical experiments"],
      materials: ["Trolleys", "Weights", "Ramps", "Stopwatch"],
      activities: ["Introduction & Discussion", "Demonstration", "Group Experiments", "Assessment"],
      aiConfidence: 94,
      students: 42,
      color: "from-purple-500 to-pink-500",
      priority: "high",
    },
    {
      id: 2,
      topic: "Quadratic Equations",
      subject: "Mathematics",
      class: "S3B",
      difficulty: "High",
      duration: "3 hours",
      objectives: ["Master completing the square", "Apply quadratic formula", "Solve word problems"],
      materials: ["Graphing paper", "Calculator", "Worksheets"],
      activities: ["Warm-up exercises", "Lesson delivery", "Practice problems", "Q&A session"],
      aiConfidence: 89,
      students: 38,
      color: "from-blue-500 to-cyan-500",
      priority: "high",
    },
    {
      id: 3,
      topic: "Organic Chemistry - Alkanes",
      subject: "Chemistry",
      class: "S5A",
      difficulty: "High",
      duration: "2.5 hours",
      objectives: ["Understand alkane structure", "Learn nomenclature", "Predict properties"],
      materials: ["Molecular models", "Whiteboard", "Reference books"],
      activities: ["Theory introduction", "Model building", "Group work", "Quiz"],
      aiConfidence: 91,
      students: 35,
      color: "from-green-500 to-emerald-500",
      priority: "medium",
    },
    {
      id: 4,
      topic: "Narrative Writing Techniques",
      subject: "English",
      class: "S2A",
      difficulty: "Low",
      duration: "1.5 hours",
      objectives: ["Identify narrative elements", "Create engaging characters", "Write compelling plots"],
      materials: ["Sample stories", "Writing prompts", "Peer review forms"],
      activities: ["Reading examples", "Brainstorming", "Writing exercise", "Peer feedback"],
      aiConfidence: 87,
      students: 45,
      color: "from-orange-500 to-red-500",
      priority: "medium",
    },
    {
      id: 5,
      topic: "Photosynthesis & Respiration",
      subject: "Biology",
      class: "S4B",
      difficulty: "Medium",
      duration: "2 hours",
      objectives: ["Compare both processes", "Understand cellular energy", "Conduct leaf experiments"],
      materials: ["Leaf samples", "Microscope", "Iodine solution", "Test tubes"],
      activities: ["Theory recap", "Lab practical", "Observations", "Discussion"],
      aiConfidence: 92,
      students: 40,
      color: "from-teal-500 to-cyan-500",
      priority: "high",
    },
    {
      id: 6,
      topic: "African Independence Movements",
      subject: "History",
      class: "S3A",
      difficulty: "Medium",
      duration: "2 hours",
      objectives: ["Trace independence timeline", "Analyze key leaders", "Understand colonial impact"],
      materials: ["Maps", "Documentary clips", "Primary sources"],
      activities: ["Video presentation", "Group discussions", "Timeline creation", "Essay writing"],
      aiConfidence: 85,
      students: 43,
      color: "from-indigo-500 to-purple-500",
      priority: "low",
    },
    {
      id: 7,
      topic: "Python Programming Basics",
      subject: "Computer Science",
      class: "S5B",
      difficulty: "Medium",
      duration: "2 hours",
      objectives: ["Understand syntax", "Write simple programs", "Debug code"],
      materials: ["Computers", "Python IDE", "Code examples"],
      activities: ["Coding demonstration", "Hands-on practice", "Pair programming", "Mini project"],
      aiConfidence: 90,
      students: 32,
      color: "from-cyan-500 to-blue-500",
      priority: "high",
    },
    {
      id: 8,
      topic: "Map Reading & Interpretation",
      subject: "Geography",
      class: "S2B",
      difficulty: "Low",
      duration: "1.5 hours",
      objectives: ["Read map symbols", "Calculate distances", "Interpret contours"],
      materials: ["Topographic maps", "Rulers", "Compasses"],
      activities: ["Symbol identification", "Distance calculations", "Group challenges", "Quiz"],
      aiConfidence: 88,
      students: 41,
      color: "from-yellow-500 to-orange-500",
      priority: "medium",
    },
  ];

  const filteredPlans = lessonPlans.filter(plan => {
    const matchesSearch = plan.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === "all" || plan.class === filterClass;
    const matchesSubject = filterSubject === "all" || plan.subject === filterSubject;
    const matchesDifficulty = filterDifficulty === "all" || plan.difficulty === filterDifficulty;
    return matchesSearch && matchesClass && matchesSubject && matchesDifficulty;
  });

  const getPriorityBadge = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      medium: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    };
    return colors[priority] || colors.low;
  };

  const stats = [
    { label: "Total Plans", value: lessonPlans.length.toString(), color: "from-blue-500 to-cyan-500" },
    { label: "High Priority", value: lessonPlans.filter(p => p.priority === "high").length.toString(), color: "from-red-500 to-pink-500" },
    { label: "Avg Confidence", value: "89%", color: "from-purple-500 to-pink-500" },
    { label: "Students Covered", value: lessonPlans.reduce((sum, p) => sum + p.students, 0).toString(), color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <BookMarked className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Generated Lesson Plans
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Smart lesson planning recommendations for effective teaching</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br ${stat.color} text-white`}>
              <CardContent className="p-6">
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search lesson plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls === "All Classes" ? "all" : cls}>{cls}</option>
                ))}
              </select>
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800"
              >
                {subjects.map(subj => (
                  <option key={subj} value={subj === "All Subjects" ? "all" : subj}>{subj}</option>
                ))}
              </select>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-2 border rounded-lg dark:bg-gray-800"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff === "All Difficulties" ? "all" : diff}>{diff}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <Badge className={getPriorityBadge(plan.priority)}>
                    {plan.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{plan.topic}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  {plan.class} • {plan.subject} • {plan.difficulty}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>{plan.students} students</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Learning Objectives:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {plan.objectives.slice(0, 2).map((obj, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Target className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                          {obj}
                        </li>
                      ))}
                      {plan.objectives.length > 2 && (
                        <li className="text-xs text-gray-500">+{plan.objectives.length - 2} more...</li>
                      )}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Materials Needed:</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.materials.map((material, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t dark:border-gray-800">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">AI Confidence:</span>
                      <span className="font-bold text-purple-600 dark:text-purple-400">{plan.aiConfidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${plan.color} h-2 rounded-full transition-all`}
                        style={{ width: `${plan.aiConfidence}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className={`flex-1 bg-gradient-to-r ${plan.color}`}>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Full Plan
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-gray-400">No lesson plans found matching your criteria</p>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • AI-Powered Lesson Planning
      </div>
    </div>
  );
}
