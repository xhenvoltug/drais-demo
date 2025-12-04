"use client";

import { motion } from "framer-motion";
import { DraisLogo } from "@/components/drais-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ServerErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-slate-50 to-red-50 dark:bg-gradient-to-bl dark:from-orange-950 dark:via-gray-950 dark:to-red-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <CardContent className="p-12 text-center">
            {/* Logo with Warning */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <DraisLogo className="w-24 h-24 opacity-50" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-2 -right-2"
                >
                  <AlertTriangle className="w-12 h-12 text-orange-600 fill-orange-100" />
                </motion.div>
              </div>
            </motion.div>

            {/* 500 Error */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-8xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
                500
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Internal Server Error
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Oops! Something went wrong on our end. Our team has been notified and we're working to fix it.
              </p>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-2">What you can do:</p>
                  <ul className="text-sm text-left space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Refresh the page and try again</li>
                    <li>• Clear your browser cache</li>
                    <li>• Come back in a few minutes</li>
                    <li>• Contact support if the problem persists</li>
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
                onClick={() => router.refresh()}
                variant="outline"
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </Button>
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-orange-600 to-red-600 gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Dashboard
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
                Error persisting?{" "}
                <Link href="/contact" className="text-orange-600 hover:underline">
                  Report to Xhenvolt Support
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
