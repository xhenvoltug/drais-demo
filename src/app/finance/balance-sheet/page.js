'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building, TrendingUp, DollarSign, Download, Filter, Calendar,
  PieChart, BarChart3, Activity, ArrowUp, ArrowDown, Shield,
  Briefcase, CreditCard, FileText, Eye, ChevronDown, Zap
} from 'lucide-react';

export default function BalanceSheetPage() {
  const [period, setPeriod] = useState('current'); // current, comparative
  const [asOfDate, setAsOfDate] = useState('2025-12-05');
  const [department, setDepartment] = useState('all');
  const [schoolUnit, setSchoolUnit] = useState('all');
  const [viewMode, setViewMode] = useState('summary'); // summary, detailed
  const [data, setData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('balance_sheet_data');
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      const mockData = {
        summary: {
          totalAssets: 4850000000,
          totalLiabilities: 1420000000,
          totalEquity: 3430000000,
          currentRatio: 3.42,
          debtToEquity: 0.41,
          workingCapital: 1875000000,
          assetGrowth: 8.5,
          equityGrowth: 12.3
        },
        assets: {
          current: [
            {
              category: 'Cash & Cash Equivalents',
              amount: 980000000,
              percentage: 20.2,
              growth: 15.2,
              subcategories: [
                { name: 'Bank Accounts', amount: 720000000, details: '3 accounts' },
                { name: 'Petty Cash', amount: 35000000, details: '8 departments' },
                { name: 'Short-term Investments', amount: 225000000, details: 'Treasury bills' }
              ]
            },
            {
              category: 'Accounts Receivable',
              amount: 850000000,
              percentage: 17.5,
              growth: 5.8,
              subcategories: [
                { name: 'Student Fees Receivable', amount: 620000000, students: 347 },
                { name: 'Other Receivables', amount: 230000000, count: 42 }
              ]
            },
            {
              category: 'Prepaid Expenses',
              amount: 125000000,
              percentage: 2.6,
              growth: 3.2,
              subcategories: [
                { name: 'Insurance Prepaid', amount: 65000000 },
                { name: 'Rent Prepaid', amount: 45000000 },
                { name: 'Other Prepayments', amount: 15000000 }
              ]
            },
            {
              category: 'Inventory',
              amount: 95000000,
              percentage: 2.0,
              growth: 4.1,
              subcategories: [
                { name: 'Library Books', amount: 45000000 },
                { name: 'Lab Supplies', amount: 28000000 },
                { name: 'Office Supplies', amount: 22000000 }
              ]
            }
          ],
          nonCurrent: [
            {
              category: 'Land & Buildings',
              amount: 2100000000,
              percentage: 43.3,
              growth: 8.0,
              subcategories: [
                { name: 'School Land', amount: 850000000, area: '25 acres' },
                { name: 'Main Building', amount: 780000000 },
                { name: 'Dormitories', amount: 320000000 },
                { name: 'Sports Facilities', amount: 150000000 }
              ]
            },
            {
              category: 'Equipment & Furniture',
              amount: 485000000,
              percentage: 10.0,
              growth: 12.5,
              subcategories: [
                { name: 'Laboratory Equipment', amount: 185000000 },
                { name: 'Computer Equipment', amount: 145000000 },
                { name: 'Classroom Furniture', amount: 95000000 },
                { name: 'Office Equipment', amount: 60000000 }
              ]
            },
            {
              category: 'Vehicles',
              amount: 165000000,
              percentage: 3.4,
              growth: 6.2,
              subcategories: [
                { name: 'School Buses', amount: 125000000, count: 18 },
                { name: 'Administrative Vehicles', amount: 40000000, count: 8 }
              ]
            },
            {
              category: 'Other Fixed Assets',
              amount: 50000000,
              percentage: 1.0,
              growth: 2.8,
              subcategories: [
                { name: 'Library Collections', amount: 28000000 },
                { name: 'Other Assets', amount: 22000000 }
              ]
            }
          ]
        },
        liabilities: {
          current: [
            {
              category: 'Accounts Payable',
              amount: 385000000,
              percentage: 27.1,
              growth: 4.5,
              subcategories: [
                { name: 'Supplier Payables', amount: 245000000, vendors: 45 },
                { name: 'Utilities Payable', amount: 85000000 },
                { name: 'Other Payables', amount: 55000000 }
              ]
            },
            {
              category: 'Accrued Expenses',
              amount: 185000000,
              percentage: 13.0,
              growth: 5.2,
              subcategories: [
                { name: 'Salary Accruals', amount: 125000000 },
                { name: 'Tax Accruals', amount: 42000000 },
                { name: 'Other Accruals', amount: 18000000 }
              ]
            },
            {
              category: 'Short-term Loans',
              amount: 145000000,
              percentage: 10.2,
              growth: -8.5,
              subcategories: [
                { name: 'Working Capital Loan', amount: 95000000 },
                { name: 'Other Short-term Debt', amount: 50000000 }
              ]
            }
          ],
          nonCurrent: [
            {
              category: 'Long-term Loans',
              amount: 580000000,
              percentage: 40.8,
              growth: 3.2,
              subcategories: [
                { name: 'Building Mortgage', amount: 420000000, bank: 'ABC Bank' },
                { name: 'Equipment Financing', amount: 160000000 }
              ]
            },
            {
              category: 'Other Long-term Liabilities',
              amount: 125000000,
              percentage: 8.8,
              growth: 2.1,
              subcategories: [
                { name: 'Deferred Revenue', amount: 85000000 },
                { name: 'Other Liabilities', amount: 40000000 }
              ]
            }
          ]
        },
        equity: {
          categories: [
            {
              category: 'Capital/Endowment',
              amount: 2100000000,
              percentage: 61.2,
              growth: 5.0,
              description: 'Initial capital and endowments'
            },
            {
              category: 'Retained Earnings',
              amount: 1139000000,
              percentage: 33.2,
              growth: 24.5,
              description: 'Accumulated profits from operations'
            },
            {
              category: 'Current Year Surplus',
              amount: 191000000,
              percentage: 5.6,
              growth: 100.0,
              description: 'Net profit for current period'
            }
          ]
        },
        ratios: {
          currentRatio: { value: 3.42, benchmark: 2.0, status: 'excellent' },
          quickRatio: { value: 2.95, benchmark: 1.5, status: 'excellent' },
          debtToEquity: { value: 0.41, benchmark: 0.5, status: 'good' },
          debtToAssets: { value: 0.29, benchmark: 0.4, status: 'good' },
          workingCapital: { value: 1875000000, benchmark: null, status: 'healthy' }
        },
        insights: [
          {
            type: 'positive',
            title: 'Strong Liquidity Position',
            message: 'Current ratio of 3.42 indicates excellent ability to meet short-term obligations',
            impact: 'high'
          },
          {
            type: 'positive',
            title: 'Equity Growth',
            message: 'Total equity increased by 12.3% - strong financial foundation',
            impact: 'high'
          },
          {
            type: 'neutral',
            title: 'Asset Expansion',
            message: 'Fixed assets grew by 8.5% - significant infrastructure investment',
            impact: 'medium'
          },
          {
            type: 'positive',
            title: 'Healthy Debt Levels',
            message: 'Debt-to-equity ratio of 0.41 is well below industry average',
            impact: 'medium'
          }
        ]
      };
      setData(mockData);
      localStorage.setItem('balance_sheet_data', JSON.stringify(mockData));
    }
  }, [period, asOfDate, department, schoolUnit]);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading balance sheet...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return `UGX ${(amount / 1000000).toFixed(2)}M`;
  };

  const exportReport = (format) => {
    alert(`Exporting Balance Sheet as ${format.toUpperCase()}...`);
  };

  const totalCurrentAssets = data.assets.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = data.assets.nonCurrent.reduce((sum, item) => sum + item.amount, 0);
  const totalCurrentLiabilities = data.liabilities.current.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = data.liabilities.nonCurrent.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-950 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Balance Sheet</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Financial Position as of {asOfDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="current">Current Period</option>
                <option value="comparative">Comparative View</option>
              </select>
              <div className="flex gap-2">
                <button
                  onClick={() => exportReport('pdf')}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  PDF
                </button>
                <button
                  onClick={() => exportReport('excel')}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Excel
                </button>
                <button
                  onClick={() => exportReport('csv')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border border-blue-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold">
                <ArrowUp className="w-3 h-3" />
                +{data.summary.assetGrowth}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.totalAssets)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Assets</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-semibold">
                29% of Assets
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.totalLiabilities)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Liabilities</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
                <ArrowUp className="w-3 h-3" />
                +{data.summary.equityGrowth}%
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {formatCurrency(data.summary.totalEquity)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Equity</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-semibold">
                Excellent
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {data.summary.currentRatio.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Current Ratio</div>
          </motion.div>
        </div>

        {/* Actionable Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Health Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.insights.map((insight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${
                  insight.type === 'positive' ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                }`}
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{insight.message}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Balance Sheet Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Assets */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Assets</h2>
            
            {/* Current Assets */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">Current Assets</h3>
              <div className="space-y-3">
                {data.assets.current.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{item.category}</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.percentage}% of total assets</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ArrowUp className="w-3 h-3" />
                        +{item.growth}%
                      </span>
                    </div>
                    {viewMode === 'detailed' && (
                      <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800 space-y-2">
                        {item.subcategories.map((sub, subIdx) => (
                          <div key={subIdx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(sub.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t-2 border-blue-600 dark:border-blue-400">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">Total Current Assets</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {formatCurrency(totalCurrentAssets)}
                  </span>
                </div>
              </div>
            </div>

            {/* Non-Current Assets */}
            <div>
              <h3 className="text-lg font-bold text-purple-600 dark:text-purple-400 mb-4">Non-Current Assets</h3>
              <div className="space-y-3">
                {data.assets.nonCurrent.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{item.category}</span>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{item.percentage}% of total assets</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ArrowUp className="w-3 h-3" />
                        +{item.growth}%
                      </span>
                    </div>
                    {viewMode === 'detailed' && (
                      <div className="mt-3 pt-3 border-t border-purple-200 dark:border-purple-800 space-y-2">
                        {item.subcategories.map((sub, subIdx) => (
                          <div key={subIdx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(sub.amount)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t-2 border-purple-600 dark:border-purple-400">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-900 dark:text-white">Total Non-Current Assets</span>
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    {formatCurrency(totalNonCurrentAssets)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-4 border-gray-900 dark:border-white">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900 dark:text-white">TOTAL ASSETS</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(data.summary.totalAssets)}
                </span>
              </div>
            </div>
          </div>

          {/* Liabilities & Equity */}
          <div className="space-y-8">
            {/* Liabilities */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Liabilities</h2>
              
              {/* Current Liabilities */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-amber-600 dark:text-amber-400 mb-4">Current Liabilities</h3>
                <div className="space-y-3">
                  {data.liabilities.current.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.category}</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{item.percentage}% of total liabilities</span>
                        <span className={`flex items-center gap-1 ${item.growth >= 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {item.growth >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                          {Math.abs(item.growth)}%
                        </span>
                      </div>
                      {viewMode === 'detailed' && (
                        <div className="mt-3 pt-3 border-t border-amber-200 dark:border-amber-800 space-y-2">
                          {item.subcategories.map((sub, subIdx) => (
                            <div key={subIdx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(sub.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-amber-600 dark:border-amber-400">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total Current Liabilities</span>
                    <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                      {formatCurrency(totalCurrentLiabilities)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Non-Current Liabilities */}
              <div>
                <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Non-Current Liabilities</h3>
                <div className="space-y-3">
                  {data.liabilities.nonCurrent.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.category}</span>
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">
                          {formatCurrency(item.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span>{item.percentage}% of total liabilities</span>
                        <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                          <ArrowUp className="w-3 h-3" />
                          +{item.growth}%
                        </span>
                      </div>
                      {viewMode === 'detailed' && (
                        <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-800 space-y-2">
                          {item.subcategories.map((sub, subIdx) => (
                            <div key={subIdx} className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">{sub.name}</span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {formatCurrency(sub.amount)}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t-2 border-red-600 dark:border-red-400">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 dark:text-white">Total Non-Current Liabilities</span>
                    <span className="text-xl font-bold text-red-600 dark:text-red-400">
                      {formatCurrency(totalNonCurrentLiabilities)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t-4 border-gray-900 dark:border-white">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">TOTAL LIABILITIES</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(data.summary.totalLiabilities)}
                  </span>
                </div>
              </div>
            </div>

            {/* Equity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Equity</h2>
              <div className="space-y-3">
                {data.equity.categories.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{item.category}</span>
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{item.description}</span>
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ArrowUp className="w-3 h-3" />
                        +{item.growth}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t-4 border-gray-900 dark:border-white">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">TOTAL EQUITY</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatCurrency(data.summary.totalEquity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Ratios */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Financial Ratios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Object.entries(data.ratios).map(([key, ratio], idx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  ratio.status === 'excellent' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' :
                  ratio.status === 'good' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                }`}
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {typeof ratio.value === 'number' && ratio.value > 1000000 
                    ? formatCurrency(ratio.value)
                    : ratio.value.toFixed(2)}
                </div>
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                {ratio.benchmark && (
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    Benchmark: {ratio.benchmark}
                  </div>
                )}
                <div className={`text-xs font-semibold mt-2 capitalize ${
                  ratio.status === 'excellent' ? 'text-emerald-600 dark:text-emerald-400' :
                  ratio.status === 'good' ? 'text-blue-600 dark:text-blue-400' :
                  'text-amber-600 dark:text-amber-400'
                }`}>
                  {ratio.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <Filter className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
            <button
              onClick={() => setViewMode(viewMode === 'summary' ? 'detailed' : 'summary')}
              className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
            >
              {viewMode === 'summary' ? 'Show Details' : 'Hide Details'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                As of Date
              </label>
              <input
                type="date"
                value={asOfDate}
                onChange={(e) => setAsOfDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Departments</option>
                <option value="academics">Academics</option>
                <option value="boarding">Boarding</option>
                <option value="tahfiz">Tahfiz</option>
                <option value="transport">Transport</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                School Unit
              </label>
              <select
                value={schoolUnit}
                onChange={(e) => setSchoolUnit(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="all">All Units</option>
                <option value="primary">Primary School</option>
                <option value="secondary">Secondary School</option>
                <option value="tahfiz">Tahfiz Center</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
