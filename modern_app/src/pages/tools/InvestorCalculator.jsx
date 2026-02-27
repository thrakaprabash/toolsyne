import React, { useState } from 'react';
import { TrendingUp, Info } from 'lucide-react';

export default function InvestorCalculator() {
    const [principalAmount, setPrincipalAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [investTenure, setInvestTenure] = useState('');
    const [tenureType, setTenureType] = useState('years');
    const [result, setResult] = useState(null);

    const calculateReturns = (e) => {
        e.preventDefault();
        setResult(null);

        const principal = parseFloat(principalAmount);
        const rate = parseFloat(interestRate);
        let tenure = parseFloat(investTenure);

        if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate < 0 || tenure <= 0) {
            setResult({ error: 'Please enter valid positive values for all fields.' });
            return;
        }

        const months = tenureType === 'years' ? tenure * 12 : tenure;
        const years = months / 12;

        // Compound interest calculation
        // Assuming monthly compounding, if we want annual compounding, it changes.
        // The original code used: maturityValue = principalAmount * Math.pow(1 + monthlyRate, totalMonths);
        const monthlyRate = (rate / 12) / 100;
        const maturityValue = principal * Math.pow(1 + monthlyRate, months);
        const totalInterest = maturityValue - principal;

        // Annual return calculation (Absolute Return annualized)
        const annualReturn = years > 0 ? (totalInterest / principal) / years * 100 : 0;

        setResult({
            principal,
            maturityValue,
            totalInterest,
            annualReturn,
            rate,
            months
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <TrendingUp className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Investor Calculator</h1>
                    <p className="text-muted-foreground">Estimate your investment growth and maturity value over time.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 space-y-6 shadow-sm">
                    <form onSubmit={calculateReturns} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-2">Principal Investment</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-muted-foreground font-medium">$</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="any"
                                        className="w-full pl-8 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 bg-background transition-all"
                                        value={principalAmount}
                                        onChange={(e) => setPrincipalAmount(e.target.value)}
                                        placeholder="10000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Expected Return Rate (% p.a.)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-4 pr-8 py-3 rounded-lg border focus:ring-2 focus:ring-indigo-500 bg-background transition-all"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="5.5"
                                    />
                                    <span className="absolute right-4 top-3 text-muted-foreground font-medium">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Investment Tenure</label>
                                <div className="flex rounded-lg shadow-sm border focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 overflow-hidden transition-all bg-background">
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="any"
                                        className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 outline-none"
                                        value={investTenure}
                                        onChange={(e) => setInvestTenure(e.target.value)}
                                        placeholder="e.g. 5"
                                    />
                                    <select
                                        className="bg-muted px-4 py-3 border-l outline-none focus:ring-0 cursor-pointer text-sm font-medium"
                                        value={tenureType}
                                        onChange={(e) => setTenureType(e.target.value)}
                                    >
                                        <option value="years">Years</option>
                                        <option value="months">Months</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-indigo-500 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate Returns
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 pt-6 border-t animate-in slide-in-from-bottom-4 duration-500">
                            {result.error ? (
                                <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">
                                    {result.error}
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800 text-center relative overflow-hidden">

                                        <p className="text-sm font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">Total Maturity Value</p>
                                        <div className="text-4xl md:text-5xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-tight">
                                            <span className="text-3xl font-medium opacity-80 mr-1">$</span>
                                            {result.maturityValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-lg font-bold">${result.principal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Invested Amount</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-lg font-bold text-green-600 dark:text-green-400">+ ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Wealth Gained</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30 shadow-sm border-indigo-200 dark:border-indigo-800">
                                            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{result.annualReturn.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</div>
                                            <div className="text-xs text-indigo-600 dark:text-indigo-400 uppercase mt-1 tracking-wider font-semibold">Avg. Annual Return</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-indigo-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-indigo-600 dark:text-indigo-400">
                            <Info className="w-5 h-5 mr-2" /> Compound Growth
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            This calculator illustrates the power of compound interest. "Wealth Gained" is the interest earned on top of both your initial principal and previously accumulated interest over the tenure.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
