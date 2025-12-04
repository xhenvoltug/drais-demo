"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CreditCard, CheckCircle, AlertCircle, Loader2, ArrowLeft, Phone, User, DollarSign } from "lucide-react";
import Link from "next/link";
import { DRAIS_VERSION } from "@/lib/version";

export default function AirtelMoneyPaymentPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    phoneNumber: "",
    amount: "",
    paymentType: "tuition",
  });

  const paymentTypes = [
    { value: "tuition", label: "Tuition Fees", icon: "📚" },
    { value: "boarding", label: "Boarding Fees", icon: "🏠" },
    { value: "transport", label: "Transport", icon: "🚌" },
    { value: "meals", label: "Meals", icon: "🍽️" },
    { value: "uniform", label: "Uniform", icon: "👔" },
    { value: "other", label: "Other Fees", icon: "💰" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const processPayment = () => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
      setStep(3);
    }, 3000);
  };

  const resetForm = () => {
    setStep(1);
    setPaymentSuccess(false);
    setFormData({
      studentId: "",
      studentName: "",
      phoneNumber: "",
      amount: "",
      paymentType: "tuition",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link href="/payments">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Payments
          </Button>
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
              Airtel Money Payment
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Secure fee payment via Airtel Money</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: "Enter Details" },
              { num: 2, label: "Confirm" },
              { num: 3, label: "Complete" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= s.num
                        ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <p className="text-xs mt-2 font-medium">{s.label}</p>
                </div>
                {idx < 2 && (
                  <div
                    className={`h-1 flex-1 mx-2 rounded transition-all ${
                      step > s.num ? "bg-red-500" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {/* Step 1: Payment Form */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Enter student and payment details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="studentId">Student ID / Admission Number</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="studentId"
                          name="studentId"
                          placeholder="S2024/1234"
                          value={formData.studentId}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        placeholder="John Doe"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Airtel Money Number</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="0750 123 456"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Enter the Airtel number registered for Money</p>
                  </div>

                  <div>
                    <Label htmlFor="paymentType">Payment Type</Label>
                    <select
                      id="paymentType"
                      name="paymentType"
                      value={formData.paymentType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 mt-1"
                      required
                    >
                      {paymentTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Amount (UGX)</Label>
                    <div className="relative mt-1">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="500000"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                        min="1000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Minimum: UGX 1,000</p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900 dark:text-red-100">Important Information</p>
                        <ul className="text-sm text-red-700 dark:text-red-300 mt-2 space-y-1">
                          <li>• You will receive a prompt on your phone to approve the payment</li>
                          <li>• Transaction fee: UGX 0 (waived for education payments)</li>
                          <li>• Ensure you have sufficient balance in your Airtel Money account</li>
                          <li>• Payment confirmation will be sent via SMS</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white">
                    Continue to Confirmation
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Confirm Payment Details</CardTitle>
                <CardDescription>Please review before processing payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Student ID:</span>
                    <span className="font-bold">{formData.studentId}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Student Name:</span>
                    <span className="font-bold">{formData.studentName}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Payment Type:</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {paymentTypes.find(t => t.value === formData.paymentType)?.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">Airtel Number:</span>
                    <span className="font-bold">{formData.phoneNumber}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg border-2 border-red-500">
                    <span className="text-gray-600 dark:text-gray-400">Total Amount:</span>
                    <span className="font-bold text-2xl text-red-600">
                      UGX {parseInt(formData.amount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 animate-spin text-red-600 mx-auto mb-4" />
                    <p className="font-medium mb-2">Processing Payment...</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Please approve the prompt on your phone</p>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={processPayment}
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Process Payment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && paymentSuccess && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="border-2 border-green-500">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your Airtel Money payment has been processed successfully
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <p className="text-gray-500">Transaction ID:</p>
                      <p className="font-bold">ATL{Math.floor(Math.random() * 1000000000)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500">Date & Time:</p>
                      <p className="font-bold">{new Date().toLocaleString()}</p>
                    </div>
                    <div className="text-left col-span-2">
                      <p className="text-gray-500">Amount Paid:</p>
                      <p className="font-bold text-xl text-green-600">
                        UGX {parseInt(formData.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Download Receipt
                  </Button>
                  <Button onClick={resetForm} className="flex-1 bg-gradient-to-r from-red-500 to-red-600">
                    Make Another Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
          <CardContent className="p-6">
            <Smartphone className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="font-bold mb-2">Instant Processing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Payments are processed instantly and reflected in the student account within minutes
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
          <CardContent className="p-6">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-bold mb-2">100% Secure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All transactions are encrypted and comply with Airtel Money security standards
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30">
          <CardContent className="p-6">
            <CreditCard className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold mb-2">No Hidden Fees</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Zero transaction fees for education-related payments on Airtel Money
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Secure Payment Processing powered by Airtel Money
      </div>
    </div>
  );
}
