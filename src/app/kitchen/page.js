"use client";

import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DRAIS_VERSION } from "@/lib/version";
import {
  Palette, Type, Layout, FileText, Mail, MessageSquare, Download,
  History, Shield, BookOpen, Eye, Sparkles, Zap, Play, RotateCcw,
  Grid3x3, Layers, PenTool, Paintbrush
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function KitchenLanding() {
  const [lastEdit, setLastEdit] = useState(null);
  
  useEffect(() => {
    const saved = localStorage.getItem("drais_kitchen_last_edit");
    if (saved) {
      setLastEdit(new Date(saved).toLocaleString());
    }
  }, []);

  const quickActions = [
    { name: "Create New Preset", icon: Sparkles, color: "from-purple-500 to-pink-600", action: "/kitchen/presets" },
    { name: "Open Live Preview", icon: Eye, color: "from-blue-500 to-cyan-600", action: "/kitchen/live-preview" },
    { name: "Restore Default", icon: RotateCcw, color: "from-orange-500 to-amber-600", action: "#" },
  ];

  const capabilities = [
    {
      title: "Theme Builder",
      description: "Craft custom themes with light/dark modes, gradients, and instant preview",
      icon: Palette,
      color: "from-indigo-500 to-purple-600",
      route: "/kitchen/themes",
      features: ["Global color mapping", "Border & shadow controls", "Auto-switch rules", "Gradient editor"]
    },
    {
      title: "Palette Studio",
      description: "Design color palettes with auto-contrast checking and accessibility warnings",
      icon: Paintbrush,
      color: "from-pink-500 to-rose-600",
      route: "/kitchen/palettes",
      features: ["Custom palette creation", "Contrast validation", "Light/dark variations", "JSON export"]
    },
    {
      title: "Font Manager",
      description: "Choose from hundreds of modern fonts with live preview and weight controls",
      icon: Type,
      color: "from-blue-500 to-cyan-600",
      route: "/kitchen/fonts",
      features: ["Google Fonts library", "Variable font support", "Size scale editor", "Accessibility preview"]
    },
    {
      title: "Component Styler",
      description: "Fine-tune every UI component with visual controls and instant feedback",
      icon: Layout,
      color: "from-green-500 to-emerald-600",
      route: "/kitchen/components",
      features: ["Button variants", "Card styles", "Table customization", "Modal settings"]
    },
    {
      title: "Report Designer",
      description: "Build custom report templates with drag-and-drop blocks and WYSIWYG editing",
      icon: FileText,
      color: "from-orange-500 to-amber-600",
      route: "/kitchen/reports-designer",
      features: ["Exam report cards", "Receipts & invoices", "Block-based editing", "Print preview"]
    },
    {
      title: "Email Templates",
      description: "Design beautiful email templates with placeholders and rich formatting",
      icon: Mail,
      color: "from-purple-500 to-indigo-600",
      route: "/kitchen/email-templates",
      features: ["Rich text editor", "Variable placeholders", "Mock data preview", "Version history"]
    },
    {
      title: "SMS Templates",
      description: "Create SMS message templates with character count and variable support",
      icon: MessageSquare,
      color: "from-cyan-500 to-blue-600",
      route: "/kitchen/sms-templates",
      features: ["Template library", "Placeholder support", "Character counter", "Bulk preview"]
    },
    {
      title: "Tahfiz Styling",
      description: "Special tools for Quranic recitation UI with Arabic fonts and tajweed colors",
      icon: BookOpen,
      color: "from-teal-500 to-green-600",
      route: "/kitchen/tahfiz",
      features: ["Arabic typography", "Tajweed color rules", "Audio player skins", "RTL support"]
    },
    {
      title: "Presets & Export",
      description: "Save and share complete design presets with JSON export and import",
      icon: Download,
      color: "from-violet-500 to-purple-600",
      route: "/kitchen/export",
      features: ["Preset library", "JSON export/import", "Brand kit ZIP", "Theme sharing"]
    },
    {
      title: "History & Audit",
      description: "Track all design changes with timeline, diff preview, and rollback capability",
      icon: History,
      color: "from-gray-500 to-slate-600",
      route: "/kitchen/history",
      features: ["Change timeline", "Diff preview", "Revert changes", "User tracking"]
    },
    {
      title: "Permissions",
      description: "Control who can access Kitchen with role-based and user-level permissions",
      icon: Shield,
      color: "from-red-500 to-pink-600",
      route: "/kitchen/permissions",
      features: ["Role management", "User access control", "Change warnings", "Audit logs"]
    },
    {
      title: "Live Preview",
      description: "Full-screen sandbox to preview all changes across desktop, tablet, and mobile",
      icon: Eye,
      color: "from-emerald-500 to-teal-600",
      route: "/kitchen/live-preview",
      features: ["Device preview", "Real-time updates", "Component showcase", "Apply simulation"]
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-purple-950/30 dark:to-pink-950/30 p-4 md:p-6 lg:p-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 md:p-12 mb-8"
        >
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Sparkles className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">DRAIS Kitchen</h1>
                <p className="text-xl text-purple-100">Design & Branding Studio</p>
              </div>
            </div>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl">
              The ultimate customization hub for crafting your school's unique visual identity. 
              Design themes, palettes, fonts, components, and templates with instant preview and export.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="bg-white/20 text-white px-4 py-2 text-sm">
                Version {DRAIS_VERSION}
              </Badge>
              {lastEdit && (
                <Badge className="bg-white/10 text-white px-4 py-2 text-sm">
                  Last edited: {lastEdit}
                </Badge>
              )}
              <Badge className="bg-green-500/20 text-green-100 px-4 py-2 text-sm">
                <Zap className="w-3 h-3 mr-1" />
                Experimental UI
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.action}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-gradient-to-r ${action.color} p-6 rounded-xl text-white cursor-pointer shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <action.icon className="w-8 h-8 mb-3" />
                  <h3 className="font-semibold text-lg">{action.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Kitchen Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link href={capability.route}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800 cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-gradient-to-r ${capability.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <capability.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{capability.title}</CardTitle>
                      <CardDescription>{capability.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {capability.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-blue-600" />
                New to Kitchen?
              </CardTitle>
              <CardDescription>
                Learn how to customize DRAIS with our interactive getting started guide
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/kitchen/getting-started">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                  <Play className="w-4 h-4 mr-2" />
                  Start Kitchen Tour
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>DRAIS Kitchen v{DRAIS_VERSION} • Design & Branding Studio</p>
          <p className="mt-1">All changes are UI-only and stored locally until published</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
