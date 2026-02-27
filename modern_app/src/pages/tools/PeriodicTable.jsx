import React, { useState, useMemo } from 'react';
import { Microscope, Search, Info, X } from 'lucide-react';

const elementsData = [
    { number: 1, symbol: "H", name: "Hydrogen", weight: 1.008, category: "nonmetal", x: 1, y: 1 },
    { number: 2, symbol: "He", name: "Helium", weight: 4.0026, category: "noble-gas", x: 18, y: 1 },
    { number: 3, symbol: "Li", name: "Lithium", weight: 6.94, category: "alkali-metal", x: 1, y: 2 },
    { number: 4, symbol: "Be", name: "Beryllium", weight: 9.0122, category: "alkaline-earth", x: 2, y: 2 },
    { number: 5, symbol: "B", name: "Boron", weight: 10.81, category: "metalloid", x: 13, y: 2 },
    { number: 6, symbol: "C", name: "Carbon", weight: 12.011, category: "nonmetal", x: 14, y: 2 },
    { number: 7, symbol: "N", name: "Nitrogen", weight: 14.007, category: "nonmetal", x: 15, y: 2 },
    { number: 8, symbol: "O", name: "Oxygen", weight: 15.999, category: "nonmetal", x: 16, y: 2 },
    { number: 9, symbol: "F", name: "Fluorine", weight: 18.998, category: "halogen", x: 17, y: 2 },
    { number: 10, symbol: "Ne", name: "Neon", weight: 20.180, category: "noble-gas", x: 18, y: 2 },
    { number: 11, symbol: "Na", name: "Sodium", weight: 22.990, category: "alkali-metal", x: 1, y: 3 },
    { number: 12, symbol: "Mg", name: "Magnesium", weight: 24.305, category: "alkaline-earth", x: 2, y: 3 },
    { number: 13, symbol: "Al", name: "Aluminium", weight: 26.982, category: "post-transition-metal", x: 13, y: 3 },
    { number: 14, symbol: "Si", name: "Silicon", weight: 28.085, category: "metalloid", x: 14, y: 3 },
    { number: 15, symbol: "P", name: "Phosphorus", weight: 30.974, category: "nonmetal", x: 15, y: 3 },
    { number: 16, symbol: "S", name: "Sulfur", weight: 32.06, category: "nonmetal", x: 16, y: 3 },
    { number: 17, symbol: "Cl", name: "Chlorine", weight: 35.45, category: "halogen", x: 17, y: 3 },
    { number: 18, symbol: "Ar", name: "Argon", weight: 39.948, category: "noble-gas", x: 18, y: 3 },
    { number: 19, symbol: "K", name: "Potassium", weight: 39.098, category: "alkali-metal", x: 1, y: 4 },
    { number: 20, symbol: "Ca", name: "Calcium", weight: 40.078, category: "alkaline-earth", x: 2, y: 4 },
    { number: 21, symbol: "Sc", name: "Scandium", weight: 44.956, category: "transition-metal", x: 3, y: 4 },
    { number: 22, symbol: "Ti", name: "Titanium", weight: 47.867, category: "transition-metal", x: 4, y: 4 },
    { number: 23, symbol: "V", name: "Vanadium", weight: 50.942, category: "transition-metal", x: 5, y: 4 },
    { number: 24, symbol: "Cr", name: "Chromium", weight: 51.996, category: "transition-metal", x: 6, y: 4 },
    { number: 25, symbol: "Mn", name: "Manganese", weight: 54.938, category: "transition-metal", x: 7, y: 4 },
    { number: 26, symbol: "Fe", name: "Iron", weight: 55.845, category: "transition-metal", x: 8, y: 4 },
    { number: 27, symbol: "Co", name: "Cobalt", weight: 58.933, category: "transition-metal", x: 9, y: 4 },
    { number: 28, symbol: "Ni", name: "Nickel", weight: 58.693, category: "transition-metal", x: 10, y: 4 },
    { number: 29, symbol: "Cu", name: "Copper", weight: 63.546, category: "transition-metal", x: 11, y: 4 },
    { number: 30, symbol: "Zn", name: "Zinc", weight: 65.38, category: "transition-metal", x: 12, y: 4 },
    { number: 31, symbol: "Ga", name: "Gallium", weight: 69.723, category: "post-transition-metal", x: 13, y: 4 },
    { number: 32, symbol: "Ge", name: "Germanium", weight: 72.630, category: "metalloid", x: 14, y: 4 },
    { number: 33, symbol: "As", name: "Arsenic", weight: 74.922, category: "metalloid", x: 15, y: 4 },
    { number: 34, symbol: "Se", name: "Selenium", weight: 78.971, category: "nonmetal", x: 16, y: 4 },
    { number: 35, symbol: "Br", name: "Bromine", weight: 79.904, category: "halogen", x: 17, y: 4 },
    { number: 36, symbol: "Kr", name: "Krypton", weight: 83.798, category: "noble-gas", x: 18, y: 4 },
    { number: 37, symbol: "Rb", name: "Rubidium", weight: 85.468, category: "alkali-metal", x: 1, y: 5 },
    { number: 38, symbol: "Sr", name: "Strontium", weight: 87.62, category: "alkaline-earth", x: 2, y: 5 },
    { number: 39, symbol: "Y", name: "Yttrium", weight: 88.906, category: "transition-metal", x: 3, y: 5 },
    { number: 40, symbol: "Zr", name: "Zirconium", weight: 91.224, category: "transition-metal", x: 4, y: 5 },
    { number: 41, symbol: "Nb", name: "Niobium", weight: 92.906, category: "transition-metal", x: 5, y: 5 },
    { number: 42, symbol: "Mo", name: "Molybdenum", weight: 95.95, category: "transition-metal", x: 6, y: 5 },
    { number: 43, symbol: "Tc", name: "Technetium", weight: 98, category: "transition-metal", x: 7, y: 5 },
    { number: 44, symbol: "Ru", name: "Ruthenium", weight: 101.07, category: "transition-metal", x: 8, y: 5 },
    { number: 45, symbol: "Rh", name: "Rhodium", weight: 102.91, category: "transition-metal", x: 9, y: 5 },
    { number: 46, symbol: "Pd", name: "Palladium", weight: 106.42, category: "transition-metal", x: 10, y: 5 },
    { number: 47, symbol: "Ag", name: "Silver", weight: 107.87, category: "transition-metal", x: 11, y: 5 },
    { number: 48, symbol: "Cd", name: "Cadmium", weight: 112.41, category: "transition-metal", x: 12, y: 5 },
    { number: 49, symbol: "In", name: "Indium", weight: 114.82, category: "post-transition-metal", x: 13, y: 5 },
    { number: 50, symbol: "Sn", name: "Tin", weight: 118.71, category: "post-transition-metal", x: 14, y: 5 },
    { number: 51, symbol: "Sb", name: "Antimony", weight: 121.76, category: "metalloid", x: 15, y: 5 },
    { number: 52, symbol: "Te", name: "Tellurium", weight: 127.60, category: "metalloid", x: 16, y: 5 },
    { number: 53, symbol: "I", name: "Iodine", weight: 126.90, category: "halogen", x: 17, y: 5 },
    { number: 54, symbol: "Xe", name: "Xenon", weight: 131.29, category: "noble-gas", x: 18, y: 5 },
    { number: 55, symbol: "Cs", name: "Caesium", weight: 132.91, category: "alkali-metal", x: 1, y: 6 },
    { number: 56, symbol: "Ba", name: "Barium", weight: 137.33, category: "alkaline-earth", x: 2, y: 6 },
    { number: 57, symbol: "La", name: "Lanthanum", weight: 138.91, category: "lanthanide", x: 3, y: 6 },
    { number: 72, symbol: "Hf", name: "Hafnium", weight: 178.49, category: "transition-metal", x: 4, y: 6 },
    { number: 73, symbol: "Ta", name: "Tantalum", weight: 180.95, category: "transition-metal", x: 5, y: 6 },
    { number: 74, symbol: "W", name: "Tungsten", weight: 183.84, category: "transition-metal", x: 6, y: 6 },
    { number: 75, symbol: "Re", name: "Rhenium", weight: 186.21, category: "transition-metal", x: 7, y: 6 },
    { number: 76, symbol: "Os", name: "Osmium", weight: 190.23, category: "transition-metal", x: 8, y: 6 },
    { number: 77, symbol: "Ir", name: "Iridium", weight: 192.22, category: "transition-metal", x: 9, y: 6 },
    { number: 78, symbol: "Pt", name: "Platinum", weight: 195.08, category: "transition-metal", x: 10, y: 6 },
    { number: 79, symbol: "Au", name: "Gold", weight: 196.97, category: "transition-metal", x: 11, y: 6 },
    { number: 80, symbol: "Hg", name: "Mercury", weight: 200.59, category: "transition-metal", x: 12, y: 6 },
    { number: 81, symbol: "Tl", name: "Thallium", weight: 204.38, category: "post-transition-metal", x: 13, y: 6 },
    { number: 82, symbol: "Pb", name: "Lead", weight: 207.2, category: "post-transition-metal", x: 14, y: 6 },
    { number: 83, symbol: "Bi", name: "Bismuth", weight: 208.98, category: "post-transition-metal", x: 15, y: 6 },
    { number: 84, symbol: "Po", name: "Polonium", weight: 209, category: "post-transition-metal", x: 16, y: 6 },
    { number: 85, symbol: "At", name: "Astatine", weight: 210, category: "halogen", x: 17, y: 6 },
    { number: 86, symbol: "Rn", name: "Radon", weight: 222, category: "noble-gas", x: 18, y: 6 },
    { number: 87, symbol: "Fr", name: "Francium", weight: 223, category: "alkali-metal", x: 1, y: 7 },
    { number: 88, symbol: "Ra", name: "Radium", weight: 226, category: "alkaline-earth", x: 2, y: 7 },
    { number: 89, symbol: "Ac", name: "Actinium", weight: 227, category: "actinide", x: 3, y: 7 },
    { number: 104, symbol: "Rf", name: "Rutherfordium", weight: 267, category: "transition-metal", x: 4, y: 7 },
    { number: 105, symbol: "Db", name: "Dubnium", weight: 268, category: "transition-metal", x: 5, y: 7 },
    { number: 106, symbol: "Sg", name: "Seaborgium", weight: 269, category: "transition-metal", x: 6, y: 7 },
    { number: 107, symbol: "Bh", name: "Bohrium", weight: 270, category: "transition-metal", x: 7, y: 7 },
    { number: 108, symbol: "Hs", name: "Hassium", weight: 277, category: "transition-metal", x: 8, y: 7 },
    { number: 109, symbol: "Mt", name: "Meitnerium", weight: 278, category: "transition-metal", x: 9, y: 7 },
    { number: 110, symbol: "Ds", name: "Darmstadtium", weight: 281, category: "transition-metal", x: 10, y: 7 },
    { number: 111, symbol: "Rg", name: "Roentgenium", weight: 282, category: "transition-metal", x: 11, y: 7 },
    { number: 112, symbol: "Cn", name: "Copernicium", weight: 285, category: "transition-metal", x: 12, y: 7 },
    { number: 113, symbol: "Nh", name: "Nihonium", weight: 286, category: "post-transition-metal", x: 13, y: 7 },
    { number: 114, symbol: "Fl", name: "Flerovium", weight: 289, category: "post-transition-metal", x: 14, y: 7 },
    { number: 115, symbol: "Mc", name: "Moscovium", weight: 290, category: "post-transition-metal", x: 15, y: 7 },
    { number: 116, symbol: "Lv", name: "Livermorium", weight: 293, category: "post-transition-metal", x: 16, y: 7 },
    { number: 117, symbol: "Ts", name: "Tennessine", weight: 294, category: "halogen", x: 17, y: 7 },
    { number: 118, symbol: "Og", name: "Oganesson", weight: 294, category: "noble-gas", x: 18, y: 7 },
    { number: 58, symbol: "Ce", name: "Cerium", weight: 140.12, category: "lanthanide", x: 4, y: 9 },
    { number: 59, symbol: "Pr", name: "Praseodymium", weight: 140.91, category: "lanthanide", x: 5, y: 9 },
    { number: 60, symbol: "Nd", name: "Neodymium", weight: 144.24, category: "lanthanide", x: 6, y: 9 },
    { number: 61, symbol: "Pm", name: "Promethium", weight: 145, category: "lanthanide", x: 7, y: 9 },
    { number: 62, symbol: "Sm", name: "Samarium", weight: 150.36, category: "lanthanide", x: 8, y: 9 },
    { number: 63, symbol: "Eu", name: "Europium", weight: 151.96, category: "lanthanide", x: 9, y: 9 },
    { number: 64, symbol: "Gd", name: "Gadolinium", weight: 157.25, category: "lanthanide", x: 10, y: 9 },
    { number: 65, symbol: "Tb", name: "Terbium", weight: 158.93, category: "lanthanide", x: 11, y: 9 },
    { number: 66, symbol: "Dy", name: "Dysprosium", weight: 162.50, category: "lanthanide", x: 12, y: 9 },
    { number: 67, symbol: "Ho", name: "Holmium", weight: 164.93, category: "lanthanide", x: 13, y: 9 },
    { number: 68, symbol: "Er", name: "Erbium", weight: 167.26, category: "lanthanide", x: 14, y: 9 },
    { number: 69, symbol: "Tm", name: "Thulium", weight: 168.93, category: "lanthanide", x: 15, y: 9 },
    { number: 70, symbol: "Yb", name: "Ytterbium", weight: 173.05, category: "lanthanide", x: 16, y: 9 },
    { number: 71, symbol: "Lu", name: "Lutetium", weight: 174.97, category: "lanthanide", x: 17, y: 9 },
    { number: 90, symbol: "Th", name: "Thorium", weight: 232.04, category: "actinide", x: 4, y: 10 },
    { number: 91, symbol: "Pa", name: "Protactinium", weight: 231.04, category: "actinide", x: 5, y: 10 },
    { number: 92, symbol: "U", name: "Uranium", weight: 238.03, category: "actinide", x: 6, y: 10 },
    { number: 93, symbol: "Np", name: "Neptunium", weight: 237, category: "actinide", x: 7, y: 10 },
    { number: 94, symbol: "Pu", name: "Plutonium", weight: 244, category: "actinide", x: 8, y: 10 },
    { number: 95, symbol: "Am", name: "Americium", weight: 243, category: "actinide", x: 9, y: 10 },
    { number: 96, symbol: "Cm", name: "Curium", weight: 247, category: "actinide", x: 10, y: 10 },
    { number: 97, symbol: "Bk", name: "Berkelium", weight: 247, category: "actinide", x: 11, y: 10 },
    { number: 98, symbol: "Cf", name: "Californium", weight: 251, category: "actinide", x: 12, y: 10 },
    { number: 99, symbol: "Es", name: "Einsteinium", weight: 252, category: "actinide", x: 13, y: 10 },
    { number: 100, symbol: "Fm", name: "Fermium", weight: 257, category: "actinide", x: 14, y: 10 },
    { number: 101, symbol: "Md", name: "Mendelevium", weight: 258, category: "actinide", x: 15, y: 10 },
    { number: 102, symbol: "No", name: "Nobelium", weight: 259, category: "actinide", x: 16, y: 10 },
    { number: 103, symbol: "Lr", name: "Lawrencium", weight: 262, category: "actinide", x: 17, y: 10 }
];

