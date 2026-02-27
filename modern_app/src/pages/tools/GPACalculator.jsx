import React, { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

// --- Pure Logic Functions ---
const gpaGradeMap = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "F": 0.0
};

export function calculateGPA(courses) {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const c of courses) {
        const cred = parseFloat(c.credits);
        if (isNaN(cred) || cred <= 0) return { error: 'Credits must be greater than 0.' };

        const gradeStr = c.grade.trim().toUpperCase();
        let gradePoint = 0;

        if (!isNaN(parseFloat(gradeStr)) && /^[0-9]+(\.[0-9]+)?$/.test(gradeStr)) {
            const numeric = parseFloat(gradeStr);
            if (numeric <= 5.0) {
                // If the user enters a direct GPA point value (e.g., 3.5, 4.0, 2.0)
                gradePoint = numeric;
            }
            else if (numeric >= 97) gradePoint = 4.0;
            else if (numeric >= 93) gradePoint = 4.0;
            else if (numeric >= 90) gradePoint = 3.7;
            else if (numeric >= 87) gradePoint = 3.3;
            else if (numeric >= 83) gradePoint = 3.0;
            else if (numeric >= 80) gradePoint = 2.7;
            else if (numeric >= 77) gradePoint = 2.3;
            else if (numeric >= 73) gradePoint = 2.0;
            else if (numeric >= 70) gradePoint = 1.7;
            else if (numeric >= 67) gradePoint = 1.3;
            else if (numeric >= 60) gradePoint = 1.0;
            else gradePoint = 0.0;
        } else {
            if (gpaGradeMap[gradeStr] === undefined) {
                return { error: `Invalid grade: ${gradeStr}. Use A-F or percentages.` };
            }
            gradePoint = gpaGradeMap[gradeStr];
        }

        totalPoints += cred * gradePoint;
        totalCredits += cred;
    }

    if (totalCredits === 0) return null;
    return { gpa: totalPoints / totalCredits, totalCredits };
}

export function convertCGPAtoGPA(cgpa, scale) {
    if (isNaN(cgpa) || cgpa < 0 || cgpa > scale) return null;
    return (cgpa / scale) * 4;
}

export function calculateCGPAFromGPAList(gpasStr) {
    const gpas = gpasStr.split(',').map(g => parseFloat(g.trim()));
    if (gpas.length === 0 || gpas.some(g => isNaN(g) || g < 0 || g > 4)) return null;

    const sum = gpas.reduce((a, b) => a + b, 0);
    return sum / gpas.length;
}

