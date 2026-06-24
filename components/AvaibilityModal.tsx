"use client";

import { useState } from "react";

interface AvaibilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    availabilities: { day: string; time: string }[];
    onSave: (slot: { day: string; time: string }) => boolean;
}

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const TIME_SLOTS: string[] = [];
for (let h = 7; h <= 20; h++) {
    const hStr = String(h).padStart(2, "0");
    TIME_SLOTS.push(`${hStr}:00`);
    if (h < 20) {
        TIME_SLOTS.push(`${hStr}:30`);
    }
}

export default function AvaibilityModal({ isOpen, onClose, availabilities, onSave }: AvaibilityModalProps) {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    if (!isOpen) return null;

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday is 0

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSave = () => {
        if (selectedDay && selectedTime) {
            const success = onSave({ day: selectedDay, time: selectedTime });
            if (success) {
                onClose();
                setSelectedDay(null);
                setSelectedTime(null);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className={`bg-[#639] text-white p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4 transition-all duration-300 ease-in-out ${
                selectedDay ? "w-full max-w-[95%] md:max-w-[660px]" : "w-full max-w-[95%] md:max-w-[340px]"
            }`}>

                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="font-black text-sm text-[#fbad18] uppercase tracking-wide">Ajouter une disponibilité</h3>
                    <button type="button" onClick={onClose} aria-label="Fermer la modale" className="text-purple-300 hover:text-white font-bold transition-colors cursor-pointer text-sm">✕</button>
                </div>

                {/* Content wrapper */}
                <div className="flex flex-col md:flex-row gap-5 items-stretch">
                    
                    {/* Left Column: Calendar (Always visible) */}
                    <div className="flex-1 flex flex-col gap-3 min-w-[280px]">
                        <div className="border border-white/10 rounded-xl p-3 bg-purple-950/20">
                            <div className="flex justify-between items-center mb-3">
                                <button
                                    type="button"
                                    disabled={year <= today.getFullYear() && month <= today.getMonth()}
                                    onClick={() => setViewDate(new Date(year, month - 1, 1))}
                                    aria-label="Mois précédent"
                                    className="w-7 h-7 border border-white/10 hover:bg-[#fbad18] hover:text-white hover:border-[#fbad18] rounded-full hover:-translate-y-0.5 active:translate-y-0 text-xs transition-all cursor-pointer text-purple-100 flex items-center justify-center disabled:opacity-30 disabled:cursor-default disabled:transform-none disabled:border-white/5 disabled:hover:bg-transparent"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                    </svg>
                                </button>
                                <span className="font-bold text-xs text-white">{MONTHS[month]} {year}</span>
                                <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} aria-label="Mois suivant" className="w-7 h-7 border border-white/10 hover:bg-[#fbad18] hover:text-white hover:border-[#fbad18] rounded-full hover:-translate-y-0.5 active:translate-y-0 text-xs transition-all cursor-pointer text-purple-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-purple-300 mb-2">
                                {WEEKDAYS.map((wd) => <div key={wd}>{wd}</div>)}
                            </div>

                            <div className="grid grid-cols-7 gap-1.5 justify-items-center">
                                {Array.from({ length: startDayIndex }).map((_, idx) => <div key={`empty-${idx}`} className="w-8 h-8" />)}
                                {Array.from({ length: daysInMonth }).map((_, idx) => {
                                    const dayNum = idx + 1;
                                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                                    const isPast = new Date(year, month, dayNum) < today;
                                    const isNoPreferenceDay = availabilities.some(
                                        (a) => a.day === dateStr && a.time === "Pas de préférence"
                                    );
                                    const isDisabled = isPast || isNoPreferenceDay;

                                    return (
                                        <button
                                            key={dayNum}
                                            type="button"
                                            disabled={isDisabled}
                                            onClick={() => setSelectedDay(dateStr)}
                                            aria-label={`${dayNum} ${MONTHS[month]} ${year}`}
                                            className={`h-8 w-8 text-xs rounded-full flex items-center justify-center transition-all ${isDisabled ? "text-purple-950/60 cursor-default opacity-30" :
                                                    selectedDay === dateStr ? "bg-[#fbad18] text-white font-bold" : "hover:bg-purple-900/50 text-purple-100 cursor-pointer"
                                                }`}
                                        >
                                            {dayNum}
                                        </button>
                                    );
                                })}
                                {Array.from({ length: 42 - (startDayIndex + daysInMonth) }).map((_, idx) => (
                                    <div key={`pad-${idx}`} className="w-8 h-8" />
                                ))}
                            </div>
                        </div>

                        {/* Cancel button at the bottom of Left Column ONLY when no day is selected */}
                        {!selectedDay && (
                            <div className="flex justify-end gap-2.5 pt-3 border-t border-white/10 mt-auto">
                                <button type="button" onClick={onClose} className="px-4 py-2.5 border border-white/10 rounded-full hover:bg-purple-900/50 hover:border-purple-300/30 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 text-purple-100 text-xs font-semibold cursor-pointer transition-all w-full text-center">Annuler</button>
                            </div>
                        )}

                        {/* Jour sélectionné box under the calendar */}
                        {selectedDay && (
                            <div className="text-xs p-3 bg-purple-950/20 border border-white/10 rounded-xl flex flex-col gap-1 mt-auto animate-fade-in shadow-inner">
                                <p className="text-purple-300">Jour sélectionné :</p>
                                <p className="font-bold text-white text-sm">{(() => {
                                    const [y, m, d] = selectedDay.split("-").map(Number);
                                    return `${WEEKDAYS[(new Date(y, m - 1, d).getDay() + 6) % 7]} ${d} ${MONTHS[m - 1]}`;
                                })()}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Time selector (Rendered when selectedDay is set) */}
                    {selectedDay && (
                        <div className="flex-1 flex flex-col gap-4 min-w-[280px] border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5 animate-fade-in">

                             <div className="flex flex-col gap-2 flex-1 min-h-0">
                                <label className="text-xs font-semibold text-purple-200">Choisir un horaire :</label>
                                {(() => {
                                    const hasSpecificHours = selectedDay ? availabilities.some(a => a.day === selectedDay) : false;
                                    return (
                                        <button
                                            type="button"
                                            disabled={hasSpecificHours}
                                            onClick={() => setSelectedTime("Pas de préférence")}
                                            className={`px-3 py-2.5 text-center text-xs font-semibold rounded-full border transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full shrink-0 ${
                                                selectedTime === "Pas de préférence"
                                                    ? "bg-[#fbad18] text-white border-[#fbad18] shadow-md font-bold"
                                                    : "bg-purple-950/20 border-white/10 text-purple-100 hover:border-[#fbad18] hover:bg-[#fbad18]/10 disabled:opacity-30 disabled:cursor-default disabled:transform-none disabled:bg-purple-950/20 disabled:border-white/5 disabled:text-purple-100/30"
                                            }`}
                                        >
                                            Pas de préférence (Toute la journée)
                                        </button>
                                    );
                                })()}
                                <div className="grid grid-cols-3 gap-2 overflow-y-auto max-h-[210px] py-1.5 px-1 pr-1.5 custom-scrollbar">
                                    {TIME_SLOTS.map((time) => {
                                        const isSelected = selectedTime === time;
                                        const isTimeAlreadyAdded = selectedDay ? availabilities.some(a => a.day === selectedDay && a.time === time) : false;
                                        return (
                                            <button
                                                key={time}
                                                type="button"
                                                disabled={isTimeAlreadyAdded}
                                                onClick={() => setSelectedTime(time)}
                                                className={`px-2 py-2 text-center text-xs font-semibold rounded-full border transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                                                    isSelected
                                                        ? "bg-[#fbad18] text-white border-[#fbad18] shadow-md font-bold"
                                                        : "bg-purple-950/20 border-white/10 text-purple-100 hover:border-[#fbad18] hover:bg-[#fbad18]/10 disabled:opacity-30 disabled:cursor-default disabled:transform-none disabled:bg-purple-950/20 disabled:border-white/5 disabled:text-purple-100/30"
                                                }`}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                             <div className="flex justify-between pt-3 border-t border-white/10 mt-auto items-center">
                                <button type="button" onClick={() => { setSelectedDay(null); setSelectedTime(null); }} className="px-5 py-2.5 border border-white/10 rounded-full hover:bg-purple-900/50 hover:border-purple-300/30 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 text-purple-100 text-xs font-semibold cursor-pointer transition-all">Retour</button>
                                <div className="flex gap-2.5">
                                    <button type="button" onClick={onClose} className="px-5 py-2.5 border border-white/10 rounded-full hover:bg-purple-900/50 hover:border-purple-300/30 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 text-purple-100 text-xs font-semibold cursor-pointer transition-all">Annuler</button>
                                    <button type="button" disabled={!selectedTime} onClick={handleSave} className="px-5 py-2.5 bg-[#fbad18] text-white rounded-full hover:bg-[#e2990d] hover:-translate-y-1 hover:shadow-lg active:translate-y-0 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all shadow-md disabled:bg-[#fbad18]/40 disabled:cursor-default disabled:transform-none disabled:shadow-none">Valider</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}
