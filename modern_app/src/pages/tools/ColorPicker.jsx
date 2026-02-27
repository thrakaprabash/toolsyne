import React, { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';

export default function ColorPicker() {
    const [color, setColor] = useState('#2196F3');
    const [rgb, setRgb] = useState('');
    const [name, setName] = useState('');
    const [copiedHex, setCopiedHex] = useState(false);
    const [copiedRgb, setCopiedRgb] = useState(false);

    useEffect(() => {
        const hex = color;
        const r = parseInt(hex.substr(1, 2), 16) || 0;
        const g = parseInt(hex.substr(3, 2), 16) || 0;
        const b = parseInt(hex.substr(5, 2), 16) || 0;
        setRgb(`rgb(${r}, ${g}, ${b})`);
        setName(getColorName(r, g, b) || 'Custom Color');
    }, [color]);

    const copyToClipboard = async (text, setter) => {
        try {
            await navigator.clipboard.writeText(text);
            setter(true);
            setTimeout(() => setter(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const getColorName = (r, g, b) => {
        const colorMap = {
            "0,0,0": "Black", "255,255,255": "White", "255,0,0": "Red",
            "0,255,0": "Lime", "0,0,255": "Blue", "255,255,0": "Yellow",
            "0,255,255": "Cyan", "255,0,255": "Magenta", "192,192,192": "Silver",
            "128,128,128": "Gray", "128,0,0": "Maroon", "128,128,0": "Olive",
            "0,128,0": "Green", "128,0,128": "Purple", "0,128,128": "Teal", "0,0,128": "Navy"
        };
        return colorMap[`${r},${g},${b}`];
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-pink-500/10 rounded-xl">
                    <Palette className="w-8 h-8 text-pink-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Color Picker</h1>
                    <p className="text-muted-foreground">Select colors and instantly get HEX & RGB formats.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-8 space-y-8 shadow-sm text-center">
                <div className="inline-block relative">
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-32 h-32 rounded-3xl cursor-pointer border-none p-0 opacity-0 absolute inset-0 z-10"
                    />
                    <div
                        className="w-32 h-32 rounded-3xl shadow-lg border-4 border-white dark:border-gray-800 transition-colors duration-200"
                        style={{ backgroundColor: color }}
                    ></div>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                    <div className="bg-background rounded-xl p-4 flex items-center justify-between border shadow-sm">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold text-left">HEX</p>
                            <p className="font-mono text-lg font-bold">{color.toUpperCase()}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(color.toUpperCase(), setCopiedHex)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            {copiedHex ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                        </button>
                    </div>

                    <div className="bg-background rounded-xl p-4 flex items-center justify-between border shadow-sm">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold text-left">RGB</p>
                            <p className="font-mono text-lg font-bold">{rgb}</p>
                        </div>
                        <button
                            onClick={() => copyToClipboard(rgb, setCopiedRgb)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                            {copiedRgb ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
                        </button>
                    </div>

                    <div className="pt-2">
                        <p className="text-sm text-muted-foreground inline-flex items-center px-4 py-2 rounded-full border bg-muted/30">
                            Approximate Name: <span className="font-bold ml-2 text-foreground">{name}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
