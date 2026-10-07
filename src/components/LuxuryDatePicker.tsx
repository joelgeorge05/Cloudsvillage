import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LuxuryDatePickerProps {
    name?: string;
    label: string;
    value: string; // YYYY-MM-DD
    onChange: (dateStr: string) => void;
    minDate?: string; // YYYY-MM-DD
    placeholder?: string;
    variant?: 'form' | 'booking-bar';
    position?: 'top' | 'bottom';
}

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const LuxuryDatePicker: React.FC<LuxuryDatePickerProps> = ({
    name,
    label,
    value,
    onChange,
    minDate,
    placeholder = 'Select date',
    variant = 'form',
    position = variant === 'booking-bar' ? 'top' : 'bottom'
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial view based on value or today
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const initialDate = value ? new Date(value) : today;
    const [viewYear, setViewYear] = useState(initialDate.getFullYear());
    const [viewMonth, setViewMonth] = useState(initialDate.getMonth());

    // Sync view year/month when value changes externally
    useEffect(() => {
        if (value) {
            const d = new Date(value);
            if (!isNaN(d.getTime())) {
                setViewYear(d.getFullYear());
                setViewMonth(d.getMonth());
            }
        }
    }, [value]);

    // Handle outside click and Escape key
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

    const prevMonth = () => {
        if (viewMonth === 0) {
            setViewMonth(11);
            setViewYear(v => v - 1);
        } else {
            setViewMonth(v => v - 1);
        }
    };

    const nextMonth = () => {
        if (viewMonth === 11) {
            setViewMonth(0);
            setViewYear(v => v + 1);
        } else {
            setViewMonth(v => v + 1);
        }
    };

    // Days calculation
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay();
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate();

    // Format display string
    const formatDisplay = (val: string) => {
        if (!val) return '';
        const [y, m, d] = val.split('-').map(Number);
        if (!y || !m || !d) return val;
        const dateObj = new Date(y, m - 1, d);
        if (isNaN(dateObj.getTime())) return val;

        if (variant === 'booking-bar') {
            return dateObj.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }

        return dateObj.toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleSelectDay = (day: number) => {
        const formatted = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onChange(formatted);
        setIsOpen(false);
    };

    const handleSelectToday = () => {
        onChange(todayStr);
        setViewYear(today.getFullYear());
        setViewMonth(today.getMonth());
        setIsOpen(false);
    };

    const handleClear = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        onChange('');
    };

    const renderCalendarPopup = () => (
        <div 
            className={`absolute left-0 right-0 sm:left-auto sm:right-auto sm:w-80 ${
                position === 'top' ? 'bottom-full mb-3' : 'top-full mt-2'
            } z-50 rounded-2xl bg-[#090F22]/98 backdrop-blur-2xl border border-brand-cyan/30 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(0,180,216,0.18)] p-4 select-none`}
        >
            {/* Month / Year Navigator */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]">
                <button
                    type="button"
                    onClick={prevMonth}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand-cyan/15 border border-white/10 hover:border-brand-cyan/40 flex items-center justify-center text-white/70 hover:text-brand-cyan transition-colors cursor-pointer"
                >
                    <ChevronLeft size={16} />
                </button>

                <div className="text-center">
                    <span 
                        className="text-sm font-medium text-white tracking-wide"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        {MONTH_NAMES[viewMonth]}
                    </span>
                    <span className="text-xs text-white/50 ml-1.5 font-light">
                        {viewYear}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={nextMonth}
                    className="w-8 h-8 rounded-lg bg-white/[0.04] hover:bg-brand-cyan/15 border border-white/10 hover:border-brand-cyan/40 flex items-center justify-center text-white/70 hover:text-brand-cyan transition-colors cursor-pointer"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* Day Names Row */}
            <div className="grid grid-cols-7 gap-1 mb-1 text-center">
                {DAYS_OF_WEEK.map((d, idx) => (
                    <div 
                        key={d} 
                        className={`text-[11px] font-semibold tracking-wider uppercase py-1 ${idx === 0 || idx === 6 ? 'text-brand-cyan/80' : 'text-white/40'}`}
                    >
                        {d}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 text-center">
                {/* Days from previous month */}
                {Array.from({ length: firstDayIndex }).map((_, i) => {
                    const prevDayNum = prevMonthDays - firstDayIndex + i + 1;
                    return (
                        <div
                            key={`prev-${i}`}
                            className="h-8 flex items-center justify-center text-xs text-white/15 cursor-default"
                        >
                            {prevDayNum}
                        </div>
                    );
                })}

                {/* Current month days */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const currentStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                    const isSelected = value === currentStr;
                    const isToday = todayStr === currentStr;
                    const isDisabled = minDate ? currentStr < minDate : false;

                    return (
                        <button
                            key={`day-${dayNum}`}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => handleSelectDay(dayNum)}
                            className={`h-8 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer relative ${
                                isSelected
                                    ? 'bg-gradient-to-r from-brand-cyan to-brand-cyan-light text-[#070B19] font-bold shadow-[0_0_12px_rgba(45,212,191,0.5)] scale-105 z-10'
                                    : isDisabled
                                        ? 'text-white/20 cursor-not-allowed hover:bg-transparent'
                                        : 'text-white/80 hover:bg-brand-cyan/15 hover:text-brand-cyan hover:scale-105'
                            }`}
                        >
                            <span>{dayNum}</span>
                            {isToday && !isSelected && (
                                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-brand-cyan" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Footer Quick Selection */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.08] text-xs">
                <button
                    type="button"
                    onClick={() => handleClear()}
                    className="text-white/50 hover:text-white transition-colors cursor-pointer font-light"
                >
                    Clear
                </button>
                <button
                    type="button"
                    onClick={handleSelectToday}
                    className="text-brand-cyan hover:text-brand-cyan-light font-medium transition-colors cursor-pointer"
                >
                    Select Today
                </button>
            </div>
        </div>
    );

    // ── Variant: Booking Bar ──
    if (variant === 'booking-bar') {
        return (
            <div className="relative w-full" ref={containerRef}>
                {name && <input type="hidden" name={name} value={value} />}
                
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-[64px] flex flex-col justify-center px-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border ${
                        isOpen 
                            ? 'border-brand-cyan ring-1 ring-brand-cyan/40 shadow-[0_0_20px_rgba(45,212,191,0.2)]' 
                            : 'border-white/10 hover:border-brand-cyan/40'
                    } text-left transition-all duration-300 cursor-pointer shadow-sm group`}
                    aria-label={`Select ${label}`}
                >
                    <span 
                        className="text-[10px] uppercase tracking-[0.22em] text-brand-cyan font-semibold flex items-center gap-1.5 mb-1"
                        style={{ fontFamily: "var(--font-nav)" }}
                    >
                        <CalendarIcon size={11} className="text-brand-cyan/80" /> {label}
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm tracking-wide">
                            {value ? formatDisplay(value) : (placeholder || 'Select Date')}
                        </span>
                        <CalendarIcon 
                            size={14} 
                            className={`transition-colors shrink-0 ${
                                isOpen ? 'text-brand-cyan' : 'text-brand-cyan/50 group-hover:text-brand-cyan'
                            }`} 
                        />
                    </div>
                </button>

                {isOpen && renderCalendarPopup()}
            </div>
        );
    }

    // ── Variant: Form ──
    return (
        <div className="flex flex-col gap-2 relative w-full" ref={containerRef}>
            <label className="text-xs text-white/70 font-medium">
                {label}
            </label>
            {name && <input type="hidden" name={name} value={value} />}

            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-[#070B19] border ${
                    isOpen 
                        ? 'border-brand-cyan ring-1 ring-brand-cyan/40 shadow-[0_0_20px_rgba(45,212,191,0.15)]' 
                        : 'border-white/15 hover:border-white/30'
                } rounded-xl py-3 px-4 text-sm text-left flex items-center justify-between transition-all cursor-pointer`}
            >
                <div className="flex items-center gap-2.5 truncate">
                    <CalendarIcon size={16} className={value ? "text-brand-cyan" : "text-white/40"} />
                    {value ? (
                        <span className="text-white font-medium truncate">
                            {formatDisplay(value)}
                        </span>
                    ) : (
                        <span className="text-white/35 font-light">
                            {placeholder}
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    {value && (
                        <div
                            onClick={handleClear}
                            title="Clear date"
                            className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        >
                            <X size={13} />
                        </div>
                    )}
                </div>
            </button>

            {/* Custom Luxury Calendar Popup */}
            {isOpen && renderCalendarPopup()}
        </div>
    );
};
