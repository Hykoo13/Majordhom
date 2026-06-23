"use client";

import Image from "next/image";
import { useState } from "react";
import AvaibilityModal from "../components/AvaibilityModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availabilities, setAvailabilities] = useState<{ day: string; time: string }[]>([]);

  const getReadableAvailability = (slot: { day: string; time: string }) => {
    const [y, m, d] = slot.day.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const weekdays = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const dayName = weekdays[dateObj.getDay()];
    const formattedDate = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    return `${dayName} ${formattedDate} à ${slot.time}`;
  };
  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 bg-white ">

      {/* Form with image bg */}
      <div className="relative flex w-[95%] sm:w-[90%] min-h-100 items-start overflow-hidden rounded-3xl p-6 sm:p-12 md:p-16">

        <form className="flex flex-col z-1 w-full"> {/* Form  */}

          <h2 className="pb-10 text-3xl uppercase font-bold">Contacter l'agence</h2> {/* Form title */}

          <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8"> {/* Form content both sides */}

            <div className="flex flex-col gap-8 w-full lg:w-[48%]"> {/* Left Side of form */}

              <fieldset className="w-full">
                {/* Informations */}

                <legend className="pb-4 text-xl uppercase font-bold">Vos informations</legend> {/* Title */}

                <div className="flex flex-col gap-3 w-full">

                  <div className="flex gap-4 pl-2"> {/* Title selector */}

                    <div className="flex items-center gap-2">
                      <input type="radio" id="m" name="civilite" value="M." />
                      <label htmlFor="m">M.</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="mme" name="civilite" value="Mme" />
                      <label htmlFor="mme">Mme</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="other" name="civilite" value="Mx" />
                      <label htmlFor="Mx">Mx</label>
                    </div>

                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full"> {/* FirstName and Lastname */}
                    <input type="text" name="nom" placeholder="Nom" className="bg-white text-black rounded-3xl pl-4 py-2 flex-1 w-full" />
                    <input type="text" name="prenom" placeholder="Prénom" className="bg-white text-black rounded-3xl pl-4 py-2 flex-1 w-full" />
                  </div>

                  {/* Email and Phone */}
                  <input type="email" name="email" placeholder="Adresse mail" className="bg-white text-black rounded-3xl pl-4 py-2 w-full" />
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
                      <input type="radio" id="visit" name="reason" value="visite" />
                      <label htmlFor="visit">Demande de visite</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="photos" name="reason" value="photos" />
                      <label htmlFor="photos">Demande de plus de photos</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="radio" id="other" name="reason" value="autre" />
                      <label htmlFor="other">Autre</label>
                    </div>

                  </div>

                  <div className="flex gap-4 pl-2"> {/* checkbox recall  */}

                    <input type="checkbox" id="contact_tel" name="contact" value="true" />
                    <label htmlFor="contact_tel">Être recontacté par téléphone</label>

                  </div>

                  {/* text area  */}
                  <textarea name="message" placeholder="Message" maxLength={500} className="bg-white text-black rounded-2xl px-6 py-4 mt-2 h-32 custom-scrollbar resize-none w-full" />

                </div>

              </fieldset>

              {/* Sumbit button  */}
              <button type="submit" className="bg-yellow-600 text-white text-xl font-bold rounded-3xl px-16 py-3 cursor-pointer hover:bg-yellow-500 w-full sm:w-auto sm:ml-auto mt-auto transition-colors">Envoyer</button>
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


    </main>
  );
}
