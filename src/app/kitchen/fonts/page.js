"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Type, Download, Eye, Search } from "lucide-react";

const googleFonts = [
  { name: "Inter", category: "Sans Serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Roboto", category: "Sans Serif", weights: [100, 300, 400, 500, 700, 900] },
  { name: "Open Sans", category: "Sans Serif", weights: [300, 400, 500, 600, 700, 800] },
  { name: "Lato", category: "Sans Serif", weights: [100, 300, 400, 700, 900] },
  { name: "Montserrat", category: "Sans Serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Poppins", category: "Sans Serif", weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { name: "Playfair Display", category: "Serif", weights: [400, 500, 600, 700, 800, 900] },
  { name: "Merriweather", category: "Serif", weights: [300, 400, 700, 900] },
  { name: "Lora", category: "Serif", weights: [400, 500, 600, 700] },
  { name: "Source Serif Pro", category: "Serif", weights: [200, 300, 400, 600, 700, 900] },
  { name: "Bebas Neue", category: "Display", weights: [400] },
  { name: "Bangers", category: "Display", weights: [400] },
  { name: "Fredoka One", category: "Display", weights: [400] },
  { name: "Righteous", category: "Display", weights: [400] },
  { name: "Fira Code", category: "Monospace", weights: [300, 400, 500, 600, 700] },
  { name: "JetBrains Mono", category: "Monospace", weights: [100, 200, 300, 400, 500, 600, 700, 800] },
  { name: "Source Code Pro", category: "Monospace", weights: [200, 300, 400, 500, 600, 700, 900] },
  { name: "Space Mono", category: "Monospace", weights: [400, 700] }
];

export default function FontManager() {
  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [fontConfig, setFontConfig] = useState({
    h1: 48,
    h2: 36,
    h3: 30,
    h4: 24,
    h5: 20,
    h6: 18,
    body: 16,
    caption: 14,
    lineHeight: 1.5,
    letterSpacing: 0,
    weight: 400
  });

  useEffect(() => {
    const saved = localStorage.getItem("drais_kitchen_fonts");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSelectedFont(data.font || "Inter");
        setFontConfig(data.config || fontConfig);
      } catch (e) {
        console.error("Failed to load font settings");
      }
    }
  }, []);

  const saveFontSettings = () => {
    const data = {
      font: selectedFont,
      config: fontConfig
    };
    localStorage.setItem("drais_kitchen_fonts", JSON.stringify(data));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert(`Font settings saved!\nFont: ${selectedFont}`);
  };

  const updateFontConfig = (key, value) => {
    setFontConfig({ ...fontConfig, [key]: value });
  };

  const exportFontStack = () => {
    const selectedFontObj = googleFonts.find(f => f.name === selectedFont);
    const weights = selectedFontObj?.weights || [400];
    const weightsString = weights.join(';');
    
    const css = `/* Google Font Import */
@import url('https://fonts.googleapis.com/css2?family=${selectedFont.replace(/ /g, '+')}:wght@${weightsString}&display=swap');

/* Font Size Scale */
:root {
  --font-family: '${selectedFont}', sans-serif;
  --font-h1: ${fontConfig.h1}px;
  --font-h2: ${fontConfig.h2}px;
  --font-h3: ${fontConfig.h3}px;
  --font-h4: ${fontConfig.h4}px;
  --font-h5: ${fontConfig.h5}px;
  --font-h6: ${fontConfig.h6}px;
  --font-body: ${fontConfig.body}px;
  --font-caption: ${fontConfig.caption}px;
  --line-height: ${fontConfig.lineHeight};
  --letter-spacing: ${fontConfig.letterSpacing}em;
  --font-weight: ${fontConfig.weight};
}`;

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drais-fonts.css";
    a.click();
  };

  const filteredFonts = googleFonts.filter(font => {
    const matchesCategory = selectedCategory === "All" || font.category === selectedCategory;
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["All", "Sans Serif", "Serif", "Display", "Monospace"];

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
              <Type className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Font Manager</h1>
                <p className="text-indigo-100">Choose fonts and configure typography scale</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={exportFontStack}>
                <Download className="w-4 h-4 mr-2" />
                Export CSS
              </Button>
              <Button variant="secondary" onClick={saveFontSettings}>
                Save Settings
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Font Library */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Font Library</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search fonts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <Badge
                      key={cat}
                      variant={selectedCategory === cat ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Badge>
                  ))}
                </div>

                {/* Font List */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {filteredFonts.map(font => (
                    <motion.div
                      key={font.name}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${
                        selectedFont === font.name
                          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
                          : "border-gray-200 dark:border-gray-800 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedFont(font.name)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{font.name}</span>
                        <Badge variant="outline" className="text-xs">{font.category}</Badge>
                      </div>
                      <p className="text-2xl" style={{ fontFamily: `'${font.name}', sans-serif` }}>
                        The quick brown fox
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Font Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Heading Sizes */}
                  {["h1", "h2", "h3", "h4", "h5", "h6"].map(heading => (
                    <div key={heading} className="space-y-2">
                      <Label className="capitalize">{heading}: {fontConfig[heading]}px</Label>
                      <Slider
                        value={[fontConfig[heading]]}
                        onValueChange={([value]) => updateFontConfig(heading, value)}
                        min={12}
                        max={72}
                        step={1}
                      />
                    </div>
                  ))}

                  {/* Body & Caption */}
                  <div className="space-y-2">
                    <Label>Body: {fontConfig.body}px</Label>
                    <Slider
                      value={[fontConfig.body]}
                      onValueChange={([value]) => updateFontConfig("body", value)}
                      min={12}
                      max={24}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Caption: {fontConfig.caption}px</Label>
                    <Slider
                      value={[fontConfig.caption]}
                      onValueChange={([value]) => updateFontConfig("caption", value)}
                      min={10}
                      max={18}
                      step={1}
                    />
                  </div>

                  {/* Line Height */}
                  <div className="space-y-2">
                    <Label>Line Height: {fontConfig.lineHeight.toFixed(2)}</Label>
                    <Slider
                      value={[fontConfig.lineHeight]}
                      onValueChange={([value]) => updateFontConfig("lineHeight", value)}
                      min={0.8}
                      max={2.5}
                      step={0.1}
                    />
                  </div>

                  {/* Letter Spacing */}
                  <div className="space-y-2">
                    <Label>Letter Spacing: {fontConfig.letterSpacing.toFixed(2)}em</Label>
                    <Slider
                      value={[fontConfig.letterSpacing]}
                      onValueChange={([value]) => updateFontConfig("letterSpacing", value)}
                      min={-0.1}
                      max={0.5}
                      step={0.01}
                    />
                  </div>

                  {/* Font Weight */}
                  <div className="space-y-2 md:col-span-2">
                    <Label>Font Weight: {fontConfig.weight}</Label>
                    <Slider
                      value={[fontConfig.weight]}
                      onValueChange={([value]) => updateFontConfig("weight", value)}
                      min={100}
                      max={900}
                      step={100}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  style={{
                    fontFamily: `'${selectedFont}', sans-serif`,
                    lineHeight: fontConfig.lineHeight,
                    letterSpacing: `${fontConfig.letterSpacing}em`,
                    fontWeight: fontConfig.weight
                  }}
                >
                  <h1 style={{ fontSize: `${fontConfig.h1}px` }} className="mb-2">
                    Heading 1 - {fontConfig.h1}px
                  </h1>
                  <h2 style={{ fontSize: `${fontConfig.h2}px` }} className="mb-2">
                    Heading 2 - {fontConfig.h2}px
                  </h2>
                  <h3 style={{ fontSize: `${fontConfig.h3}px` }} className="mb-2">
                    Heading 3 - {fontConfig.h3}px
                  </h3>
                  <h4 style={{ fontSize: `${fontConfig.h4}px` }} className="mb-2">
                    Heading 4 - {fontConfig.h4}px
                  </h4>
                  <h5 style={{ fontSize: `${fontConfig.h5}px` }} className="mb-2">
                    Heading 5 - {fontConfig.h5}px
                  </h5>
                  <h6 style={{ fontSize: `${fontConfig.h6}px` }} className="mb-4">
                    Heading 6 - {fontConfig.h6}px
                  </h6>
                  <p style={{ fontSize: `${fontConfig.body}px` }} className="mb-3">
                    Body text: The quick brown fox jumps over the lazy dog. This is how your body text will look with the selected font and configuration. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <p style={{ fontSize: `${fontConfig.caption}px` }} className="text-gray-600 dark:text-gray-400">
                    Caption text: Small supporting text for UI elements, labels, and metadata.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Tip:</strong> For Arabic/Tahfiz content, visit the Tahfiz Styling page for specialized typography.
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
