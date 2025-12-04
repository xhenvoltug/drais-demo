"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { BookOpen, Search, Filter, Star, ExternalLink } from "lucide-react";
import { DRAIS_VERSION } from "@/lib/version";
import Image from "next/image";

export default function LibraryBooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const books = [
    { 
      id: 1, 
      title: "Advanced Physics", 
      author: "Dr. John Smith", 
      category: "Science", 
      available: 3, 
      total: 5,
      isbn: "978-0134543857",
      description: "Comprehensive guide to modern physics concepts",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41as+WafrFL._SX331_BO1,204,203,200_.jpg",
      rating: 4.5
    },
    { 
      id: 2, 
      title: "Calculus Made Easy", 
      author: "Silvanus P. Thompson", 
      category: "Mathematics", 
      available: 5, 
      total: 7,
      isbn: "978-0312185480",
      description: "Classic introduction to calculus fundamentals",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51DNaiWfJBL._SX331_BO1,204,203,200_.jpg",
      rating: 4.8
    },
    { 
      id: 3, 
      title: "Things Fall Apart", 
      author: "Chinua Achebe", 
      category: "Literature", 
      available: 0, 
      total: 10,
      isbn: "978-0385474542",
      description: "Nigerian literary masterpiece about colonialism",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41a8cEwh5xL._SX331_BO1,204,203,200_.jpg",
      rating: 4.9
    },
    { 
      id: 4, 
      title: "World History Encyclopedia", 
      author: "Various Authors", 
      category: "History", 
      available: 2, 
      total: 3,
      isbn: "978-0199536559",
      description: "Comprehensive world history reference",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51MKX8R8HCL._SX331_BO1,204,203,200_.jpg",
      rating: 4.6
    },
    { 
      id: 5, 
      title: "Python Programming", 
      author: "Eric Matthes", 
      category: "Computer Science", 
      available: 4, 
      total: 6,
      isbn: "978-1593279288",
      description: "Hands-on introduction to Python programming",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41+E8BdwhWL._SX331_BO1,204,203,200_.jpg",
      rating: 4.7
    },
    { 
      id: 6, 
      title: "Business Management", 
      author: "Peter Drucker", 
      category: "Business Studies", 
      available: 3, 
      total: 5,
      isbn: "978-0060878979",
      description: "Essential principles of effective management",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41b7h7xPXbL._SX331_BO1,204,203,200_.jpg",
      rating: 4.4
    },
    { 
      id: 7, 
      title: "African Geography", 
      author: "Prof. Mary Okello", 
      category: "Geography", 
      available: 6, 
      total: 8,
      isbn: "978-0415564571",
      description: "Physical and human geography of Africa",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/51X8tmeVbCL._SX331_BO1,204,203,200_.jpg",
      rating: 4.3
    },
    { 
      id: 8, 
      title: "Romeo and Juliet", 
      author: "William Shakespeare", 
      category: "Literature", 
      available: 8, 
      total: 12,
      isbn: "978-0743477116",
      description: "Classic tragedy of star-crossed lovers",
      thumbnail: "https://images-na.ssl-images-amazon.com/images/I/41+sZSj2WIL._SX331_BO1,204,203,200_.jpg",
      rating: 4.9
    },
  ];

  const categories = ["all", "Science", "Mathematics", "Literature", "History", "Computer Science", "Business Studies", "Geography"];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || book.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Library Books
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Browse and borrow from our collection</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border rounded-md dark:bg-gray-800"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book, idx) => (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <Card className="h-full hover:shadow-2xl transition-all">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  {book.available === 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500">Out of Stock</Badge>
                    </div>
                  )}
                  {book.available > 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500">{book.available} Available</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                  <Badge variant="outline" className="mb-3">{book.category}</Badge>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                    {book.description}
                  </p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(book.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {book.rating}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">ISBN: {book.isbn}</div>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600"
                    disabled={book.available === 0}
                  >
                    {book.available > 0 ? "Borrow Book" : "Currently Unavailable"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        DRAIS {DRAIS_VERSION} • Library Management System
      </div>
    </div>
  );
}
