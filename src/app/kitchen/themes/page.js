"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Palette, Sun, Moon, Smartphone, Monitor, RotateCcw, Save,
  Eye, Sparkles, Layers, Box
} from "lucide-react";

export default function ThemeBuilder() {
  const [theme, setTheme] = useState({
    mode: "light",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#ec4899",
    background: "#ffffff",
    surface: "#f9fafb",
    borderRadius: 8,
    shadow: "medium",
    spacing: 4,
    gradients: {
      enabled: true,
      direction: "to right",
      startColor: "#6366f1",
      viaColor: "#8b5cf6",
      endColor: "#ec4899"
    }
  });

  const [previewDevice, setPreviewDevice] = useState("desktop");
  const [themeName, setThemeName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("drais_kitchen_theme");
    if (saved) {
      try {
        setTheme(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load theme");
      }
    }
  }, []);

  const saveTheme = () => {
    localStorage.setItem("drais_kitchen_theme", JSON.stringify(theme));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert(`Theme "${themeName || 'Untitled'}" saved successfully!`);
  };

  const resetTheme = () => {
    const defaultTheme = {
      mode: "light",
      primary: "#6366f1",
      secondary: "#8b5cf6",
      accent: "#ec4899",
      background: "#ffffff",
      surface: "#f9fafb",
      borderRadius: 8,
      shadow: "medium",
      spacing: 4,
      gradients: {
        enabled: true,
        direction: "to right",
        startColor: "#6366f1",
        viaColor: "#8b5cf6",
        endColor: "#ec4899"
      }
    };
    setTheme(defaultTheme);
  };

  const updateTheme = (key, value) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const updateGradient = (key, value) => {
    setTheme(prev => ({
      ...prev,
      gradients: { ...prev.gradients, [key]: value }
    }));
  };

  const shadowOptions = {
    none: "0 0 0 0 rgba(0,0,0,0)",
    small: "0 1px 2px 0 rgba(0,0,0,0.05)",
    medium: "0 4px 6px -1px rgba(0,0,0,0.1)",
    large: "0 10px 15px -3px rgba(0,0,0,0.1)",
    xlarge: "0 20px 25px -5px rgba(0,0,0,0.1)"
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Theme Builder</h1>
                <p className="text-indigo-100">Craft custom themes with instant preview</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={resetTheme}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" onClick={saveTheme}>
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Theme Name */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Theme Name</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  placeholder="e.g., School Blue Theme"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                />
              </CardContent>
            </Card>

            {/* Mode Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {theme.mode === "light" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  Theme Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateTheme("mode", "light")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      theme.mode === "light"
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Sun className="w-6 h-6 mb-2 mx-auto" />
                    <p className="text-center font-semibold">Light</p>
                  </motion.div>
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    onClick={() => updateTheme("mode", "dark")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      theme.mode === "dark"
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <Moon className="w-6 h-6 mb-2 mx-auto" />
                    <p className="text-center font-semibold">Dark</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>

            {/* Color Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["primary", "secondary", "accent", "background", "surface"].map((colorKey) => (
                  <div key={colorKey}>
                    <Label className="capitalize mb-2 block">{colorKey}</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={theme[colorKey]}
                        onChange={(e) => updateTheme(colorKey, e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={theme[colorKey]}
                        onChange={(e) => updateTheme(colorKey, e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gradient Editor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Gradients</span>
                  <Switch
                    checked={theme.gradients.enabled}
                    onCheckedChange={(checked) => updateGradient("enabled", checked)}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {theme.gradients.enabled && (
                  <>
                    <div>
                      <Label className="mb-2 block">Direction</Label>
                      <select
                        className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
                        value={theme.gradients.direction}
                        onChange={(e) => updateGradient("direction", e.target.value)}
                      >
                        <option value="to right">Left to Right</option>
                        <option value="to left">Right to Left</option>
                        <option value="to bottom">Top to Bottom</option>
                        <option value="to top">Bottom to Top</option>
                        <option value="to bottom right">Diagonal ↘</option>
                        <option value="to top right">Diagonal ↗</option>
                      </select>
                    </div>
                    {["startColor", "viaColor", "endColor"].map((colorKey) => (
                      <div key={colorKey}>
                        <Label className="capitalize mb-2 block">{colorKey.replace("Color", "")}</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={theme.gradients[colorKey]}
                            onChange={(e) => updateGradient(colorKey, e.target.value)}
                            className="w-16 h-10 p-1 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={theme.gradients[colorKey]}
                            onChange={(e) => updateGradient(colorKey, e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Border & Spacing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block">Border Radius: {theme.borderRadius}px</Label>
                  <Slider
                    value={[theme.borderRadius]}
                    onValueChange={(value) => updateTheme("borderRadius", value[0])}
                    min={0}
                    max={24}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Spacing Scale: {theme.spacing}px</Label>
                  <Slider
                    value={[theme.spacing]}
                    onValueChange={(value) => updateTheme("spacing", value[0])}
                    min={2}
                    max={8}
                    step={1}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Shadow</Label>
                  <select
                    className="w-full p-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
                    value={theme.shadow}
                    onChange={(e) => updateTheme("shadow", e.target.value)}
                  >
                    {Object.keys(shadowOptions).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-2">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={previewDevice === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("desktop")}
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={previewDevice === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewDevice("mobile")}
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`mx-auto ${previewDevice === "mobile" ? "max-w-sm" : "max-w-full"} transition-all`}>
                  <div
                    className="p-6 rounded-lg border-2"
                    style={{
                      backgroundColor: theme.background,
                      borderColor: theme.mode === "light" ? "#e5e7eb" : "#374151",
                      borderRadius: `${theme.borderRadius}px`
                    }}
                  >
                    {/* Preview Header */}
                    <div
                      className="p-4 rounded-lg mb-4 text-white"
                      style={{
                        background: theme.gradients.enabled
                          ? `linear-gradient(${theme.gradients.direction}, ${theme.gradients.startColor}, ${theme.gradients.viaColor}, ${theme.gradients.endColor})`
                          : theme.primary,
                        borderRadius: `${theme.borderRadius}px`,
                        boxShadow: shadowOptions[theme.shadow]
                      }}
                    >
                      <h3 className="font-bold text-lg">Preview Header</h3>
                      <p className="text-sm opacity-90">Your custom theme in action</p>
                    </div>

                    {/* Preview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div
                        className="p-4"
                        style={{
                          backgroundColor: theme.surface,
                          borderRadius: `${theme.borderRadius}px`,
                          boxShadow: shadowOptions[theme.shadow]
                        }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme.primary }}
                          >
                            <Layers className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold" style={{ color: theme.mode === "light" ? "#111827" : "#f9fafb" }}>
                              Card Title
                            </p>
                            <p className="text-sm" style={{ color: theme.mode === "light" ? "#6b7280" : "#9ca3af" }}>
                              Subtitle
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="p-4"
                        style={{
                          backgroundColor: theme.surface,
                          borderRadius: `${theme.borderRadius}px`,
                          boxShadow: shadowOptions[theme.shadow]
                        }}
                      >
                        <div
                          className="w-full h-20 rounded mb-2"
                          style={{
                            background: `linear-gradient(${theme.gradients.direction}, ${theme.secondary}, ${theme.accent})`,
                            borderRadius: `${theme.borderRadius}px`
                          }}
                        />
                      </div>
                    </div>

                    {/* Preview Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="px-4 py-2 text-white font-semibold transition-transform active:scale-95"
                        style={{
                          backgroundColor: theme.primary,
                          borderRadius: `${theme.borderRadius}px`,
                          boxShadow: shadowOptions[theme.shadow]
                        }}
                      >
                        Primary Button
                      </button>
                      <button
                        className="px-4 py-2 text-white font-semibold transition-transform active:scale-95"
                        style={{
                          backgroundColor: theme.secondary,
                          borderRadius: `${theme.borderRadius}px`,
                          boxShadow: shadowOptions[theme.shadow]
                        }}
                      >
                        Secondary
                      </button>
                      <button
                        className="px-4 py-2 font-semibold transition-transform active:scale-95"
                        style={{
                          backgroundColor: "transparent",
                          border: `2px solid ${theme.primary}`,
                          color: theme.primary,
                          borderRadius: `${theme.borderRadius}px`
                        }}
                      >
                        Outline
                      </button>
                    </div>

                    {/* Preview Badge */}
                    <div className="mt-4 flex gap-2">
                      <span
                        className="px-3 py-1 text-sm font-semibold text-white"
                        style={{
                          backgroundColor: theme.accent,
                          borderRadius: `${theme.borderRadius}px`
                        }}
                      >
                        Badge
                      </span>
                      <span
                        className="px-3 py-1 text-sm font-semibold"
                        style={{
                          backgroundColor: theme.mode === "light" ? "#f3f4f6" : "#1f2937",
                          color: theme.mode === "light" ? "#374151" : "#d1d5db",
                          borderRadius: `${theme.borderRadius}px`
                        }}
                      >
                        Info
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Tip:</strong> All changes are previewed in real-time. Click "Save Theme" to persist your customizations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
