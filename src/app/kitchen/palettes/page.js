"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Paintbrush, Plus, Download, Upload, Star, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

const defaultPalettes = [
  {
    id: "default-blue",
    name: "Default Blue-Purple",
    colors: ["#eff6ff", "#dbeafe", "#93c5fd", "#3b82f6", "#1e40af", "#1e3a8a", "#172554"],
    featured: true
  },
  {
    id: "ocean",
    name: "Ocean Breeze",
    colors: ["#ecfeff", "#cffafe", "#67e8f9", "#06b6d4", "#0e7490", "#164e63", "#083344"],
    featured: true
  },
  {
    id: "sunset",
    name: "Sunset Glow",
    colors: ["#fff7ed", "#ffedd5", "#fdba74", "#f97316", "#c2410c", "#9a3412", "#7c2d12"],
    featured: false
  },
  {
    id: "forest",
    name: "Forest Green",
    colors: ["#f0fdf4", "#dcfce7", "#86efac", "#22c55e", "#15803d", "#166534", "#14532d"],
    featured: false
  },
  {
    id: "royal",
    name: "Royal Purple",
    colors: ["#faf5ff", "#f3e8ff", "#d8b4fe", "#a855f7", "#7e22ce", "#6b21a8", "#581c87"],
    featured: false
  },
  {
    id: "crimson",
    name: "Crimson Fire",
    colors: ["#fef2f2", "#fee2e2", "#fca5a5", "#ef4444", "#b91c1c", "#991b1b", "#7f1d1d"],
    featured: false
  },
  {
    id: "midnight",
    name: "Midnight Blue",
    colors: ["#f8fafc", "#e2e8f0", "#94a3b8", "#475569", "#1e293b", "#0f172a", "#020617"],
    featured: false
  },
  {
    id: "golden",
    name: "Golden Hour",
    colors: ["#fffbeb", "#fef3c7", "#fde047", "#eab308", "#a16207", "#854d0e", "#713f12"],
    featured: false
  }
];

export default function PaletteStudio() {
  const [palettes, setPalettes] = useState(defaultPalettes);
  const [selectedPalette, setSelectedPalette] = useState(null);
  const [customPalette, setCustomPalette] = useState({
    name: "",
    colors: ["#ffffff", "#f3f4f6", "#9ca3af", "#6366f1", "#4338ca", "#3730a3", "#312e81"]
  });

  useEffect(() => {
    const saved = localStorage.getItem("drais_kitchen_palettes");
    if (saved) {
      try {
        setPalettes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load palettes");
      }
    }
  }, []);

  const savePalettes = () => {
    localStorage.setItem("drais_kitchen_palettes", JSON.stringify(palettes));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
  };

  const addCustomPalette = () => {
    if (!customPalette.name) {
      alert("Please enter a palette name");
      return;
    }
    const newPalette = {
      id: `custom-${Date.now()}`,
      ...customPalette,
      featured: false
    };
    setPalettes([...palettes, newPalette]);
    setCustomPalette({
      name: "",
      colors: ["#ffffff", "#f3f4f6", "#9ca3af", "#6366f1", "#4338ca", "#3730a3", "#312e81"]
    });
    savePalettes();
  };

  const toggleFeatured = (paletteId) => {
    setPalettes(palettes.map(p =>
      p.id === paletteId ? { ...p, featured: !p.featured } : p
    ));
    savePalettes();
  };

  const deletePalette = (paletteId) => {
    if (paletteId.startsWith("default-")) {
      alert("Cannot delete default palettes");
      return;
    }
    setPalettes(palettes.filter(p => p.id !== paletteId));
    savePalettes();
  };

  const checkContrast = (bgColor, textColor) => {
    // Simplified contrast check (UI-only simulation)
    const bgBrightness = parseInt(bgColor.slice(1, 3), 16);
    const textBrightness = parseInt(textColor.slice(1, 3), 16);
    const ratio = Math.abs(bgBrightness - textBrightness) / 255;
    return ratio > 0.5 ? "good" : "poor";
  };

  const exportPalettes = () => {
    const json = JSON.stringify(palettes, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drais-palettes.json";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Paintbrush className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Color Palette Studio</h1>
                <p className="text-pink-100">Design palettes with auto-contrast checking</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={exportPalettes}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              <Button variant="secondary">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Palette Library */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Palette Library</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {palettes.map((palette, index) => (
                  <motion.div
                    key={palette.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-2 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer"
                    onClick={() => setSelectedPalette(palette)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{palette.name}</h3>
                        {palette.featured && (
                          <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFeatured(palette.id);
                          }}
                        >
                          <Star className={`w-4 h-4 ${palette.featured ? "fill-yellow-500 text-yellow-500" : ""}`} />
                        </Button>
                        {!palette.id.startsWith("default-") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePalette(palette.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {palette.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="flex-1 h-12 rounded transition-transform hover:scale-110"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Create Custom Palette */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Custom Palette
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Palette Name</Label>
                  <Input
                    placeholder="My Custom Palette"
                    value={customPalette.name}
                    onChange={(e) => setCustomPalette({ ...customPalette, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Colors (7 shades from light to dark)</Label>
                  <div className="grid grid-cols-7 gap-2">
                    {customPalette.colors.map((color, idx) => (
                      <div key={idx} className="space-y-1">
                        <Input
                          type="color"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...customPalette.colors];
                            newColors[idx] = e.target.value;
                            setCustomPalette({ ...customPalette, colors: newColors });
                          }}
                          className="w-full h-12 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={color}
                          onChange={(e) => {
                            const newColors = [...customPalette.colors];
                            newColors[idx] = e.target.value;
                            setCustomPalette({ ...customPalette, colors: newColors });
                          }}
                          className="text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={addCustomPalette} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Palette
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Palette Editor & Preview */}
          <div className="space-y-6">
            {selectedPalette ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Editing: {selectedPalette.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedPalette.colors.map((color, idx) => (
                      <div key={idx} className="space-y-2">
                        <Label>Shade {idx + 1}</Label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={color}
                            className="w-16 h-10 p-1 cursor-pointer"
                            disabled={selectedPalette.id.startsWith("default-")}
                          />
                          <Input
                            type="text"
                            value={color}
                            className="flex-1"
                            disabled={selectedPalette.id.startsWith("default-")}
                          />
                          <div
                            className="w-10 h-10 rounded border-2"
                            style={{ backgroundColor: color }}
                          />
                        </div>
                      </div>
                    ))}
                    {selectedPalette.id.startsWith("default-") && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Default palettes are read-only. Create a custom palette to edit.
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Contrast Check */}
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Check</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {selectedPalette.colors.slice(0, -1).map((bg, idx) => {
                        const textColor = selectedPalette.colors[selectedPalette.colors.length - 1];
                        const contrast = checkContrast(bg, textColor);
                        return (
                          <div key={idx} className="flex items-center gap-3">
                            <div
                              className="flex-1 p-3 rounded font-semibold"
                              style={{ backgroundColor: bg, color: textColor }}
                            >
                              Sample Text
                            </div>
                            {contrast === "good" ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <strong>Tip:</strong> Good contrast ensures readability for all users. Aim for high contrast between background and text.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Paintbrush className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Select a palette to edit and preview
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
