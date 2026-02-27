import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Copy, CheckCircle2 } from 'lucide-react';
import * as math from 'mathjs';

export default function ScientificCalculator() {
    const [display, setDisplay] = useState('');
    const [result, setResult] = useState('');
    const [isRad, setIsRad] = useState(true);
    const [copied, setCopied] = useState(false);
    const inputRef = useRef(null);

    // Keep focus on input for keyboard support
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [display]);

    const append = (val) => {
        setDisplay(prev => prev + val);
    };

    const clearAll = () => {
        setDisplay('');
        setResult('');
    };

    const deleteLast = () => {
        setDisplay(prev => prev.slice(0, -1));
    };

    const calculate = () => {
        if (!display) return;

        try {
            // Replace custom UI symbols with mathjs compatible syntax
            let expr = display
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-')
                .replace(/π/g, 'pi')
                .replace(/e/g, 'e')
                .replace(/√\(/g, 'sqrt(')
                .replace(/log\(/g, 'log10(')
                .replace(/ln\(/g, 'log(')
                .replace(/sin⁻¹\(/g, 'asin(')
                .replace(/cos⁻¹\(/g, 'acos(')
                .replace(/tan⁻¹\(/g, 'atan(')
                .replace(/%/g, '/100');

            // Handle Deg/Rad conversion for trig functions
            if (!isRad) {
                // To support degrees in mathjs accurately, we replace trig inputs with rad equivalents
                // math.js natively uses radians
                expr = expr.replace(/sin\(([^)]+)\)/g, 'sin(($1) * pi / 180)')
                    .replace(/cos\(([^)]+)\)/g, 'cos(($1) * pi / 180)')
                    .replace(/tan\(([^)]+)\)/g, 'tan(($1) * pi / 180)')
                    .replace(/asin\(([^)]+)\)/g, '(asin($1) * 180 / pi)')
                    .replace(/acos\(([^)]+)\)/g, '(acos($1) * 180 / pi)')
                    .replace(/atan\(([^)]+)\)/g, '(atan($1) * 180 / pi)');
            }

            // Safe evaluate using mathjs
            const ans = math.evaluate(expr);

            // Format to avoid ridiculous floating point bounds
            const formatted = math.format(ans, { precision: 14 });
            setResult(formatted);

        } catch (err) {
            setResult('Error');
        }
    };

    const handleCopy = () => {
        if (!result && !display) return;
        const textToCopy = result !== 'Error' && result !== '' ? result : display;
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Keyboard support
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculate();
        } else if (e.key === 'Escape') {
            clearAll();
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            deleteLast();
        } else if (/^[0-9+\-*/().%^]$/.test(e.key)) {
            // Let the input handle standard characters naturally, but we intercept specific visual overrides if we want
        }
    };

    const btnClass = "p-3 md:p-4 text-lg font-medium rounded-xl hover:bg-muted/80 active:scale-95 transition-all bg-background border shadow-sm touch-manipulation";
    const opBtnClass = "p-3 md:p-4 text-lg font-medium rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/60 active:scale-95 transition-all shadow-sm touch-manipulation";
    const funcBtnClass = "p-2 md:p-3 text-sm font-medium rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm touch-manipulation";

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <Calculator className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Scientific Calculator</h1>
                    <p className="text-muted-foreground">Advanced mathematical evaluations powered by <code className="text-xs">math.js</code>.</p>
                </div>
            </div>

            <div className="glass-card rounded-3xl p-6 md:p-8 max-w-2xl mx-auto shadow-xl">
                {/* Display Screen */}
                <div className="bg-muted/50 rounded-2xl p-4 mb-6 relative group border border-border/50">
                    <button
                        onClick={handleCopy}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-sm"
                        title="Copy to clipboard"
                    >
                        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                    </button>

                    <input
                        ref={inputRef}
                        type="text"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="w-full text-right bg-transparent border-none text-2xl lg:text-3xl font-medium focus:ring-0 outline-none p-0 text-foreground font-mono"
                        placeholder="0"
                    />

                    <div className="min-h-[2.5rem] flex items-end justify-end mt-2 overflow-hidden">
                        <span className={`text-3xl font-bold font-mono tracking-tight ${result === 'Error' ? 'text-red-500' : 'text-indigo-600 dark:text-indigo-400'}`}>
                            {result !== '' ? `= ${result}` : ''}
                        </span>
                    </div>
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-5 gap-2 md:gap-3">

                    {/* Mode Toggles */}
                    <div className="col-span-5 flex gap-2 mb-2">
                        <button
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${isRad ? 'bg-indigo-500 text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                            onClick={() => setIsRad(true)}
                        >
                            Rad
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${!isRad ? 'bg-indigo-500 text-white shadow-md' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                            onClick={() => setIsRad(false)}
                        >
                            Deg
                        </button>
                    </div>

                    {/* Scientific Functions */}
                    <button className={funcBtnClass} onClick={() => append('sin(')}>sin</button>
                    <button className={funcBtnClass} onClick={() => append('cos(')}>cos</button>
                    <button className={funcBtnClass} onClick={() => append('tan(')}>tan</button>
                    <button className={funcBtnClass} onClick={() => append('π')}>π</button>
                    <button className={funcBtnClass} onClick={() => append('e')}>e</button>

                    <button className={funcBtnClass} onClick={() => append('sin⁻¹(')}>sin⁻¹</button>
                    <button className={funcBtnClass} onClick={() => append('cos⁻¹(')}>cos⁻¹</button>
                    <button className={funcBtnClass} onClick={() => append('tan⁻¹(')}>tan⁻¹</button>
                    <button className={funcBtnClass} onClick={() => append('log(')}>log</button>
                    <button className={funcBtnClass} onClick={() => append('ln(')}>ln</button>

                    <button className={funcBtnClass} onClick={() => append('^')}>xʸ</button>
                    <button className={funcBtnClass} onClick={() => append('√(')}>√</button>
                    <button className={funcBtnClass} onClick={() => append('!')}>n!</button>
                    <button className={funcBtnClass} onClick={() => append('(')}>(</button>
                    <button className={funcBtnClass} onClick={() => append(')')}>)</button>

                    {/* Numeric and Basic Operations */}
                    <button className={btnClass} onClick={() => append('7')}>7</button>
                    <button className={btnClass} onClick={() => append('8')}>8</button>
                    <button className={btnClass} onClick={() => append('9')}>9</button>
                    <button className={opBtnClass} onClick={() => append('÷')}>÷</button>
                    <button className="p-3 md:p-4 text-lg font-bold rounded-xl bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 hover:bg-red-200 active:scale-95 transition-all shadow-sm" onClick={deleteLast}>⌫</button>

                    <button className={btnClass} onClick={() => append('4')}>4</button>
                    <button className={btnClass} onClick={() => append('5')}>5</button>
                    <button className={btnClass} onClick={() => append('6')}>6</button>
                    <button className={opBtnClass} onClick={() => append('×')}>×</button>
                    <button className="p-3 md:p-4 text-lg font-bold rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 hover:bg-orange-200 active:scale-95 transition-all shadow-sm" onClick={clearAll}>AC</button>

                    <button className={btnClass} onClick={() => append('1')}>1</button>
                    <button className={btnClass} onClick={() => append('2')}>2</button>
                    <button className={btnClass} onClick={() => append('3')}>3</button>
                    <button className={opBtnClass} onClick={() => append('−')}>−</button>
                    <button className={`${btnClass} row-span-2`} onClick={() => append('%')}>%</button>

                    <button className={`${btnClass} col-span-2`} onClick={() => append('0')}>0</button>
                    <button className={btnClass} onClick={() => append('.')}>.</button>
                    <button className={opBtnClass} onClick={() => append('+')}>+</button>

                    {/* Equal span 5 to give it a nice wide footer feel, or span 2 to the right */}
                    <button
                        className="col-span-4 mt-2 py-4 text-xl font-bold rounded-2xl bg-indigo-500 text-white hover:bg-indigo-600 hover:shadow-lg shadow-md active:scale-95 transition-all"
                        onClick={calculate}
                    >
                        = Calculate
                    </button>
                </div>
            </div>
        </div>
    );
}
