"use client";

import { useState } from "react";
import AvaibilityModal from "../components/AvaibilityModal";
import { createContact } from "./actions";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilities, setAvailabilities] = useState<{ day: string; time: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastState, setToastState] = useState<"idle" | "showing" | "hiding">("idle");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const getReadableAvailability = (slot: { day: string; time: string }) => {
    const [y, m, d] = slot.day.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekdays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const dayName = weekdays[dateObj.getDay()];
    const formattedDate = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    if (slot.time === "Pas de préférence") {
      return `${dayName} ${formattedDate} (Pas de préférence)`;
    }
    return `${dayName} ${formattedDate} à ${slot.time}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setToastState("idle");
    setToastMessage(null);

    const formData = new FormData(form);
    const res = await createContact(formData);
    setIsSubmitting(false);

    if (res.success) {
      setAvailabilities([]);
      form.reset();
      setToastType("success");
      setToastMessage("Votre message a bien été envoyé et enregistré !");
      setToastState("showing");
      setTimeout(() => {
        setToastState("hiding");
      }, 4000);
      setTimeout(() => {
        setToastState("idle");
      }, 4400);
    } else {
      setToastType("error");
      setToastMessage(res.error || "Une erreur est survenue.");
      setToastState("showing");
      setTimeout(() => {
        setToastState("hiding");
      }, 4000);
      setTimeout(() => {
        setToastState("idle");
      }, 4400);
    }
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 bg-white ">

      {/* Form with purple bg */}
      <div className="relative flex w-[95%] sm:w-[90%] min-h-100 items-start overflow-hidden rounded-3xl p-6 sm:p-12 md:p-16 bg-[#639] shadow-2xl border border-purple-400/20">

        <form onSubmit={handleSubmit} method="POST" className="flex flex-col z-1 w-full text-white"> {/* Form  */}

          <h2 className="pb-10 text-3xl uppercase font-black">Contacter l'agence</h2> {/* Form title */}



          <div className="flex flex-col lg:flex-row items-stretch justify-between w-full gap-10 lg:gap-16"> {/* Form content both sides */}

            <div className="flex flex-col gap-10 w-full lg:w-[48%]"> {/* Left Side of form */}

              <fieldset className="w-full">
                {/* Informations */}

                <legend className="pb-6 text-xl font-black text-[#fbad18] uppercase tracking-wider">Vos informations</legend>

                <div className="flex flex-col gap-5 w-full">

                  <div className="flex gap-6 pl-1 mb-1"> {/* Title selector */}

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="m" name="civilite" value="M." required className="cursor-pointer" />
                      <label htmlFor="m" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">M.</label>
                    </div>

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="mme" name="civilite" value="Mme" required className="cursor-pointer" />
                      <label htmlFor="mme" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Mme</label>
                    </div>

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="other" name="civilite" value="Mx" required className="cursor-pointer" />
                      <label htmlFor="other" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Mx</label>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 w-full"> {/* FirstName and Lastname */}
                    <input type="text" name="nom" placeholder="Nom" className="bg-purple-900/30 focus:bg-purple-950/50 border border-purple-800/60 focus:border-[#fbad18] text-white rounded-2xl px-5 py-3.5 focus:outline-none transition-all placeholder-purple-200/40 text-sm flex-1 w-full" required />
                    <input type="text" name="prenom" placeholder="Prénom" className="bg-purple-900/30 focus:bg-purple-950/50 border border-purple-800/60 focus:border-[#fbad18] text-white rounded-2xl px-5 py-3.5 focus:outline-none transition-all placeholder-purple-200/40 text-sm flex-1 w-full" required />
                  </div>

                  {/* Email and Phone */}
                  <input type="email" name="email" placeholder="Adresse mail" className="bg-purple-900/30 focus:bg-purple-950/50 border border-purple-800/60 focus:border-[#fbad18] text-white rounded-2xl px-5 py-3.5 focus:outline-none transition-all placeholder-purple-200/40 text-sm w-full" required />
                  <input type="tel" name="telephone" placeholder="Téléphone" className="bg-purple-900/30 focus:bg-purple-950/50 border border-purple-800/60 focus:border-[#fbad18] text-white rounded-2xl px-5 py-3.5 focus:outline-none transition-all placeholder-purple-200/40 text-sm w-full" />

                </div>

              </fieldset>

              <fieldset className="w-full">
                {/* Availabilities */}

                <legend className="pb-6 text-xl font-black text-[#fbad18] uppercase tracking-wider">Disponibilités pour une visite</legend>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 min-h-[50px] w-full"> {/* Button with avaibilities */}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="bg-[#fbad18] text-white rounded-full px-8 py-3.5 w-full sm:w-auto cursor-pointer hover:bg-[#e2990d] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] active:translate-y-0 transition-all text-sm font-bold uppercase tracking-wider shrink-0 shadow-md">
                    Ajouter une disponibilité
                  </button>

                  {availabilities.length > 0 && (
                    <div className="max-h-[48px] overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-2 w-full sm:min-w-[250px] mt-1">
                      {availabilities.map((slot, index) => (
                        <div key={index} className="p-3 bg-purple-900/40 rounded-xl flex items-center justify-between text-purple-100 text-xs font-medium gap-4 border border-purple-800/60 shadow-inner animate-fade-in">
                          <span>{getReadableAvailability(slot)}</span>
                          <button
                            type="button"
                            onClick={() => setAvailabilities(availabilities.filter((_, i) => i !== index))}
                            className="text-purple-300 hover:text-red-400 font-bold cursor-pointer transition-colors text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <input type="hidden" name="availabilities" value={JSON.stringify(availabilities)} />
                </div>

              </fieldset>
            </div>

            <div className="flex flex-col gap-10 w-full lg:w-[48%]"> {/* Right Side of form */}

              <fieldset className="w-full">
                {/* Message */}

                <legend className="pb-6 text-xl font-black text-[#fbad18] uppercase tracking-wider">Votre message</legend>

                <div className="flex flex-col gap-5">

                  <div className="flex flex-wrap gap-6 pl-1 mb-1"> {/* Reason selector  */}

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="visit" name="reason" value="visite" required className="cursor-pointer" />
                      <label htmlFor="visit" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Demande de visite</label>
                    </div>

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="photos" name="reason" value="photos" required className="cursor-pointer" />
                      <label htmlFor="photos" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Demande de plus de photos</label>
                    </div>

                    <div className="flex items-center gap-2.5 cursor-pointer group">
                      <input type="radio" id="other_reason" name="reason" value="autre" required className="cursor-pointer" />
                      <label htmlFor="other_reason" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Autre</label>
                    </div>

                  </div>

                  <div className="flex items-center gap-2.5 cursor-pointer group py-1 pl-1"> {/* checkbox recall  */}
                    <input type="checkbox" id="contact_tel" name="contact" value="true" className="cursor-pointer" />
                    <label htmlFor="contact_tel" className="text-sm font-medium text-purple-100 group-hover:text-white cursor-pointer transition-colors">Être recontacté par téléphone</label>
                  </div>

                  {/* text area  */}
                  <textarea name="message" placeholder="Message" maxLength={500} className="bg-purple-900/30 focus:bg-purple-950/50 border border-purple-800/60 focus:border-[#fbad18] text-white rounded-2xl px-5 py-3.5 h-32 custom-scrollbar resize-none w-full focus:outline-none transition-all placeholder-purple-200/40 text-sm" required />

                </div>

              </fieldset>

              {/* Sumbit button  */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#fbad18] hover:bg-[#e2990d] hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] active:translate-y-0 disabled:bg-[#fbad18]/40 disabled:cursor-default disabled:transform-none text-white text-base font-bold rounded-full px-12 py-4 cursor-pointer transition-all w-full sm:w-auto sm:ml-auto lg:mt-auto mt-6 uppercase tracking-wider shadow-md"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>

          </div>

        </form>

      </div>


      <AvaibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        availabilities={availabilities}
        onSave={(slot) => {
          // Safeguards (UI prevents these, but kept for logic safety)
          const hasNoPreference = availabilities.some(
            (a) => a.day === slot.day && a.time === "Pas de préférence"
          );
          if (hasNoPreference) return false;

          if (slot.time === "Pas de préférence") {
            const hasSpecificTimes = availabilities.some((a) => a.day === slot.day);
            if (hasSpecificTimes) return false;
          }

          const exists = availabilities.some((a) => a.day === slot.day && a.time === slot.time);
          if (exists) return false;

          setAvailabilities((prev) => [...prev, slot]);
          return true;
        }}
      />

      {toastState !== "idle" && toastMessage && (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
          <div
            className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl border shadow-2xl backdrop-blur-md font-semibold text-sm max-w-md w-full sm:w-auto ${
              toastType === "success"
                ? "bg-purple-950/90 text-purple-100 border-purple-800"
                : "bg-red-950/95 text-red-100 border-red-800/80"
            } ${
              toastState === "showing" ? "animate-slide-up" : "animate-slide-down"
            }`}
          >
            {toastType === "success" ? (
              <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastState("hiding")}
              className={`ml-auto pl-2 cursor-pointer transition-colors ${
                toastType === "success" ? "text-purple-300 hover:text-white" : "text-red-300 hover:text-white"
              }`}
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

