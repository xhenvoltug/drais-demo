"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { DraisLogo } from "@/components/drais-logo";
import { 
  Building2, Users, Phone, Mail, MapPin, ArrowRight, 
  CheckCircle2, Rocket, Sparkles 
} from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolType: "",
    students: "",
    contactPerson: "",
    phone: "",
    email: "",
    district: "",
    package: "",
  });

  const steps = [
    { number: 1, title: "School Info", icon: Building2 },
    { number: 2, title: "Contact Details", icon: Phone },
    { number: 3, title: "Choose Package", icon: Sparkles },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const packages = [
    {
      name: "Professional",
      price: "UGX 1,000,000",
      term: "150,000/term",
      features: ["Student Management", "Fees Tracking", "SMS Notifications", "Basic Reports", "2 Weeks Grace Period"],
    },
    {
      name: "Premium",
      price: "UGX 1,800,000",
      term: "200,000/term",
      features: ["All Professional Features", "AI Insights", "Advanced Analytics", "Parent Portal", "1 Month Grace Period"],
      popular: true,
    },
    {
      name: "Gold",
      price: "UGX 2,500,000",
      term: "300,000/term",
      features: ["All Premium Features", "Custom Integrations", "Priority Support", "Unlimited Users", "6 Weeks Grace Period"],
    },
  ];

  const currentStep = steps[step - 1];
  const CurrentStepIcon = currentStep.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 dark:bg-gradient-to-bl dark:from-blue-950 dark:via-gray-950 dark:to-purple-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <DraisLogo className="w-16 h-16" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Get Started with DRAIS
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Transform your school management in just 3 simple steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((s, idx) => (
            <div key={s.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step >= s.number
                      ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                  } transition-all`}
                >
                  {step > s.number ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                </div>
                <p className="text-sm mt-2 font-medium">{s.title}</p>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`w-24 h-1 mx-4 ${
                    step > s.number ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CurrentStepIcon className="w-6 h-6 text-blue-600" />
                {currentStep.title}
              </CardTitle>
              <CardDescription>Please provide the required information</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Step 1: School Info */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="schoolName">School Name *</Label>
                    <Input
                      id="schoolName"
                      name="schoolName"
                      placeholder="e.g., St. Mary's Secondary School"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="schoolType">School Type *</Label>
                    <select
                      id="schoolType"
                      name="schoolType"
                      value={formData.schoolType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border rounded-md dark:bg-gray-800"
                    >
                      <option value="">Select...</option>
                      <option value="primary">Primary School</option>
                      <option value="secondary">Secondary School</option>
                      <option value="vocational">Vocational Institute</option>
                      <option value="university">University/College</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="students">Number of Students *</Label>
                    <Input
                      id="students"
                      name="students"
                      type="number"
                      placeholder="e.g., 450"
                      value={formData.students}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="district">District *</Label>
                    <Input
                      id="district"
                      name="district"
                      placeholder="e.g., Kampala, Wakiso, Iganga..."
                      value={formData.district}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      placeholder="e.g., John Okello (Headteacher)"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="e.g., 0741341483"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g., admin@yourschool.ac.ug"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-sm">Our Office</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Bulubandi, Iganga, Uganda</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">+256 741 341 483</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Step 3: Choose Package */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <Card
                        key={pkg.name}
                        className={`cursor-pointer transition-all hover:shadow-lg ${
                          formData.package === pkg.name
                            ? "ring-2 ring-blue-600 bg-blue-50 dark:bg-blue-950/30"
                            : ""
                        } ${pkg.popular ? "border-purple-500" : ""}`}
                        onClick={() => setFormData({ ...formData, package: pkg.name })}
                      >
                        <CardHeader>
                          {pkg.popular && (
                            <div className="absolute -top-3 right-4">
                              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                POPULAR
                              </span>
                            </div>
                          )}
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                          <div className="space-y-1">
                            <p className="text-2xl font-bold text-blue-600">{pkg.price}</p>
                            <p className="text-sm text-gray-500">Setup fee</p>
                            <p className="text-sm font-semibold">{pkg.term}</p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {pkg.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Rocket className="w-6 h-6 text-green-600 flex-shrink-0" />
                        <div>
                          <h4 className="font-bold mb-2">What happens next?</h4>
                          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                            <li>✓ Our team will contact you within 24 hours</li>
                            <li>✓ Schedule a personalized demo</li>
                            <li>✓ Customize DRAIS for your school</li>
                            <li>✓ Get trained and start managing in days!</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600"
                    onClick={() => setStep(step + 1)}
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600"
                    onClick={() => alert("Form submitted! (UI-only demo)")}
                  >
                    Submit Request <Rocket className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <div className="mt-12 text-center space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            Need help? <Link href="/contact" className="text-blue-600 hover:underline">Contact us</Link> or{" "}
            <Link href="/pricing" className="text-blue-600 hover:underline">view pricing details</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
