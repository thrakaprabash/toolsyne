import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

// --- Pure Logic Functions ---
const gradeMap = {
    'A+': 97.0, 'A': 95.0, 'A-': 92.0,
    'B+': 87.0, 'B': 85.0, 'B-': 82.0,
    'C+': 77.0, 'C': 75.0, 'C-': 72.0,
    'D+': 67.0, 'D': 65.0, 'D-': 62.0,
    'F': 0.0
};

function parseGrade(gradeStr) {
    if (!gradeStr) return null;
    const str = gradeStr.trim();

    // Is numeric (0-100)
    if (/^[0-9]{1,3}(\.[0-9]*)?$/.test(str)) {
        const val = parseFloat(str);
        return (val >= 0 && val <= 100) ? val : null;
    }

    // Is Letter (A-F with optional +/-)
    if (/^[ABCDF][+-]?$/i.test(str)) {
        const val = gradeMap[str.toUpperCase()];
        return val !== undefined ? val : null;
    }

    return null;
}

export function calculateGrade(assignments, desiredGradeStr) {
    let weightedTotal = 0.0;
    let weightSum = 0.0;

    // Process Assignments
    for (const asgn of assignments) {
        const w = parseFloat(asgn.weight);
        const g = parseGrade(asgn.grade);

        if (isNaN(w) || w <= 0 || w > 100 || g === null) {
            return { error: 'Invalid input. Ensure weights are > 0 and grades are valid (0-100 or A-F).' };
        }

        weightedTotal += w * g;
        weightSum += w;
    }

    if (weightSum === 0) return null;

    const currentGrade = weightedTotal / weightSum;
    let requiredGrade = null;
    let remainingWeight = 0;

    // Process Desired Target
    const desiredGrade = parseFloat(desiredGradeStr);
    if (!isNaN(desiredGrade) && desiredGrade >= 0 && desiredGrade <= 100 && weightSum < 100) {
        remainingWeight = 100 - weightSum;
        requiredGrade = ((desiredGrade * 100) - (currentGrade * weightSum)) / remainingWeight;
    }

    return {
        currentGrade,
        weightSum,
        remainingWeight,
        requiredGrade,
        targetSet: !isNaN(desiredGrade) && desiredGrade > 0
    };
}

