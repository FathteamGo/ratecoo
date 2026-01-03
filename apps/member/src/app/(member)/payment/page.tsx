"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, Shield, CheckCircle, Star } from "lucide-react";

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<any>(null);

  useEffect(() => {
    // Initialize payment transaction
    const initializePayment = async () => {
      try {
        const response = await fetch("/api/payment/upgrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to initialize payment");
        }

        setTransaction(data.transaction);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    initializePayment();
  }, []);

  const handlePayment = async () => {
    if (!transaction) return;

    // In a real implementation, this would use the Midtrans Snap API
    // For now, we'll simulate the payment process
    try {
      // Simulate showing Midtrans payment page
      alert(`Payment transaction created! Transaction ID: ${transaction.transaction_id}\n\nIn a real implementation, this would open the Midtrans payment page.`);
      
      // Simulate successful payment
      // In a real implementation, you would handle the redirect back to your app
      // after the payment is completed
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Initializing payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-8 max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Payment Error</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-slate-950/50 border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Upgrade to Pro</h1>
                <p className="text-slate-600 dark:text-slate-400">Complete your payment</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400">Pro Plan</span>
                <span className="font-semibold text-slate-900 dark:text-white">$29.00/month</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <span className="text-slate-600 dark:text-slate-400">Tax</span>
                <span className="font-semibold text-slate-900 dark:text-white">$0.00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-900/50">
                <span className="font-semibold text-slate-900 dark:text-white">Total</span>
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">$29.00</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={!transaction}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              Pay with Midtrans
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Shield className="w-4 h-4" />
              <span>Secure payment powered by Midtrans</span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 text-white mb-6">
              <h2 className="text-xl font-bold mb-2">Pro Plan Benefits</h2>
              <p className="opacity-90">Everything you need to grow your business</p>
            </div>

            <div className="space-y-4">
              {[
                { feature: "5 Review Widgets", icon: "📁" },
                { feature: "No Branding", icon: "✨" },
                { feature: "WhatsApp Notifications", icon: "💬" },
                { feature: "AI Auto-Reply", icon: "🤖" },
                { feature: "Advanced Analytics", icon: "📊" },
                { feature: "API Access", icon: "🔌" },
                { feature: "Priority Support", icon: " priority_support" },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{item.feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}