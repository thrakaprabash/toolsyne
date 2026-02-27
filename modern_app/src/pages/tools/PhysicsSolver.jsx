import React, { useState, useMemo } from 'react';
import { Atom } from 'lucide-react';

const constants = {
    coulombConstant: 8.99e9,
    planckConstant: 6.63e-34,
    speedOfLight: 3e8,
};

const formulas = {
    // Mechanics
    speed: { title: "Speed", eq: "v = d / t", args: [{ id: 'd', label: "Distance", unit: "m" }, { id: 't', label: "Time", unit: "s" }], solve: (v) => v.d / v.t },
    velocity: { title: "Velocity", eq: "v = Δx / Δt", args: [{ id: 'x', label: "Displacement", unit: "m" }, { id: 't', label: "Time", unit: "s" }], solve: (v) => v.x / v.t },
    acceleration: { title: "Acceleration", eq: "a = (v₂ - v₁) / t", args: [{ id: 'v1', label: "Initial Velocity", unit: "m/s" }, { id: 'v2', label: "Final Velocity", unit: "m/s" }, { id: 't', label: "Time", unit: "s" }], solve: (v) => (v.v2 - v.v1) / v.t },
    kineticEnergy: { title: "Kinetic Energy", eq: "K = ½mv²", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'v', label: "Velocity", unit: "m/s" }], solve: (v) => 0.5 * v.m * Math.pow(v.v, 2) },
    potentialEnergy: { title: "Gravitational Potential Energy", eq: "U = mgh", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'g', label: "Gravity", unit: "m/s²", default: 9.81 }, { id: 'h', label: "Height", unit: "m" }], solve: (v) => v.m * v.g * v.h },
    momentum: { title: "Momentum", eq: "p = mv", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'v', label: "Velocity", unit: "m/s" }], solve: (v) => v.m * v.v },
    force: { title: "Newton's 2nd Law", eq: "F = ma", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'a', label: "Acceleration", unit: "m/s²" }], solve: (v) => v.m * v.a },
    work: { title: "Work", eq: "W = Fd cos(θ)", args: [{ id: 'F', label: "Force", unit: "N" }, { id: 'd', label: "Distance", unit: "m" }, { id: 'theta', label: "Angle", unit: "°" }], solve: (v) => v.F * v.d * Math.cos(v.theta * Math.PI / 180) },
    power: { title: "Power", eq: "P = W / t", args: [{ id: 'W', label: "Work", unit: "J" }, { id: 't', label: "Time", unit: "s" }], solve: (v) => v.W / v.t },
    pressure: { title: "Pressure", eq: "P = F / A", args: [{ id: 'F', label: "Force", unit: "N" }, { id: 'A', label: "Area", unit: "m²" }], solve: (v) => v.F / v.A },
    centripetal: { title: "Centripetal Force", eq: "F = mv² / r", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'v', label: "Velocity", unit: "m/s" }, { id: 'r', label: "Radius", unit: "m" }], solve: (v) => v.m * Math.pow(v.v, 2) / v.r },
    torque: { title: "Torque", eq: "τ = rF sin(θ)", args: [{ id: 'r', label: "Distance", unit: "m" }, { id: 'F', label: "Force", unit: "N" }, { id: 'theta', label: "Angle", unit: "°" }], solve: (v) => v.r * v.F * Math.sin(v.theta * Math.PI / 180) },
    springPE: { title: "Spring Potential Energy", eq: "U = ½kx²", args: [{ id: 'k', label: "Spring Constant", unit: "N/m" }, { id: 'x', label: "Displacement", unit: "m" }], solve: (v) => 0.5 * v.k * Math.pow(v.x, 2) },

    // Thermodynamics
    heat: { title: "Heat Energy", eq: "Q = mcΔT", args: [{ id: 'm', label: "Mass", unit: "kg" }, { id: 'c', label: "Specific Heat", unit: "J/(kg·K)" }, { id: 'dT', label: "Temperature Change", unit: "K" }], solve: (v) => v.m * v.c * v.dT },
    efficiency: { title: "Efficiency", eq: "η = (W_out / Q_in) × 100", args: [{ id: 'Wout', label: "Work Output", unit: "J" }, { id: 'Qin', label: "Heat Input", unit: "J" }], solve: (v) => (v.Wout / v.Qin) * 100 },

    // Electromagnetism
    coulombsLaw: { title: "Coulomb's Law", eq: "F = k|q₁q₂| / r²", args: [{ id: 'q1', label: "Charge 1", unit: "C" }, { id: 'q2', label: "Charge 2", unit: "C" }, { id: 'r', label: "Distance", unit: "m" }], solve: (v) => constants.coulombConstant * Math.abs(v.q1 * v.q2) / Math.pow(v.r, 2) },
    ohmsLaw: { title: "Ohm's Law", eq: "V = IR", args: [{ id: 'I', label: "Current", unit: "A" }, { id: 'R', label: "Resistance", unit: "Ω" }], solve: (v) => v.I * v.R },
    powerElec: { title: "Electrical Power", eq: "P = IV", args: [{ id: 'I', label: "Current", unit: "A" }, { id: 'V', label: "Voltage", unit: "V" }], solve: (v) => v.I * v.V },
    capacitance: { title: "Capacitance", eq: "C = Q / V", args: [{ id: 'Q', label: "Charge", unit: "C" }, { id: 'V', label: "Voltage", unit: "V" }], solve: (v) => v.Q / v.V },

    // Waves & Modern Physics
    waveSpeed: { title: "Wave Speed", eq: "v = fλ", args: [{ id: 'f', label: "Frequency", unit: "Hz" }, { id: 'lambda', label: "Wavelength", unit: "m" }], solve: (v) => v.f * v.lambda },
    energyMass: { title: "Mass-Energy Equivalence", eq: "E = mc²", args: [{ id: 'm', label: "Mass", unit: "kg" }], solve: (v) => v.m * Math.pow(constants.speedOfLight, 2) },
    photoelectric: { title: "Photon Energy", eq: "E = hf", args: [{ id: 'f', label: "Frequency", unit: "Hz" }], solve: (v) => constants.planckConstant * v.f },
};

