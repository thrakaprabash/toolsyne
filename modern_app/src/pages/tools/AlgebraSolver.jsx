import React, { useState, useEffect } from 'react';
import { FunctionSquare, HelpCircle } from 'lucide-react';

const formulas = [
    { id: 'linear1', name: 'Standard Linear: ax + b = c', variables: ['a', 'b', 'c'] },
    { id: 'linear2', name: 'Grouped Linear: a(x + b) = c', variables: ['a', 'b', 'c'] },
    { id: 'quadratic', name: 'Quadratic: ax² + bx + c = 0', variables: ['a', 'b', 'c'] },
    { id: 'division', name: 'Division: x / a = b', variables: ['a', 'b'] },
    { id: 'squared', name: 'Squared: x² = a', variables: ['a'] },
    { id: 'linear3', name: 'Negative Linear: ax - b = c', variables: ['a', 'b', 'c'] },
    { id: 'division2', name: 'Inverse Division: a / x = b', variables: ['a', 'b'] },
    { id: 'linear4', name: 'Combined Xs: ax + bx = c', variables: ['a', 'b', 'c'] },
    { id: 'add', name: 'Addition: x + a = b', variables: ['a', 'b'] },
    { id: 'subtract', name: 'Subtraction: x - a = b', variables: ['a', 'b'] },
    { id: 'squared2', name: 'Scaled Squared: a * x² = b', variables: ['a', 'b'] },
    { id: 'cube', name: 'Cubed: x³ = a', variables: ['a'] },
    { id: 'plusSquared', name: 'Squared Addition: x² + a = b', variables: ['a', 'b'] },
    { id: 'sqrt', name: 'Square Root: √x = a', variables: ['a'] },
    { id: 'product', name: 'Product: a * x = b', variables: ['a', 'b'] },
    { id: 'modulus', name: 'Modulus: x % a = b', variables: ['a', 'b'] }
];

