"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInOnScroll from "./FadeInOnScroll";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/myzjkjrb", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        console.error("Form error:", result);
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit failed", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="snap-start min-h-screen w-full bg-black text-white py-20 px-6"
    >
      <FadeInOnScroll>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center mb-10">Let's Connect</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 bg-zinc-900 p-6 rounded-xl shadow-md"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              required
              className="p-3 rounded-md bg-zinc-800 text-white placeholder-gray-400 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition disabled:opacity-50"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status === "success" && (
            <p className="text-green-400 text-center mt-4">Message sent successfully ✅</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-center mt-4">Something went wrong ❌</p>
          )}

          <div className="text-center mt-10 text-gray-400 text-sm">
            Or email me at:{" "}
            <a href="mailto:michaeljebaraj29@gmail.com" className="text-orange-400 underline">
              michaeljebaraj29@gmail.com
            </a>
          </div>
        </motion.div>
      </FadeInOnScroll>
    </section>
  );
}
