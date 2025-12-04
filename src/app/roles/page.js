"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Users,
  Eye,
  Lock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

// Mock roles data
const initialRoles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions",
    users: 2,
    color: "red",
    permissions: {
      students: { view: true, create: true, edit: true, delete: true },
      staff: { view: true, create: true, edit: true, delete: true },
      classes: { view: true, create: true, edit: true, delete: true },
      exams: { view: true, create: true, edit: true, delete: true },
      fees: { view: true, create: true, edit: true, delete: true },
      reports: { view: true, create: true, edit: true, delete: true },
      settings: { view: true, create: true, edit: true, delete: true },
      library: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: 2,
    name: "Admin",
    description: "Administrative access without system settings",
    users: 5,
    color: "blue",
    permissions: {
      students: { view: true, create: true, edit: true, delete: false },
      staff: { view: true, create: true, edit: true, delete: false },
      classes: { view: true, create: true, edit: true, delete: false },
      exams: { view: true, create: true, edit: true, delete: false },
      fees: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      settings: { view: true, create: false, edit: false, delete: false },
      library: { view: true, create: true, edit: true, delete: false },
    },
  },
  {
    id: 3,
    name: "Teacher",
    description: "Can manage classes, students, and exams",
    users: 45,
    color: "green",
    permissions: {
      students: { view: true, create: false, edit: true, delete: false },
      staff: { view: true, create: false, edit: false, delete: false },
      classes: { view: true, create: false, edit: true, delete: false },
      exams: { view: true, create: true, edit: true, delete: false },
      fees: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
      library: { view: true, create: false, edit: false, delete: false },
    },
  },
  {
    id: 4,
    name: "Accountant",
    description: "Manage fees, payments, and financial reports",
    users: 3,
    color: "amber",
    permissions: {
      students: { view: true, create: false, edit: false, delete: false },
      staff: { view: true, create: false, edit: false, delete: false },
      classes: { view: true, create: false, edit: false, delete: false },
      exams: { view: true, create: false, edit: false, delete: false },
      fees: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: true, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
      library: { view: true, create: false, edit: false, delete: false },
    },
  },
  {
    id: 5,
    name: "Parent",
    description: "View only access to student information",
    users: 2847,
    color: "purple",
    permissions: {
      students: { view: true, create: false, edit: false, delete: false },
      staff: { view: false, create: false, edit: false, delete: false },
      classes: { view: true, create: false, edit: false, delete: false },
      exams: { view: true, create: false, edit: false, delete: false },
      fees: { view: true, create: false, edit: false, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
      settings: { view: false, create: false, edit: false, delete: false },
      library: { view: true, create: false, edit: false, delete: false },
    },
  },
];

const modules = [
  { key: "students", name: "Students Management" },
  { key: "staff", name: "Staff Management" },
  { key: "classes", name: "Classes & Subjects" },
  { key: "exams", name: "Examinations" },
  { key: "fees", name: "Fee Management" },
  { key: "reports", name: "Reports & Analytics" },
  { key: "settings", name: "System Settings" },
  { key: "library", name: "Library System" },
];

const permissions = ["view", "create", "edit", "delete"];

const colorVariants = {
  red: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
  green: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
  purple: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-400",
};

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Roles & Permissions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage user roles and access control • v{DRAIS_VERSION}
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions for your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="roleName">Role Name</Label>
                  <Input id="roleName" placeholder="e.g., Librarian" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="roleDescription">Description</Label>
                  <Input id="roleDescription" placeholder="Brief description of role responsibilities" />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Module Permissions</h3>
                  {modules.map((module) => (
                    <div
                      key={module.key}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                    >
                      <h4 className="font-medium mb-3">{module.name}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {permissions.map((perm) => (
                          <div key={perm} className="flex items-center space-x-2">
                            <Switch id={`${module.key}-${perm}`} />
                            <Label htmlFor={`${module.key}-${perm}`} className="capitalize cursor-pointer">
                              {perm}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Create Role
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Roles</p>
                    <h3 className="text-2xl font-bold mt-2">{roles.length}</h3>
                  </div>
                  <Shield className="w-10 h-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                    <h3 className="text-2xl font-bold mt-2">
                      {roles.reduce((sum, role) => sum + role.users, 0)}
                    </h3>
                  </div>
                  <Users className="w-10 h-10 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Admin Roles</p>
                    <h3 className="text-2xl font-bold mt-2">2</h3>
                  </div>
                  <Lock className="w-10 h-10 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Custom Roles</p>
                    <h3 className="text-2xl font-bold mt-2">3</h3>
                  </div>
                  <Eye className="w-10 h-10 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Roles Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Roles</CardTitle>
            <CardDescription>Manage and configure user roles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge className={colorVariants[role.color]}>{role.name}</Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{role.users}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedRole(role)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>View Role Permissions: {selectedRole?.name}</DialogTitle>
                              <DialogDescription>{selectedRole?.description}</DialogDescription>
                            </DialogHeader>
                            {selectedRole && (
                              <div className="space-y-4 mt-4">
                                {modules.map((module) => (
                                  <div
                                    key={module.key}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                                  >
                                    <h4 className="font-medium mb-3">{module.name}</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      {permissions.map((perm) => {
                                        const hasPermission =
                                          selectedRole.permissions[module.key]?.[perm];
                                        return (
                                          <div
                                            key={perm}
                                            className="flex items-center gap-2"
                                          >
                                            {hasPermission ? (
                                              <CheckCircle2 className="w-4 h-4 text-green-600" />
                                            ) : (
                                              <XCircle className="w-4 h-4 text-red-600" />
                                            )}
                                            <span
                                              className={`text-sm capitalize ${
                                                hasPermission
                                                  ? "text-green-600 dark:text-green-400"
                                                  : "text-red-600 dark:text-red-400"
                                              }`}
                                            >
                                              {perm}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Permission Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Quick overview of role permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left p-3 font-semibold">Module</th>
                    {roles.map((role) => (
                      <th key={role.id} className="text-center p-3">
                        <Badge className={colorVariants[role.color]}>{role.name}</Badge>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr
                      key={module.key}
                      className="border-b border-gray-100 dark:border-gray-800"
                    >
                      <td className="p-3 font-medium">{module.name}</td>
                      {roles.map((role) => {
                        const perms = role.permissions[module.key];
                        const activePerms = perms
                          ? Object.values(perms).filter(Boolean).length
                          : 0;
                        const totalPerms = 4;
                        const percentage = (activePerms / totalPerms) * 100;

                        return (
                          <td key={role.id} className="p-3 text-center">
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
                                <svg className="w-12 h-12 transform -rotate-90">
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    className="text-gray-200 dark:text-gray-700"
                                  />
                                  <circle
                                    cx="24"
                                    cy="24"
                                    r="20"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 20}`}
                                    strokeDashoffset={`${
                                      2 * Math.PI * 20 * (1 - percentage / 100)
                                    }`}
                                    className={
                                      percentage === 100
                                        ? "text-green-500"
                                        : percentage >= 50
                                        ? "text-blue-500"
                                        : percentage > 0
                                        ? "text-amber-500"
                                        : "text-gray-300"
                                    }
                                  />
                                </svg>
                                <span className="absolute text-xs font-bold">
                                  {activePerms}/{totalPerms}
                                </span>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
