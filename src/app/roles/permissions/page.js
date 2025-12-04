"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Check, X, Save, RotateCcw, Search } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function RolePermissionsPage() {
  const [selectedRole, setSelectedRole] = useState("Teacher");
  const [hasChanges, setHasChanges] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const roles = [
    "Admin",
    "Principal",
    "Deputy Principal",
    "Teacher",
    "Senior Teacher",
    "Accountant",
    "Bursar",
    "Librarian",
    "Lab Technician",
    "Nurse",
    "IT Support",
    "Receptionist",
  ];

  const modules = [
    {
      name: "Students",
      permissions: [
        { id: "students.create", name: "Create Students", enabled: true },
        { id: "students.read", name: "View Students", enabled: true },
        { id: "students.update", name: "Update Students", enabled: true },
        { id: "students.delete", name: "Delete Students", enabled: false },
        { id: "students.export", name: "Export Students", enabled: true },
        { id: "students.import", name: "Import Students", enabled: false },
      ],
    },
    {
      name: "Fees & Finance",
      permissions: [
        { id: "finance.create", name: "Record Payments", enabled: false },
        { id: "finance.read", name: "View Financial Records", enabled: true },
        { id: "finance.update", name: "Update Transactions", enabled: false },
        { id: "finance.delete", name: "Delete Transactions", enabled: false },
        { id: "finance.export", name: "Export Reports", enabled: true },
        { id: "finance.approve", name: "Approve Expenses", enabled: false },
      ],
    },
    {
      name: "Academic",
      permissions: [
        { id: "academic.create", name: "Create Marks", enabled: true },
        { id: "academic.read", name: "View Grades", enabled: true },
        { id: "academic.update", name: "Update Marks", enabled: true },
        { id: "academic.delete", name: "Delete Marks", enabled: false },
        { id: "academic.export", name: "Export Results", enabled: true },
        { id: "academic.publish", name: "Publish Results", enabled: false },
      ],
    },
    {
      name: "Attendance",
      permissions: [
        { id: "attendance.create", name: "Mark Attendance", enabled: true },
        { id: "attendance.read", name: "View Attendance", enabled: true },
        { id: "attendance.update", name: "Update Attendance", enabled: true },
        { id: "attendance.delete", name: "Delete Records", enabled: false },
        { id: "attendance.export", name: "Export Reports", enabled: true },
      ],
    },
    {
      name: "Library",
      permissions: [
        { id: "library.create", name: "Add Books", enabled: false },
        { id: "library.read", name: "View Library", enabled: true },
        { id: "library.update", name: "Update Books", enabled: false },
        { id: "library.delete", name: "Delete Books", enabled: false },
        { id: "library.borrow", name: "Manage Borrowing", enabled: false },
      ],
    },
    {
      name: "Messaging",
      permissions: [
        { id: "messaging.create", name: "Send Messages", enabled: true },
        { id: "messaging.read", name: "Read Messages", enabled: true },
        { id: "messaging.groups", name: "Manage Groups", enabled: false },
        { id: "messaging.broadcast", name: "Send Broadcasts", enabled: false },
      ],
    },
    {
      name: "Reports",
      permissions: [
        { id: "reports.read", name: "View Reports", enabled: true },
        { id: "reports.export", name: "Export Reports", enabled: true },
        { id: "reports.create", name: "Generate Custom Reports", enabled: false },
      ],
    },
    {
      name: "Administration",
      permissions: [
        { id: "admin.users", name: "Manage Users", enabled: false },
        { id: "admin.roles", name: "Manage Roles", enabled: false },
        { id: "admin.settings", name: "System Settings", enabled: false },
        { id: "admin.backup", name: "Backup & Restore", enabled: false },
      ],
    },
  ];

  const [permissions, setPermissions] = useState(modules);

  const togglePermission = (moduleIndex, permissionIndex) => {
    const newPermissions = [...permissions];
    newPermissions[moduleIndex].permissions[permissionIndex].enabled = 
      !newPermissions[moduleIndex].permissions[permissionIndex].enabled;
    setPermissions(newPermissions);
    setHasChanges(true);
  };

  const toggleAllInModule = (moduleIndex) => {
    const newPermissions = [...permissions];
    const allEnabled = newPermissions[moduleIndex].permissions.every(p => p.enabled);
    newPermissions[moduleIndex].permissions = newPermissions[moduleIndex].permissions.map(p => ({
      ...p,
      enabled: !allEnabled,
    }));
    setPermissions(newPermissions);
    setHasChanges(true);
  };

  const resetChanges = () => {
    // In a real app, this would reload from the server
    setHasChanges(false);
  };

  const saveChanges = () => {
    // In a real app, this would save to the server
    setHasChanges(false);
  };

  const filteredModules = permissions.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.permissions.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPermissions = permissions.reduce((sum, module) => sum + module.permissions.length, 0);
  const enabledPermissions = permissions.reduce(
    (sum, module) => sum + module.permissions.filter(p => p.enabled).length,
    0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Role Permissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Configure permissions for each role</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <p className="text-white/80 text-sm">Selected Role</p>
            <p className="text-2xl font-bold mt-1">{selectedRole}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <p className="text-white/80 text-sm">Enabled Permissions</p>
            <p className="text-2xl font-bold mt-1">{enabledPermissions} / {totalPermissions}</p>
          </CardContent>
        </Card>
        <Card className={`bg-gradient-to-br ${hasChanges ? 'from-orange-500 to-red-500' : 'from-green-500 to-emerald-500'} text-white`}>
          <CardContent className="p-6">
            <p className="text-white/80 text-sm">Status</p>
            <p className="text-2xl font-bold mt-1">{hasChanges ? 'Unsaved Changes' : 'Saved'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="role-select">Select Role</Label>
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 mt-1"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <Label htmlFor="search">Search Permissions</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search modules or permissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredModules.map((module, moduleIndex) => (
          <motion.div
            key={module.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: moduleIndex * 0.05 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleAllInModule(moduleIndex)}
                  >
                    Toggle All
                  </Button>
                </div>
                <CardDescription>
                  {module.permissions.filter(p => p.enabled).length} of {module.permissions.length} enabled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.permissions.map((permission, permissionIndex) => (
                    <div
                      key={permission.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <span className="text-sm font-medium">{permission.name}</span>
                      <button
                        onClick={() => togglePermission(moduleIndex, permissionIndex)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          permission.enabled
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform flex items-center justify-center ${
                            permission.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        >
                          {permission.enabled ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-gray-400" />
                          )}
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      {hasChanges && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 flex gap-3"
        >
          <Button
            variant="outline"
            onClick={resetChanges}
            className="shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={saveChanges}
            className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </motion.div>
      )}

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardContent className="p-6">
          <h3 className="font-bold mb-2">Permission Management Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>✓ Use "Toggle All" to quickly enable/disable all permissions in a module</li>
            <li>✓ Search functionality helps you find specific permissions quickly</li>
            <li>✓ Changes are highlighted and must be saved before taking effect</li>
            <li>✓ Different roles require different permission sets based on responsibilities</li>
          </ul>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Roles & Permissions Management
      </div>
    </div>
  );
}