// --- React Component ---
export default function GradeCalculator() {
    const [assignments, setAssignments] = useState([{ id: Date.now(), weight: '', grade: '' }]);
    const [desiredGrade, setDesiredGrade] = useState('');
    const [result, setResult] = useState(null);

    const handleAssignmentChange = (id, field, value) => {
        setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
        setResult(null); // Clear result on change
    };

    const addAssignment = () => {
        if (assignments.length >= 10) return;
        setAssignments([...assignments, { id: Date.now(), weight: '', grade: '' }]);
    };

    const removeAssignment = (id) => {
        if (assignments.length <= 1) return;
        setAssignments(assignments.filter(a => a.id !== id));
        setResult(null);
    };

    const clearAll = () => {
        setAssignments([{ id: Date.now(), weight: '', grade: '' }]);
        setDesiredGrade('');
        setResult(null);
    };

    const handleCalculate = (e) => {
        e.preventDefault();
        const res = calculateGrade(assignments, desiredGrade);
        setResult(res);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-green-500/10 rounded-xl">
                    <Calculator className="w-8 h-8 text-green-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Grade Calculator</h1>
                    <p className="text-muted-foreground">Calculate your weighted grade and determine required scores.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Calculator Card */}
                <div className="glass-card rounded-2xl p-6 md:col-span-2 space-y-6">
                    <form onSubmit={handleCalculate} className="space-y-6">

                        <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                            <label className="block text-sm font-medium mb-2">Desired Course Grade (Optional, 0-100%)</label>
                            <input
                                type="number"
                                step="any"
                                min="0"
                                max="100"
                                placeholder="e.g., 85"
                                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-background transition-all"
                                value={desiredGrade}
                                onChange={(e) => { setDesiredGrade(e.target.value); setResult(null); }}
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">Assignments</h3>
                                <span className="text-sm text-muted-foreground">{assignments.length}/10 max</span>
                            </div>

                            <div className="space-y-3">
                                {assignments.map((asgn, idx) => (
                                    <div key={asgn.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center p-3 rounded-xl border bg-background/50 relative group">
                                        <div className="flex-none font-medium text-sm text-muted-foreground w-8">
                                            #{idx + 1}
                                        </div>
                                        <div className="flex-1 w-full">
                                            <input
                                                type="number"
                                                placeholder="Weight (%)"
                                                required
                                                min="0.01"
                                                max="100"
                                                step="any"
                                                value={asgn.weight}
                                                onChange={(e) => handleAssignmentChange(asgn.id, 'weight', e.target.value)}
                                                className="w-full px-3 py-2 rounded-md border text-sm focus:ring-1 focus:ring-green-500 transition-all bg-background"
                                            />
                                        </div>
                                        <div className="flex-1 w-full flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Grade (e.g. 95 or A)"
                                                required
                                                value={asgn.grade}
                                                onChange={(e) => handleAssignmentChange(asgn.id, 'grade', e.target.value)}
                                                className="w-full px-3 py-2 rounded-md border text-sm focus:ring-1 focus:ring-green-500 transition-all bg-background"
                                            />
                                            {assignments.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeAssignment(asgn.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                                                    title="Remove row"
                                                >
                                                    &times;
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={addAssignment}
                                    disabled={assignments.length >= 10}
                                    className="px-4 py-2 text-sm font-medium rounded-lg bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    + Add Row
                                </button>
                                <button
                                    type="button"
                                    onClick={clearAll}
                                    className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-green-500 hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Calculate Grade
                        </button>
                    </form>

                    {/* Results Area */}
                    {result && (
                        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
                            {result.error ? (
                                <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
                                    {result.error}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 text-center">
                                        <p className="text-sm font-medium uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">Current Weighted Grade</p>
                                        <div className="text-5xl font-extrabold text-green-700 dark:text-green-300">
                                            {result.currentGrade.toFixed(2)}%
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-2">Based on {result.weightSum}% of total coursework.</p>
                                    </div>

                                    {result.targetSet && result.remainingWeight > 0 && (
                                        <div className={`p-6 rounded-2xl border text-center ${result.requiredGrade > 100 || result.requiredGrade < 0
                                                ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
                                                : 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800'
                                            }`}>
                                            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-1">Required For Target ({desiredGrade}%)</p>

                                            {result.requiredGrade > 100 ? (
                                                <div>
                                                    <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">Impossible</div>
                                                    <p className="text-sm mt-2 text-orange-700/80 dark:text-orange-300">
                                                        You need <strong>{result.requiredGrade.toFixed(2)}%</strong> on the remaining {result.remainingWeight}% of the course.
                                                    </p>
                                                </div>
                                            ) : result.requiredGrade < 0 ? (
                                                <div>
                                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">Guaranteed!</div>
                                                    <p className="text-sm mt-2 text-green-700/80 dark:text-green-300">
                                                        You have already secured your target grade.
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="text-4xl font-extrabold text-blue-700 dark:text-blue-300">
                                                        {result.requiredGrade.toFixed(2)}%
                                                    </div>
                                                    <p className="text-sm mt-2 text-blue-700/80 dark:text-blue-300">
                                                        Average needed on the remaining {result.remainingWeight}% of the course.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {result.targetSet && result.remainingWeight <= 0 && (
                                        <p className="text-sm text-center text-muted-foreground">100% of the course weight is entered. Cannot calculate required remaining score.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Instructions Sidebar */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-green-500">
                        <h3 className="font-semibold text-lg mb-4 text-green-600 dark:text-green-400">
                            How to Use
                        </h3>
                        <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-3 leading-relaxed">
                            <li>(Optional) Enter your <strong>Desired Course Grade</strong>.</li>
                            <li>Add rows for each assignment or test.</li>
                            <li>Enter the <strong>Weight (%)</strong> for each.</li>
                            <li>Enter your <strong>Grade</strong> (e.g., <kbd className="bg-background px-1 border rounded">85</kbd> or <kbd className="bg-background px-1 border rounded">B+</kbd>).</li>
                            <li>Click <strong>Calculate Grade</strong>.</li>
                        </ol>

                        <div className="mt-6 pt-6 border-t text-xs text-muted-foreground">
                            <p className="font-semibold mb-2 text-foreground">Letters Supported:</p>
                            <p>A+, A, A-, B+, B, B-, C+, C, C-, D+, D, F.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
