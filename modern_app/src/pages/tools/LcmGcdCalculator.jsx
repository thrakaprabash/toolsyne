import React, { useState, useMemo } from 'react';
import { Sigma, Plus, X } from 'lucide-react';

export default function LcmGcdCalculator() {
    const [numbers, setNumbers] = useState(['', '']);

    const addNumber = () => setNumbers([...numbers, '']);
    const removeNumber = (index) => {
        if (numbers.length > 2) {
            const newNums = [...numbers];
            newNums.splice(index, 1);
            setNumbers(newNums);
        }
    };

    const updateNumber = (index, val) => {
        const newNums = [...numbers];
        newNums[index] = val;
        setNumbers(newNums);
    };

    const validNumbers = useMemo(() => {
        return numbers.map(n => parseInt(n, 10)).filter(n => !isNaN(n) && n > 0);
    }, [numbers]);

    const gcd = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    const calculate = useMemo(() => {
        if (validNumbers.length < 2) return null;

        let curGcd = validNumbers[0];
        let curLcm = validNumbers[0];

        for (let i = 1; i < validNumbers.length; i++) {
            curGcd = gcd(curGcd, validNumbers[i]);
            curLcm = Math.abs(curLcm * validNumbers[i]) / gcd(curLcm, validNumbers[i]);
        }
        return { gcd: curGcd, lcm: curLcm };
    }, [validNumbers]);

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <Sigma className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">LCM &amp; GCD Calculator</h1>
                    <p className="text-muted-foreground">Compute Least Common Multiple and Greatest Common Divisor instantly.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 shadow-sm border border-border/50">
                <div className="space-y-4">
                    <label className="block text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                        Enter Positive Numbers
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {numbers.map((num, i) => (
                            <div key={i} className="relative group">
                                <input
                                    type="number"
                                    min="1"
                                    className="w-full px-4 py-3 rounded-xl border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 bg-background transition-all font-mono pr-10"
                                    value={num}
                                    onChange={(e) => updateNumber(i, e.target.value)}
                                    placeholder={`Number ${i + 1}`}
                                />
                                {numbers.length > 2 && (
                                    <button
                                        onClick={() => removeNumber(i)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Remove Number"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={addNumber}
                        className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline px-2 py-1 rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Another Number
                    </button>
                </div>

                <div className="border-t pt-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-indigo-50/50 dark:bg-indigo-900/10 border-2 border-indigo-100 dark:border-indigo-900/50 rounded-xl p-5 shadow-inner">
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600/70 dark:text-indigo-400/70 mb-1">Greatest Common Divisor (GCD)</p>
                            <p className="font-mono text-3xl font-bold text-indigo-700 dark:text-indigo-300 overflow-x-auto p-1">
                                {calculate ? calculate.gcd : <span className="opacity-30 text-lg">---</span>}
                            </p>
                        </div>
                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/50 rounded-xl p-5 shadow-inner">
                            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600/70 dark:text-blue-400/70 mb-1">Least Common Multiple (LCM)</p>
                            <p className="font-mono text-3xl font-bold text-blue-700 dark:text-blue-300 overflow-x-auto p-1">
                                {calculate ? calculate.lcm : <span className="opacity-30 text-lg">---</span>}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
