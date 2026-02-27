import React from 'react';
import { ScrollText, ShieldCheck, AlertTriangle } from 'lucide-react';

const contentMap = {
    terms: {
        title: "Terms and Conditions",
        icon: <ScrollText className="w-8 h-8 text-primary" />,
        date: "June 17, 2025",
        sections: [
            { t: "Acceptance of Terms", p: "Your use of this website constitutes your acceptance of these terms. If you do not agree, please refrain from using our services." },
            { t: "Use of Tools", p: "The tools provided on ToolSyne, including calculators and converters, are intended for personal, non-commercial use only. You may not reproduce, distribute, or modify any tool or content without our written permission." },
            { t: "User Conduct", p: "You agree not to use this website for any unlawful purpose or to transmit harmful content. We reserve the right to restrict access if misuse is detected." },
            { t: "Limitation of Liability", p: "ToolSyne is provided \"as is\" without warranties of any kind. We are not liable for any direct, indirect, or consequential damages arising from the use of our tools or website." },
            { t: "Changes to Terms", p: "We may update these terms at our discretion. Continued use of the website after changes indicates your acceptance of the revised terms. The latest version will be available here." }
        ]
    },
    privacy: {
        title: "Privacy Policy",
        icon: <ShieldCheck className="w-8 h-8 text-success" />,
        date: "June 17, 2025",
        sections: [
            { t: "1. No Data Collection", p: "ToolSyne is a completely client-side application. We do not have user accounts, do not store personal information, do not use databases, and do not use tracking cookies. All calculations happen in your browser and are immediately discarded." },
            { t: "2. Server Logs", p: "Like all websites, our hosting provider may retain standard anonymized server logs (IP, browser type, date/time). These logs are deleted automatically and only used for security." },
            { t: "3. Third-Party Services", p: "We do not integrate with third-party services that collect data. No ads, no analytics trackers, and no external CDNs." },
            { t: "4. Your Privacy", p: "We believe privacy is a fundamental right. Our tools work completely in your browser and leave no traces of your calculations." },
            { t: "5. Changes to This Policy", p: "If we ever change our data practices, we'll update this policy and clearly notify users." }
        ]
    },
    disclaimer: {
        title: "Disclaimer",
        icon: <AlertTriangle className="w-8 h-8 text-warning" />,
        date: "June 17, 2025",
        sections: [
            { t: "1. Tool Accuracy", p: "While we strive for accuracy, ToolSyne provides all tools \"as is\" without warranties. Results should be verified for critical applications, and we don't guarantee 100% mathematical accuracy." },
            { t: "2. No Professional Advice", p: "Our tools are for general information only. They are not a substitute for professional medical, financial, or engineering advice. Consult qualified professionals for important decisions." },
            { t: "3. No Liability", p: "By using ToolSyne, you agree we're not liable for any losses from tool usage. You use all tools at your own risk." },
            { t: "4. External Links", p: "If we link to external sites, we don't control their content or imply endorsement. External sites have their own policies." },
            { t: "5. Changes to Tools", p: "We may modify or discontinue tools, change algorithms, or update conversion standards without notice." }
        ]
    }
};

export default function Legal({ type }) {
    const data = contentMap[type];

    if (!data) return <div className="text-center p-12">Legal content not found.</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between glass-card p-6 md:p-8 rounded-2xl border border-border/50">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <div className="p-3 bg-muted rounded-xl">
                        {data.icon}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
                        <p className="text-muted-foreground mt-1">Last Updated: <span className="font-medium text-foreground/80">{data.date}</span></p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {data.sections.map((section, idx) => (
                    <div
                        key={idx}
                        className="glass-card p-6 rounded-xl border-l-4 border-l-primary hover:border-l-primary/80 transition-colors shadow-sm bg-card hover:bg-card/80"
                    >
                        <h2 className="text-xl font-semibold mb-3 text-primary">{section.t}</h2>
                        <p className="text-muted-foreground leading-relaxed">{section.p}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
