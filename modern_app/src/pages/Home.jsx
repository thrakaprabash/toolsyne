import React from 'react';
import { Link } from 'react-router-dom';
import { Binary, Calculator, BookOpen, User, PieChart } from 'lucide-react';

export default function Home() {
    const categories = [
        {
            title: "Number & Base Converters",
            icon: <Binary className="w-6 h-6 text-blue-500" />,
            color: "border-t-blue-500",
            tools: [
                { name: "Base Converter (All-in-One)", path: "/tools/base-converter", highlight: true },
                { name: "Decimal to Roman", path: "/tools/roman-converter", highlight: true },
            ]
        },
        {
            title: "Finance & Calculators",
            icon: <PieChart className="w-6 h-6 text-emerald-500" />,
            color: "border-t-emerald-500",
            tools: [
                { name: "Loan EMI Calculator", path: "/tools/loan-emi-calculator", highlight: true },
                { name: "Investor Calculator", path: "/tools/investor-calculator", highlight: true },
            ]
        },
        {
            title: "Math & Utility Calculators",
            icon: <Calculator className="w-6 h-6 text-green-500" />,
            color: "border-t-green-500",
            tools: [
                { name: "Percentage Calculator", path: "/tools/percentage-calculator", highlight: true },
                { name: "Grade Calculator", path: "/tools/grade-calculator", highlight: true },
                { name: "GPA Calculator", path: "/tools/gpa-calculator", highlight: true },
                { name: "Scientific Calculator", path: "/tools/scientific-calculator", highlight: true },
                { name: "Matrix Calculator", path: "/tools/matrix-calculator", highlight: true },
                { name: "Unit Converter", path: "/tools/unit-converter", highlight: true },
                { name: "LCM & GCD Calculator", path: "/tools/lcm-gcd-calculator", highlight: true },
            ]
        },
        {
            title: "Educational & Reference Tools",
            icon: <BookOpen className="w-6 h-6 text-purple-500" />,
            color: "border-t-purple-500",
            tools: [
                { name: "Periodic Table", path: "/tools/periodic-table", highlight: true },
                { name: "Algebra Solver", path: "/tools/algebra-solver", highlight: true },
                { name: "Physics Formula Solver", path: "/tools/physics-solver", highlight: true },
            ]
        },
        {
            title: "Personal & Fun Tools",
            icon: <User className="w-6 h-6 text-fuchsia-500" />,
            color: "border-t-fuchsia-500",
            tools: [
                { name: "Age Calculator", path: "/tools/age-calculator", highlight: true },
                { name: "BMI Calculator", path: "/tools/bmi-calculator", highlight: true },
                { name: "Zodiac Sign Calculator", path: "/tools/zodiac-calculator", highlight: true },
                { name: "Color Picker", path: "/tools/color-picker", highlight: true },
            ]
        }
    ];

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto py-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    Welcome to <span className="text-primary">ToolSyne</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                    Your free, fast, and user-friendly tool hub for everyday tasks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {categories.map((category, idx) => (
                    <div key={idx} className={`glass-card p-6 rounded-2xl border-t-4 ${category.color} flex flex-col h-full hover:-translate-y-1 transition-transform duration-300`}>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                {category.icon}
                            </div>
                            <h2 className="text-xl font-semibold tracking-tight">{category.title}</h2>
                        </div>

                        <ul className="space-y-3 flex-1 flex flex-col">
                            {category.tools.map((tool, toolIdx) => (
                                <li key={toolIdx} className="w-full">
                                    <Link
                                        to={tool.path}
                                        className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-200 border border-transparent shadow-sm ${tool.highlight
                                            ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white"
                                            : "bg-white/40 dark:bg-gray-800/40 hover:bg-primary/5 hover:border-primary/20 dark:hover:bg-gray-700/50"
                                            }`}
                                    >
                                        <span className="font-medium">{tool.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
