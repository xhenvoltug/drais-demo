"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, ChevronLeft, CheckCircle, Sparkles, BookOpen, Palette, Type, Blocks } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Welcome to DRAIS Kitchen",
    description: "Your complete design and branding studio",
    content: "DRAIS Kitchen is a powerful suite of tools for customizing every aspect of your school management system. Let's take a quick tour!",
    icon: Sparkles,
    action: "Start Tour"
  },
  {
    id: 2,
    title: "Theme Builder",
    description: "Design your perfect color scheme",
    content: "Click on Theme Builder in the sidebar. Try changing the primary color and watch the live preview update in real-time!",
    icon: Palette,
    highlight: "/kitchen/themes",
    action: "Try It Now"
  },
  {
    id: 3,
    title: "Font Manager",
    description: "Choose the perfect typography",
    content: "Visit Font Manager to select from 18+ Google Fonts. Adjust font sizes for headings and body text to match your brand.",
    icon: Type,
    highlight: "/kitchen/fonts",
    action: "Explore Fonts"
  },
  {
    id: 4,
    title: "Component Styler",
    description: "Fine-tune UI elements",
    content: "In Component Styler, customize buttons, cards, tables, and more. Watch your changes appear instantly in the live preview!",
    icon: Blocks,
    highlight: "/kitchen/components",
    action: "Style Components"
  },
  {
    id: 5,
    title: "Save Your Work",
    description: "Never lose your progress",
    content: "All changes are automatically saved to your browser. Use Export to download your brand kit as JSON or CSS tokens.",
    icon: CheckCircle,
    highlight: "/kitchen/export",
    action: "Learn More"
  }
];

export default function GettingStarted() {
  const [currentStep, setCurrentStep] = useState(0);
  const [tourCompleted, setTourCompleted] = useState(false);

  const completeTour = () => {
    setTourCompleted(true);
    localStorage.setItem("drais_kitchen_onboarding_completed", "true");
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Getting Started</h1>
              <p className="text-pink-100">Learn how to use DRAIS Kitchen in 5 easy steps</p>
            </div>
          </div>
        </motion.div>

        {!tourCompleted ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Step {currentStep + 1} of {steps.length}</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-600 to-rose-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardContent className="p-8 md:p-12">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-600 to-rose-600 rounded-full mb-4">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold mb-2">{step.title}</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 p-6 rounded-lg mb-8">
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                        {step.content}
                      </p>
                    </div>

                    {step.highlight && (
                      <div className="mb-8">
                        <Button className="w-full" size="lg" asChild>
                          <a href={step.highlight}>
                            {step.action}
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </a>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex gap-1">
                        {steps.map((_, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentStep
                                ? "bg-pink-600 w-6"
                                : idx < currentStep
                                ? "bg-pink-400"
                                : "bg-gray-300 dark:bg-gray-700"
                            }`}
                          />
                        ))}
                      </div>

                      <Button onClick={nextStep}>
                        {currentStep === steps.length - 1 ? "Finish" : "Next"}
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={completeTour}>
                Skip Tour
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold mb-4">Tour Complete! 🎉</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                    You're ready to start customizing your DRAIS experience
                  </p>
                  <Button size="lg" asChild>
                    <a href="/kitchen">
                      Start Using Kitchen
                      <Sparkles className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Tips & Tricks */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Keyboard Shortcuts",
              description: "Press ? in Live Preview to see all shortcuts",
              icon: "⌨️"
            },
            {
              title: "Color Accessibility",
              description: "Use Palette Studio's contrast checker for WCAG compliance",
              icon: "♿"
            },
            {
              title: "Export Brand Kit",
              description: "Download JSON or CSS tokens to use in other projects",
              icon: "📦"
            },
            {
              title: "Team Collaboration",
              description: "Share preview links with your team for feedback",
              icon: "👥"
            }
          ].map((tip, idx) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{tip.icon}</div>
                  <h3 className="font-bold mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resources */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Kitchen Documentation", description: "Complete guide to all features", link: "#" },
                { title: "Design Guidelines", description: "Best practices for brand consistency", link: "#" },
                { title: "Community Presets", description: "Browse presets from other schools", link: "#" }
              ].map(resource => (
                <a
                  key={resource.title}
                  href={resource.link}
                  className="p-4 border-2 rounded-lg hover:border-pink-500 hover:shadow-lg transition-all group"
                >
                  <h3 className="font-bold mb-1 group-hover:text-pink-600">{resource.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
