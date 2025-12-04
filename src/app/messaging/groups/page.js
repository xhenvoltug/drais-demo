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
import { Users, Search, Plus, Send, Settings, UserPlus, UserMinus, MessageSquare } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

export default function MessagingGroupsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewGroupDialog, setShowNewGroupDialog] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groups = [
    {
      id: 1,
      name: "All Staff",
      members: 87,
      unread: 5,
      lastMessage: "Department meeting rescheduled to Friday",
      lastSender: "Principal Office",
      lastTime: "2024-12-04 11:30",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "S4A Parents",
      members: 42,
      unread: 12,
      lastMessage: "Mock exam results will be shared next week",
      lastSender: "Class Teacher",
      lastTime: "2024-12-04 09:15",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 3,
      name: "Teachers",
      members: 52,
      unread: 0,
      lastMessage: "Please submit lesson plans by Wednesday",
      lastSender: "Head Teacher",
      lastTime: "2024-12-03 16:00",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Sports Committee",
      members: 15,
      unread: 3,
      lastMessage: "Inter-house competition next Friday",
      lastSender: "Sports Master",
      lastTime: "2024-12-03 14:20",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      name: "S5 Science Students",
      members: 68,
      unread: 8,
      lastMessage: "Chemistry lab practical tomorrow at 10am",
      lastSender: "Chemistry Teacher",
      lastTime: "2024-12-03 12:45",
      color: "from-indigo-500 to-purple-500",
    },
    {
      id: 6,
      name: "Finance Team",
      members: 8,
      unread: 0,
      lastMessage: "Q4 budget review complete",
      lastSender: "Bursar",
      lastTime: "2024-12-02 15:30",
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 7,
      name: "All Parents",
      members: 342,
      unread: 23,
      lastMessage: "Term closing ceremony on December 15th",
      lastSender: "Administration",
      lastTime: "2024-12-02 10:00",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 8,
      name: "HODs",
      members: 12,
      unread: 1,
      lastMessage: "Curriculum review meeting notes shared",
      lastSender: "Deputy Principal",
      lastTime: "2024-12-01 13:15",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  const groupMembers = [
    { name: "Sarah Nakato", role: "Teacher", avatar: "SN" },
    { name: "John Okello", role: "Teacher", avatar: "JO" },
    { name: "Mary Achieng", role: "Head of Department", avatar: "MA" },
    { name: "Peter Mukasa", role: "Teacher", avatar: "PM" },
    { name: "Grace Nalongo", role: "Teacher", avatar: "GN" },
    { name: "David Ssemakula", role: "Admin", avatar: "DS" },
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Groups", value: "24", icon: Users, color: "from-blue-500 to-cyan-500" },
    { label: "My Groups", value: "12", icon: MessageSquare, color: "from-purple-500 to-pink-500" },
    { label: "Total Members", value: "626", icon: Users, color: "from-green-500 to-emerald-500" },
    { label: "Unread Messages", value: "52", icon: Send, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Group Messages
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage group conversations</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`bg-gradient-to-br ${stat.color} text-white`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <Icon className="w-10 h-10 text-white/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Create */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              className="bg-gradient-to-r from-blue-600 to-cyan-600"
              onClick={() => setShowNewGroupDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Group
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className="cursor-pointer" onClick={() => setSelectedGroup(group)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{group.members} members</p>
                    </div>
                  </div>
                  {group.unread > 0 && (
                    <Badge className="bg-red-500">{group.unread}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {group.lastSender}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {group.lastMessage}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{group.lastTime}</span>
                    <Button size="sm" variant="outline">
                      <Send className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* New Group Dialog */}
      <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>Set up a new group conversation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input id="groupName" placeholder="Enter group name..." />
            </div>
            <div>
              <Label htmlFor="groupDescription">Description (Optional)</Label>
              <Input id="groupDescription" placeholder="What is this group for..." />
            </div>
            <div>
              <Label>Add Members</Label>
              <Input placeholder="Search staff, parents, or students..." />
              <div className="mt-2 max-h-48 overflow-y-auto space-y-2">
                {groupMembers.slice(0, 4).map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500">
                        <div className="w-full h-full flex items-center justify-center text-white text-xs font-bold">
                          {member.avatar}
                        </div>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                <Users className="w-4 h-4 mr-2" />
                Create Group
              </Button>
              <Button variant="outline" onClick={() => setShowNewGroupDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Group Details Dialog */}
      {selectedGroup && (
        <Dialog open={!!selectedGroup} onOpenChange={() => setSelectedGroup(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedGroup.color} rounded-xl flex items-center justify-center`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle>{selectedGroup.name}</DialogTitle>
                  <DialogDescription>{selectedGroup.members} members</DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-3">Group Members</h3>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {groupMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500">
                          <div className="w-full h-full flex items-center justify-center text-white font-bold">
                            {member.avatar}
                          </div>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <UserMinus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Members
                </Button>
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Group Settings
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Messaging System
      </div>
    </div>
  );
}
