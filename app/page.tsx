"use client";

import Image from "next/image";
import { useState } from "react";
import AvaibilityModal from "../components/AvaibilityModal";
import { createContact } from "./actions";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilities, setAvailabilities] = useState<{ day: string; time: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [toastState, setToastState] = useState<"idle" | "showing" | "hiding">("idle");

  const getReadableAvailability = (slot: { day: string; time: string }) => {
    const [y, m, d] = slot.day.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekdays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const dayName = weekdays[dateObj.getDay()];
    const formattedDate = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    return `${dayName} ${formattedDate} à ${slot.time}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(form);
    const res = await createContact(formData);
    setIsSubmitting(false);

    if (res.success) {
      setSuccess(true);
      setAvailabilities([]);
      form.reset();
      setToastState("showing");
      setTimeout(() => {
        setToastState("hiding");
      }, 4000);
      setTimeout(() => {
        setToastState("idle");
      }, 4400);
    } else {
      setError(res.error || "Une erreur est survenue.");
    }
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 bg-white ">

      {/* Form with image bg */}
      <div className="relative flex w-[95%] sm:w-[90%] min-h-100 items-start overflow-hidden rounded-3xl p-6 sm:p-12 md:p-16">

        <form onSubmit={handleSubmit} method="POST" className="flex flex-col z-1 w-full text-white"> {/* Form  */}

          <h2 className="pb-10 text-3xl uppercase font-bold">Contacter l'agence</h2> {/* Form title */}

          {error && (
            <div className="mb-6 p-4 bg-red-900/80 text-red-100 border border-red-700 rounded-2xl font-semibold text-sm">
              ✕ {error}
            </div>
          )}

          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8"> {/* Form content both sides */}

            <div className="flex flex-col gap-8 w-full lg:w-[48%]"> {/* Left Side of form */}

              <fieldset className="w-full">
                {/* Informations */}

                <legend className="pb-4 text-xl uppercase font-bold">Vos informations</legend> {/* Title */}

                <div className="flex flex-col gap-3 w-full">

                  <div className="flex gap-4 pl-2"> {/* Title selector */}

                    <div className="flex items-center gap-2">
                      <input type="radio" id="m" name="civilite" value="M." required />
                      <label htmlFor="m">M.</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="mme" name="civilite" value="Mme" required />
                      <label htmlFor="mme">Mme</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="other" name="civilite" value="Mx" required />
                      <label htmlFor="other">Mx</label>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full"> {/* FirstName and Lastname */}
                    <input type="text" name="nom" placeholder="Nom" className="bg-white text-black rounded-3xl pl-4 py-2 flex-1 w-full" required />
                    <input type="text" name="prenom" placeholder="Prénom" className="bg-white text-black rounded-3xl pl-4 py-2 flex-1 w-full" required />
                  </div>

                  {/* Email and Phone */}
                  <input type="email" name="email" placeholder="Adresse mail" className="bg-white text-black rounded-3xl pl-4 py-2 w-full" required />
                  <input type="tel" name="telephone" placeholder="Téléphone" className="bg-white text-black rounded-3xl pl-4 py-2 w-full" />

                </div>

              </fieldset>

              <fieldset className="w-full">
                {/* Availabilities */}

                <legend className="pb-4 text-xl uppercase font-bold">Disponibilités pour une visite</legend>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-h-[50px] w-full"> {/* Button with avaibilities */}
                  <button type="button" onClick={() => setIsModalOpen(true)} className="bg-purple-900 text-white rounded-3xl px-10 py-3 w-full sm:w-auto cursor-pointer hover:bg-purple-600 transition-colors uppercase font-bold shrink-0">
                    Ajouter une disponibilité
                  </button>

                  {availabilities.length > 0 && (
                    <div className="max-h-[100px] sm:max-h-[50px] overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-2 w-full sm:min-w-[200px] mt-1">
                      {availabilities.map((slot, index) => (
                        <div key={index} className="p-2.5 bg-white rounded-2xl flex items-center justify-between text-black text-sm gap-4 border border-zinc-100 shadow-sm">
                          <span>{getReadableAvailability(slot)}</span>
                          <button
                            type="button"
                            onClick={() => setAvailabilities(availabilities.filter((_, i) => i !== index))}
                            className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
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

            <div className="flex flex-col gap-8 w-full lg:w-[48%]"> {/* Right Side of form */}

              <fieldset className="w-full">
                {/* Message */}

                <legend className="pb-4 text-xl uppercase font-bold">Votre message</legend>

                <div className="flex flex-col gap-3">

                  <div className="flex flex-wrap gap-4 pl-2"> {/* Reason selector  */}

                    <div className="flex items-center gap-2">
                      <input type="radio" id="visit" name="reason" value="visite" required />
                      <label htmlFor="visit">Demande de visite</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="photos" name="reason" value="photos" required />
                      <label htmlFor="photos">Demande de plus de photos</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="other" name="reason" value="autre" required />
                      <label htmlFor="other">Autre</label>
                    </div>

                  </div>

                  <div className="flex gap-4 pl-2"> {/* checkbox recall  */}

                    <input type="checkbox" id="contact_tel" name="contact" value="true" />
                    <label htmlFor="contact_tel">Être recontacté par téléphone</label>

                  </div>

                  {/* text area  */}
                  <textarea name="message" placeholder="Message" maxLength={500} className="bg-white text-black rounded-2xl px-6 py-4 mt-2 h-32 custom-scrollbar resize-none w-full" required />

                </div>

              </fieldset>

              {/* Sumbit button  */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-600 disabled:bg-yellow-800 text-white text-xl font-bold rounded-3xl px-16 py-3 cursor-pointer disabled:cursor-not-allowed hover:bg-yellow-500 w-full sm:w-auto sm:ml-auto mt-auto transition-colors"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </button>
            </div>

          </div>

        </form>

        {/* Background image*/}
        <Image src="/images/form_background.jpg" fill alt="Une pièce d'appartement" className="object-cover brightness-50"></Image>

      </div>


      <AvaibilityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(slot) => {
          const exists = availabilities.some((a) => a.day === slot.day && a.time === slot.time);
          if (exists) {
            alert("Cette disponibilité a déjà été ajoutée.");
            return false;
          }
          setAvailabilities((prev) => [...prev, slot]);
          return true;
        }}
      />

      {toastState !== "idle" && (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
          <div
            className={`pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl bg-purple-950/90 text-purple-100 border border-purple-800 shadow-2xl backdrop-blur-md font-semibold text-sm max-w-md w-full sm:w-auto ${
              toastState === "showing" ? "animate-slide-up" : "animate-slide-down"
            }`}
          >
            <svg className="w-5 h-5 text-purple-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Votre message a bien été envoyé et enregistré !</span>
            <button
              type="button"
              onClick={() => setToastState("hiding")}
              className="ml-auto pl-2 text-purple-300 hover:text-white cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </main>
  );
}

