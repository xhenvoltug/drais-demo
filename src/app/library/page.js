"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Eye,
  Heart,
  Star,
  Clock,
  Users,
  BookMarked,
  Library as LibraryIcon,
} from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";

// Mock library data
const books = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Literature",
    description: "A gripping tale of racial injustice and childhood innocence in the American South.",
    cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
    available: 8,
    total: 10,
    rating: 4.8,
    class: "Grade 9-12",
  },
  {
    id: 2,
    title: "The Elements of Chemistry",
    author: "John McMurry",
    category: "Science",
    description: "Comprehensive guide to chemical principles and laboratory techniques.",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
    available: 12,
    total: 15,
    rating: 4.6,
    class: "Grade 10-12",
  },
  {
    id: 3,
    title: "Advanced Mathematics",
    author: "Dr. Sarah Williams",
    category: "Mathematics",
    description: "Exploring calculus, algebra, and geometry for advanced students.",
    cover: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop",
    available: 5,
    total: 12,
    rating: 4.7,
    class: "Grade 11-12",
  },
  {
    id: 4,
    title: "World History Chronicles",
    author: "Prof. Michael Chen",
    category: "History",
    description: "From ancient civilizations to modern times - a complete historical journey.",
    cover: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=400&h=600&fit=crop",
    available: 15,
    total: 20,
    rating: 4.5,
    class: "Grade 7-12",
  },
  {
    id: 5,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Literature",
    description: "A timeless romance exploring themes of love, class, and society.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
    available: 6,
    total: 8,
    rating: 4.9,
    class: "Grade 9-12",
  },
  {
    id: 6,
    title: "Physics: Principles and Applications",
    author: "Dr. Robert Thompson",
    category: "Science",
    description: "Understanding the fundamental laws that govern our universe.",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=600&fit=crop",
    available: 10,
    total: 14,
    rating: 4.4,
    class: "Grade 10-12",
  },
  {
    id: 7,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Literature",
    description: "A portrait of the Jazz Age in all its decadence and excess.",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    available: 9,
    total: 12,
    rating: 4.7,
    class: "Grade 10-12",
  },
  {
    id: 8,
    title: "Biology: The Living World",
    author: "Dr. Emily Martinez",
    category: "Science",
    description: "Exploring life from cells to ecosystems with stunning illustrations.",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    available: 11,
    total: 16,
    rating: 4.8,
    class: "Grade 9-12",
  },
  {
    id: 9,
    title: "Geometry Essentials",
    author: "Prof. David Kumar",
    category: "Mathematics",
    description: "Master shapes, angles, and spatial reasoning with practical examples.",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=600&fit=crop",
    available: 14,
    total: 18,
    rating: 4.3,
    class: "Grade 8-10",
  },
  {
    id: 10,
    title: "Ancient Civilizations",
    author: "Dr. Lisa Anderson",
    category: "History",
    description: "Journey through Egypt, Greece, Rome, and beyond.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    available: 13,
    total: 15,
    rating: 4.6,
    class: "Grade 6-9",
  },
];

const categories = ["All", "Literature", "Science", "Mathematics", "History"];

const categoryColors = {
  Literature: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-400",
  Science: "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-400",
  Mathematics: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400",
  History: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400",
};

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesClass = selectedClass === "all" || book.class.includes(selectedClass);

    return matchesSearch && matchesCategory && matchesClass;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
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
              Library System
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Browse and manage your school library collection • v{DRAIS_VERSION}
            </p>
          </div>

          <Button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Book
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Books</p>
                  <h3 className="text-2xl font-bold mt-2">140</h3>
                </div>
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
                  <h3 className="text-2xl font-bold mt-2">103</h3>
                </div>
                <BookMarked className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Borrowed</p>
                  <h3 className="text-2xl font-bold mt-2">37</h3>
                </div>
                <Users className="w-10 h-10 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                  <h3 className="text-2xl font-bold mt-2">4</h3>
                </div>
                <LibraryIcon className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search by title or author..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Grade 6">Grade 6</SelectItem>
                  <SelectItem value="Grade 7">Grade 7</SelectItem>
                  <SelectItem value="Grade 8">Grade 8</SelectItem>
                  <SelectItem value="Grade 9">Grade 9</SelectItem>
                  <SelectItem value="Grade 10">Grade 10</SelectItem>
                  <SelectItem value="Grade 11">Grade 11</SelectItem>
                  <SelectItem value="Grade 12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-purple-600"
                      : ""
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Books Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredBooks.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <Card className="h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-transparent hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl overflow-hidden group">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-20 h-20 text-blue-300 dark:text-blue-700" />
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full h-8 w-8 bg-white/90 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <Badge className={categoryColors[book.category]}>{book.category}</Badge>
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {book.author}</p>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold">{book.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {book.class}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm">
                      <span
                        className={`font-semibold ${
                          book.available > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {book.available}
                      </span>
                      <span className="text-gray-500"> / {book.total} available</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                      size="sm"
                      disabled={book.available === 0}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Borrow
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredBooks.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-700 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No books found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
