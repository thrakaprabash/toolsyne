import React, { useState } from 'react';
import { Percent, BookOpen } from 'lucide-react';

export default function PercentageCalculator() {
    const [calcType, setCalcType] = useState('percentOf');
    // Types: 'percentOf' (X% of Y), 'percentIs' (X is what % of Y), 'percentChange' (Change from X to Y)

    const [val1, setVal1] = useState('');
    const [val2, setVal2] = useState('');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();

        const num1 = parseFloat(val1);
        const num2 = parseFloat(val2);

        if (isNaN(num1) || isNaN(num2)) {
            setResult({ error: "Please enter valid numbers." });
            return;
        }

        try {
            let resObj = {};

            switch (calcType) {
                case 'percentOf':
                    // What is num1% of num2?
                    if (num1 < 0 || num2 < 0) throw new Error("Negative numbers not allowed for this calculation.");
                    // Multiply exact to avoid floating point issues
                    const pOf = Number(((num1 / 100) * num2).toFixed(4));
                    resObj = {
                        text: `${num1}% of ${num2}`,
                        value: pOf,
                        suffix: ''
                    };
                    break;

                case 'percentIs':
                    // num1 is what % of num2?
                    if (num2 === 0) throw new Error("The 'whole' value cannot be zero.");
                    if (num1 < 0 || num2 < 0) throw new Error("Negative numbers not allowed for this calculation.");
                    const pIs = Number(((num1 / num2) * 100).toFixed(4));
                    resObj = {
                        text: `${num1} is what % of ${num2}?`,
                        value: pIs,
                        suffix: '%'
                    };
                    break;

                case 'percentChange':
                    // Change from num1 to num2
                    if (num1 === 0) throw new Error("Initial value cannot be zero.");
                    const change = ((num2 - num1) / Math.abs(num1)) * 100;
                    const changeType = change >= 0 ? 'Increase' : 'Decrease';
                    const formattedChange = Number(Math.abs(change).toFixed(4));
                    resObj = {
                        text: `Percentage ${changeType} from ${num1} to ${num2}`,
                        value: formattedChange,
                        suffix: '%',
                        isChange: true,
                        changeType: changeType
                    };
                    break;

                default:
                    throw new Error("Invalid calculation type.");
            }

            setResult(resObj);
        } catch (error) {
            setResult({ error: error.message });
        }
    };

    const clearInputs = () => {
        setVal1('');
        setVal2('');
        setResult(null);
    };

    // Dynamic labels based on selected type
    const getLabels = () => {
        if (calcType === 'percentOf') return { l1: 'Percentage (%)', l2: 'Number' };
        if (calcType === 'percentIs') return { l1: 'Part', l2: 'Whole' };
        return { l1: 'Initial Value', l2: 'Final Value' };
    };

    const labels = getLabels();

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Percent className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Percentage Calculator</h1>
                    <p className="text-muted-foreground">Quickly calculate percentages, ratios, and percentage changes.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Calculator Card */}
                <div className="glass-card rounded-2xl p-6 md:col-span-2 space-y-6">
                    <form onSubmit={handleCalculate} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium mb-2">Calculation Type</label>
                            <select
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-background font-medium"
                                value={calcType}
                                onChange={(e) => {
                                    setCalcType(e.target.value);
                                    clearInputs();
                                }}
                            >
                                <option value="percentOf">What is X% of Y?</option>
                                <option value="percentIs">X is what % of Y?</option>
                                <option value="percentChange">Percentage Increase / Decrease</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{labels.l1}</label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-background"
                                    value={val1}
                                    onChange={(e) => setVal1(e.target.value)}
                                    placeholder="e.g. 20"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{labels.l2}</label>
                                <input
                                    type="number"
                                    step="any"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 bg-background"
                                    value={val2}
                                    onChange={(e) => setVal2(e.target.value)}
                                    placeholder="e.g. 150"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate
                        </button>
                    </form>

                    {/* Results Area */}
                    {result && (
                        <div className="mt-8 pt-6 border-t animate-in slide-in-from-bottom-4 duration-500">
                            {result.error ? (
                                <div className="p-4 rounded-xl bg-red-100 text-red-700 border border-red-200">
                                    {result.error}
                                </div>
                            ) : (
                                <div className={`p-6 rounded-2xl border text-center ${result.isChange && result.changeType === 'Decrease'
                                        ? 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-800'
                                        : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                                    }`}>
                                    <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-2">
                                        {result.text}
                                    </p>
                                    <div className={`text-5xl font-extrabold ${result.isChange && result.changeType === 'Decrease'
                                            ? 'text-rose-600 dark:text-rose-400'
                                            : 'text-blue-700 dark:text-blue-300'
                                        }`}>
                                        {result.value}{result.suffix}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Instructions Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-blue-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-blue-600 dark:text-blue-400">
                            <BookOpen className="w-5 h-5 mr-2" /> Examples
                        </h3>
                        <div className="space-y-4 text-sm text-muted-foreground">
                            <div>
                                <strong className="text-foreground block mb-1">X% of Y</strong>
                                <p>Used for tipping or discounts. E.g., What is 20% of $150? (Answer: 30)</p>
                            </div>
                            <div>
                                <strong className="text-foreground block mb-1">X is what % of Y</strong>
                                <p>Used for grades or portions. E.g., 45 is what % of 50? (Answer: 90%)</p>
                            </div>
                            <div>
                                <strong className="text-foreground block mb-1">Percentage Change</strong>
                                <p>Used for growth or price drops. E.g., Change from $40 to $50? (Answer: 25% Increase)</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
