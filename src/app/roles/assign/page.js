"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Users, Search, Filter, UserCog, Save, Check } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function RoleAssignPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [showAssignDialog, setShowAssignDialog] = useState(false);

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
    "Matron",
    "Nurse",
    "Security",
    "IT Support",
    "Receptionist",
    "Cleaner",
  ];

  const staff = [
    { id: 1, name: "Sarah Nakato", role: "Teacher", department: "Science", email: "s.nakato@school.com", avatar: "SN" },
    { id: 2, name: "John Okello", role: "Senior Teacher", department: "Mathematics", email: "j.okello@school.com", avatar: "JO" },
    { id: 3, name: "Mary Achieng", role: "Principal", department: "Administration", email: "m.achieng@school.com", avatar: "MA" },
    { id: 4, name: "Peter Mukasa", role: "Teacher", department: "English", email: "p.mukasa@school.com", avatar: "PM" },
    { id: 5, name: "Grace Nalongo", role: "Accountant", department: "Finance", email: "g.nalongo@school.com", avatar: "GN" },
    { id: 6, name: "David Ssemakula", role: "IT Support", department: "ICT", email: "d.ssemakula@school.com", avatar: "DS" },
    { id: 7, name: "Alice Namugga", role: "Librarian", department: "Library", email: "a.namugga@school.com", avatar: "AN" },
    { id: 8, name: "Robert Kato", role: "Lab Technician", department: "Science", email: "r.kato@school.com", avatar: "RK" },
    { id: 9, name: "Joyce Nabirye", role: "Teacher", department: "History", email: "j.nabirye@school.com", avatar: "JN" },
    { id: 10, name: "Patrick Odongo", role: "Teacher", department: "Physical Education", email: "p.odongo@school.com", avatar: "PO" },
    { id: 11, name: "Christine Nambi", role: "Teacher", department: "Arts", email: "c.nambi@school.com", avatar: "CN" },
    { id: 12, name: "James Okoth", role: "Deputy Principal", department: "Administration", email: "j.okoth@school.com", avatar: "JO" },
    { id: 13, name: "Florence Akello", role: "Nurse", department: "Health", email: "f.akello@school.com", avatar: "FA" },
    { id: 14, name: "Daniel Wanyama", role: "Security", department: "Security", email: "d.wanyama@school.com", avatar: "DW" },
    { id: 15, name: "Betty Namale", role: "Receptionist", department: "Administration", email: "b.namale@school.com", avatar: "BN" },
    { id: 16, name: "Samuel Otim", role: "Teacher", department: "Geography", email: "s.otim@school.com", avatar: "SO" },
    { id: 17, name: "Rachel Atim", role: "Matron", department: "Boarding", email: "r.atim@school.com", avatar: "RA" },
    { id: 18, name: "Joseph Kyeyune", role: "Bursar", department: "Finance", email: "j.kyeyune@school.com", avatar: "JK" },
    { id: 19, name: "Emma Nassuna", role: "Teacher", department: "Computer Science", email: "e.nassuna@school.com", avatar: "EN" },
    { id: 20, name: "Moses Ouma", role: "Cleaner", department: "Maintenance", email: "m.ouma@school.com", avatar: "MO" },
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleStaffSelection = (staffId) => {
    setSelectedStaff(prev =>
      prev.includes(staffId)
        ? prev.filter(id => id !== staffId)
        : [...prev, staffId]
    );
  };

  const getRoleBadgeColor = (role) => {
    const colors = {
      "Admin": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      "Principal": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      "Deputy Principal": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      "Teacher": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "Senior Teacher": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
      "Accountant": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "Bursar": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
      "Librarian": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      "Lab Technician": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      "Matron": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
      "Nurse": "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
      "Security": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      "IT Support": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
      "Receptionist": "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
      "Cleaner": "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const stats = [
    { label: "Total Staff", value: staff.length.toString(), color: "from-blue-500 to-cyan-500" },
    { label: "Teachers", value: staff.filter(s => s.role === "Teacher").length.toString(), color: "from-purple-500 to-pink-500" },
    { label: "Support Staff", value: staff.filter(s => !["Teacher", "Senior Teacher", "Principal", "Deputy Principal"].includes(s.role)).length.toString(), color: "from-green-500 to-emerald-500" },
    { label: "Selected", value: selectedStaff.length.toString(), color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <UserCog className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Assign Roles
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Assign and manage staff member roles</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`bg-gradient-to-br ${stat.color} text-white`}>
              <CardContent className="p-6">
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="sm:w-64">
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800"
              >
                <option value="all">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            {selectedStaff.length > 0 && (
              <Button
                className="bg-gradient-to-r from-blue-600 to-cyan-600"
                onClick={() => setShowAssignDialog(true)}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Assign Role ({selectedStaff.length})
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b dark:border-gray-700">
                <tr>
                  <th className="text-left p-3">
                    <input
                      type="checkbox"
                      checked={selectedStaff.length === filteredStaff.length && filteredStaff.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStaff(filteredStaff.map(s => s.id));
                        } else {
                          setSelectedStaff([]);
                        }
                      }}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="text-left p-3">Staff Member</th>
                  <th className="text-left p-3">Department</th>
                  <th className="text-left p-3">Current Role</th>
                  <th className="text-left p-3">Contact</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedStaff.includes(member.id)}
                        onChange={() => toggleStaffSelection(member.id)}
                        className="w-4 h-4"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500">
                          <div className="w-full h-full flex items-center justify-center text-white font-bold">
                            {member.avatar}
                          </div>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{member.department}</td>
                    <td className="p-3">
                      <Badge className={getRoleBadgeColor(member.role)}>
                        {member.role}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-gray-600 dark:text-gray-400">{member.email}</td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedStaff([member.id]);
                          setShowAssignDialog(true);
                        }}
                      >
                        <UserCog className="w-4 h-4 mr-1" />
                        Change Role
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 dark:text-gray-400">No staff members found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assign Role Dialog */}
      <Dialog open={showAssignDialog} onOpenChange={setShowAssignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Assign a new role to {selectedStaff.length} selected staff member{selectedStaff.length > 1 ? 's' : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-role">Select New Role</Label>
              <select
                id="new-role"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 mt-1"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Selected Staff:</strong>
              </p>
              <ul className="mt-2 space-y-1">
                {selectedStaff.slice(0, 5).map(id => {
                  const member = staff.find(s => s.id === id);
                  return member ? (
                    <li key={id} className="text-sm flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      {member.name} ({member.role})
                    </li>
                  ) : null;
                })}
                {selectedStaff.length > 5 && (
                  <li className="text-sm text-gray-500">
                    +{selectedStaff.length - 5} more...
                  </li>
                )}
              </ul>
            </div>
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600"
                onClick={() => {
                  setShowAssignDialog(false);
                  setSelectedStaff([]);
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                Assign Role
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAssignDialog(false);
                  setSelectedStaff([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardContent className="p-6">
          <h3 className="font-bold mb-2">Role Assignment Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>✓ Select multiple staff members to assign roles in bulk</li>
            <li>✓ Use filters to quickly find staff by role or department</li>
            <li>✓ Different roles have different permission levels - assign carefully</li>
            <li>✓ Changes take effect immediately after saving</li>
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
