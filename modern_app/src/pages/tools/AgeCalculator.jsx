import React, { useState } from 'react';
import { CalendarDays, Info } from 'lucide-react';

export default function AgeCalculator() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [result, setResult] = useState(null);

    const calculateAge = (e) => {
        e.preventDefault();
        setResult(null);

        const d = parseInt(day);
        const m = parseInt(month);
        const y = parseInt(year);

        if (isNaN(d) || isNaN(m) || isNaN(y) || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
            setResult({ error: 'Please enter a valid day (1-31), month (1-12), and year (e.g., 1990).' });
            return;
        }

        const daysInMonth = new Date(y, m, 0).getDate();
        if (d > daysInMonth) {
            setResult({ error: `Invalid date. Month ${m} only has ${daysInMonth} days in year ${y}.` });
            return;
        }

        const today = new Date();
        const birthDate = new Date(y, m - 1, d); // JS months are 0-indexed

        if (birthDate > today) {
            setResult({ error: 'Birth date cannot be in the future!' });
            return;
        }

        let ageYears = today.getFullYear() - birthDate.getFullYear();
        let ageMonths = today.getMonth() - birthDate.getMonth();
        let ageDays = today.getDate() - birthDate.getDate();

        if (ageDays < 0) {
            ageMonths--;
            // get days in the previous month relative to today
            const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
            ageDays += prevMonthDays;
        }
        if (ageMonths < 0) {
            ageYears--;
            ageMonths += 12;
        }

        // Additional fun stats
        const totalMonths = (ageYears * 12) + ageMonths;
        const totalWeeks = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24 * 7));
        const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

        setResult({
            years: ageYears,
            months: ageMonths,
            days: ageDays,
            totalMonths,
            totalWeeks,
            totalDays,
            birthDateString: birthDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-teal-500/10 rounded-xl">
                    <CalendarDays className="w-8 h-8 text-teal-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Age Calculator</h1>
                    <p className="text-muted-foreground">Find out your exact age in years, months, and days.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 md:col-span-2 space-y-6 shadow-sm">
                    <form onSubmit={calculateAge} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Day</label>
                                <input
                                    type="number"
                                    required
                                    min="1" max="31"
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 bg-background transition-all"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    placeholder="DD"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Month</label>
                                <input
                                    type="number"
                                    required
                                    min="1" max="12"
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 bg-background transition-all"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    placeholder="MM"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Year</label>
                                <input
                                    type="number"
                                    required
                                    min="1900" max="2100"
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-teal-500 bg-background transition-all"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="YYYY"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-teal-500 hover:bg-teal-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate Age
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 pt-6 border-t animate-in slide-in-from-bottom-4 duration-500">
                            {result.error ? (
                                <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">
                                    {result.error}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-6 rounded-2xl bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800 text-center">
                                        <p className="text-sm font-medium uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">Exactly</p>
                                        <div className="text-4xl md:text-5xl font-extrabold text-teal-700 dark:text-teal-300 tracking-tight leading-tight">
                                            {result.years} <span className="text-2xl font-semibold opacity-80">yrs</span> {result.months} <span className="text-2xl font-semibold opacity-80">mos</span> {result.days} <span className="text-2xl font-semibold opacity-80">days</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-2xl font-bold">{result.totalMonths.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Total Months</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-2xl font-bold">{result.totalWeeks.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Total Weeks</div>
                                        </div>
                                        <div className="p-4 rounded-xl border bg-muted/30">
                                            <div className="text-2xl font-bold">{result.totalDays.toLocaleString()}</div>
                                            <div className="text-xs text-muted-foreground uppercase mt-1 tracking-wider">Total Days</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-teal-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-teal-600 dark:text-teal-400">
                            <Info className="w-5 h-5 mr-2" /> Did you know?
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            This calculator determines your exact age accounting for leap years and the varying number of days in different months. The calculation is done entirely directly in your browser, so your birth date is never sent to any server!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
