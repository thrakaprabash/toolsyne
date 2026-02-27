import React from 'react';
import { Info, Smartphone, Lock, UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
    const features = [
        {
            icon: <Info className="w-6 h-6 text-blue-500" />,
            title: "No Math Anxiety",
            description: "From binary conversions to GPA calculations, we make number-crunching painless."
        },
        {
            icon: <Smartphone className="w-6 h-6 text-green-500" />,
            title: "Device Friendly",
            description: "All tools work perfectly on phones, tablets, and computers."
        },
        {
            icon: <Lock className="w-6 h-6 text-purple-500" />,
            title: "Privacy First",
            description: "We don't track you or store your data. What happens in your browser stays in your browser."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 py-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About ToolSyne</h1>
                <p className="text-xl text-muted-foreground">Your Free Online Tool Hub</p>
            </div>

            <div className="glass-card rounded-2xl p-8 shadow-sm border border-border/50 text-lg leading-relaxed">
                <p>
                    ToolSyne was founded in 2025 with a simple mission: to provide <strong className="text-primary font-bold">free, fast, and user-friendly</strong> web tools for students, professionals, and hobbyists. Our growing collection of converters, calculators, and reference tools helps you solve problems without downloading apps or creating accounts.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-xl shadow-sm border border-border/50 hover:-translate-y-1 transition-transform duration-300">
                        <div className="p-3 bg-muted rounded-lg inline-block mb-4">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>

            <div className="glass-card rounded-2xl p-8 shadow-sm border-l-4 border-l-primary bg-primary/5">
                <div className="flex items-center space-x-3 mb-4">
                    <UserRound className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold">One Person, Many Tools</h2>
                </div>
                <div className="space-y-4 text-lg text-foreground/80">
                    <p>
                        ToolSyne is currently a solo project created by a developer who got tired of bookmarking dozens of specialized tool sites. Every tool is personally tested to ensure accuracy and ease of use.
                    </p>
                    <p>
                        Have a tool suggestion? <Link to="/contact" className="text-primary font-semibold hover:underline">Let me know</Link> what you'd like to see added!
                    </p>
                </div>
            </div>
        </div>
    );
}
