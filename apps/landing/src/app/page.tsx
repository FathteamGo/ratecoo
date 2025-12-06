"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Lock, Smartphone } from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">RateCoo</div>
          <div className="flex gap-6">
            <a href="#pricing" className="text-slate-600 hover:text-slate-900">
              Pricing
            </a>
            <a href="/auth/signin" className="text-blue-600 hover:text-blue-700">
              Login
            </a>
            <a
              href="/auth/register"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Collect 5-Star Trust in Seconds
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Modern review & rating widget for your business. Get up and running
            in minutes, not days.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/auth/register"
              className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium"
            >
              Start Free
            </a>
            <a
              href="#features"
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 text-lg font-medium"
            >
              Learn More
            </a>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Why Choose RateCoo?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Pre-optimized widget loads in milliseconds",
              },
              {
                icon: Lock,
                title: "Secure",
                desc: "Enterprise-grade security for your data",
              },
              {
                icon: Smartphone,
                title: "Responsive",
                desc: "Works perfectly on all devices",
              },
              {
                icon: CheckCircle2,
                title: "Easy Setup",
                desc: "Copy-paste embed code, done!",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-lg p-6"
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg border border-slate-200 p-8"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Free</h3>
              <p className="text-4xl font-bold text-slate-900 mb-6">
                $0<span className="text-lg text-slate-600">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "1 Widget",
                  "Powered by RateCoo",
                  "Email Notifications",
                  "Basic Analytics",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/auth/register"
                className="w-full px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 font-medium text-center"
              >
                Get Started
              </a>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-blue-600 rounded-lg p-8 text-white ring-2 ring-blue-400 scale-105"
            >
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-bold mb-6">
                $29<span className="text-lg">/month</span>
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "5 Widgets",
                  "White Label",
                  "WhatsApp Notifications",
                  "AI Auto-Reply",
                  "Advanced Analytics",
                  "API Access",
                ].map((item, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="/auth/register"
                className="w-full px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-slate-100 font-medium text-center"
              >
                Upgrade Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get More Reviews?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of businesses already collecting reviews with RateCoo
          </p>
          <a
            href="/auth/register"
            className="px-8 py-3 bg-white text-blue-600 rounded-md hover:bg-slate-100 text-lg font-medium inline-block"
          >
            Start Free Today
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>&copy; 2026 RateCoo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
