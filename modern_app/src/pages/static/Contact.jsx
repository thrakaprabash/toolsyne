import React from 'react';
import { Mail, MessageCircle, Instagram } from 'lucide-react';

export default function Contact() {
    const contacts = [
        {
            icon: <Mail className="w-8 h-8 text-blue-500" />,
            title: "Email",
            link: "mailto:tplstlsml@gmail.com",
            text: "tplstlsml@gmail.com",
            color: "group-hover:text-blue-500"
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-green-500" />,
            title: "WhatsApp",
            link: "https://wa.me/+94716043275",
            text: "Chat on WhatsApp",
            color: "group-hover:text-green-500"
        },
        {
            icon: <Instagram className="w-8 h-8 text-pink-500" />,
            title: "Instagram",
            link: "https://instagram.com/prabash_lk",
            text: "@prabash_lk",
            color: "group-hover:text-pink-500"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500 py-8">
            <div className="text-center space-y-4 text-muted-foreground">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Contact ToolSyne</h1>
                <p className="text-xl">Have questions or feedback? Reach out to us through these channels.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {contacts.map((contact, idx) => (
                    <a
                        key={idx}
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group glass-card p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-md"
                    >
                        <div className="p-4 bg-muted rounded-full mb-6 transition-transform group-hover:scale-110">
                            {contact.icon}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{contact.title}</h3>
                        <p className={`font-medium transition-colors ${contact.color}`}>{contact.text}</p>
                    </a>
                ))}
            </div>

            <div className="text-center p-6 bg-muted/50 rounded-xl border border-border/50 text-muted-foreground">
                <p className="italic">
                    For tool suggestions or bug reports, please include details about the issue you're experiencing.
                </p>
            </div>
        </div>
    );
}
