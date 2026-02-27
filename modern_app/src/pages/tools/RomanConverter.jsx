import React, { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';

export default function RomanConverter() {
    const [inputValue, setInputValue] = useState('');
    const [mode, setMode] = useState('decToRoman');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
        setResult('');
        const val = inputValue.trim().toUpperCase();

        if (!val) return;

        if (mode === 'decToRoman') {
            const dec = parseInt(val, 10);
            if (isNaN(dec) || dec < 1 || dec > 3999) {
                setError('Enter a valid decimal number between 1 and 3999.');
                return;
            }
            const romans = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
            const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
            let romanStr = "";
            let remaining = dec;
            for (let i = 0; i < values.length; i++) {
                while (remaining >= values[i]) {
                    romanStr += romans[i];
                    remaining -= values[i];
                }
            }
            setResult(romanStr);
        } else {
            if (!/^[MDCLXVI]+$/.test(val)) {
                setError('Invalid Roman numeral. Use only M, D, C, L, X, V, I.');
                return;
            }
            const values = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
            let total = 0;
            let prev = 0;
            for (let i = val.length - 1; i >= 0; i--) {
                const curr = values[val[i]];
                if (curr < prev) total -= curr;
                else total += curr;
                prev = curr;
            }
            setResult(total.toString());
        }
    }, [inputValue, mode]);

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Quote className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Roman Numeral Converter</h1>
                    <p className="text-muted-foreground">Instantly convert between Decimal and Roman Numerals.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 shadow-sm border border-border/50">
                <div className="space-y-4 box-border">
                    <div className="flex space-x-2 p-1 bg-muted rounded-xl">
                        <button
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'decToRoman' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => { setMode('decToRoman'); setInputValue(''); }}
                        >
                            Decimal to Roman
                        </button>
                        <button
                            className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all ${mode === 'romanToDec' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => { setMode('romanToDec'); setInputValue(''); }}
                        >
                            Roman to Decimal
                        </button>
                    </div>

                    <div className="space-y-2 pt-4">
                        <label className="block text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                            {mode === 'decToRoman' ? 'Enter Decimal (1 - 3999)' : 'Enter Roman Numeral'}
                        </label>
                        <input
                            type={mode === 'decToRoman' ? 'number' : 'text'}
                            className="w-full px-5 py-4 rounded-xl border-2 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 bg-background transition-all font-mono text-xl uppercase"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={mode === 'decToRoman' ? 'e.g. 1994' : 'e.g. MCMXCIV'}
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    <div className="pt-4">
                        <div className="w-full px-5 py-6 rounded-xl border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-900/50 font-mono text-3xl text-amber-700 dark:text-amber-400 min-h-[96px] flex items-center justify-center text-center shadow-inner overflow-x-auto">
                            {result || <span className="opacity-40 select-none text-base font-sans font-medium">Result will appear here</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
