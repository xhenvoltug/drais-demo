"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldAlert, Lock } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import { DraisLogo } from "@/components/drais-logo";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 dark:bg-gradient-to-bl dark:from-red-950 dark:via-rose-950 dark:to-pink-950 flex items-center justify-center p-4">
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
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <DraisLogo className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Animated 403 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-center mb-8"
            >
              <h1 className="text-9xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
                403
              </h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <ShieldAlert className="w-8 h-8 text-red-600" />
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                  Access Forbidden
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                You don't have permission to access this resource. Please contact your administrator if you believe this is an error.
              </p>
            </motion.div>

            {/* Lock Animation */}
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center">
                <Lock className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-rose-600 text-white">
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

            {/* Permission Info */}
            <div className="mt-8 p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900 dark:text-red-100 mb-1">
                    Restricted Access
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    This page requires specific permissions. If you need access, please contact your system administrator or request the appropriate role.
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
