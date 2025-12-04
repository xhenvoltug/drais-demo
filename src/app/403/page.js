"use client";

import { motion } from "framer-motion";
import { DraisLogo } from "@/components/drais-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, ShieldAlert, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-slate-50 to-orange-50 dark:bg-gradient-to-bl dark:from-red-950 dark:via-gray-950 dark:to-orange-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur">
          <CardContent className="p-12 text-center">
            {/* Logo with Lock */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <DraisLogo className="w-24 h-24 opacity-50" />
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Lock className="w-12 h-12 text-red-600" />
                </motion.div>
              </div>
            </motion.div>

            {/* 403 Error */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <h1 className="text-8xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
                403
              </h1>
              <div className="flex items-center justify-center gap-2 mb-2">
                <ShieldAlert className="w-6 h-6 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Access Forbidden
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                You don't have permission to access this resource. If you believe this is an error, please contact your administrator.
              </p>
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-8"
            >
              <Card className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <p className="text-sm font-semibold mb-2">Possible Reasons:</p>
                  <ul className="text-sm text-left space-y-1 text-gray-700 dark:text-gray-300">
                    <li>• Insufficient user permissions</li>
                    <li>• Resource requires admin privileges</li>
                    <li>• Your account may be restricted</li>
                    <li>• Session may have expired - try logging in again</li>
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
                <Button className="bg-gradient-to-r from-red-600 to-orange-600 gap-2 w-full sm:w-auto">
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
                Need access?{" "}
                <Link href="/contact" className="text-red-600 hover:underline">
                  Contact Support
                </Link>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
