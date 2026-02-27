import React, { useState } from 'react';
import { Activity, BookOpen } from 'lucide-react';

// Pure Logic Function extracted from UI
function calculateBMIValue(weight, height, weightUnit, heightUnit) {
    if (!weight || !height) return null;

    let weightKg = parseFloat(weight);
    if (isNaN(weightKg) || weightKg <= 0) return null;

    if (weightUnit === 'lbs') {
        weightKg = weightKg * 0.453592;
    }

    let heightM = 0;

    if (heightUnit === 'ftin') {
        // Handle variations like 5.9, 5'9", 5 9
        const heightStr = String(height).replace(/"/g, '').replace(/'/g, '.').replace(/\s+/g, '.');
        const parts = heightStr.split('.');

        const feet = parseInt(parts[0]) || 0;
        const inches = parseInt(parts[1]) || 0;

        if (feet <= 0 && inches <= 0) return null;
        heightM = (feet * 0.3048) + (inches * 0.0254);
    } else {
        const heightCm = parseFloat(height);
        if (isNaN(heightCm) || heightCm <= 0) return null;
        heightM = heightCm / 100;
    }

    if (heightM <= 0) return null;

    const bmi = (weightKg / (heightM * heightM)).toFixed(1);
    return parseFloat(bmi);
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    return { category: 'Obese', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
}

export default function BMICalculator() {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [weightUnit, setWeightUnit] = useState('kg');
    const [heightUnit, setHeightUnit] = useState('cm');
    const [result, setResult] = useState(null);

    const handleCalculate = (e) => {
        e.preventDefault();
        const bmiValue = calculateBMIValue(weight, height, weightUnit, heightUnit);
        if (bmiValue) {
            setResult({
                bmi: bmiValue,
                details: getBMICategory(bmiValue),
            });
        } else {
            setResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl">
                    <Activity className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">BMI Calculator</h1>
                    <p className="text-muted-foreground">Calculate your Body Mass Index quickly and accurately.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Main Calculator Card */}
                <div className="glass-card rounded-2xl p-6 md:col-span-2">
                    <form onSubmit={handleCalculate} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Weight</label>
                                <div className="flex rounded-lg shadow-sm border focus-within:ring-2 focus-within:ring-primary focus-within:border-primary overflow-hidden transition-all bg-background">
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        step="0.1"
                                        className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 outline-none"
                                        placeholder={weightUnit === 'kg' ? "e.g. 70.5" : "e.g. 155.0"}
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                    />
                                    <select
                                        className="bg-muted px-4 py-3 border-l outline-none focus:ring-0 cursor-pointer font-medium"
                                        value={weightUnit}
                                        onChange={(e) => {
                                            setWeightUnit(e.target.value);
                                            setWeight('');
                                            setResult(null);
                                        }}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Height</label>
                                <div className="flex rounded-lg shadow-sm border focus-within:ring-2 focus-within:ring-primary focus-within:border-primary overflow-hidden transition-all bg-background">
                                    <input
                                        type="text"
                                        required
                                        className="flex-1 px-4 py-3 bg-transparent border-none focus:ring-0 outline-none"
                                        placeholder={heightUnit === 'cm' ? "e.g. 175.5" : "e.g. 5.9 or 5'9"}
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                    <select
                                        className="bg-muted px-4 py-3 border-l outline-none focus:ring-0 cursor-pointer font-medium"
                                        value={heightUnit}
                                        onChange={(e) => {
                                            setHeightUnit(e.target.value);
                                            setHeight('');
                                            setResult(null);
                                        }}
                                    >
                                        <option value="cm">cm</option>
                                        <option value="ftin">ft / in</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-primary hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate BMI
                        </button>
                    </form>

                    {/* Results Area with Micro-animation */}
                    {result && (
                        <div className={`mt-8 p-6 rounded-2xl border ${result.details.bg} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
                            <div className="text-center space-y-2">
                                <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Your Result</p>
                                <div className="text-5xl font-extrabold tracking-tighter">
                                    {result.bmi}
                                </div>
                                <div className={`text-xl font-bold ${result.details.color}`}>
                                    {result.details.category}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Instructions Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30">
                        <h3 className="font-semibold text-lg mb-4 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" />
                            How to Use
                        </h3>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2 leading-relaxed">
                            <li>Enter your weight and select either kilograms (kg) or pounds (lbs).</li>
                            <li>Enter your height and select either centimeters (cm) or feet/inches (ft/in).</li>
                            <li>Click <strong>Calculate BMI</strong> to instantly see your results.</li>
                            <li>Ensure all inputs are positive decimal numbers.</li>
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    );
}
