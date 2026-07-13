"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import AnimeImage from "@/components/ui/AnimeImage";

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-5xl tracking-wider text-white mb-2">
            BLOG
          </h1>
          <p className="text-gray-400 font-body">
            Noticias, lanzamientos y novedades del mundo manga
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block bg-[#12121a] rounded-xl overflow-hidden border border-purple-500/10 hover:border-purple-500/30 transition-all"
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  <AnimeImage
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded-full capitalize">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg tracking-wide text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Leer mas <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
