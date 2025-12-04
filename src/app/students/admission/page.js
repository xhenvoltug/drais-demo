"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, ArrowLeft, UserPlus } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

const steps = [
  { id: 1, name: "Student Information", icon: Circle },
  { id: 2, name: "Parent/Guardian Details", icon: Circle },
  { id: 3, name: "Class & Academic Info", icon: Circle },
  { id: 4, name: "Review & Submit", icon: Circle },
];

export default function AdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Student Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    religion: "",
    medicalConditions: "",
    
    // Parent Info
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    parentAddress: "",
    emergencyContact: "",
    
    // Academic Info
    class: "",
    section: "",
    previousSchool: "",
    admissionDate: "",
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Student Admission
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Complete the multi-step form to admit a new student • v{DRAIS_VERSION}
          </p>
        </motion.div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: currentStep === step.id ? 1.1 : 1,
                        backgroundColor: currentStep >= step.id ? "#3b82f6" : "#e5e7eb",
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    >
                      {currentStep > step.id ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step.id
                      )}
                    </motion.div>
                    <p className="text-xs mt-2 text-center font-medium">{step.name}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 mx-2 relative">
                      <motion.div
                        initial={false}
                        animate={{
                          width: currentStep > step.id ? "100%" : "0%",
                        }}
                        className="absolute top-0 left-0 h-full bg-blue-600"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1].name}</CardTitle>
            <CardDescription>Fill in the required information below</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Student Information */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>First Name *</Label>
                    <Input
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name *</Label>
                    <Input
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth *</Label>
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <Select value={formData.gender} onValueChange={(val) => updateFormData("gender", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Nationality</Label>
                    <Input
                      placeholder="Enter nationality"
                      value={formData.nationality}
                      onChange={(e) => updateFormData("nationality", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Religion</Label>
                    <Input
                      placeholder="Enter religion"
                      value={formData.religion}
                      onChange={(e) => updateFormData("religion", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Medical Conditions</Label>
                    <Input
                      placeholder="Any medical conditions or allergies"
                      value={formData.medicalConditions}
                      onChange={(e) => updateFormData("medicalConditions", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Parent/Guardian Details */}
              {currentStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Parent/Guardian Name *</Label>
                    <Input
                      placeholder="Enter full name"
                      value={formData.parentName}
                      onChange={(e) => updateFormData("parentName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input
                      placeholder="+256 700 000000"
                      value={formData.parentPhone}
                      onChange={(e) => updateFormData("parentPhone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="parent@example.com"
                      value={formData.parentEmail}
                      onChange={(e) => updateFormData("parentEmail", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Emergency Contact</Label>
                    <Input
                      placeholder="+256 700 000000"
                      value={formData.emergencyContact}
                      onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label>Home Address *</Label>
                    <Input
                      placeholder="Enter full address"
                      value={formData.parentAddress}
                      onChange={(e) => updateFormData("parentAddress", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Class & Academic Info */}
              {currentStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Class *</Label>
                    <Select value={formData.class} onValueChange={(val) => updateFormData("class", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Grade 1">Grade 1</SelectItem>
                        <SelectItem value="Grade 2">Grade 2</SelectItem>
                        <SelectItem value="Grade 3">Grade 3</SelectItem>
                        <SelectItem value="Grade 4">Grade 4</SelectItem>
                        <SelectItem value="Grade 5">Grade 5</SelectItem>
                        <SelectItem value="Grade 6">Grade 6</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Section *</Label>
                    <Select value={formData.section} onValueChange={(val) => updateFormData("section", val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                        <SelectItem value="D">Section D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Admission Date *</Label>
                    <Input
                      type="date"
                      value={formData.admissionDate}
                      onChange={(e) => updateFormData("admissionDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Previous School</Label>
                    <Input
                      placeholder="Name of previous school"
                      value={formData.previousSchool}
                      onChange={(e) => updateFormData("previousSchool", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Student Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</div>
                      <div><span className="font-medium">Date of Birth:</span> {formData.dateOfBirth}</div>
                      <div><span className="font-medium">Gender:</span> {formData.gender}</div>
                      <div><span className="font-medium">Nationality:</span> {formData.nationality}</div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      Parent/Guardian Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Name:</span> {formData.parentName}</div>
                      <div><span className="font-medium">Phone:</span> {formData.parentPhone}</div>
                      <div><span className="font-medium">Email:</span> {formData.parentEmail}</div>
                      <div className="col-span-2"><span className="font-medium">Address:</span> {formData.parentAddress}</div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-xl">
                    <h3 className="font-semibold text-lg mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      Academic Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><span className="font-medium">Class:</span> {formData.class} - Section {formData.section}</div>
                      <div><span className="font-medium">Admission Date:</span> {formData.admissionDate}</div>
                      <div className="col-span-2"><span className="font-medium">Previous School:</span> {formData.previousSchool || "N/A"}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Submit Admission
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