export default function AlgebraSolver() {
    const [selectedFormulaObj, setSelectedFormulaObj] = useState(formulas[0]);
    const [inputs, setInputs] = useState({});
    const [solution, setSolution] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setInputs({});
        setSolution(null);
        setError('');
    }, [selectedFormulaObj]);

    const handleInputChange = (variable, value) => {
        setInputs(prev => ({ ...prev, [variable]: value }));
    };

    const solveEquation = () => {
        setError('');
        setSolution(null);

        const values = {};
        for (const v of selectedFormulaObj.variables) {
            const val = parseFloat(inputs[v]);
            if (isNaN(val)) {
                setError(`Please enter a valid number for ${v}`);
                return;
            }
            values[v] = val;
        }

        try {
            let eq = '', sol = '';
            switch (selectedFormulaObj.id) {
                case "linear1":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0.");
                    sol = ((values.c - values.b) / values.a).toFixed(4);
                    eq = `${values.a}x + ${values.b} = ${values.c}`;
                    break;
                case "linear2":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0.");
                    sol = ((values.c / values.a) - values.b).toFixed(4);
                    eq = `${values.a}(x + ${values.b}) = ${values.c}`;
                    break;
                case "quadratic":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0 for a quadratic equation.");
                    const d = values.b ** 2 - 4 * values.a * values.c;
                    if (d < 0) throw new Error("No real roots exist (discriminant < 0).");
                    const r1 = (-values.b + Math.sqrt(d)) / (2 * values.a);
                    const r2 = (-values.b - Math.sqrt(d)) / (2 * values.a);
                    sol = r1 === r2 ? `x = ${r1.toFixed(4)}` : `x₁ = ${r1.toFixed(4)}, x₂ = ${r2.toFixed(4)}`;
                    eq = `${values.a}x² + ${values.b}x + ${values.c} = 0`;
                    break;
                case "division":
                    if (values.a === 0) throw new Error("Cannot divide by 0.");
                    sol = (values.a * values.b).toFixed(4);
                    eq = `x / ${values.a} = ${values.b}`;
                    break;
                case "squared":
                    if (values.a < 0) throw new Error("No real roots for negative squares.");
                    sol = `x = ±${Math.sqrt(values.a).toFixed(4)}`;
                    eq = `x² = ${values.a}`;
                    break;
                case "linear3":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0.");
                    sol = ((values.c + values.b) / values.a).toFixed(4);
                    eq = `${values.a}x - ${values.b} = ${values.c}`;
                    break;
                case "division2":
                    if (values.b === 0) throw new Error("Result 'b' cannot be 0 if 'a' is non-zero.");
                    sol = (values.a / values.b).toFixed(4);
                    eq = `${values.a} / x = ${values.b}`;
                    break;
                case "linear4":
                    const sum = values.a + values.b;
                    if (sum === 0) throw new Error("The sum of coefficients (a + b) cannot be 0.");
                    sol = (values.c / sum).toFixed(4);
                    eq = `${values.a}x + ${values.b}x = ${values.c}`;
                    break;
                case "add":
                    sol = (values.b - values.a).toFixed(4);
                    eq = `x + ${values.a} = ${values.b}`;
                    break;
                case "subtract":
                    sol = (values.b + values.a).toFixed(4);
                    eq = `x - ${values.a} = ${values.b}`;
                    break;
                case "squared2":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0.");
                    if (values.b / values.a < 0) throw new Error("No real roots.");
                    sol = `x = ±${Math.sqrt(values.b / values.a).toFixed(4)}`;
                    eq = `${values.a}x² = ${values.b}`;
                    break;
                case "cube":
                    sol = `x = ${Math.cbrt(values.a).toFixed(4)}`;
                    eq = `x³ = ${values.a}`;
                    break;
                case "plusSquared":
                    const xValSq = values.b - values.a;
                    if (xValSq < 0) throw new Error("No real roots.");
                    sol = `x = ±${Math.sqrt(xValSq).toFixed(4)}`;
                    eq = `x² + ${values.a} = ${values.b}`;
                    break;
                case "sqrt":
                    if (values.a < 0) throw new Error("Square root result cannot be negative.");
                    sol = `x = ${(values.a ** 2).toFixed(4)}`;
                    eq = `√x = ${values.a}`;
                    break;
                case "product":
                    if (values.a === 0) throw new Error("Coefficient 'a' cannot be 0.");
                    sol = (values.b / values.a).toFixed(4);
                    eq = `${values.a} * x = ${values.b}`;
                    break;
                case "modulus":
                    sol = `x = ${values.a} * n + ${values.b}, where n ∈ ℤ`;
                    eq = `x % ${values.a} = ${values.b}`;
                    break;
                default:
                    throw new Error("Unknown formula selected.");
            }
            // Strip trailing zeros after decimals if appropriate
            if (sol.includes('x = ±')) sol = sol.replace(/(\.[0-9]*[1-9])0+$|\.0+$/, '$1');
            setSolution({ equation: eq, x: sol.startsWith('x =') ? sol : `x = ${parseFloat(sol)}` });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-red-500/10 rounded-xl">
                    <FunctionSquare className="w-8 h-8 text-red-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Algebra Solver</h1>
                    <p className="text-muted-foreground">Select an algebraic setup, provide variables, and solve for x.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 lg:p-8 lg:col-span-2 shadow-sm border border-border/50">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold mb-2 text-foreground/80 uppercase tracking-wider">
                                Choose Formula
                            </label>
                            <select
                                className="w-full px-5 py-3.5 rounded-xl border-2 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 bg-background transition-all font-medium text-lg cursor-pointer"
                                value={selectedFormulaObj.id}
                                onChange={(e) => setSelectedFormulaObj(formulas.find(f => f.id === e.target.value))}
                            >
                                {formulas.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t">
                            {selectedFormulaObj.variables.map(variable => (
                                <div key={variable} className="space-y-2">
                                    <label className="block text-sm font-medium uppercase tracking-wider text-muted-foreground">
                                        Variable '{variable}'
                                    </label>
                                    <input
                                        type="number"
                                        step="any"
                                        className="w-full px-4 py-3 rounded-xl border focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-background transition-all font-mono"
                                        value={inputs[variable] || ''}
                                        onChange={(e) => handleInputChange(variable, e.target.value)}
                                        placeholder={`Enter ${variable}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                        <button
                            onClick={solveEquation}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                        >
                            Solve Equation
                        </button>

                        {solution && (
                            <div className="pt-6 space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                                <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-xl p-6 shadow-inner text-center space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-red-600/80 dark:text-red-400/80 uppercase tracking-widest mb-2">Equation</p>
                                        <p className="font-mono text-2xl font-bold text-foreground">{solution.equation}</p>
                                    </div>
                                    <div className="h-px bg-red-200 dark:bg-red-900/50 w-1/2 mx-auto"></div>
                                    <div>
                                        <p className="text-sm font-medium text-red-600/80 dark:text-red-400/80 uppercase tracking-widest mb-2">Solution</p>
                                        <p className="font-mono text-3xl font-bold text-red-600 dark:text-red-400">{solution.x}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-red-500 shadow-sm border border-border/50">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-red-600 dark:text-red-400">
                            <HelpCircle className="w-5 h-5 mr-2" /> Formula Guide
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            The Algebra Solver analytically computes solutions for a predefined set of algebraic patterns.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            For quadratic formulas, it strictly identifies mathematically viable real roots and warns on imaginary (negative discriminant) boundaries. All results default to 4 points of decimal precision for accuracy.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
