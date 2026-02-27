import React, { useState } from 'react';
import { Sparkles, Info } from 'lucide-react';

// Maps zodiac logic to static metadata for rich display
const ZODIAC_DATA = {
    Aries: { range: 'March 21 - April 19', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/10 border-red-200', symbol: '♈' },
    Taurus: { range: 'April 20 - May 20', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/10 border-green-200', symbol: '♉' },
    Gemini: { range: 'May 21 - June 20', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200', symbol: '♊' },
    Cancer: { range: 'June 21 - July 22', color: 'text-slate-400', bg: 'bg-slate-50 dark:bg-slate-800/50 border-slate-200', symbol: '♋' },
    Leo: { range: 'July 23 - August 22', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200', symbol: '♌' },
    Virgo: { range: 'August 23 - September 22', color: 'text-lime-600', bg: 'bg-lime-50 dark:bg-lime-900/10 border-lime-200', symbol: '♍' },
    Libra: { range: 'September 23 - October 22', color: 'text-pink-400', bg: 'bg-pink-50 dark:bg-pink-900/10 border-pink-200', symbol: '♎' },
    Scorpio: { range: 'October 23 - November 21', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-900/10 border-rose-200', symbol: '♏' },
    Sagittarius: { range: 'November 22 - December 21', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200', symbol: '♐' },
    Capricorn: { range: 'December 22 - January 19', color: 'text-stone-600', bg: 'bg-stone-50 dark:bg-stone-900/10 border-stone-200', symbol: '♑' },
    Aquarius: { range: 'January 20 - February 18', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/10 border-cyan-200', symbol: '♒' },
    Pisces: { range: 'February 19 - March 20', color: 'text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200', symbol: '♓' }
};

export default function ZodiacCalculator() {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [result, setResult] = useState(null);

    const checkZodiac = (e) => {
        e.preventDefault();
        setResult(null);

        const d = parseInt(day);
        const m = parseInt(month);

        if (isNaN(d) || isNaN(m) || d < 1 || d > 31 || m < 1 || m > 12) {
            setResult({ error: 'Please enter a valid day (1-31) and month (1-12).' });
            return;
        }

        // We use a leap year 2024 to allow Feb 29
        const daysInMonth = new Date(2024, m, 0).getDate();
        if (d > daysInMonth) {
            setResult({ error: `Invalid date. Month ${m} only has up to ${daysInMonth} days.` });
            return;
        }

        let sign = '';

        if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) sign = 'Aries';
        else if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) sign = 'Taurus';
        else if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) sign = 'Gemini';
        else if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) sign = 'Cancer';
        else if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) sign = 'Leo';
        else if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) sign = 'Virgo';
        else if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) sign = 'Libra';
        else if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) sign = 'Scorpio';
        else if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) sign = 'Sagittarius';
        else if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) sign = 'Capricorn';
        else if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) sign = 'Aquarius';
        else if ((m === 2 && d >= 19) || (m === 3 && d <= 20)) sign = 'Pisces';

        setResult({ sign, data: ZODIAC_DATA[sign] });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-fuchsia-500/10 rounded-xl">
                    <Sparkles className="w-8 h-8 text-fuchsia-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Zodiac Sign Calculator</h1>
                    <p className="text-muted-foreground">Discover your astrological star sign based on your birthday.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 md:col-span-2 space-y-6 shadow-sm">
                    <form onSubmit={checkZodiac} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Month of Birth</label>
                                <select
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-fuchsia-500 bg-background transition-all font-medium"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                >
                                    <option value="" disabled>Select Month</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Day of Birth</label>
                                <input
                                    type="number"
                                    required
                                    min="1" max="31"
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-fuchsia-500 bg-background transition-all"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    placeholder="e.g. 15"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Reveal Sign
                        </button>
                    </form>

                    {result && (
                        <div className="mt-8 pt-6 border-t animate-in slide-in-from-bottom-4 duration-500">
                            {result.error ? (
                                <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200">
                                    {result.error}
                                </div>
                            ) : (
                                <div className={`p-8 rounded-2xl border text-center ${result.data.bg}`}>
                                    <div className={`text-6xl mb-4 ${result.data.color}`}>
                                        {result.data.symbol}
                                    </div>
                                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-1">Your Sign Is</p>
                                    <div className={`text-5xl font-extrabold tracking-tight mb-3 ${result.data.color}`}>
                                        {result.sign}
                                    </div>
                                    <p className="font-medium text-foreground/80 bg-background/50 inline-block px-4 py-1.5 rounded-full text-sm">
                                        🗓️ {result.data.range}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-fuchsia-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-fuchsia-600 dark:text-fuchsia-400">
                            <Info className="w-5 h-5 mr-2" /> Astrology Facts
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Your Sun sign (often called your star sign or zodiac sign) describes your ego, basic personality, core identity, and how you experience the world. It's determined entirely by the month and day you were born!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