export default function PhysicsSolver() {
    const [selectedId, setSelectedId] = useState('speed');
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    const activeFormula = formulas[selectedId];

    // Initialize defaults on change
    React.useEffect(() => {
        const defaultVals = {};
        activeFormula.args.forEach(arg => {
            if (arg.default !== undefined) {
                defaultVals[arg.id] = arg.default;
            } else {
                defaultVals[arg.id] = '';
            }
        });
        setInputs(defaultVals);
        setResult(null);
    }, [selectedId, activeFormula]);

    const handleSolve = () => {
        const parsedVals = {};
        let hasError = false;

        for (const arg of activeFormula.args) {
            const val = parseFloat(inputs[arg.id]);
            if (isNaN(val)) {
                hasError = true;
                break;
            }
            parsedVals[arg.id] = val;
        }

        if (hasError) {
            setResult({ error: "Please enter valid numbers for all fields." });
        } else {
            try {
                const ans = activeFormula.solve(parsedVals);
                if (!isFinite(ans)) throw new Error("Calculation resulted in Infinity or NaN (check divisions by zero).");
                setResult({ value: ans });
            } catch (err) {
                setResult({ error: err.message });
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <Atom className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Physics Solver</h1>
                    <p className="text-muted-foreground">Analytically solve 20+ core physics mechanics and equations.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm border border-border/50">
                <div className="space-y-4">
                    <label className="block text-sm font-semibold uppercase tracking-wider text-muted-foreground">Select Formula</label>
                    <select
                        className="w-full px-5 py-3.5 rounded-xl border focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 bg-background transition-all font-medium text-lg cursor-pointer"
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                    >
                        {Object.entries(formulas).map(([id, formula]) => (
                            <option key={id} value={id}>{formula.title} ({formula.eq})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                    {activeFormula.args.map((arg) => (
                        <div key={arg.id} className="space-y-2">
                            <label className="block text-sm font-medium text-foreground/80 flex justify-between">
                                <span>{arg.label}</span>
                                <span className="text-muted-foreground bg-muted/50 px-2 py-0.5 rounded text-xs">{arg.unit}</span>
                            </label>
                            <input
                                type="number"
                                step="any"
                                value={inputs[arg.id] !== undefined ? inputs[arg.id] : ''}
                                onChange={(e) => setInputs({ ...inputs, [arg.id]: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-background transition-all font-mono"
                                placeholder={`Enter ${arg.label}`}
                            />
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSolve}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                    Compute Result
                </button>

                {result && (
                    <div className="pt-4">
                        {result.error ? (
                            <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-900 text-sm font-medium">
                                {result.error}
                            </div>
                        ) : (
                            <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 shadow-inner flex flex-col items-center justify-center space-y-2">
                                <p className="text-sm font-semibold text-blue-600/80 dark:text-blue-400/80 uppercase tracking-widest">Calculated Output</p>
                                <p className="font-mono text-3xl font-bold text-blue-700 dark:text-blue-300">
                                    {(result.value > 1000000 || (result.value > 0 && result.value < 0.001))
                                        ? result.value.toExponential(4)
                                        : Number.isInteger(result.value) ? result.value : result.value.toFixed(4)}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
