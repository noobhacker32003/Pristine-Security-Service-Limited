"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, Heart, Award, ArrowLeft } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function BlogPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Image Section */}
      <section className="relative w-full max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Portrait image with natural aspect ratio (549×1024) */}
          <Image
            src="/assets/story.jpeg"
            alt="আব্দুল গাফফারের প্রেরণাদায়ক গল্প"
            width={549}
            height={1024}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 768px"
            priority
            className="w-full h-auto object-contain"
          />
          {/* Gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

          {/* Category badge on image */}
          <div className="absolute top-6 left-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-sm font-semibold tracking-wide">
              <BookOpen className="w-4 h-4" />
              প্রেরণাদায়ক গল্প
            </span>
          </div>

          {/* Title overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug drop-shadow-lg">
              একজন সাহসী আব্দুল গাফফারের
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200">
                সংগ্রামী ও প্রেরণাদায়ক গল্প
              </span>{" "}
              🎖️🎖️
            </h1>
          </div>
        </motion.div>
      </section>

      {/* Blog Content */}
      <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Meta Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 mb-10 pb-8 border-b border-slate-200"
        >
          <div className="flex items-center gap-2 text-blue-600">
            <Award className="w-5 h-5" />
            <span className="font-semibold text-sm">Pristine Security Service Limited</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 text-sm">আইডি নং- ১৯৩২১</span>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1 text-rose-500">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span className="text-sm font-medium">অনুপ্রেরণা</span>
          </div>
        </motion.div>

        {/* Story Paragraphs */}
        <motion.article
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6 text-slate-700 text-lg leading-relaxed"
          style={{ fontFamily: "'Noto Sans Bengali', 'Hind Siliguri', sans-serif" }}
        >
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl font-bold text-slate-900">
            জীবন কখনো কখনো এমন কঠিন মোড়ে দাঁড় করায়, যেখানে সামনে এগোনোর পথটাই অন্ধকার মনে হয়।
          </motion.p>

          <motion.p variants={fadeInUp}>
            আব্দুল গাফফারের, আইডি নং- ১৯৩২১ জীবনও তেমনই এক কঠিন সময়ের মধ্য দিয়ে গিয়েছে বিগত কয় বছর আগে।
          </motion.p>

          <motion.p variants={fadeInUp}>
            হঠাৎ করেই তাঁর বাবার মৃত্যু—পরিবারের প্রধান/অভিভাবক হারানোর সেই শোক শুধু মানসিকভাবে নয়, আর্থিকভাবেও তাঁদের পরিবারকে ভেঙে দেয়।
          </motion.p>

          <motion.p variants={fadeInUp}>
            সদ্য এইচএসসি পাস করা এক তরুণ, হাতে কোনো চাকরি নেই, অথচ কাঁধে পুরো পরিবারের দায়িত্ব। ছোট ভাইয়ের পড়াশোনা, অসুস্থ মায়ের চিকিৎসা, আর সংসারের প্রতিদিনের খরচ—সবকিছু যেন একসাথে তাঁর সামনে চ্যালেঞ্জ হয়ে দাঁড়ায়।
          </motion.p>

          {/* Decorative divider */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            <Award className="w-5 h-5 text-blue-400" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          </motion.div>

          <motion.p variants={fadeInUp}>
            এই চাপ ও অনিশ্চয়তার মাঝে গাফফার ভেঙে পড়েননি। হতাশা তাঁকে স্পর্শ করেছিল ঠিকই, কিন্তু হার মানাতে পারেনি। প্রতিদিন নতুন করে সাহস নিয়ে তিনি কাজ খুঁজতে শুরু করেন।
          </motion.p>

          <motion.p variants={fadeInUp}>
            একদিন চাকরির খোঁজ করতে গিয়ে তিনি খুঁজে পান{" "}
            <span className="font-bold text-blue-700">Pristine Security Service Limited</span>-এর একটি নিয়োগ বিজ্ঞপ্তি, যেখানে তাদের ক্লায়েন্ট{" "}
            <span className="font-bold text-blue-700">Lafarge Holcim</span>-এর জন্য কিছু সিকিউরিটি গার্ড নিয়োগ দেওয়া হচ্ছিল।
          </motion.p>

          <motion.p variants={fadeInUp}>
            একটুখানি আশার আলো নিয়ে তিনি আবেদন করেন। ইন্টারভিউ দেন আত্মবিশ্বাস ও আন্তরিকতা দিয়ে। তাঁর চেষ্টা, সততা এবং দায়িত্ববোধ তাঁকে সফল করে—তিনি নির্বাচিত হন।
          </motion.p>

          <motion.p variants={fadeInUp}>
            গাফফারকে দায়িত্ব দেওয়া হয় <span className="font-bold text-blue-700">Lafarge Holcim</span>-এ সিকিউরিটি গার্ড হিসেবে। নতুন এই পথচলায় তিনি শুধু একটি চাকরি পাননি, পেয়েছেন নিজের জীবনের নতুন অর্থ।
          </motion.p>

          <motion.p variants={fadeInUp}>
            Pristine প্রশাসনের সঠিক দিকনির্দেশনায় তিনি নিষ্ঠা, সততা এবং পরিশ্রমের সাথে নিজের দায়িত্ব পালন করতে থাকেন।
          </motion.p>

          {/* Decorative divider */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4 py-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          </motion.div>

          <motion.p variants={fadeInUp}>
            দিন যায়, আর গাফফারের জীবনে ধীরে ধীরে স্থিতি ফিরে আসে। আজ তিনি আর সেই হতাশ তরুণ নন—তিনি একজন দায়িত্বশীল কর্মী, একজন সংগ্রামী ভাই, এবং একজন যত্নশীল সন্তান।
          </motion.p>

          <motion.p variants={fadeInUp}>
            নিজের উপার্জন দিয়ে তিনি ছোট ভাইয়ের পড়াশোনা চালিয়ে যাচ্ছেন, অসুস্থ মায়ের চিকিৎসার ব্যবস্থা করছেন, এবং পুরো পরিবারকে সম্মানের সাথে এগিয়ে নিয়ে যাচ্ছেন চার বছর ধরে।
          </motion.p>

          {/* Highlighted quote block */}
          <motion.blockquote
            variants={fadeInUp}
            className="relative my-10 p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-2xl"
          >
            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
              আব্দুল গাফফারের গল্প আমাদের শেখায়—
            </p>
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              পরিস্থিতি যতই কঠিন হোক, সাহস, পরিশ্রম আর দৃঢ় মনোবল থাকলে জীবনের মোড় ঘুরানো সম্ভব।
            </p>
          </motion.blockquote>

          <motion.p variants={fadeInUp} className="text-lg text-slate-700">
            তিনি শুধু নিজের জীবনই বদলাননি, বরং হয়ে উঠেছেন অনেকের জন্য এক অনুপ্রেরণার প্রতীক।
          </motion.p>

          {/* Closing message with special styling */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 p-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl text-center shadow-xl"
          >
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              প্রিষ্টিন এর পক্ষ হতে{" "}
              <span className="font-bold text-white">আব্দুল গাফফারের</span> জন্য অনেক অনেক শুভেচ্ছা ও শুভ কামনা।
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="text-2xl">🎖️</span>
              <span className="text-2xl">💪</span>
              <span className="text-2xl">🎖️</span>
            </div>
          </motion.div>
        </motion.article>

        {/* Back to Home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 pt-8 border-t border-slate-200"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            হোম পেজে ফিরে যান
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
