import React, { useState, useEffect } from 'react';
import { Binary, ArrowRightLeft, Info } from 'lucide-react';

const BASES = [
    { name: 'Binary (Base 2)', value: 2, placeholder: 'e.g. 101010', regex: /^[01]+$/ },
    { name: 'Octal (Base 8)', value: 8, placeholder: 'e.g. 755', regex: /^[0-7]+$/ },
    { name: 'Decimal (Base 10)', value: 10, placeholder: 'e.g. 1024', regex: /^[0-9]+$/ },
    { name: 'Hexadecimal (Base 16)', value: 16, placeholder: 'e.g. 1F4', regex: /^[0-9A-Fa-f]+$/ },
];

export default function BaseConverter() {
    const [inputValue, setInputValue] = useState('');
    const [fromBase, setFromBase] = useState(10);
    const [toBase, setToBase] = useState(2);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        calculateConversion();
    }, [inputValue, fromBase, toBase]);

    const calculateConversion = () => {
        setError('');
        if (!inputValue) {
            setResult('');
            return;
        }

        const inputStr = inputValue.trim();
        const baseDef = BASES.find(b => b.value === fromBase);

        if (!baseDef.regex.test(inputStr)) {
            setError(`Invalid characters for ${baseDef.name}.`);
            setResult('');
            return;
        }

        try {
            // Convert to decimal first
            const decimalValue = parseInt(inputStr, fromBase);
            if (isNaN(decimalValue)) {
                throw new Error('Conversion failed');
            }
            // Convert from decimal to target base
            const targetValue = decimalValue.toString(toBase).toUpperCase();
            setResult(targetValue);
        } catch (e) {
            setError('An error occurred during conversion.');
            setResult('');
        }
    };

    const swapBases = () => {
        const temp = fromBase;
        setFromBase(toBase);
        setToBase(temp);
        setInputValue(result);
    };

    const fromBaseObj = BASES.find(b => b.value === fromBase);
    const toBaseObj = BASES.find(b => b.value === toBase);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Binary className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Number System Converter</h1>
                    <p className="text-muted-foreground">Convert between Binary, Octal, Decimal, and Hexadecimal instantly.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 lg:col-span-2 space-y-6 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-full flex-1">
                            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">From Base</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-background transition-all font-semibold text-lg"
                                value={fromBase}
                                onChange={(e) => setFromBase(parseInt(e.target.value))}
                            >
                                {BASES.map(b => <option key={b.value} value={b.value}>{b.name}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center justify-center pt-6 px-2">
                            <button
                                onClick={swapBases}
                                className="p-3 rounded-full hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors bg-blue-500/10 border border-blue-200"
                                title="Swap Bases"
                            >
                                <ArrowRightLeft className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="w-full flex-1">
                            <label className="block text-sm font-medium mb-2 text-muted-foreground uppercase tracking-wider">To Base</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-background transition-all font-semibold text-lg"
                                value={toBase}
                                onChange={(e) => setToBase(parseInt(e.target.value))}
                            >
                                {BASES.map(b => <option key={b.value} value={b.value}>{b.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-4 border-t pt-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Input <span className="text-blue-500">({fromBaseObj.name})</span></label>
                            <input
                                type="text"
                                className="w-full px-6 py-4 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-background transition-all font-mono text-2xl"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={fromBaseObj.placeholder}
                            />
                            {error && <p className="text-red-500 text-sm mt-2 font-medium">{error}</p>}
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium mb-2">Result <span className="text-blue-500">({toBaseObj.name})</span></label>
                            <div className="w-full px-6 py-4 rounded-xl border bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 font-mono text-2xl min-h-[72px] flex items-center shadow-inner overflow-x-auto text-blue-700 dark:text-blue-300">
                                {result || <span className="text-muted-foreground/30 select-none">Result will appear here</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-blue-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-600 dark:text-blue-400">
                            <Info className="w-5 h-5 mr-2" /> Consolidated Tool
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            This single tool replaces 10 separate legacy calculators. Simply select your starting base and your target base, and the conversion happens instantly as you type!
                        </p>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                            <li><span className="font-mono bg-background px-1 py-0.5 rounded border">0-1</span> for Binary</li>
                            <li><span className="font-mono bg-background px-1 py-0.5 rounded border">0-7</span> for Octal</li>
                            <li><span className="font-mono bg-background px-1 py-0.5 rounded border">0-9</span> for Decimal</li>
                            <li><span className="font-mono bg-background px-1 py-0.5 rounded border">0-F</span> for Hexadecimal</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
