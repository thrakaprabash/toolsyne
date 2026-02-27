import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}
