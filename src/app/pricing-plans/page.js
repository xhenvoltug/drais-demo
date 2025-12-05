'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Check, X, Star, Zap, Crown, ArrowRight, HelpCircle, Shield,
  Users, DollarSign, BookOpen, Bus, Award, MessageSquare, BarChart3,
  Calendar, FileText, Building, Bell, Brain, Smartphone, Globe,
  Lock, CheckCircle, ChevronRight, Sparkles
} from 'lucide-react';

// Version 0.0.0039 - DRAIS Comprehensive Pricing Page

export default function ComprehensivePricing() {
  const [billingCycle, setBillingCycle] = useState('termly'); // 'termly', 'annual', or 'oneTime'

  const plans = [
    {
      id: 'professional',
      name: 'Professional',
      tagline: 'Essential School Management',
      icon: Building,
      price: {
        termly: '350,000',
        annual: '900,000',
        oneTime: '1,490,000',
        savings: '150,000'
      },
      color: 'blue',
      description: 'Core modules for complete school operations',
      popular: false,
      benefits: [
        'Perfect for single-campus schools',
        'All essential modules included',
        'Unlimited students',
        'Up to 50 staff users',
        'Data export capabilities',
        'Regular feature updates',
        'Email support (48h response)'
      ],
      coreFeatures: [
        'Finance Management (Fees, Expenses, Reports)',
        'Library System (Books, Borrowing, Fines)',
        'Transport Management (Routes, Vehicles, Drivers)',
        'Parent Portal (Progress, Fees, Messaging)',
        'Academic Management (Classes, Attendance, Timetables)',
        'Tahfiz Program (Verse tracking, Certificates)',
        'Boarding/Day Management',
        'Examinations (Scheduling, Marks Entry, Results)',
        'Certificate Generation'
      ],
      notIncluded: [
        'DRAIS Intelligence (AI insights)',
        'Advanced messaging & SMS',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
        'Dedicated success manager'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      tagline: 'Intelligence-Powered Management',
      icon: Zap,
      price: {
        termly: '600,000',
        annual: '1,300,000',
        oneTime: '2,530,000',
        savings: '500,000'
      },
      color: 'purple',
      description: 'Everything in Professional + Intelligence & Communications',
      popular: true,
      benefits: [
        'Everything in Professional',
        'AI-powered actionable insights',
        'Predictive analytics & risk detection',
        'Automated recommendations',
        'SMS notifications for parents',
        'Bulk messaging capabilities',
        'Advanced trend forecasting',
        'Up to 100 staff users',
        'Priority phone support (24h response)',
        'Ideal for growing schools'
      ],
      coreFeatures: [
        'All Professional features',
        'DRAIS Intelligence Module',
        '  • Predictive student performance analytics',
        '  • Financial risk detection',
        '  • Automated insights & recommendations',
        '  • Trend forecasting',
        'Advanced Messaging System',
        '  • SMS integration',
        '  • Bulk messaging',
        '  • Message templates',
        '  • Parent notification automation',
        'Advanced Analytics Dashboard',
        'Priority Support (Phone + Email)'
      ],
      notIncluded: [
        'Custom API integrations',
        'Dedicated success manager',
        'White-label options'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      tagline: 'Complete Enterprise Solution',
      icon: Crown,
      price: {
        termly: '850,000',
        annual: '1,500,000',
        oneTime: '3,550,000',
        savings: '1,050,000'
      },
      color: 'amber',
      description: 'Full platform power + premium support',
      popular: false,
      benefits: [
        'Everything in Premium',
        'Unlimited staff users',
        'Full API access',
        'Custom integrations support',
        'White-label options available',
        'Dedicated success manager',
        'Quarterly business reviews',
        'Custom feature development',
        'Multi-campus support',
        'Priority feature requests',
        'Advanced security features',
        'Custom SLA agreements',
        'Perfect for school networks'
      ],
      coreFeatures: [
        'All Premium features',
        'Custom Integrations',
        '  • Full REST API access',
        '  • Webhook support',
        '  • Third-party app connections',
        'Dedicated Success Manager',
        '  • Personal onboarding specialist',
        '  • Quarterly strategy reviews',
        '  • Priority support channel',
        'Enterprise Features',
        '  • Multi-campus management',
        '  • White-label customization',
        '  • Custom feature development',
        '  • Advanced security controls'
      ],
      notIncluded: []
    }
  ];

  const comparisonFeatures = [
    {
      category: 'Core School Management',
      features: [
        { name: 'Finance Management', professional: true, premium: true, gold: true },
        { name: 'Library System', professional: true, premium: true, gold: true },
        { name: 'Transport Management', professional: true, premium: true, gold: true },
        { name: 'Parent Portal', professional: true, premium: true, gold: true },
        { name: 'Academic Management', professional: true, premium: true, gold: true },
        { name: 'Tahfiz Program', professional: true, premium: true, gold: true },
        { name: 'Boarding/Day Management', professional: true, premium: true, gold: true },
        { name: 'Examinations & Results', professional: true, premium: true, gold: true },
        { name: 'Certificate Generation', professional: true, premium: true, gold: true }
      ]
    },
    {
      category: 'Intelligence & Analytics',
      features: [
        { name: 'Basic Reporting', professional: true, premium: true, gold: true },
        { name: 'DRAIS Intelligence (AI)', professional: false, premium: true, gold: true },
        { name: 'Predictive Analytics', professional: false, premium: true, gold: true },
        { name: 'Risk Detection', professional: false, premium: true, gold: true },
        { name: 'Automated Insights', professional: false, premium: true, gold: true },
        { name: 'Trend Forecasting', professional: false, premium: true, gold: true }
      ]
    },
    {
      category: 'Communication & Messaging',
      features: [
        { name: 'Internal Messaging', professional: true, premium: true, gold: true },
        { name: 'Parent Notifications', professional: 'Email Only', premium: 'Email + SMS', gold: 'Email + SMS' },
        { name: 'SMS Integration', professional: false, premium: true, gold: true },
        { name: 'Bulk Messaging', professional: false, premium: true, gold: true },
        { name: 'Message Templates', professional: false, premium: true, gold: true }
      ]
    },
    {
      category: 'Users & Access',
      features: [
        { name: 'Student Accounts', professional: 'Unlimited', premium: 'Unlimited', gold: 'Unlimited' },
        { name: 'Staff Users', professional: 'Up to 50', premium: 'Up to 100', gold: 'Unlimited' },
        { name: 'Parent Access', professional: true, premium: true, gold: true },
        { name: 'Role-based Permissions', professional: true, premium: true, gold: true },
        { name: 'Multi-campus Support', professional: false, premium: false, gold: true }
      ]
    },
    {
      category: 'Support & Services',
      features: [
        { name: 'Email Support', professional: '48h response', premium: '24h response', gold: '24h response' },
        { name: 'Phone Support', professional: false, premium: true, gold: true },
        { name: 'Dedicated Success Manager', professional: false, premium: false, gold: true },
        { name: 'Custom Development', professional: false, premium: false, gold: true },
        { name: 'Quarterly Business Reviews', professional: false, premium: false, gold: true }
      ]
    },
    {
      category: 'Integrations & API',
      features: [
        { name: 'Mobile Money Integration', professional: true, premium: true, gold: true },
        { name: 'Basic Integrations', professional: true, premium: true, gold: true },
        { name: 'Full API Access', professional: false, premium: false, gold: true },
        { name: 'Webhook Support', professional: false, premium: false, gold: true },
        { name: 'Custom Integrations', professional: false, premium: false, gold: true },
        { name: 'White-label Options', professional: false, premium: false, gold: true }
      ]
    }
  ];

  const faqs = [
    {
      question: 'What happens after the 14-day free trial?',
      answer: 'After your trial ends, you can choose a plan that fits your needs. Your data is preserved, and you can upgrade or downgrade at any time. No credit card required for the trial.'
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When upgrading, you get immediate access to new features. Downgrades take effect at the next billing cycle.'
    },
    {
      question: 'Is there a setup fee?',
      answer: 'No setup fees for any plan. All plans include free onboarding and data import assistance. Gold plan includes a dedicated onboarding specialist.'
    },
    {
      question: 'How many students can I manage?',
      answer: 'All plans support unlimited students. You pay based on features and staff users, not student count.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept Mobile Money (MTN, Airtel), bank transfers, and checks. Annual payments receive priority processing and a 20% discount.'
    },
    {
      question: 'Do you offer discounts for multiple campuses?',
      answer: 'Yes! Schools with 3+ campuses qualify for volume discounts on Gold plan. Contact our sales team for custom pricing.'
    },
    {
      question: 'What does "DRAIS Intelligence" include?',
      answer: 'DRAIS Intelligence uses AI to provide predictive analytics, risk detection, automated recommendations, and trend forecasting. It helps you identify at-risk students, financial issues, and opportunities before they become problems.'
    },
    {
      question: 'Is my school data secure?',
      answer: 'Yes. All plans include enterprise-grade security: encrypted data storage, daily backups, role-based access controls, and GDPR compliance. Gold plan adds advanced security features and custom SLAs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Trusted by 23+ Schools
            </div>
            <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your school's needs. All plans include unlimited students, regular updates, and enterprise-grade security.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full p-2">
              <button
                onClick={() => setBillingCycle('termly')}
                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${billingCycle === 'termly' ? 'bg-white text-blue-600 shadow-lg' : 'text-white'}`}
              >
                Per Term
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${billingCycle === 'annual' ? 'bg-white text-blue-600 shadow-lg' : 'text-white'}`}
              >
                Annual
                <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full">Save More</span>
              </button>
              <button
                onClick={() => setBillingCycle('oneTime')}
                className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 text-sm ${billingCycle === 'oneTime' ? 'bg-white text-blue-600 shadow-lg' : 'text-white'}`}
              >
                One-Time
                <span className="px-2 py-0.5 bg-purple-500 text-white text-xs rounded-full">4 Terms + 10%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-2 ${
                plan.popular 
                  ? 'border-purple-500 scale-105 z-10' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-bl-2xl font-bold text-sm flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 fill-white" />
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r from-${plan.color}-100 to-${plan.color}-200 dark:from-${plan.color}-900/30 dark:to-${plan.color}-800/30 rounded-2xl flex items-center justify-center mb-4`}>
                    {React.createElement(plan.icon, { className: `w-8 h-8 text-${plan.color}-600 dark:text-${plan.color}-400` })}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">UGX</span>
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      {billingCycle === 'termly' && plan.price.termly}
                      {billingCycle === 'annual' && plan.price.annual}
                      {billingCycle === 'oneTime' && plan.price.oneTime}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {billingCycle === 'termly' && '/term'}
                      {billingCycle === 'annual' && '/year'}
                      {billingCycle === 'oneTime' && 'one-time'}
                    </span>
                  </div>
                  {billingCycle === 'termly' && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      UGX {(parseInt(plan.price.termly.replace(/,/g, '')) * 3).toLocaleString()} for 3 terms/year
                    </p>
                  )}
                  {billingCycle === 'annual' && (
                    <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2 font-semibold">
                      💰 Save UGX {plan.price.savings} vs termly payments
                    </p>
                  )}
                  {billingCycle === 'oneTime' && (
                    <p className="text-sm text-purple-600 dark:text-purple-400 mt-2 font-semibold">
                      🎯 4 terms + 10% annual subscription included
                    </p>
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{plan.description}</p>

                {/* CTA Button */}
                <Link href="/get-started">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        : `bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 text-white`
                    }`}
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>

                {/* Key Benefits */}
                <div className="mt-8 space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-4">KEY BENEFITS</h4>
                  {plan.benefits.map((benefit, bidx) => (
                    <div key={bidx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included (if any) */}
                {plan.notIncluded.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-500 dark:text-gray-500 text-sm mb-4">NOT INCLUDED</h4>
                    <div className="space-y-2">
                      {plan.notIncluded.slice(0, 3).map((item, nidx) => (
                        <div key={nidx} className="flex items-start gap-3 text-gray-500 dark:text-gray-500">
                          <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              14-day free trial
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Unlimited students
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Feature Comparison
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See exactly what's included in each plan
            </p>
          </div>

          {comparisonFeatures.map((category, cidx) => (
            <div key={cidx} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{category.category}</h3>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-900">
                        <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-white">Feature</th>
                        {plans.map(plan => (
                          <th key={plan.id} className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">
                            {plan.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {category.features.map((feature, fidx) => (
                        <tr key={fidx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{feature.name}</td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.professional === 'boolean' ? (
                              feature.professional ? (
                                <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-gray-400 dark:text-gray-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-gray-700 dark:text-gray-300">{feature.professional}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.premium === 'boolean' ? (
                              feature.premium ? (
                                <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-gray-400 dark:text-gray-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-gray-700 dark:text-gray-300">{feature.premium}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {typeof feature.gold === 'boolean' ? (
                              feature.gold ? (
                                <Check className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                              ) : (
                                <X className="w-6 h-6 text-gray-400 dark:text-gray-600 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-gray-700 dark:text-gray-300">{feature.gold}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about pricing
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our team is here to help you choose the right plan
          </p>
          <Link href="/contact">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
              Contact Sales
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required. Cancel anytime.
          </p>
          <Link href="/get-started">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} DRAIS by Xhenvolt. All rights reserved. • Version 0.0.0039
        </div>
      </footer>
    </div>
  );
}
