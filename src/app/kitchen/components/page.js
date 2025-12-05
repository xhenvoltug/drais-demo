"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Blocks, Download, RotateCcw } from "lucide-react";

export default function ComponentStyler() {
  const [componentStyles, setComponentStyles] = useState({
    buttons: {
      borderWidth: 2,
      hoverScale: 1.05,
      activeScale: 0.95,
      shadowOnHover: true,
      useGradient: false
    },
    cards: {
      borderRadius: 12,
      padding: 4,
      shadowIntensity: "medium",
      showBorder: true,
      hoverLift: true
    },
    tables: {
      rowHoverColor: "#f3f4f6",
      zebraStripes: true,
      headerBg: "#111827",
      cellPadding: 12
    },
    inputs: {
      focusRingColor: "#6366f1",
      borderRadius: 8,
      padding: 10,
      placeholderColor: "#9ca3af"
    },
    modals: {
      backdropOpacity: 50,
      backdropBlur: 8,
      modalShadow: "large",
      animationSpeed: 300
    },
    sidebar: {
      width: 280,
      collapsedWidth: 70,
      activeHighlight: "#6366f1",
      hoverBg: "#f3f4f6"
    },
    bottomNav: {
      spacing: 16,
      iconSize: 24,
      activeIndicator: "#6366f1",
      aiButtonMargin: 96
    }
  });

  const updateStyle = (component, key, value) => {
    setComponentStyles({
      ...componentStyles,
      [component]: {
        ...componentStyles[component],
        [key]: value
      }
    });
  };

  const saveStyles = () => {
    localStorage.setItem("drais_kitchen_components", JSON.stringify(componentStyles));
    localStorage.setItem("drais_kitchen_last_edit", new Date().toISOString());
    alert("Component styles saved!");
  };

  const resetStyles = () => {
    if (confirm("Reset all component styles to defaults?")) {
      setComponentStyles({
        buttons: {
          borderWidth: 2,
          hoverScale: 1.05,
          activeScale: 0.95,
          shadowOnHover: true,
          useGradient: false
        },
        cards: {
          borderRadius: 12,
          padding: 4,
          shadowIntensity: "medium",
          showBorder: true,
          hoverLift: true
        },
        tables: {
          rowHoverColor: "#f3f4f6",
          zebraStripes: true,
          headerBg: "#111827",
          cellPadding: 12
        },
        inputs: {
          focusRingColor: "#6366f1",
          borderRadius: 8,
          padding: 10,
          placeholderColor: "#9ca3af"
        },
        modals: {
          backdropOpacity: 50,
          backdropBlur: 8,
          modalShadow: "large",
          animationSpeed: 300
        },
        sidebar: {
          width: 280,
          collapsedWidth: 70,
          activeHighlight: "#6366f1",
          hoverBg: "#f3f4f6"
        },
        bottomNav: {
          spacing: 16,
          iconSize: 24,
          activeIndicator: "#6366f1",
          aiButtonMargin: 96
        }
      });
    }
  };

  const exportCSS = () => {
    const css = `/* DRAIS Component Styles */
:root {
  /* Buttons */
  --button-border-width: ${componentStyles.buttons.borderWidth}px;
  --button-hover-scale: ${componentStyles.buttons.hoverScale};
  --button-active-scale: ${componentStyles.buttons.activeScale};
  
  /* Cards */
  --card-border-radius: ${componentStyles.cards.borderRadius}px;
  --card-padding: ${componentStyles.cards.padding}rem;
  --card-shadow: ${componentStyles.cards.shadowIntensity};
  
  /* Tables */
  --table-row-hover: ${componentStyles.tables.rowHoverColor};
  --table-header-bg: ${componentStyles.tables.headerBg};
  --table-cell-padding: ${componentStyles.tables.cellPadding}px;
  
  /* Inputs */
  --input-focus-ring: ${componentStyles.inputs.focusRingColor};
  --input-border-radius: ${componentStyles.inputs.borderRadius}px;
  --input-padding: ${componentStyles.inputs.padding}px;
  
  /* Modals */
  --modal-backdrop-opacity: ${componentStyles.modals.backdropOpacity}%;
  --modal-backdrop-blur: ${componentStyles.modals.backdropBlur}px;
  --modal-animation-speed: ${componentStyles.modals.animationSpeed}ms;
  
  /* Sidebar */
  --sidebar-width: ${componentStyles.sidebar.width}px;
  --sidebar-collapsed: ${componentStyles.sidebar.collapsedWidth}px;
  --sidebar-active: ${componentStyles.sidebar.activeHighlight};
  
  /* Bottom Nav */
  --bottom-nav-spacing: ${componentStyles.bottomNav.spacing}px;
  --bottom-nav-icon-size: ${componentStyles.bottomNav.iconSize}px;
  --ai-button-margin-bottom: ${componentStyles.bottomNav.aiButtonMargin}px;
}`;

    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "drais-components.css";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Blocks className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Component Styler</h1>
                <p className="text-blue-100">Fine-tune UI component styles</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={resetStyles}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="secondary" onClick={exportCSS}>
                <Download className="w-4 h-4 mr-2" />
                Export CSS
              </Button>
              <Button variant="secondary" onClick={saveStyles}>
                Save Styles
              </Button>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 w-full">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="modals">Modals</TabsTrigger>
            <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
            <TabsTrigger value="bottomnav">Bottom Nav</TabsTrigger>
          </TabsList>

          {/* Buttons */}
          <TabsContent value="buttons" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Border Width: {componentStyles.buttons.borderWidth}px</Label>
                    <Slider
                      value={[componentStyles.buttons.borderWidth]}
                      onValueChange={([value]) => updateStyle("buttons", "borderWidth", value)}
                      min={0}
                      max={4}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Hover Scale: {componentStyles.buttons.hoverScale}</Label>
                    <Slider
                      value={[componentStyles.buttons.hoverScale]}
                      onValueChange={([value]) => updateStyle("buttons", "hoverScale", value)}
                      min={1}
                      max={1.2}
                      step={0.01}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active Scale: {componentStyles.buttons.activeScale}</Label>
                    <Slider
                      value={[componentStyles.buttons.activeScale]}
                      onValueChange={([value]) => updateStyle("buttons", "activeScale", value)}
                      min={0.85}
                      max={1}
                      step={0.01}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Shadow on Hover</Label>
                    <Switch
                      checked={componentStyles.buttons.shadowOnHover}
                      onCheckedChange={(checked) => updateStyle("buttons", "shadowOnHover", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Use Gradient</Label>
                    <Switch
                      checked={componentStyles.buttons.useGradient}
                      onCheckedChange={(checked) => updateStyle("buttons", "useGradient", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Button Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.button
                    whileHover={{ scale: componentStyles.buttons.hoverScale }}
                    whileTap={{ scale: componentStyles.buttons.activeScale }}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      componentStyles.buttons.useGradient
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                        : "bg-blue-600"
                    } text-white ${componentStyles.buttons.shadowOnHover ? "hover:shadow-lg" : ""}`}
                    style={{ borderWidth: componentStyles.buttons.borderWidth }}
                  >
                    Primary Button
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: componentStyles.buttons.hoverScale }}
                    whileTap={{ scale: componentStyles.buttons.activeScale }}
                    className="px-6 py-3 rounded-lg font-semibold border-2 border-blue-600 text-blue-600 transition-all"
                    style={{ borderWidth: componentStyles.buttons.borderWidth }}
                  >
                    Outline Button
                  </motion.button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Cards */}
          <TabsContent value="cards" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Border Radius: {componentStyles.cards.borderRadius}px</Label>
                    <Slider
                      value={[componentStyles.cards.borderRadius]}
                      onValueChange={([value]) => updateStyle("cards", "borderRadius", value)}
                      min={0}
                      max={24}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Padding: {componentStyles.cards.padding}rem</Label>
                    <Slider
                      value={[componentStyles.cards.padding]}
                      onValueChange={([value]) => updateStyle("cards", "padding", value)}
                      min={1}
                      max={8}
                      step={0.5}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Show Border</Label>
                    <Switch
                      checked={componentStyles.cards.showBorder}
                      onCheckedChange={(checked) => updateStyle("cards", "showBorder", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Hover Lift Effect</Label>
                    <Switch
                      checked={componentStyles.cards.hoverLift}
                      onCheckedChange={(checked) => updateStyle("cards", "hoverLift", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    whileHover={componentStyles.cards.hoverLift ? { y: -4 } : {}}
                    className={`bg-white dark:bg-gray-900 shadow-lg transition-all ${
                      componentStyles.cards.showBorder ? "border-2" : ""
                    }`}
                    style={{
                      borderRadius: componentStyles.cards.borderRadius,
                      padding: `${componentStyles.cards.padding}rem`
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">Card Title</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      This is a preview of how cards will look with your custom styles.
                    </p>
                    <div className="flex gap-2">
                      <Badge>Badge 1</Badge>
                      <Badge variant="outline">Badge 2</Badge>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tables */}
          <TabsContent value="tables" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Table Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Row Hover Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.tables.rowHoverColor}
                        onChange={(e) => updateStyle("tables", "rowHoverColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.tables.rowHoverColor}
                        onChange={(e) => updateStyle("tables", "rowHoverColor", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Header Background</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.tables.headerBg}
                        onChange={(e) => updateStyle("tables", "headerBg", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.tables.headerBg}
                        onChange={(e) => updateStyle("tables", "headerBg", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Cell Padding: {componentStyles.tables.cellPadding}px</Label>
                    <Slider
                      value={[componentStyles.tables.cellPadding]}
                      onValueChange={([value]) => updateStyle("tables", "cellPadding", value)}
                      min={4}
                      max={24}
                      step={2}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Zebra Stripes</Label>
                    <Switch
                      checked={componentStyles.tables.zebraStripes}
                      onCheckedChange={(checked) => updateStyle("tables", "zebraStripes", checked)}
                    />
                  </div>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ backgroundColor: componentStyles.tables.headerBg }}>
                      <tr>
                        <th className="text-white font-semibold text-left" style={{ padding: componentStyles.tables.cellPadding }}>Name</th>
                        <th className="text-white font-semibold text-left" style={{ padding: componentStyles.tables.cellPadding }}>Class</th>
                        <th className="text-white font-semibold text-left" style={{ padding: componentStyles.tables.cellPadding }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((i) => (
                        <tr
                          key={i}
                          className={`transition-colors ${componentStyles.tables.zebraStripes && i % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""}`}
                          style={{
                            ":hover": { backgroundColor: componentStyles.tables.rowHoverColor }
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = componentStyles.tables.rowHoverColor}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ""}
                        >
                          <td style={{ padding: componentStyles.tables.cellPadding }}>Student {i}</td>
                          <td style={{ padding: componentStyles.tables.cellPadding }}>S.{i}</td>
                          <td style={{ padding: componentStyles.tables.cellPadding }}>A</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inputs */}
          <TabsContent value="inputs" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Input Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Focus Ring Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.inputs.focusRingColor}
                        onChange={(e) => updateStyle("inputs", "focusRingColor", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.inputs.focusRingColor}
                        onChange={(e) => updateStyle("inputs", "focusRingColor", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Border Radius: {componentStyles.inputs.borderRadius}px</Label>
                    <Slider
                      value={[componentStyles.inputs.borderRadius]}
                      onValueChange={([value]) => updateStyle("inputs", "borderRadius", value)}
                      min={0}
                      max={16}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Padding: {componentStyles.inputs.padding}px</Label>
                    <Slider
                      value={[componentStyles.inputs.padding]}
                      onValueChange={([value]) => updateStyle("inputs", "padding", value)}
                      min={4}
                      max={20}
                      step={2}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Input Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="text"
                    placeholder="Type something..."
                    className="w-full border-2 transition-all outline-none"
                    style={{
                      borderRadius: componentStyles.inputs.borderRadius,
                      padding: componentStyles.inputs.padding
                    }}
                    onFocus={(e) => e.target.style.borderColor = componentStyles.inputs.focusRingColor}
                    onBlur={(e) => e.target.style.borderColor = ""}
                  />
                  <textarea
                    placeholder="Multiline input..."
                    className="w-full border-2 transition-all outline-none"
                    rows={4}
                    style={{
                      borderRadius: componentStyles.inputs.borderRadius,
                      padding: componentStyles.inputs.padding
                    }}
                    onFocus={(e) => e.target.style.borderColor = componentStyles.inputs.focusRingColor}
                    onBlur={(e) => e.target.style.borderColor = ""}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Modals */}
          <TabsContent value="modals" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Modal Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Backdrop Opacity: {componentStyles.modals.backdropOpacity}%</Label>
                    <Slider
                      value={[componentStyles.modals.backdropOpacity]}
                      onValueChange={([value]) => updateStyle("modals", "backdropOpacity", value)}
                      min={0}
                      max={100}
                      step={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Backdrop Blur: {componentStyles.modals.backdropBlur}px</Label>
                    <Slider
                      value={[componentStyles.modals.backdropBlur]}
                      onValueChange={([value]) => updateStyle("modals", "backdropBlur", value)}
                      min={0}
                      max={20}
                      step={1}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Animation Speed: {componentStyles.modals.animationSpeed}ms</Label>
                    <Slider
                      value={[componentStyles.modals.animationSpeed]}
                      onValueChange={([value]) => updateStyle("modals", "animationSpeed", value)}
                      min={100}
                      max={1000}
                      step={50}
                    />
                  </div>
                </div>

                <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Preview backdrop effect:
                  </p>
                  <div
                    className="relative h-48 rounded-lg overflow-hidden"
                    style={{
                      backgroundColor: `rgba(0, 0, 0, ${componentStyles.modals.backdropOpacity / 100})`,
                      backdropFilter: `blur(${componentStyles.modals.backdropBlur}px)`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-2xl">
                        <h3 className="font-bold text-lg mb-2">Modal Content</h3>
                        <p className="text-gray-600 dark:text-gray-400">This is a modal preview</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sidebar */}
          <TabsContent value="sidebar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sidebar Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Width: {componentStyles.sidebar.width}px</Label>
                    <Slider
                      value={[componentStyles.sidebar.width]}
                      onValueChange={([value]) => updateStyle("sidebar", "width", value)}
                      min={200}
                      max={320}
                      step={10}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Collapsed Width: {componentStyles.sidebar.collapsedWidth}px</Label>
                    <Slider
                      value={[componentStyles.sidebar.collapsedWidth]}
                      onValueChange={([value]) => updateStyle("sidebar", "collapsedWidth", value)}
                      min={60}
                      max={80}
                      step={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active Highlight Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.sidebar.activeHighlight}
                        onChange={(e) => updateStyle("sidebar", "activeHighlight", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.sidebar.activeHighlight}
                        onChange={(e) => updateStyle("sidebar", "activeHighlight", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Hover Background</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.sidebar.hoverBg}
                        onChange={(e) => updateStyle("sidebar", "hoverBg", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.sidebar.hoverBg}
                        onChange={(e) => updateStyle("sidebar", "hoverBg", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bottom Nav */}
          <TabsContent value="bottomnav" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bottom Navigation Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Icon Size: {componentStyles.bottomNav.iconSize}px</Label>
                    <Slider
                      value={[componentStyles.bottomNav.iconSize]}
                      onValueChange={([value]) => updateStyle("bottomNav", "iconSize", value)}
                      min={16}
                      max={32}
                      step={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Spacing: {componentStyles.bottomNav.spacing}px</Label>
                    <Slider
                      value={[componentStyles.bottomNav.spacing]}
                      onValueChange={([value]) => updateStyle("bottomNav", "spacing", value)}
                      min={8}
                      max={32}
                      step={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>AI Button Margin Bottom: {componentStyles.bottomNav.aiButtonMargin}px</Label>
                    <Slider
                      value={[componentStyles.bottomNav.aiButtonMargin]}
                      onValueChange={([value]) => updateStyle("bottomNav", "aiButtonMargin", value)}
                      min={60}
                      max={120}
                      step={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Active Indicator Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={componentStyles.bottomNav.activeIndicator}
                        onChange={(e) => updateStyle("bottomNav", "activeIndicator", e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        type="text"
                        value={componentStyles.bottomNav.activeIndicator}
                        onChange={(e) => updateStyle("bottomNav", "activeIndicator", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Note:</strong> AI Button Margin prevents overlap with bottom navigation on mobile devices.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
