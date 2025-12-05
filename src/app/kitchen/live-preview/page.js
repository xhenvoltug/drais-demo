"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Tablet, Camera, Share2, RotateCcw, Maximize, ZoomIn, ZoomOut } from "lucide-react";

export default function LivePreview() {
  const [device, setDevice] = useState("desktop");
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const devices = [
    { id: "desktop", name: "Desktop", icon: Monitor, width: "100%", height: "600px" },
    { id: "tablet", name: "Tablet", icon: Tablet, width: "768px", height: "1024px" },
    { id: "mobile", name: "Mobile", icon: Smartphone, width: "375px", height: "667px" }
  ];

  const zoomLevels = [50, 75, 100, 125, 150];

  const takeScreenshot = () => {
    alert("Screenshot feature (UI-only simulation)");
  };

  const sharePreview = () => {
    const url = `${window.location.origin}/kitchen/live-preview?share=${Date.now()}`;
    navigator.clipboard.writeText(url);
    alert("Preview link copied to clipboard!");
  };

  const resetPreview = () => {
    if (confirm("Reset all Kitchen customizations in preview?")) {
      alert("Preview reset (UI-only simulation)");
    }
  };

  const selectedDevice = devices.find(d => d.id === device) || devices[0];

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Monitor className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Live Preview Shell</h1>
                <p className="text-violet-100">Test your brand kit in real-time</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={resetPreview}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="secondary" onClick={takeScreenshot}>
                <Camera className="w-4 h-4 mr-2" />
                Screenshot
              </Button>
              <Button variant="secondary" onClick={sharePreview}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Device Selector */}
              <div className="flex gap-2">
                {devices.map(d => {
                  const Icon = d.icon;
                  return (
                    <Button
                      key={d.id}
                      variant={device === d.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setDevice(d.id)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {d.name}
                    </Button>
                  );
                })}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Badge>{zoom}%</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setZoom(Math.min(150, zoom + 25))}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview Frame */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-4 border-gray-800 rounded-lg overflow-hidden shadow-2xl"
                style={{
                  width: selectedDevice.width,
                  maxWidth: "100%",
                  height: selectedDevice.height,
                  transform: `scale(${zoom / 100})`
                }}
              >
                {/* Simulated DRAIS App */}
                <div className="h-full bg-white dark:bg-gray-900 overflow-y-auto">
                  {/* Top Bar */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white rounded-lg" />
                      <span className="font-bold">DRAIS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/20">Live Preview</Badge>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="p-6">
                    {/* Dashboard Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {[
                        { title: "Students", value: "1,234", color: "bg-blue-500" },
                        { title: "Classes", value: "45", color: "bg-green-500" },
                        { title: "Teachers", value: "89", color: "bg-purple-500" }
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                          <div className={`w-12 h-12 ${stat.color} rounded-lg mb-2`} />
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</div>
                        </div>
                      ))}
                    </div>

                    {/* Student Card */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border mb-4">
                      <h3 className="font-bold mb-3">Recent Students</h3>
                      <div className="space-y-2">
                        {["John Doe", "Jane Smith", "Bob Wilson"].map((name, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-2 bg-white dark:bg-gray-900 rounded">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                            <div className="flex-1">
                              <div className="font-semibold text-sm">{name}</div>
                              <div className="text-xs text-gray-500">S.{idx + 1}</div>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Buttons Showcase */}
                    <div className="flex flex-wrap gap-2">
                      <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
                      <Button variant="outline">Secondary</Button>
                      <Button variant="destructive">Delete</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Live preview active • All Kitchen changes applied</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { key: "R", action: "Reset preview" },
                { key: "S", action: "Take screenshot" },
                { key: "D", action: "Desktop view" },
                { key: "T", action: "Tablet view" },
                { key: "M", action: "Mobile view" },
                { key: "F", action: "Fullscreen" },
                { key: "+", action: "Zoom in" },
                { key: "-", action: "Zoom out" }
              ].map(shortcut => (
                <div key={shortcut.key} className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">{shortcut.key}</Badge>
                  <span className="text-gray-600 dark:text-gray-400">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
