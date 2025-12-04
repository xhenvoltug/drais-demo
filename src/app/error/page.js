"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Home, RefreshCw, ArrowLeft, AlertTriangle } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import { DraisLogo } from "@/components/drais-logo";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:bg-gradient-to-bl dark:from-gray-950 dark:via-slate-950 dark:to-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="border-0 shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
          <CardContent className="p-12">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center">
                <DraisLogo className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Animated 500 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center mb-8"
            >
              <h1 className="text-9xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent mb-4">
                500
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-gray-600" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Internal Server Error
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                Something went wrong on our end. Our team has been notified and is working to fix the issue.
              </p>
            </motion.div>

            {/* Warning Animation */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-400 to-slate-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto bg-gradient-to-r from-gray-500 to-slate-600 text-white"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Reload Page
              </Button>
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Home className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Error Info */}
            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-950/30 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    What happened?
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    An unexpected error occurred while processing your request. This has been automatically logged and our technical team will investigate.
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                    Error Code: ERR_500_INTERNAL | Timestamp: {new Date().toISOString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
              DRAIS {DRAIS_VERSION}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
