import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRightLeft, Info } from 'lucide-react';

const unitDefinitions = {
    temperature: { name: "Temperature", units: ["Celsius", "Fahrenheit", "Kelvin"] },
    length: { name: "Length/Distance", units: ["mm", "cm", "m", "km", "in", "ft", "yd", "mi", "nmi"] },
    weight: { name: "Weight/Mass", units: ["mg", "g", "kg", "t", "oz", "lb", "st", "short ton", "long ton"] },
    area: { name: "Area", units: ["mm²", "cm²", "m²", "ha", "km²", "in²", "ft²", "yd²", "ac", "mi²"] },
    volume: { name: "Volume", units: ["cm³", "m³", "L", "mL", "in³", "ft³", "gal", "qt", "pt", "fl oz"] },
    speed: { name: "Speed", units: ["m/s", "km/h", "mph", "ft/s", "knots"] },
    time: { name: "Time", units: ["ns", "μs", "ms", "s", "min", "hr", "day", "wk", "mo", "yr"] },
    storage: { name: "Digital Storage", units: ["b", "B", "KB", "MB", "GB", "TB", "PB"] },
    energy: { name: "Energy", units: ["J", "kJ", "cal", "kcal", "Wh", "kWh", "BTU"] },
    power: { name: "Power", units: ["W", "kW", "MW", "hp", "ft-lb/s"] },
    pressure: { name: "Pressure", units: ["Pa", "kPa", "bar", "atm", "mmHg", "psi"] },
    angle: { name: "Angle", units: ["°", "rad", "grad", "'", "\""] },
    fuel: { name: "Fuel Consumption", units: ["mpg", "km/L", "L/100km"] },
    dataRate: { name: "Data Transfer Rate", units: ["bps", "kbps", "Mbps", "Gbps", "B/s"] },
    cooking: { name: "Cooking Measurements", units: ["tsp", "tbsp", "fl oz", "c", "pt", "qt", "gal", "mL", "L"] }
};