const categoryColors = {
    "alkali-metal": "bg-red-400 dark:bg-red-500/80 text-white",
    "alkaline-earth": "bg-orange-400 dark:bg-orange-500/80 text-white",
    "transition-metal": "bg-amber-300 dark:bg-amber-500/80 text-black dark:text-white",
    "post-transition-metal": "bg-green-300 dark:bg-green-500/80 text-black dark:text-white",
    "metalloid": "bg-teal-300 dark:bg-teal-500/80 text-black dark:text-white",
    "nonmetal": "bg-blue-300 dark:bg-blue-500/80 text-black dark:text-white",
    "halogen": "bg-indigo-300 dark:bg-indigo-500/80 text-black dark:text-white",
    "noble-gas": "bg-purple-300 dark:bg-purple-500/80 text-black dark:text-white",
    "lanthanide": "bg-pink-300 dark:bg-pink-500/80 text-black dark:text-white",
    "actinide": "bg-rose-300 dark:bg-rose-500/80 text-black dark:text-white",
};

export default function PeriodicTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedElement, setSelectedElement] = useState(null);

    const periodGrid = useMemo(() => {
        const grid = Array(10).fill(' ').map(() => Array(18).fill(null));
        elementsData.forEach(el => {
            if (el.y <= 10 && el.x <= 18) {
                grid[el.y - 1][el.x - 1] = el;
            }
        });
        return grid;
    }, []);

    const highlightedElements = useMemo(() => {
        if (!searchQuery && filterCategory === "all") return elementsData.map(e => e.number);

        const lowerQuery = searchQuery.toLowerCase();
        return elementsData.filter(el => {
            const matchesSearch = !searchQuery ||
                el.name.toLowerCase().includes(lowerQuery) ||
                el.symbol.toLowerCase().includes(lowerQuery) ||
                el.number.toString().includes(lowerQuery);
            const matchesFilter = filterCategory === "all" || el.category === filterCategory;
            return matchesSearch && matchesFilter;
        }).map(e => e.number);
    }, [searchQuery, filterCategory]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-xl">
                    <Microscope className="w-8 h-8 text-purple-500" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Interactive Periodic Table</h1>
                    <p className="text-muted-foreground">Click elements to view atomic details, or filter by specific categorizations.</p>
                </div>
            </div>

            <div className="glass-card rounded-2xl p-6 shadow-sm border border-border/50">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, symbol, or atomic number..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 bg-background transition-all"
                        />
                    </div>
                    <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="px-4 py-3 rounded-xl border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 bg-background font-medium md:w-64"
                    >
                        <option value="all">Every Category</option>
                        {Object.keys(categoryColors).map(cat => (
                            <option key={cat} value={cat}>{cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="min-w-[900px]">
                        {periodGrid.map((row, yIdx) => (
                            <div key={`row-${yIdx}`} className={`flex gap-1 mb-1 ${yIdx === 7 ? 'mt-6' : ''}`}>
                                {row.map((cell, xIdx) => {
                                    if (!cell) return <div key={`empty-${xIdx}`} className="w-[4.8%] aspect-square" />;

                                    const isHighlighted = highlightedElements.includes(cell.number);
                                    const bgColor = isHighlighted ? categoryColors[cell.category] : 'bg-muted/30 text-muted-foreground dark:bg-muted/10 opacity-40';

                                    return (
                                        <button
                                            key={cell.number}
                                            onClick={() => setSelectedElement(cell)}
                                            className={`w-[4.8%] aspect-square rounded-md p-1 flex flex-col items-center justify-center transition-all duration-200 hover:scale-[1.15] hover:z-10 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 ${bgColor} ${isHighlighted ? 'shadow-sm' : 'grayscale'}`}
                                            title={cell.name}
                                        >
                                            <span className="text-[0.55rem] font-medium block leading-none w-full text-left ml-1 opacity-80">{cell.number}</span>
                                            <span className="text-sm sm:text-lg font-bold block leading-none mt-1">{cell.symbol}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs font-medium border-t pt-6">
                    {Object.entries(categoryColors).map(([cat, colorClass]) => (
                        <div key={cat} className="flex items-center gap-2">
                            <span className={`w-4 h-4 rounded-sm ${colorClass}`}></span>
                            <span className="text-muted-foreground capitalize">{cat.replace(/-/g, ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>

            {selectedElement && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-background rounded-2xl shadow-2xl border w-full max-w-sm overflow-hidden animate-in slide-in-from-bottom-4">
                        <div className={`p-8 flex items-center justify-center ${categoryColors[selectedElement.category]}`}>
                            <div className="text-center text-white">
                                <div className="text-5xl font-bold mb-2">{selectedElement.symbol}</div>
                                <div className="text-2xl opacity-90">{selectedElement.name}</div>
                            </div>
                            <button
                                onClick={() => setSelectedElement(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/30 text-white rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Atomic Number</span>
                                <span className="font-bold">{selectedElement.number}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Atomic Weight</span>
                                <span className="font-bold">{selectedElement.weight} <span className="text-xs font-normal">u</span></span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Category</span>
                                <span className="font-bold capitalize">{selectedElement.category.replace(/-/g, ' ')}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground">Group / Period</span>
                                <span className="font-bold">{selectedElement.x} / {selectedElement.y <= 7 ? selectedElement.y : '-'}</span>
                            </div>

                            <a
                                href={`https://en.wikipedia.org/wiki/${selectedElement.name === 'Aluminium' ? 'Aluminium' : selectedElement.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mt-4 flex items-center justify-center space-x-2 py-3 bg-muted hover:bg-muted/80 rounded-xl transition-colors font-medium text-sm"
                            >
                                <Info className="w-4 h-4" />
                                <span>Wikipedia Reference</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
