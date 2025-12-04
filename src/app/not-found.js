"use client";

import { motion } from "framer-motion";
import { DraisLogo } from "@/components/drais-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:bg-gradient-to-bl dark:from-blue-950 dark:via-gray-950 dark:to-purple-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <CardContent className="p-12 text-center">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <DraisLogo className="w-24 h-24" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-blue-600/30"
                />
              </div>
            </motion.div>

            {/* 404 Error */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileQuestion className="w-6 h-6 text-gray-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Page Not Found
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-2">Quick Suggestions:</p>
                  <ul className="text-sm text-left space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Check the URL for typos</li>
                    <li>• Use the navigation menu to find what you need</li>
                    <li>• Return to the dashboard or homepage</li>
                    <li>• Contact support if you think this is an error</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/about-xhenvolt">
                <Button variant="outline" className="gap-2">
                  <Search className="w-4 h-4" />
                  Explore
                </Button>
              </Link>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 pt-6 border-t"
            >
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  Contact Xhenvolt Support
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
