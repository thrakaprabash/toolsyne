import React, { useState } from 'react';
import { Landmark, Info } from 'lucide-react';

export default function LoanEMICalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTenure, setLoanTenure] = useState('');
    const [tenureType, setTenureType] = useState('years');
    const [result, setResult] = useState(null);

    const calculateEMI = (e) => {
        e.preventDefault();
        setResult(null);

        const principal = parseFloat(loanAmount);
        const rate = parseFloat(interestRate);
        let tenure = parseFloat(loanTenure);

        if (isNaN(principal) || isNaN(rate) || isNaN(tenure) || principal <= 0 || rate < 0 || tenure <= 0) {
            setResult({ error: 'Please enter valid positive values for all fields.' });
            return;
        }

        const months = tenureType === 'years' ? tenure * 12 : tenure;
        const monthlyRate = (rate / 12) / 100;

        // EMI formula: P * R * (1+R)^N / ((1+R)^N - 1)
        // If rate is 0, EMI is simply principal / months
        let emi = 0;
        if (monthlyRate === 0) {
            emi = principal / months;
        } else {
            const mathPower = Math.pow(1 + monthlyRate, months);
            emi = (principal * monthlyRate * mathPower) / (mathPower - 1);
        }

        const totalPayment = emi * months;
        const totalInterest = totalPayment - principal;

        setResult({
            principal,
            emi,
            totalPayment,
            totalInterest,
            rate,
            months
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Landmark className="w-8 h-8 text-emerald-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Loan EMI Calculator</h1>
                    <p className="text-muted-foreground">Calculate your monthly equated installments (EMI) instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 space-y-6 shadow-sm">
                    <form onSubmit={calculateEMI} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium mb-2">Loan Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3 text-muted-foreground font-medium">$</span>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="any"
                                        className="w-full pl-8 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-emerald-500 bg-background transition-all"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(e.target.value)}
                                        placeholder="10000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Interest Rate (% p.a.)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-4 pr-8 py-3 rounded-lg border focus:ring-2 focus:ring-emerald-500 bg-background transition-all"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(e.target.value)}
                                        placeholder="7.5"
                                    />
                                    <span className="absolute right-4 top-3 text-muted-foreground font-medium">%</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Loan Tenure</label>
                                <div className="flex rounded-lg shadow-sm border focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 overflow-hidden transition-all bg-background">
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="any"
                                        className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 outline-none"
                                        value={loanTenure}
                                        onChange={(e) => setLoanTenure(e.target.value)}
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
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-emerald-500 hover:bg-emerald-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate EMI
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
                                    <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-800 text-center">
                                        <p className="text-sm font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">Monthly EMI</p>
                                        <div className="text-4xl md:text-5xl font-extrabold text-emerald-700 dark:text-emerald-300 tracking-tight">
                                            <span className="text-3xl font-medium opacity-80 mr-1">$</span>
                                            {result.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-lg font-bold">${result.principal.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Principal</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-lg font-bold text-orange-600 dark:text-orange-400">+ ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Total Interest</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30 shadow-sm border-emerald-200 dark:border-emerald-800">
                                            <div className="text-lg font-bold">= ${result.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</div>
                                            <div className="text-xs text-emerald-600 dark:text-emerald-400 uppercase mt-1 tracking-wider font-semibold">Total Amount</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-emerald-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-emerald-600 dark:text-emerald-400">
                            <Info className="w-5 h-5 mr-2" /> Understanding EMI
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            EMI stands for <strong>Equated Monthly Installment</strong>. It includes repayment of the principal amount and payment of the interest on the outstanding amount of your loan.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            A longer loan tenure means a lower EMI but a higher total interest payout. A shorter tenure increases your EMI but reduces your total interest cost significantly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
