import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full border-t bg-background py-6 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center md:text-left">
                    &copy; {new Date().getFullYear()} ToolSyne. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <Link to="/terms" className="hover:text-foreground transition-colors">Terms & Conditions</Link>
                    <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                    <Link to="/disclaimer" className="hover:text-foreground transition-colors">Disclaimer</Link>
                </div>
            </div>
        </footer>
    );
}
