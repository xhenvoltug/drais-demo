"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, FileJson, FileCode, Package, CheckCircle } from "lucide-react";

export default function ExportSystem() {
  const [exportName, setExportName] = useState("my-brand-kit");
  const [includeTheme, setIncludeTheme] = useState(true);
  const [includeColors, setIncludeColors] = useState(true);
  const [includeFonts, setIncludeFonts] = useState(true);
  const [includeComponents, setIncludeComponents] = useState(true);

  const generateJSON = () => {
    // Only access localStorage on the client side
    if (typeof window === 'undefined') {
      return JSON.stringify({
        version: "0.0.0019",
        exportedAt: new Date().toISOString(),
        theme: null,
        colors: null,
        fonts: null,
        components: null
      }, null, 2);
    }
    
    const data = {
      version: "0.0.0019",
      exportedAt: new Date().toISOString(),
      theme: includeTheme ? JSON.parse(localStorage.getItem("drais_kitchen_theme") || "{}") : null,
      colors: includeColors ? JSON.parse(localStorage.getItem("drais_kitchen_palettes") || "[]") : null,
      fonts: includeFonts ? JSON.parse(localStorage.getItem("drais_kitchen_fonts") || "{}") : null,
      components: includeComponents ? JSON.parse(localStorage.getItem("drais_kitchen_components") || "{}") : null
    };
    return JSON.stringify(data, null, 2);
  };

  const downloadJSON = () => {
    const json = generateJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}.json`;
    a.click();
    alert("JSON exported successfully!");
  };

  const generateCSS = () => {
    // Only access localStorage on the client side
    if (typeof window === 'undefined') {
      return `:root { /* Default values */ }`;
    }
    
    const theme = JSON.parse(localStorage.getItem("drais_kitchen_theme") || "{}");
    const fonts = JSON.parse(localStorage.getItem("drais_kitchen_fonts") || "{}");
    const components = JSON.parse(localStorage.getItem("drais_kitchen_components") || "{}");

    return `:root {
  /* Theme Colors */
  --color-primary: ${theme.primary || "#6366f1"};
  --color-secondary: ${theme.secondary || "#8b5cf6"};
  --color-accent: ${theme.accent || "#ec4899"};
  --color-background: ${theme.background || "#ffffff"};
  --color-surface: ${theme.surface || "#f9fafb"};
  
  /* Typography */
  --font-family: '${fonts.config?.font || "Inter"}', sans-serif;
  --font-h1: ${fonts.config?.h1 || 48}px;
  --font-h2: ${fonts.config?.h2 || 36}px;
  --font-h3: ${fonts.config?.h3 || 30}px;
  --font-body: ${fonts.config?.body || 16}px;
  --line-height: ${fonts.config?.lineHeight || 1.5};
  
  /* Layout */
  --border-radius: ${theme.borderRadius || 8}px;
  --spacing: ${theme.spacing || 4}px;
  --shadow: ${theme.shadow || "medium"};
  
  /* Components */
  --button-border: ${components.buttons?.borderWidth || 2}px;
  --card-radius: ${components.cards?.borderRadius || 12}px;
  --sidebar-width: ${components.sidebar?.width || 280}px;
}`;
  };

  const downloadCSS = () => {
    const css = generateCSS();
    const blob = new Blob([css], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName}.css`;
    a.click();
    alert("CSS tokens exported successfully!");
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result);
        if (typeof window !== 'undefined') {
          if (data.theme) localStorage.setItem("drais_kitchen_theme", JSON.stringify(data.theme));
          if (data.colors) localStorage.setItem("drais_kitchen_palettes", JSON.stringify(data.colors));
          if (data.fonts) localStorage.setItem("drais_kitchen_fonts", JSON.stringify(data.fonts));
          if (data.components) localStorage.setItem("drais_kitchen_components", JSON.stringify(data.components));
          alert("Settings imported successfully! Refresh to see changes.");
        }
      } catch (err) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Export & Presets</h1>
              <p className="text-orange-100">Export your brand kit or import saved presets</p>
            </div>
          </div>
        </motion.div>

        <Tabs defaultValue="export" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="export">Export</TabsTrigger>
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileJson className="w-5 h-5" />
                    JSON Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Export Name</Label>
                    <Input
                      value={exportName}
                      onChange={(e) => setExportName(e.target.value)}
                      placeholder="my-brand-kit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Include:</Label>
                    {[
                      { key: "theme", label: "Theme Settings", state: includeTheme, setState: setIncludeTheme },
                      { key: "colors", label: "Color Palettes", state: includeColors, setState: setIncludeColors },
                      { key: "fonts", label: "Font Configuration", state: includeFonts, setState: setIncludeFonts },
                      { key: "components", label: "Component Styles", state: includeComponents, setState: setIncludeComponents }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-3 border rounded-lg">
                        <span className="text-sm">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={item.state}
                          onChange={(e) => item.setState(e.target.checked)}
                          className="w-5 h-5"
                        />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full" onClick={downloadJSON}>
                    <Download className="w-4 h-4 mr-2" />
                    Download JSON
                  </Button>

                  <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <pre className="text-xs overflow-x-auto max-h-40">
                      {generateJSON()}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCode className="w-5 h-5" />
                    CSS Tokens Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Export CSS custom properties for use in any web project
                  </p>

                  <Button className="w-full" onClick={downloadCSS}>
                    <Download className="w-4 h-4 mr-2" />
                    Download CSS
                  </Button>

                  <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <pre className="text-xs overflow-x-auto max-h-60">
                      {generateCSS()}
                    </pre>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      <strong>Usage:</strong> Import this CSS file in your project and reference variables with var(--color-primary)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="import" className="mt-6">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Import Brand Kit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload a JSON brand kit file
                  </p>
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="max-w-xs mx-auto"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold">What will be imported:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["Theme Colors", "Color Palettes", "Font Settings", "Component Styles"].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-green-800 dark:text-green-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Warning:</strong> Importing will overwrite current settings. Refresh the page after import to see changes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="presets" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Ocean Blue", gradient: "from-blue-600 to-cyan-600", description: "Professional and clean" },
                { name: "Forest Green", gradient: "from-green-600 to-emerald-600", description: "Natural and calming" },
                { name: "Royal Purple", gradient: "from-purple-600 to-pink-600", description: "Creative and bold" },
                { name: "Sunset Orange", gradient: "from-orange-600 to-red-600", description: "Energetic and warm" },
                { name: "Midnight Dark", gradient: "from-gray-800 to-gray-900", description: "Sleek and modern" },
                { name: "Golden Hour", gradient: "from-yellow-600 to-orange-600", description: "Bright and cheerful" }
              ].map((preset, idx) => (
                <motion.div
                  key={preset.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className={`h-32 bg-gradient-to-r ${preset.gradient}`} />
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-1">{preset.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {preset.description}
                      </p>
                      <Button className="w-full" size="sm">
                        Apply Preset
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
