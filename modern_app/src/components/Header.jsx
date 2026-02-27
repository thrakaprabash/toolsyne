import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    {/* Logo placeholder */}
                    <img src="/logo.png" alt="ToolSyne Logo" className="w-8 h-8 rounded-md" />
                    <span className="text-xl font-bold tracking-tight">ToolSyne</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                        More Tools
                    </Link>
                    <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        About Us
                    </Link>
                    <Link to="/contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
