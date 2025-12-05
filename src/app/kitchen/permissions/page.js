"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Plus, Trash2 } from "lucide-react";

export default function Permissions() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full access to all Kitchen features",
      permissions: {
        view: true,
        editThemes: true,
        editColors: true,
        editFonts: true,
        editComponents: true,
        editTemplates: true,
        export: true,
        viewHistory: true,
        revert: true
      },
      enabled: true
    },
    {
      id: 2,
      name: "Branding Manager",
      description: "Can edit brand elements but not system settings",
      permissions: {
        view: true,
        editThemes: true,
        editColors: true,
        editFonts: true,
        editComponents: false,
        editTemplates: true,
        export: true,
        viewHistory: true,
        revert: false
      },
      enabled: true
    },
    {
      id: 3,
      name: "Designer",
      description: "Can view and suggest changes",
      permissions: {
        view: true,
        editThemes: false,
        editColors: true,
        editFonts: false,
        editComponents: false,
        editTemplates: true,
        export: false,
        viewHistory: true,
        revert: false
      },
      enabled: true
    },
    {
      id: 4,
      name: "Auditor",
      description: "Read-only access for compliance",
      permissions: {
        view: true,
        editThemes: false,
        editColors: false,
        editFonts: false,
        editComponents: false,
        editTemplates: false,
        export: true,
        viewHistory: true,
        revert: false
      },
      enabled: true
    }
  ]);

  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Super Admin", access: true },
    { id: 2, name: "Jane Smith", role: "Branding Manager", access: true },
    { id: 3, name: "Bob Wilson", role: "Designer", access: true }
  ]);

  const permissionLabels = {
    view: "View Kitchen",
    editThemes: "Edit Themes",
    editColors: "Edit Colors",
    editFonts: "Edit Fonts",
    editComponents: "Edit Components",
    editTemplates: "Edit Templates",
    export: "Export Presets",
    viewHistory: "View History",
    revert: "Revert Changes"
  };

  const toggleRolePermission = (roleId, permission) => {
    setRoles(roles.map(role =>
      role.id === roleId
        ? { ...role, permissions: { ...role.permissions, [permission]: !role.permissions[permission] } }
        : role
    ));
  };

  const toggleRoleStatus = (roleId) => {
    setRoles(roles.map(role =>
      role.id === roleId ? { ...role, enabled: !role.enabled } : role
    ));
  };

  const removeUser = (userId) => {
    if (confirm("Remove this user's Kitchen access?")) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-3xl font-bold">Permissions Manager</h1>
              <p className="text-red-100">Control who can access and modify Kitchen settings</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roles */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {roles.map((role, idx) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-2 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold">{role.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={role.enabled ? "default" : "outline"}>
                          {role.enabled ? "Active" : "Disabled"}
                        </Badge>
                        <input
                          type="checkbox"
                          checked={role.enabled}
                          onChange={() => toggleRoleStatus(role.id)}
                          className="w-5 h-5"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(role.permissions).map(([key, value]) => (
                        <div
                          key={key}
                          className={`flex items-center justify-between p-2 rounded text-sm ${
                            value
                              ? "bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-300"
                              : "bg-gray-50 dark:bg-gray-900 text-gray-500"
                          }`}
                        >
                          <span className="text-xs">{permissionLabels[key]}</span>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => toggleRolePermission(role.id, key)}
                            className="w-4 h-4"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Users */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Access</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users.map((user, idx) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center justify-between p-3 border-2 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <Badge variant="outline" className="text-xs">{user.role}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.access ? "default" : "outline"}>
                          {user.access ? "Granted" : "Revoked"}
                        </Badge>
                        <Button variant="ghost" size="sm" onClick={() => removeUser(user.id)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Risky Actions Warnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-950/30 rounded-lg">
                  <p className="text-sm text-red-800 dark:text-red-300">
                    <strong>High Risk:</strong> Changing primary brand color affects entire system
                  </p>
                </div>
                <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                  <p className="text-sm text-orange-800 dark:text-orange-300">
                    <strong>Medium Risk:</strong> Deleting preset cannot be undone
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <strong>Caution:</strong> Reverting to version older than 7 days may break custom components
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    <span>John Doe granted access</span>
                    <span className="text-gray-500">2h ago</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    <span>Designer role updated</span>
                    <span className="text-gray-500">5h ago</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                    <span>Bob Wilson access revoked</span>
                    <span className="text-gray-500">1d ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
