import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface LuxurySelectOption {
    value: string;
    label: string;
    desc?: string;
    badge?: string;
}

interface LuxurySelectProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    options: LuxurySelectOption[];
    name?: string;
    placeholder?: string;
    accentColor?: 'gold' | 'cyan';
}

export const LuxurySelect: React.FC<LuxurySelectProps> = ({
    label,
    value,
    onChange,
    options,
    name,
    placeholder = 'Select option',
    accentColor = 'gold'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const isGold = accentColor === 'gold';
    const activeBorderClass = isGold
        ? 'border-[#C5A880] ring-1 ring-[#C5A880]/40 shadow-[0_0_20px_rgba(197,168,128,0.18)]'
        : 'border-brand-cyan ring-1 ring-brand-cyan/40 shadow-[0_0_20px_rgba(45,212,191,0.18)]';

    const activeItemClass = isGold
        ? 'bg-[#C5A880]/15 text-[#F3E5AB]'
        : 'bg-brand-cyan/15 text-brand-cyan';

    const checkColorClass = isGold ? 'text-[#C5A880]' : 'text-brand-cyan';
    const chevronColorClass = isGold ? 'text-[#C5A880]' : 'text-brand-cyan';

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const selectedOption = options.find((opt) => opt.value === value) || options[0];

    return (
        <div className="flex flex-col gap-1.5 relative w-full" ref={containerRef}>
            <label className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">
                {label}
            </label>
            {name && <input type="hidden" name={name} value={value} />}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white/[0.03] border ${
                    isOpen ? activeBorderClass : 'border-white/10 hover:border-white/20'
                } rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all cursor-pointer`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="text-white font-normal truncate">
                    {selectedOption?.label || placeholder}
                </span>
                <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? `rotate-180 ${chevronColorClass}` : 'text-white/40'
                    }`}
                />
            </button>

            {/* Custom Luxury Dropdown Menu */}
            {isOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl bg-[#0B101D]/98 backdrop-blur-2xl border border-white/15 shadow-[0_16px_50px_rgba(0,0,0,0.85)] py-1.5 overflow-hidden divide-y divide-white/[0.04]">
                    {options.map((opt) => {
                        const isSelected = opt.value === value;
                        return (
                            <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors cursor-pointer group ${
                                    isSelected
                                        ? activeItemClass
                                        : 'hover:bg-white/[0.06] text-white/80 hover:text-white'
                                }`}
                            >
                                <div className="flex flex-col min-w-0 pr-3">
                                    <span className={`text-sm ${isSelected ? 'font-medium' : 'font-normal group-hover:text-white'}`}>
                                        {opt.label}
                                    </span>
                                    {opt.desc && (
                                        <span className="text-[11px] text-white/40 font-light leading-tight mt-0.5">
                                            {opt.desc}
                                        </span>
                                    )}
                                </div>

                                {isSelected && (
                                    <Check size={16} className={`${checkColorClass} shrink-0`} />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
