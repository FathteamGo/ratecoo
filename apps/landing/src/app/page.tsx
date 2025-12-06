"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Lock, Smartphone, Star, TrendingUp, MessageSquare, BarChart3, Globe, Sparkles } from "lucide-react";
import { ThemeToggle } from "@ratecoo/ui";

export default function HomePage() {
  return (
    <>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-lg dark:shadow-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              RateCoo
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Features
            </a>
            <a href="#pricing" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Pricing
            </a>
            <a href="/auth/signin" className="text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
              Login
            </a>
            <ThemeToggle />
            <a
              href="/auth/register"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-lg hover:shadow-xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/30 transition-all duration-300 font-medium hover:scale-105"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-24 md:py-40 overflow-visible"
      >
        {/* Light mode: Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none dark:opacity-0 opacity-100 transition-opacity duration-500">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="text-center relative">
            {/* Remove old overlay, use different approach for light/dark */}
            <div className="absolute -inset-20 bg-gradient-to-b from-transparent via-white/50 to-transparent dark:from-slate-900/60 dark:via-slate-900/40 dark:to-transparent rounded-3xl -z-10 blur-3xl" />
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-blue-200 dark:border-slate-600/60 mb-8 shadow-md dark:shadow-lg dark:shadow-slate-950/50"
            >
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">Trusted by 10,000+ businesses worldwide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Collect 5-Star Reviews
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-none">
                in Seconds
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-slate-700 dark:text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              The modern review & rating widget that turns visitors into advocates. 
              Setup in 2 minutes, collect reviews forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href="/auth/register"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/40 transition-all duration-300 text-lg font-semibold flex items-center gap-2 hover:scale-105"
              >
                Start Free Trial
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-white dark:bg-slate-800/80 border-2 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-100 rounded-xl hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-lg font-semibold backdrop-blur shadow-sm dark:shadow-lg dark:shadow-slate-950/50"
              >
                See How It Works
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto relative z-10"
            >
              {[
                { label: "Active Users", value: "10K+" },
                { label: "Reviews Collected", value: "500K+" },
                { label: "Countries", value: "50+" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-1 drop-shadow-sm dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">{stat.value}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900 relative z-20 transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
            >
              Powerful features designed to help you collect and showcase reviews effortlessly
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Widget loads in under 100ms with optimized code and CDN delivery",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: Lock,
                title: "Enterprise Security",
                desc: "Bank-level encryption and compliance with GDPR, SOC 2, and ISO standards",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Smartphone,
                title: "Mobile Optimized",
                desc: "Perfect experience on any device with responsive design",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: MessageSquare,
                title: "Smart Notifications",
                desc: "Get instant alerts via email, SMS, or WhatsApp when reviews arrive",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                desc: "Track sentiment, trends, and ROI with beautiful dashboards",
                gradient: "from-red-500 to-rose-500",
              },
              {
                icon: Globe,
                title: "Multi-Language",
                desc: "Support 50+ languages with automatic translation",
                gradient: "from-indigo-500 to-blue-500",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-500/20 transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300" 
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }} />
                
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
            >
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 dark:text-slate-300"
            >
              Start free, upgrade when you need more power
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 p-8 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Starter</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">$0</span>
                  <span className="text-lg text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "1 Review Widget",
                  "100 Reviews/month",
                  "Email Notifications",
                  "Basic Analytics",
                  "Community Support",
                  '"Powered by RateCoo" badge',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/register"
                className="block w-full px-6 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 font-semibold text-center transition-all duration-300"
              >
                Start Free
              </a>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-2xl shadow-blue-500/50 scale-105"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">$29</span>
                  <span className="text-lg opacity-90">/month</span>
                </div>
                <p className="opacity-90 mt-2">For growing businesses</p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited Widgets",
                  "Unlimited Reviews",
                  "White Label (No branding)",
                  "WhatsApp & SMS Notifications",
                  "AI-Powered Auto-Reply",
                  "Advanced Analytics & Reports",
                  "Custom Styling",
                  "API Access",
                  "Priority Support",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/auth/register"
                className="block w-full px-6 py-3 bg-white text-blue-600 rounded-xl hover:bg-slate-100 font-semibold text-center transition-all duration-300 shadow-lg"
              >
                Start 14-Day Free Trial
              </a>
            </motion.div>
          </div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-slate-900 dark:bg-slate-800 text-white rounded-xl px-8 py-6 border border-transparent dark:border-slate-700">
              <h4 className="text-lg font-bold mb-2">Need Enterprise Features?</h4>
              <p className="text-slate-300 dark:text-slate-400 mb-4">Custom solutions, SLA, dedicated support & more</p>
              <a href="mailto:sales@ratecoo.com" className="text-blue-400 dark:text-blue-300 hover:text-blue-300 dark:hover:text-blue-200 font-semibold">
                Contact Sales →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aC0yVjE0aDJ2MjB6bTAgMHYyaC0ydi0yaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform Your
              <br />
              Customer Reviews?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Join 10,000+ businesses already building trust with RateCoo
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/auth/register"
                className="group px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-slate-100 text-lg font-bold transition-all duration-300 shadow-2xl hover:shadow-white/50 flex items-center gap-2"
              >
                Start Free Today
                <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </a>
              <a
                href="#features"
                className="px-10 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 text-lg font-bold transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            <p className="mt-8 text-sm opacity-75">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white fill-white" />
                </div>
                <span className="text-2xl font-bold text-white">RateCoo</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                The modern review widget that helps businesses collect authentic feedback 
                and build trust with their customers.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm">© 2025 RateCoo. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
