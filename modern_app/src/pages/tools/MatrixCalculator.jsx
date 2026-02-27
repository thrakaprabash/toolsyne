import React, { useState, useEffect } from 'react';
import { Grid3X3, Plus, X as MultiplyIcon, ArrowRightLeft } from 'lucide-react';

const initializeMatrix = (rows, cols) => {
    return Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (r === c ? 1 : 0))
    );
};

export default function MatrixCalculator() {
    const [operation, setOperation] = useState('add');
    const [dimA, setDimA] = useState({ rows: 2, cols: 2 });
    const [dimB, setDimB] = useState({ rows: 2, cols: 2 });
    const [matrixA, setMatrixA] = useState(initializeMatrix(2, 2));
    const [matrixB, setMatrixB] = useState(initializeMatrix(2, 2));
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setMatrixA(initializeMatrix(dimA.rows, dimA.cols));
    }, [dimA.rows, dimA.cols]);

    useEffect(() => {
        setMatrixB(initializeMatrix(dimB.rows, dimB.cols));
    }, [dimB.rows, dimB.cols]);

    const handleCellChange = (matrix, setMatrix, r, c, val) => {
        const value = val === '' ? 0 : parseFloat(val);
        const newMatrix = [...matrix];
        newMatrix[r] = [...newMatrix[r]];
        newMatrix[r][c] = value;
        setMatrix(newMatrix);
    };

    const formatNumber = (value) => {
        if (typeof value !== 'number' || isNaN(value)) return 'Err';
        if (Math.abs(value) < 1e-9) value = 0;
        return Number.isInteger(value) ? value.toString() : parseFloat(value.toFixed(4)).toString();
    };

    const addMatrices = (a, b) => {
        if (a.length !== b.length || a[0].length !== b[0].length) {
            throw new Error("Matrices must have the same dimensions for addition.");
        }
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    };

    const multiplyMatrices = (a, b) => {
        if (a[0].length !== b.length) {
            throw new Error("Columns of Matrix A must equal rows of Matrix B for multiplication.");
        }
        const res = Array(a.length).fill().map(() => Array(b[0].length).fill(0));
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b[0].length; j++) {
                for (let k = 0; k < a[0].length; k++) {
                    res[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return res;
    };

    const transposeMatrix = (matrix) => {
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    };

    const inverseMatrix = (matrix) => {
        const n = matrix.length;
        if (n !== matrix[0].length) throw new Error("Matrix must be square to calculate inverse.");

        let augmented = matrix.map((row, i) => {
            let augRow = [...row];
            for (let j = 0; j < n; j++) augRow.push(i === j ? 1 : 0);
            return augRow;
        });

        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) maxRow = k;
            }
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

            const pivot = augmented[i][i];
            if (Math.abs(pivot) < 1e-9) throw new Error("Matrix is singular and cannot be inverted.");

            for (let j = i; j < 2 * n; j++) augmented[i][j] /= pivot;

            for (let k = 0; k < n; k++) {
                if (k !== i) {
                    const factor = augmented[k][i];
                    for (let j = i; j < 2 * n; j++) augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
        return augmented.map(row => row.slice(n));
    };

    const calculate = () => {
        setError('');
        setResult(null);
        try {
            let res;
            switch (operation) {
                case 'add': res = addMatrices(matrixA, matrixB); break;
                case 'multiply': res = multiplyMatrices(matrixA, matrixB); break;
                case 'inverse': res = inverseMatrix(matrixA); break;
                case 'transpose': res = transposeMatrix(matrixA); break;
            }
            setResult(res);
        } catch (err) {
            setError(err.message);
        }
    };

    const renderMatrixInput = (title, dim, setDim, matrix, setMatrix) => (
        <div className="space-y-4">
            <h3 className="font-semibold text-center text-foreground/80 uppercase tracking-wider text-sm">{title}</h3>
            <div className="flex justify-center items-center gap-2">
                <input
                    type="number" min="1" max="10"
                    className="w-16 px-2 py-1.5 text-center rounded-lg border bg-background"
                    value={dim.rows} onChange={(e) => setDim({ ...dim, rows: parseInt(e.target.value) || 1 })}
                />
                <span className="text-muted-foreground font-bold">×</span>
                <input
                    type="number" min="1" max="10"
                    className="w-16 px-2 py-1.5 text-center rounded-lg border bg-background"
                    value={dim.cols} onChange={(e) => setDim({ ...dim, cols: parseInt(e.target.value) || 1 })}
                />
            </div>
            <div className="overflow-x-auto p-2">
                <div className="inline-grid gap-1.5" style={{ gridTemplateColumns: `repeat(${dim.cols}, minmax(3rem, 1fr))` }}>
                    {matrix.map((row, r) => row.map((val, c) => (
                        <input
                            key={`${r}-${c}`}
                            type="number" step="any"
                            className="w-14 sm:w-16 h-10 px-1 text-center font-mono rounded-md border focus:border-indigo-500 bg-background"
                            value={val}
                            onChange={(e) => handleCellChange(matrix, setMatrix, r, c, e.target.value)}
                        />
                    )))}
                </div>
            </div>
        </div>
    );

    const requiresTwoMatrices = operation === 'add' || operation === 'multiply';

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <Grid3X3 className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Matrix Calculator</h1>
                    <p className="text-muted-foreground">Perform matrix addition, multiplication, inverse, and transpose.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 md:p-8 space-y-8 shadow-sm border border-border/50">

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-muted rounded-xl w-full max-w-2xl mx-auto">
                    {[
                        { id: 'add', label: 'Addition', icon: <Plus className="w-4 h-4 mr-1" /> },
                        { id: 'multiply', label: 'Multiplication', icon: <MultiplyIcon className="w-4 h-4 mr-1" /> },
                        { id: 'inverse', label: 'Inverse (A)', icon: <ArrowRightLeft className="w-4 h-4 mr-1" /> },
                        { id: 'transpose', label: 'Transpose (A)', icon: <Grid3X3 className="w-4 h-4 mr-1" /> },
                    ].map(op => (
                        <button
                            key={op.id}
                            onClick={() => { setOperation(op.id); setResult(null); setError(''); }}
                            className={`flex justify-center items-center py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${operation === op.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {op.icon} <span className="hidden sm:inline">{op.label}</span><span className="sm:hidden">{op.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
                    {renderMatrixInput('Matrix A', dimA, setDimA, matrixA, setMatrixA)}
                    {requiresTwoMatrices && (
                        <>
                            <div className="self-center hidden md:block text-2xl font-bold text-muted-foreground">
                                {operation === 'add' ? '+' : '×'}
                            </div>
                            {renderMatrixInput('Matrix B', dimB, setDimB, matrixB, setMatrixB)}
                        </>
                    )}
                </div>

                {error && <p className="text-center text-red-500 font-medium">{error}</p>}

                <div className="flex justify-center pt-2">
                    <button
                        onClick={calculate}
                        className="w-full max-w-xs bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
                    >
                        Calculate Result
                    </button>
                </div>

                {result && (
                    <div className="pt-6 border-t animate-in slide-in-from-bottom-2">
                        <h3 className="text-center font-bold text-lg mb-4 text-indigo-600 dark:text-indigo-400">Result Matrix</h3>
                        <div className="flex justify-center overflow-x-auto pb-4">
                            <div className="inline-grid gap-1 sm:gap-2 p-4 bg-indigo-50 dark:bg-indigo-900/10 border-2 border-indigo-100 dark:border-indigo-900/50 rounded-xl"
                                style={{ gridTemplateColumns: `repeat(${result[0].length}, minmax(4rem, 1fr))` }}>
                                {result.map((row, i) => row.map((val, j) => (
                                    <div key={`${i}-${j}`} className="flex items-center justify-center p-2 min-h-12 bg-background border rounded-lg font-mono font-medium shadow-sm">
                                        {formatNumber(val)}
                                    </div>
                                )))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
