"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Eye, Volume2, Save } from "lucide-react";

const arabicFonts = [
  "Amiri",
  "Scheherazade New",
  "Lateef",
  "Noto Naskh Arabic",
  "Cairo",
  "Tajawal",
  "Almarai"
];

const tajweedColors = {
  idgham: { name: "Idgham (إدغام)", color: "#1e40af", description: "Merging letters" },
  ikhfa: { name: "Ikhfa (إخفاء)", color: "#16a34a", description: "Concealment" },
  ghunnah: { name: "Ghunnah (غنّة)", color: "#dc2626", description: "Nasalization" },
  qalqalah: { name: "Qalqalah (قلقلة)", color: "#ca8a04", description: "Echo sound" },
  madd: { name: "Madd (مدّ)", color: "#9333ea", description: "Prolongation" },
  saakin: { name: "Saakin (ساكن)", color: "#64748b", description: "Vowel-less" }
};

export default function TahfizStyling() {
  const [config, setConfig] = useState({
    arabicFont: "Amiri",
    fontSize: 28,
    lineHeight: 2.0,
    tajweedColors: {
      idgham: "#1e40af",
      ikhfa: "#16a34a",
      ghunnah: "#dc2626",
      qalqalah: "#ca8a04",
      madd: "#9333ea",
      saakin: "#64748b"
    },
    audioWaveform: "#6366f1",
    progressBadgeColor: "#22c55e",
    badgeShape: "circle"
  });

  const saveConfig = () => {
    localStorage.setItem("drais_kitchen_tahfiz", JSON.stringify(config));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert("Tahfiz styling saved!");
  };

  const sampleVerse = "بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ";

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Tahfiz Styling Suite</h1>
                <p className="text-emerald-100">Specialized styling for Quranic text and memorization features</p>
              </div>
            </div>
            <Button variant="secondary" onClick={saveConfig}>
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Arabic Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Arabic Font</Label>
                  <select
                    className="w-full border-2 rounded-lg p-2 dark:bg-gray-900"
                    value={config.arabicFont}
                    onChange={(e) => setConfig({ ...config, arabicFont: e.target.value })}
                  >
                    {arabicFonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>Font Size: {config.fontSize}px</Label>
                  <Slider
                    value={[config.fontSize]}
                    onValueChange={([value]) => setConfig({ ...config, fontSize: value })}
                    min={18}
                    max={48}
                    step={2}
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Recommended: 24-32px for optimal readability
                  </p>
                </div>

                <div>
                  <Label>Line Height: {config.lineHeight.toFixed(1)}</Label>
                  <Slider
                    value={[config.lineHeight]}
                    onValueChange={([value]) => setConfig({ ...config, lineHeight: value })}
                    min={1.8}
                    max={2.5}
                    step={0.1}
                  />
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Arabic text needs more line spacing for clarity
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tajweed Color Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(tajweedColors).map(([key, rule]) => (
                  <div key={key} className="space-y-2">
                    <Label>{rule.name}</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={config.tajweedColors[key]}
                        onChange={(e) => setConfig({
                          ...config,
                          tajweedColors: { ...config.tajweedColors, [key]: e.target.value }
                        })}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={config.tajweedColors[key]}
                        onChange={(e) => setConfig({
                          ...config,
                          tajweedColors: { ...config.tajweedColors, [key]: e.target.value }
                        })}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{rule.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audio Player Styling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Waveform Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={config.audioWaveform}
                      onChange={(e) => setConfig({ ...config, audioWaveform: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      type="text"
                      value={config.audioWaveform}
                      onChange={(e) => setConfig({ ...config, audioWaveform: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Play Button Style</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["circle", "square", "rounded"].map(shape => (
                      <Button
                        key={shape}
                        variant={config.badgeShape === shape ? "default" : "outline"}
                        size="sm"
                        onClick={() => setConfig({ ...config, badgeShape: shape })}
                      >
                        {shape}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quranic Text Preview */}
                <div
                  className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg text-center"
                  dir="rtl"
                  style={{
                    fontFamily: `'${config.arabicFont}', serif`,
                    fontSize: `${config.fontSize}px`,
                    lineHeight: config.lineHeight
                  }}
                >
                  <p className="mb-4">{sampleVerse}</p>
                  <p className="text-sm mb-4">
                    <span style={{ color: config.tajweedColors.idgham }}>إدغام</span> •{" "}
                    <span style={{ color: config.tajweedColors.ikhfa }}>إخفاء</span> •{" "}
                    <span style={{ color: config.tajweedColors.ghunnah }}>غنّة</span> •{" "}
                    <span style={{ color: config.tajweedColors.qalqalah }}>قلقلة</span> •{" "}
                    <span style={{ color: config.tajweedColors.madd }}>مدّ</span>
                  </p>
                </div>

                {/* Audio Player Preview */}
                <div className="p-4 border-2 rounded-lg">
                  <div className="flex items-center gap-4 mb-3">
                    <Button
                      className={`${
                        config.badgeShape === "circle" ? "rounded-full" :
                        config.badgeShape === "square" ? "rounded-none" : "rounded-lg"
                      }`}
                      size="sm"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: config.audioWaveform }}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 text-center">
                    Surah Al-Fatihah • Qari: Mishary Rashid
                  </div>
                </div>

                {/* Progress Badges */}
                <div className="space-y-3">
                  <Label>Memorization Progress Badges</Label>
                  <div className="flex gap-3">
                    {["circle", "shield", "star"].map(shape => (
                      <div
                        key={shape}
                        className={`flex items-center justify-center w-16 h-16 ${
                          shape === "circle" ? "rounded-full" :
                          shape === "shield" ? "rounded-t-full" : ""
                        } text-white font-bold`}
                        style={{ backgroundColor: config.progressBadgeColor }}
                      >
                        {shape === "star" ? "★" : "75%"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>RTL Support:</strong> All Quranic text automatically displays right-to-left
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                  <p className="text-sm text-purple-800 dark:text-purple-300">
                    <strong>Accessibility:</strong> High contrast colors prioritized for older users
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Palettes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Traditional Green", bg: "#16a34a", text: "#f0fdf4" },
                  { name: "Soft Blue", bg: "#3b82f6", text: "#eff6ff" },
                  { name: "Earth Tones", bg: "#92400e", text: "#fef3c7" }
                ].map(palette => (
                  <div
                    key={palette.name}
                    className="p-4 rounded-lg cursor-pointer hover:shadow-lg transition-all"
                    style={{ backgroundColor: palette.bg, color: palette.text }}
                  >
                    <div className="font-semibold mb-1">{palette.name}</div>
                    <div className="text-sm opacity-90" dir="rtl">{sampleVerse}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
