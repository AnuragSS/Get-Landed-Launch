'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiZap } from 'react-icons/fi';
import { PiStudentFill } from 'react-icons/pi';
import { motion } from 'framer-motion';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) setSubmitted(true);
      else console.error('Submission failed:', await res.text());
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-[#1E1E1E] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* NAVBAR */}
      <nav className="bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-xl font-bold text-[#316BFF]">
          <Image src="/logo192.png" alt="GetLanded Logo" width={32} height={32} />
          GetLanded
        </div>
        <div className="space-x-6 text-sm hidden md:flex text-gray-700">
          <a href="#about" className="hover:text-[#316BFF] transition">About</a>
          <a href="#join" className="hover:text-[#316BFF] transition">Join</a>
          <a href="#watch" className="hover:text-[#316BFF] transition">Watch</a>
        </div>
        <a
          href="#form"
          className="bg-[#316BFF] text-white px-4 py-2 rounded-full text-sm font-medium shadow hover:scale-105 transition"
        >
          Find My Mentor Now
        </a>
      </nav>

      {/* HERO */}
      <section className="bg-gray-50 text-center py-20 px-4" id="about">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Stop Guessing. Start Winning.
        </motion.h1>
        <motion.p
          className="text-gray-700 max-w-xl mx-auto mb-8 text-sm md:text-base"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Real support from grads who’ve already studied in the UK, landed jobs, and secured their visas. Learn what actually works — from people who’ve done it.
        </motion.p>
        <motion.a
          href="#form"
          className="bg-[#316BFF] text-white px-6 py-3 rounded-full text-base font-semibold shadow hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          Find My Mentor Now
        </motion.a>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 px-6 md:px-20 bg-blue-50 text-center" id="join">
        <h2 className="text-3xl font-bold text-[#316BFF] mb-10">How It Works</h2>
        <div className="grid gap-6 max-w-4xl mx-auto md:grid-cols-3">
          {[
            {
              step: 'Step 1',
              title: 'Find your perfect match',
              desc: 'Choose a mentor who’s walked the exact path you\'re about to take.',
            },
            {
              step: 'Step 2',
              title: 'Book a call that fits your schedule',
              desc: 'No waiting. No awkward back-and-forth. Just clarity.',
            },
            {
              step: 'Step 3',
              title: 'Get answers you can actually use',
              desc: 'From courses to jobs to visas — skip the guesswork.',
            },
          ].map(({ step, title, desc }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-lg shadow-lg transition-transform cursor-default hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{step} — {title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section id="form" className="bg-gray-100 py-16 px-6 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-xl">
          <h3 className="text-xl font-semibold mb-4 text-center">Be First In Line — Get Early Access</h3>
          <p className="text-center text-sm text-gray-600 mb-6">
            We’re opening bookings soon. Get priority access to top mentors before it goes public.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              <input
                name="course"
                placeholder="What are you studying?"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone (Optional)"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              <input
                name="university"
                placeholder="Your University Name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-[#316BFF] text-white w-full py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Get Early Access
              </button>
              <p className="text-sm text-center mt-2 text-red-500 font-medium flex justify-center items-center gap-1">
                <FiZap className="text-xl" /> Mentor slots are limited. Reserve your spot before we open to the public.
              </p>
              <p className="text-xs text-center text-gray-500 mt-1 flex justify-center items-center gap-1">
                <PiStudentFill className="text-base" /> Already 2,000+ students joined from 20+ UK universities.
              </p>
            </form>
          ) : (
            <p className="text-green-600 text-center font-semibold">
              Thanks for signing up! We’ll reach out soon.
            </p>
          )}
        </div>
      </section>

      {/* VIDEO */}
      <section id="watch" className="bg-gray-200 py-16 px-4 flex justify-center items-center">
        <iframe
          className="w-full max-w-2xl h-64 border-2 border-gray-300 rounded-md shadow-lg"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="GetLanded Explainer Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f9fafb] text-sm text-gray-600 pt-12 px-6">
        <div className="max-w-2xl mx-auto text-center pb-6 border-b border-gray-300">
          <h3 className="text-2xl font-extrabold text-[#316BFF] mb-2">GetLanded</h3>
          <p className="text-gray-600 mb-4">
            Built by international students who’ve been there — for students who don’t want to waste time figuring it out alone.
          </p>
          <h4 className="font-semibold text-gray-800 mb-2">CONNECT</h4>
          <div className="flex justify-center gap-6 text-xl">
            <a href="https://www.linkedin.com/company/getlandedio/posts/?feedView=all" className="hover:text-[#316BFF] transition" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-red-600 transition" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
        <div className="text-center text-xs py-4 text-gray-500">
          © 2025 GetLanded. All rights reserved.
        </div>
      </footer>
    </motion.div>
  );
}
