"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { History, Search, RotateCcw, Eye, User } from "lucide-react";

export default function AuditHistory() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    // Simulate loading history
    const mockHistory = [
      {
        id: 1,
        user: "Admin User",
        action: "Theme Changed",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        changes: { before: { primary: "#3b82f6" }, after: { primary: "#6366f1" } },
        version: "0.0.0019"
      },
      {
        id: 2,
        user: "Design Manager",
        action: "Palette Updated",
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        changes: { before: "Ocean Blue", after: "Royal Purple" },
        version: "0.0.0019"
      },
      {
        id: 3,
        user: "Admin User",
        action: "Font Modified",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        changes: { before: { font: "Roboto" }, after: { font: "Inter" } },
        version: "0.0.0018"
      },
      {
        id: 4,
        user: "Designer",
        action: "Component Styled",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        changes: { component: "buttons", property: "borderRadius", value: "8px" },
        version: "0.0.0018"
      },
      {
        id: 5,
        user: "Admin User",
        action: "Theme Changed",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        changes: { before: { mode: "light" }, after: { mode: "dark" } },
        version: "0.0.0018"
      }
    ];

    const saved = localStorage.getItem("drais_kitchen_history");
    setHistory(saved ? JSON.parse(saved) : mockHistory);
  }, []);

  const getRelativeTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return then.toLocaleDateString();
  };

  const actionTypes = ["All", "Theme Changed", "Palette Updated", "Font Modified", "Component Styled"];

  const filteredHistory = history.filter(entry => {
    const matchesType = filterType === "All" || entry.action === filterType;
    const matchesSearch = entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          entry.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const revertToVersion = (entry) => {
    if (confirm(`Revert to this version from ${getRelativeTime(entry.timestamp)}?`)) {
      alert("Revert functionality is UI-only simulation");
    }
  };

  const exportAuditLog = () => {
    const csv = [
      "Timestamp,User,Action,Version",
      ...history.map(h => `${h.timestamp},${h.user},${h.action},${h.version}`)
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drais-kitchen-audit-log.csv";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <History className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">History & Audit</h1>
                <p className="text-indigo-100">Track all changes to your brand kit</p>
              </div>
            </div>
            <Button variant="secondary" onClick={exportAuditLog}>
              Export CSV
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="User or action..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Action Type</label>
                  <div className="space-y-2">
                    {actionTypes.map(type => (
                      <Badge
                        key={type}
                        variant={filterType === type ? "default" : "outline"}
                        className="w-full justify-start cursor-pointer"
                        onClick={() => setFilterType(type)}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Change Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredHistory.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-4 border-2 rounded-lg hover:shadow-lg transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                          <User className="w-6 h-6" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{entry.user}</span>
                              <Badge className="text-xs">{entry.action}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {getRelativeTime(entry.timestamp)}
                            </p>
                          </div>
                          <Badge variant="outline">{entry.version}</Badge>
                        </div>

                        <div className="text-sm bg-gray-50 dark:bg-gray-900 p-3 rounded-lg mb-2">
                          <strong>Changes:</strong>
                          <pre className="mt-1 text-xs overflow-x-auto">
                            {JSON.stringify(entry.changes, null, 2)}
                          </pre>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => revertToVersion(entry)}>
                            <RotateCcw className="w-3 h-3 mr-1" />
                            Revert
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {filteredHistory.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>No history entries found</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
