"use client";

import { motion } from "framer-motion";
import { DraisLogo } from "@/components/drais-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, RefreshCw, ServerCrash, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ServiceUnavailablePage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-slate-50 to-blue-50 dark:bg-gradient-to-bl dark:from-purple-950 dark:via-gray-950 dark:to-blue-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <CardContent className="p-12 text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <DraisLogo className="w-24 h-24" />
                </motion.div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-4 border-dashed border-purple-600/30"
                />
              </div>
            </motion.div>

            {/* 503 Error */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                503
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ServerCrash className="w-6 h-6 text-purple-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Service Temporarily Unavailable
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                We're currently performing maintenance or experiencing high traffic. Please check back shortly.
              </p>
            </motion.div>

            {/* Status Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              <Card className="bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm font-semibold">Auto-refresh in</p>
                  <p className="text-2xl font-bold text-purple-600">{countdown}s</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-2">Status:</p>
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-3 h-3 bg-yellow-500 rounded-full"
                    />
                    <span className="text-sm font-medium">Under Maintenance</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-200 dark:border-purple-800">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-2">What's happening?</p>
                  <ul className="text-sm text-left space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Scheduled maintenance in progress</li>
                    <li>• System upgrades being deployed</li>
                    <li>• Normal service will resume shortly</li>
                    <li>• Your data is safe and secure</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => router.refresh()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Now
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 pt-6 border-t"
            >
              <p className="text-sm text-gray-500">
                For urgent matters:{" "}
                <Link href="/contact" className="text-purple-600 hover:underline">
                  Contact Xhenvolt Emergency Support
                </Link>
              </p>
              <p className="text-xs text-gray-400 mt-2">+256 741 341 483 • info@xhenvolt.com</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