export default function UnitConverter() {
    const [conversionType, setConversionType] = useState('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        // Reset units when category changes
        const units = unitDefinitions[conversionType].units;
        setFromUnit(units[0]);
        setToUnit(units.length > 1 ? units[1] : units[0]);
        setInputValue('');
        setResult('');
    }, [conversionType]);

    useEffect(() => {
        calculateConversion();
    }, [inputValue, fromUnit, toUnit, conversionType]);

    function convertLogic(value, from, to, type) {
        if (from === to) return value;
        let v = value;

        // Base conversion multipliers dictionary approach for cleaner code where possible
        // Temperature requires specific formulas
        if (type === "temperature") {
            if (from === "Celsius") v = to === "Fahrenheit" ? (value * 9 / 5) + 32 : value + 273.15;
            else if (from === "Fahrenheit") v = to === "Celsius" ? (value - 32) * 5 / 9 : ((value - 32) * 5 / 9) + 273.15;
            else if (from === "Kelvin") v = to === "Celsius" ? value - 273.15 : ((value - 273.15) * 9 / 5) + 32;
            return v;
        }

        // Multipliers to standard base
        const toBase = {
            length: { 'mm': 0.1, 'cm': 1, 'm': 100, 'km': 100000, 'in': 2.54, 'ft': 30.48, 'yd': 91.44, 'mi': 160934, 'nmi': 185200 },
            weight: { 'mg': 0.001, 'g': 1, 'kg': 1000, 't': 1000000, 'oz': 28.3495, 'lb': 453.592, 'st': 6350.29, 'short ton': 907185, 'long ton': 1016047 },
            area: { 'mm²': 0.01, 'cm²': 1, 'm²': 10000, 'ha': 100000000, 'km²': 10000000000, 'in²': 6.4516, 'ft²': 929.0304, 'yd²': 8361.27, 'ac': 40468564.86, 'mi²': 25899881103.36 },
            volume: { 'cm³': 1, 'm³': 1000000, 'L': 1000, 'mL': 1, 'in³': 16.3871, 'ft³': 28316.8, 'gal': 3785.41, 'qt': 946.353, 'pt': 473.176, 'fl oz': 29.5735 },
            speed: { 'km/h': 1, 'm/s': 3.6, 'mph': 1.60934, 'ft/s': 1.09728, 'knots': 1.852 },
            time: { 's': 1, 'ns': 1e-9, 'μs': 1e-6, 'ms': 0.001, 'min': 60, 'hr': 3600, 'day': 86400, 'wk': 604800, 'mo': 2628000, 'yr': 31536000 },
            storage: { 'B': 1, 'b': 0.125, 'KB': 1024, 'MB': 1048576, 'GB': 1073741824, 'TB': 1099511627776, 'PB': 1125899906842624 },
            energy: { 'J': 1, 'kJ': 1000, 'cal': 4.184, 'kcal': 4184, 'Wh': 3600, 'kWh': 3600000, 'BTU': 1055.06 },
            power: { 'W': 1, 'kW': 1000, 'MW': 1000000, 'hp': 745.7, 'ft-lb/s': 1.35582 },
            pressure: { 'Pa': 1, 'kPa': 1000, 'bar': 100000, 'atm': 101325, 'mmHg': 133.322, 'psi': 6894.76 },
            angle: { '°': 1, 'rad': 57.2958, 'grad': 0.9, "'": 1 / 60, "\"": 1 / 3600 },
            dataRate: { 'bps': 1, 'kbps': 1000, 'Mbps': 1000000, 'Gbps': 1000000000, 'B/s': 8 },
            cooking: { 'mL': 1, 'L': 1000, 'tsp': 4.92892, 'tbsp': 14.7868, 'fl oz': 29.5735, 'c': 236.588, 'pt': 473.176, 'qt': 946.353, 'gal': 3785.41 }
        };

        if (type === "fuel") {
            // Inverse relationships
            let lPer100 = value;
            if (from === "mpg") lPer100 = 235.215 / value;
            else if (from === "km/L") lPer100 = 100 / value;

            if (to === "L/100km") return lPer100;
            if (to === "mpg") return 235.215 / lPer100;
            if (to === "km/L") return 100 / lPer100;
        }

        const multipliers = toBase[type];
        if (multipliers && multipliers[from] && multipliers[to]) {
            const baseValue = value * multipliers[from];
            return baseValue / multipliers[to];
        }

        return value;
    }

    const calculateConversion = () => {
        if (!inputValue || isNaN(parseFloat(inputValue))) {
            setResult('');
            return;
        }

        const val = parseFloat(inputValue);
        const res = convertLogic(val, fromUnit, toUnit, conversionType);

        // Format to avoid long decimal trails but keep precision
        if (Math.abs(res) < 0.000001 || Math.abs(res) > 1000000) {
            setResult(res.toExponential(4));
        } else {
            setResult(parseFloat(res.toFixed(6)).toString());
        }
    };

    const swapUnits = () => {
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        setInputValue(result);
    };

    const curDefs = unitDefinitions[conversionType].units;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-violet-500/10 rounded-xl">
                    <RefreshCw className="w-8 h-8 text-violet-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Universal Unit Converter</h1>
                    <p className="text-muted-foreground">Convert physical quantities across 15+ different categories.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-card rounded-2xl p-6 lg:p-8 lg:col-span-2 shadow-sm border border-border/50">
                    <div className="mb-8">
                        <label className="block text-sm font-semibold mb-3 text-foreground/80 uppercase tracking-wider">Measurement Type</label>
                        <select
                            className="w-full px-5 py-3.5 rounded-xl border-2 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 bg-background transition-all font-medium text-lg cursor-pointer"
                            value={conversionType}
                            onChange={(e) => setConversionType(e.target.value)}
                        >
                            {Object.entries(unitDefinitions).map(([key, def]) => (
                                <option key={key} value={key}>{def.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                            <div className="space-y-2">
                                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">From Unit</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 bg-background transition-all cursor-pointer font-medium"
                                    value={fromUnit}
                                    onChange={(e) => setFromUnit(e.target.value)}
                                >
                                    {curDefs.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>

                            <div className="flex justify-center pt-6 pb-2 md:py-0">
                                <button
                                    onClick={swapUnits}
                                    className="p-3 rounded-full hover:bg-violet-500/10 hover:shadow-sm text-violet-500 hover:text-violet-600 transition-all border border-transparent hover:border-violet-200 active:scale-95"
                                    title="Swap Units"
                                >
                                    <ArrowRightLeft className="w-5 h-5 mx-auto" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider">To Unit</label>
                                <select
                                    className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 bg-background transition-all cursor-pointer font-medium"
                                    value={toUnit}
                                    onChange={(e) => setToUnit(e.target.value)}
                                >
                                    {curDefs.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Input Value</label>
                                <input
                                    type="number"
                                    step="any"
                                    className="w-full px-5 py-4 rounded-xl border-2 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 bg-background transition-all font-mono text-xl"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter value..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-medium">Converted Result</label>
                                <div className="w-full px-5 py-4 rounded-xl border-2 border-violet-200 bg-violet-50/50 dark:bg-violet-900/10 dark:border-violet-900/50 font-mono text-xl text-violet-700 dark:text-violet-300 min-h-[64px] flex items-center shadow-inner overflow-x-auto">
                                    {result || <span className="opacity-40 select-none text-base">Type to convert</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-violet-500 shadow-sm border border-border/50">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-violet-600 dark:text-violet-400">
                            <Info className="w-5 h-5 mr-2" /> Real-time Conversion
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            The Universal Unit Converter supports 15 distinct categories of measurement. The results update instantly as you type and change units.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            For highly precise scientific conversions, floating point accuracy to 6 decimal places is preserved, defaulting to exponential notation for massive scales.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
