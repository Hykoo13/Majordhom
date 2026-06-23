"use client";

import { useState } from "react";

interface AvaibilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (slot: { day: string; time: string }) => boolean;
}

const MONTHS = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export default function AvaibilityModal({ isOpen, onClose, onSave }: AvaibilityModalProps) {
    const [step, setStep] = useState(1);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedHour, setSelectedHour] = useState("09");
    const [selectedMin, setSelectedMin] = useState("00");

    if (!isOpen) return null;

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday is 0

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSave = () => {
        if (selectedDay) {
            const success = onSave({ day: selectedDay, time: `${selectedHour}:${selectedMin}` });
            if (success) {
                onClose();
                setStep(1);
                setSelectedDay(null);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-[320px] bg-white text-black p-4 rounded-lg border border-gray-300 shadow-lg flex flex-col gap-4">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-2">
                    <h3 className="font-bold text-sm">Ajouter une disponibilité</h3>
                    <button type="button" onClick={onClose} className="text-gray-500 font-bold hover:text-black">✕</button>
                </div>

                {/* Step 1: Calendar */}
                {step === 1 && (
                    <div className="flex flex-col gap-3">
                        <div className="border border-gray-200 rounded p-2">
                            <div className="flex justify-between items-center mb-2">
                                <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))} className="px-2 py-0.5 border rounded text-xs">&lt;</button>
                                <span className="font-bold text-xs">{MONTHS[month]} {year}</span>
                                <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))} className="px-2 py-0.5 border rounded text-xs">&gt;</button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-gray-500 mb-1">
                                {WEEKDAYS.map((wd) => <div key={wd}>{wd}</div>)}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {Array.from({ length: startDayIndex }).map((_, idx) => <div key={`empty-${idx}`} />)}
                                {Array.from({ length: daysInMonth }).map((_, idx) => {
                                    const dayNum = idx + 1;
                                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                                    const isPast = new Date(year, month, dayNum) < today;

                                    return (
                                        <button
                                            key={dayNum}
                                            type="button"
                                            disabled={isPast}
                                            onClick={() => setSelectedDay(dateStr)}
                                            className={`h-7 w-7 text-xs rounded-full flex items-center justify-center transition-all ${isPast ? "text-gray-300 cursor-not-allowed" :
                                                    selectedDay === dateStr ? "bg-purple-900 text-white font-bold" : "hover:bg-gray-100 text-gray-800"
                                                }`}
                                        >
                                            {dayNum}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t">
                            <button type="button" onClick={onClose} className="px-3 py-1 border rounded hover:bg-gray-100 text-xs">Annuler</button>
                            <button type="button" onClick={() => selectedDay ? setStep(2) : alert("Sélectionnez un jour.")} className="px-3 py-1 bg-purple-900 text-white rounded hover:bg-purple-600 transition-colors text-xs">Suivant</button>
                        </div>
                    </div>
                )}

                {/* Step 2: Hours */}
                {step === 2 && selectedDay && (
                    <div className="flex flex-col gap-3">
                        <div className="text-xs">
                            <p className="text-gray-500">Jour sélectionné :</p>
                            <p className="font-bold">{(() => {
                                const [y, m, d] = selectedDay.split("-").map(Number);
                                return `${WEEKDAYS[(new Date(y, m - 1, d).getDay() + 6) % 7]} ${d} ${MONTHS[m - 1]}`;
                            })()}</p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold">Définir l'horaire :</label>
                            <div className="flex items-center gap-1.5">
                                <select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} className="border rounded p-1 text-xs bg-white text-black flex-1">
                                    {Array.from({ length: 14 }).map((_, i) => {
                                        const hStr = String(i + 7).padStart(2, "0");
                                        return <option key={hStr} value={hStr}>{hStr} h</option>;
                                    })}
                                </select>
                                <span className="text-xs font-semibold">:</span>
                                <select value={selectedMin} onChange={(e) => setSelectedMin(e.target.value)} className="border rounded p-1 text-xs bg-white text-black flex-1">
                                    {["00", "10", "20", "30", "40", "50"].map((m) => (
                                        <option key={m} value={m}>{m} min</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-between pt-2 border-t">
                            <button type="button" onClick={() => setStep(1)} className="px-3 py-1 border rounded hover:bg-gray-100 text-xs">Retour</button>
                            <div className="flex gap-2">
                                <button type="button" onClick={onClose} className="px-3 py-1 border rounded hover:bg-gray-100 text-xs">Annuler</button>
                                <button type="button" onClick={handleSave} className="px-3 py-1 bg-purple-900 text-white rounded hover:bg-purple-600 transition-colors text-xs">Valider</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