// --- React Component ---
export default function GPACalculator() {
    const [activeTab, setActiveTab] = useState('gpa'); // 'gpa' | 'cgpa'

    // GPA State
    const [courses, setCourses] = useState([
        { id: 1, name: '', credits: '3', grade: '' },
        { id: 2, name: '', credits: '3', grade: '' },
        { id: 3, name: '', credits: '3', grade: '' }
    ]);
    const [gpaResult, setGpaResult] = useState(null);

    // CGPA State
    const [cgpaInput, setCgpaInput] = useState('');
    const [cgpaScale, setCgpaScale] = useState(10);
    const [cgpaToGpaResult, setCgpaToGpaResult] = useState(null);

    const [gpaListInput, setGpaListInput] = useState('');
    const [gpaListResult, setGpaListResult] = useState(null);

    // --- Handlers ---
    const handleCourseChange = (id, field, value) => {
        setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
        setGpaResult(null);
    };

    const addCourse = () => {
        if (courses.length >= 15) return;
        setCourses([...courses, { id: Date.now(), name: '', credits: '3', grade: '' }]);
    };

    const removeCourse = (id) => {
        if (courses.length <= 1) return;
        setCourses(courses.filter(c => c.id !== id));
        setGpaResult(null);
    };

    const handleCalculateGPA = (e) => {
        e.preventDefault();
        setGpaResult(calculateGPA(courses));
    };

    const handleConvertCGPA = () => {
        const val = convertCGPAtoGPA(parseFloat(cgpaInput), cgpaScale);
        setCgpaToGpaResult(val !== null ? val : 'error');
    };

    const handleCalculateCGPAList = () => {
        const val = calculateCGPAFromGPAList(gpaListInput);
        setGpaListResult(val !== null ? val : 'error');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                    <GraduationCap className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">GPA Calculator & Converter</h1>
                    <p className="text-muted-foreground">Calculate semester GPA or convert CGPA scales.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex w-full overflow-hidden rounded-xl border bg-muted/40 p-1 mb-6">
                <button
                    onClick={() => setActiveTab('gpa')}
                    className={`flex-1 flex justify-center py-2.5 text-sm font-medium transition-all rounded-lg ${activeTab === 'gpa' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                >
                    GPA Calculator
                </button>
                <button
                    onClick={() => setActiveTab('cgpa')}
                    className={`flex-1 flex justify-center py-2.5 text-sm font-medium transition-all rounded-lg ${activeTab === 'cgpa' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                >
                    CGPA Converter
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">

                    {activeTab === 'gpa' && (
                        <div className="glass-card p-6 rounded-2xl animate-in slide-in-from-left-4 duration-300">
                            <form onSubmit={handleCalculateGPA} className="space-y-6">

                                <div className="space-y-3">
                                    <div className="hidden sm:grid grid-cols-12 gap-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        <div className="col-span-5">Course (Optional)</div>
                                        <div className="col-span-3">Credits</div>
                                        <div className="col-span-3">Grade</div>
                                        <div className="col-span-1"></div>
                                    </div>

                                    {courses.map((course, idx) => (
                                        <div key={course.id} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-4 sm:p-2 rounded-xl border bg-background/50 group">

                                            <div className="sm:col-span-5 w-full">
                                                <input
                                                    type="text"
                                                    placeholder={`Course ${idx + 1}`}
                                                    value={course.name}
                                                    onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-md border text-sm focus:ring-1 focus:ring-purple-500 transition-all bg-background"
                                                />
                                            </div>

                                            <div className="sm:col-span-3 w-full flex items-center gap-2">
                                                <span className="sm:hidden text-xs text-muted-foreground font-medium w-16">Credits:</span>
                                                <input
                                                    type="number"
                                                    required
                                                    min="0.5"
                                                    max="10"
                                                    step="0.5"
                                                    value={course.credits}
                                                    onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-md border text-sm focus:ring-1 focus:ring-purple-500 transition-all bg-background"
                                                />
                                            </div>

                                            <div className="sm:col-span-3 w-full flex items-center gap-2">
                                                <span className="sm:hidden text-xs text-muted-foreground font-medium w-16">Grade:</span>
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="A or 95"
                                                    value={course.grade}
                                                    onChange={(e) => handleCourseChange(course.id, 'grade', e.target.value)}
                                                    className="w-full px-3 py-2 rounded-md border text-sm focus:ring-1 focus:ring-purple-500 transition-all bg-background uppercase placeholder-normal"
                                                />
                                            </div>

                                            <div className="sm:col-span-1 w-full flex justify-end">
                                                {courses.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeCourse(course.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md transition-colors sm:opacity-0 sm:group-hover:opacity-100 focus:opacity-100"
                                                        title="Remove"
                                                    >
                                                        &times;
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={addCourse}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:hover:bg-purple-500/20 transition-colors"
                                    >
                                        + Add Course
                                    </button>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-6 text-white font-semibold rounded-xl bg-purple-500 hover:bg-purple-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Calculate GPA
                                </button>
                            </form>

                            {gpaResult && (
                                <div className="mt-8 pt-6 border-t animate-in fade-in duration-300">
                                    {gpaResult.error ? (
                                        <div className="p-4 rounded-xl bg-red-100 text-red-700 border border-red-200">
                                            {gpaResult.error}
                                        </div>
                                    ) : (
                                        <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 text-center">
                                            <p className="text-sm font-medium uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">Your Semester GPA</p>
                                            <div className="text-5xl font-extrabold text-purple-700 dark:text-purple-300">
                                                {gpaResult.gpa.toFixed(2)}
                                            </div>
                                            <p className="text-sm text-muted-foreground mt-2 font-medium">Out of 4.0 scale</p>
                                            <p className="text-xs text-muted-foreground mt-1">Total Credits: {gpaResult.totalCredits}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'cgpa' && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="font-semibold text-lg mb-4">Convert CGPA to standard GPA</h3>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="Enter CGPA"
                                        value={cgpaInput}
                                        onChange={e => setCgpaInput(e.target.value)}
                                        className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 bg-background"
                                    />
                                    <select
                                        className="px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 bg-background font-medium"
                                        value={cgpaScale}
                                        onChange={e => setCgpaScale(Number(e.target.value))}
                                    >
                                        <option value={4}>Out of 4.0</option>
                                        <option value={5}>Out of 5.0</option>
                                        <option value={10}>Out of 10.0</option>
                                    </select>
                                    <button
                                        onClick={handleConvertCGPA}
                                        className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
                                    >
                                        Convert
                                    </button>
                                </div>
                                {cgpaToGpaResult !== null && (
                                    <div className="mt-4 p-4 rounded-xl bg-muted/50 text-center font-medium">
                                        {cgpaToGpaResult === 'error' ? 'Invalid Input' : `Equivalent GPA: ${cgpaToGpaResult.toFixed(2)} / 4.0`}
                                    </div>
                                )}
                            </div>

                            <div className="glass-card p-6 rounded-2xl">
                                <h3 className="font-semibold text-lg mb-4">Calculate CGPA from prior GPAs</h3>
                                <p className="text-sm text-muted-foreground mb-3">Enter past semester GPAs separated by commas.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="e.g. 3.5, 3.8, 4.0"
                                        value={gpaListInput}
                                        onChange={e => setGpaListInput(e.target.value)}
                                        className="flex-1 px-4 py-3 rounded-lg border focus:ring-2 focus:ring-purple-500 bg-background"
                                    />
                                    <button
                                        onClick={handleCalculateCGPAList}
                                        className="px-6 py-3 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors whitespace-nowrap"
                                    >
                                        Get CGPA
                                    </button>
                                </div>
                                {gpaListResult !== null && (
                                    <div className="mt-4 p-4 rounded-xl bg-muted/50 text-center font-medium">
                                        {gpaListResult === 'error' ? 'Invalid GPA list. Use numbers between 0 and 4.' : `Overall CGPA: ${gpaListResult.toFixed(2)}`}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-6 bg-muted/30 border-t-4 border-t-purple-500">
                        <h3 className="font-semibold text-lg mb-4 flex items-center text-purple-600 dark:text-purple-400">
                            <BookOpen className="w-5 h-5 mr-2" /> Grading Scale
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                            <div className="flex justify-between border-b pb-1"><span>A+ / A</span><span className="font-medium text-foreground">4.0</span></div>
                            <div className="flex justify-between border-b pb-1"><span>A-</span><span className="font-medium text-foreground">3.7</span></div>
                            <div className="flex justify-between border-b pb-1"><span>B+</span><span className="font-medium text-foreground">3.3</span></div>
                            <div className="flex justify-between border-b pb-1"><span>B</span><span className="font-medium text-foreground">3.0</span></div>
                            <div className="flex justify-between border-b pb-1"><span>B-</span><span className="font-medium text-foreground">2.7</span></div>
                            <div className="flex justify-between border-b pb-1"><span>C+</span><span className="font-medium text-foreground">2.3</span></div>
                            <div className="flex justify-between border-b pb-1"><span>C</span><span className="font-medium text-foreground">2.0</span></div>
                            <div className="flex justify-between border-b pb-1"><span>C-</span><span className="font-medium text-foreground">1.7</span></div>
                            <div className="flex justify-between pb-1"><span>D+, D</span><span className="font-medium text-foreground">1.3 - 1.0</span></div>
                            <div className="flex justify-between pb-1"><span>F</span><span className="font-medium text-foreground">0.0</span></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
