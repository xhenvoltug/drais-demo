'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TahfizNavBar from '@/components/tahfiz-navbar';
import {
  MessageSquare, Send, Paperclip, Image, FileText, Mic,
  Search, Filter, Pin, MoreVertical, Phone, Video, Star,
  Check, CheckCheck, Clock, Users, ChevronLeft, X, Download,
  Smile, BookOpen, Award, Calendar
} from 'lucide-react';

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations
  const conversations = [
    {
      id: 1,
      name: 'Sheikh Abdullah Rahman',
      role: 'Tutor',
      avatar: null,
      lastMessage: 'Great progress on Juz 8! Keep up the excellent work.',
      time: '2 mins ago',
      unread: 2,
      online: true,
      pinned: true,
      messages: [
        { id: 1, sender: 'them', text: 'Assalamu alaikum! How are you doing with Juz 8?', time: '10:30 AM', read: true },
        { id: 2, sender: 'me', text: 'Wa alaikum salaam! Alhamdulillah, making good progress.', time: '10:32 AM', read: true },
        { id: 3, sender: 'them', text: 'Excellent! I reviewed your recitation recording. Your tajweed has improved significantly.', time: '10:35 AM', read: true },
        { id: 4, sender: 'me', text: 'JazakAllahu Khairan! Should I continue with the same practice schedule?', time: '10:36 AM', read: true },
        { id: 5, sender: 'them', text: 'Great progress on Juz 8! Keep up the excellent work.', time: '2 mins ago', read: false, attachment: { type: 'audio', name: 'feedback_juz8.mp3' } }
      ]
    },
    {
      id: 2,
      name: 'Parent - Ahmed\'s Mom',
      role: 'Parent',
      avatar: null,
      lastMessage: 'Thank you for the progress report!',
      time: '1 hour ago',
      unread: 0,
      online: false,
      pinned: false,
      messages: [
        { id: 1, sender: 'them', text: 'Assalamu alaikum! Could you please send Ahmed\'s progress report?', time: 'Yesterday, 3:00 PM', read: true },
        { id: 2, sender: 'me', text: 'Wa alaikum salaam! Of course, I\'ll send it right away.', time: 'Yesterday, 3:05 PM', read: true, attachment: { type: 'pdf', name: 'ahmed_progress_november.pdf' } },
        { id: 3, sender: 'them', text: 'Thank you for the progress report!', time: '1 hour ago', read: true }
      ]
    },
    {
      id: 3,
      name: 'Fatima Ali',
      role: 'Student',
      avatar: null,
      lastMessage: 'Can I schedule extra practice session?',
      time: '3 hours ago',
      unread: 1,
      online: true,
      pinned: false,
      messages: [
        { id: 1, sender: 'them', text: 'Assalamu alaikum Sheikh! I want to improve my Surah Yaseen recitation.', time: 'Today, 9:00 AM', read: true },
        { id: 2, sender: 'me', text: 'Wa alaikum salaam Fatima! That\'s wonderful. Let\'s work on it together.', time: 'Today, 9:15 AM', read: true },
        { id: 3, sender: 'them', text: 'Can I schedule extra practice session?', time: '3 hours ago', read: false }
      ]
    },
    {
      id: 4,
      name: 'Grade 5A Group',
      role: 'Group',
      avatar: null,
      lastMessage: 'Omar: Quiz tomorrow at 10 AM!',
      time: '5 hours ago',
      unread: 5,
      online: null,
      pinned: true,
      messages: [
        { id: 1, sender: 'them', text: 'Reminder: Juz 8 Quiz tomorrow at 10:00 AM', time: 'Today, 8:00 AM', read: true, senderName: 'Sheikh Abdullah' },
        { id: 2, sender: 'them', text: 'InshaAllah I\'ll be there!', time: 'Today, 8:15 AM', read: true, senderName: 'Ahmed' },
        { id: 3, sender: 'them', text: 'Can we review Surah Al-Anfal before the quiz?', time: 'Today, 8:30 AM', read: true, senderName: 'Fatima' },
        { id: 4, sender: 'me', text: 'Sure! Let\'s have a quick review session at 9:30 AM.', time: 'Today, 8:35 AM', read: true },
        { id: 5, sender: 'them', text: 'Quiz tomorrow at 10 AM!', time: '5 hours ago', read: false, senderName: 'Omar' }
      ]
    },
    {
      id: 5,
      name: 'Aisha Mohammed',
      role: 'Student',
      avatar: null,
      lastMessage: 'JazakAllah for the feedback!',
      time: '1 day ago',
      unread: 0,
      online: false,
      pinned: false,
      messages: [
        { id: 1, sender: 'me', text: 'Excellent work on your Juz 15 assessment! You scored 98%.', time: '2 days ago', read: true },
        { id: 2, sender: 'them', text: 'JazakAllah for the feedback!', time: '1 day ago', read: true }
      ]
    }
  ];

  const filteredConversations = conversations
    .filter(conv => {
      if (filterType === 'all') return true;
      if (filterType === 'unread') return conv.unread > 0;
      if (filterType === 'pinned') return conv.pinned;
      return conv.role.toLowerCase() === filterType;
    })
    .filter(conv => conv.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const currentConversation = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const sendMessage = () => {
    if (!message.trim() || !currentConversation) return;
    // In real app, this would send the message
    setMessage('');
  };

  const getRoleColor = (role) => {
    const colors = {
      'Tutor': 'text-emerald-400',
      'Parent': 'text-blue-400',
      'Student': 'text-purple-400',
      'Group': 'text-amber-400'
    };
    return colors[role] || 'text-slate-400';
  };

  const getRoleBadge = (role) => {
    const badges = {
      'Tutor': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Parent': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Student': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Group': 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    };
    return badges[role] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <div>
      <TahfizNavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl overflow-hidden" style={{ height: 'calc(100vh - 180px)' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 h-full">
              {/* Conversations List */}
              <div className={`border-r border-slate-700/50 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-4 border-b border-slate-700/50">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Messages</h2>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        <Filter className="w-5 h-5 text-slate-400" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="relative mb-3">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  {/* Filter Tabs */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {['all', 'unread', 'pinned', 'tutor', 'student', 'parent'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setFilterType(filter)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                          filterType === filter
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-4 border-b border-slate-700/30 cursor-pointer transition-all ${
                        selectedConversation === conv.id ? 'bg-slate-900/50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {conv.role === 'Group' ? (
                              <Users className="w-6 h-6" />
                            ) : (
                              conv.name.charAt(0)
                            )}
                          </div>
                          {conv.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-800 rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-semibold truncate">{conv.name}</h3>
                              {conv.pinned && <Pin className="w-3 h-3 text-amber-400 flex-shrink-0" />}
                            </div>
                            <span className="text-xs text-slate-400 whitespace-nowrap">{conv.time}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded border ${getRoleBadge(conv.role)}`}>
                              {conv.role}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 truncate">{conv.lastMessage}</p>
                            {conv.unread > 0 && (
                              <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold rounded-full flex-shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Chat Panel */}
              <div className={`md:col-span-2 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                {currentConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-slate-700/50 bg-slate-900/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedConversation(null)}
                            className="md:hidden p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                          >
                            <ChevronLeft className="w-5 h-5 text-slate-400" />
                          </button>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                            {currentConversation.role === 'Group' ? (
                              <Users className="w-5 h-5" />
                            ) : (
                              currentConversation.name.charAt(0)
                            )}
                          </div>
                          <div>
                            <h3 className="text-white font-bold">{currentConversation.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-0.5 rounded border ${getRoleBadge(currentConversation.role)}`}>
                                {currentConversation.role}
                              </span>
                              {currentConversation.online && (
                                <span className="text-xs text-emerald-400">● Online</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Phone className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Video className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <MoreVertical className="w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {currentConversation.messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[70%] ${msg.sender === 'me' ? 'order-2' : 'order-1'}`}>
                            {msg.senderName && msg.sender === 'them' && (
                              <div className="text-xs text-cyan-400 mb-1 ml-3">{msg.senderName}</div>
                            )}
                            <div className={`rounded-2xl px-4 py-3 ${
                              msg.sender === 'me'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-sm'
                                : 'bg-slate-800/50 text-white rounded-bl-sm'
                            }`}>
                              <p className="text-sm">{msg.text}</p>
                              {msg.attachment && (
                                <div className="mt-2 p-3 bg-slate-900/50 rounded-lg flex items-center gap-3">
                                  {msg.attachment.type === 'audio' && <Mic className="w-5 h-5" />}
                                  {msg.attachment.type === 'pdf' && <FileText className="w-5 h-5" />}
                                  {msg.attachment.type === 'image' && <Image className="w-5 h-5" />}
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold truncate">{msg.attachment.name}</div>
                                  </div>
                                  <button className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                                    <Download className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className={`flex items-center gap-2 mt-1 text-xs text-slate-400 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} ml-3 mr-3`}>
                              <span>{msg.time}</span>
                              {msg.sender === 'me' && (
                                msg.read ? <CheckCheck className="w-3 h-3 text-cyan-400" /> : <Check className="w-3 h-3" />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
                      <div className="flex items-end gap-3">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Paperclip className="w-5 h-5 text-slate-400" />
                          </button>
                          <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                            <Image className="w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
                          />
                          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-700/50 rounded transition-colors">
                            <Smile className="w-5 h-5 text-slate-400" />
                          </button>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={sendMessage}
                          disabled={!message.trim()}
                          className={`p-3 rounded-xl transition-all ${
                            message.trim()
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="w-20 h-20 text-slate-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Select a conversation</h3>
                      <p className="text-slate-400">Choose a conversation from the list to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
