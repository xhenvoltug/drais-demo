"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Library as LibraryIcon, Users, TrendingUp, Grid3x3, Book, Bookmark } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import Link from "next/link";

export default function LibraryCategoriesPage() {
  const categories = [
    { id: 1, name: "Science", books: 87, icon: "🔬", color: "from-blue-500 to-cyan-500", description: "Physics, Chemistry, Biology" },
    { id: 2, name: "Mathematics", books: 64, icon: "🔢", color: "from-purple-500 to-pink-500", description: "Algebra, Geometry, Calculus" },
    { id: 3, name: "Literature", books: 125, icon: "📚", color: "from-amber-500 to-orange-500", description: "Novels, Poetry, Drama" },
    { id: 4, name: "History", books: 78, icon: "🏛️", color: "from-green-500 to-emerald-500", description: "World History, African History" },
    { id: 5, name: "Geography", books: 52, icon: "🌍", color: "from-teal-500 to-cyan-500", description: "Physical, Human Geography" },
    { id: 6, name: "Business Studies", books: 43, icon: "💼", color: "from-indigo-500 to-blue-500", description: "Economics, Commerce, Accounting" },
    { id: 7, name: "Computer Science", books: 91, icon: "💻", color: "from-violet-500 to-purple-500", description: "Programming, IT, Networking" },
    { id: 8, name: "Arts & Design", books: 38, icon: "🎨", color: "from-pink-500 to-rose-500", description: "Fine Art, Music, Drama" },
    { id: 9, name: "Languages", books: 69, icon: "🗣️", color: "from-sky-500 to-blue-500", description: "English, French, Swahili" },
    { id: 10, name: "Religious Studies", books: 45, icon: "✝️", color: "from-amber-600 to-yellow-500", description: "CRE, IRE, Theology" },
    { id: 11, name: "Agriculture", books: 34, icon: "🌾", color: "from-lime-500 to-green-500", description: "Farming, Livestock, Crops" },
    { id: 12, name: "General Reference", books: 56, icon: "📖", color: "from-gray-500 to-slate-500", description: "Encyclopedias, Dictionaries" },
  ];

  const stats = [
    { label: "Total Books", value: "782", icon: BookOpen, color: "from-blue-500 to-purple-500" },
    { label: "Categories", value: "12", icon: Grid3x3, color: "from-green-500 to-emerald-500" },
    { label: "Active Borrowers", value: "342", icon: Users, color: "from-amber-500 to-orange-500" },
    { label: "Books Borrowed", value: "189", icon: TrendingUp, color: "from-pink-500 to-rose-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <LibraryIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Library Categories
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Browse books by subject area</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.03 }}
          >
            <Link href={`/library/books?category=${category.name}`}>
              <Card className={`h-full cursor-pointer bg-gradient-to-br ${category.color} text-white hover:shadow-2xl transition-all`}>
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm opacity-90 mb-4">{category.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      <span className="text-sm font-semibold">{category.books} Books</span>
                    </div>
                    <Bookmark className="w-5 h-5 opacity-75" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-lg mb-1">Explore Our Collection</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse all books or check borrowed items</p>
            </div>
            <div className="flex gap-3">
              <Link href="/library/books">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Books
                </Button>
              </Link>
              <Link href="/library/borrow">
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Borrowed Books
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Library Management System
      </div>
    </div>
  );
}
