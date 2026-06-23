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
      <div className="relative flex min-w-[80%] max-w-[100%] min-h-100 items-start justify-start overflow-hidden rounded-3xl p-16">

        <form className="flex flex-col z-1 ">
          <h2 className="pb-4 text-xl uppercase font-bold">Contacter l'agence</h2>
          <div className="flex flex-wrap gap-12 pl-8">

            <div className="flex flex-col gap-8"> {/* Left Side of form */}

              <fieldset>

                <legend className="pb-2 uppercase font-bold">Vos informations</legend>

                <div className="flex flex-col gap-2">

                  <div className="flex gap-2 pl-2"> {/* Title */}

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

                  <div className="flex gap-2">
                    <input type="text" name="nom" placeholder="Nom" className="bg-white text-black rounded-3xl pl-4 py-2" />
                    <input type="text" name="prenom" placeholder="Prénom" className="bg-white text-black rounded-3xl pl-4 py-2" />
                  </div>

                  <input type="email" name="email" placeholder="Adresse mail" className="bg-white text-black rounded-3xl pl-4 py-2" />
                  <input type="tel" name="telephone" placeholder="Téléphone" className="bg-white text-black rounded-3xl pl-4 py-2" />

                </div>

              </fieldset>

              <fieldset>

                <legend className="pb-2 uppercase font-bold">Disponibilités pour une visite</legend>

                <div>
                  <button type="button" onClick={() => setIsModalOpen(true)} className="bg-purple-900 text-white rounded-3xl px-4 py-2 w-fit cursor-pointer hover:bg-purple-600 transition-colors">
                    Ajouter une disponibilité
                  </button>

                  {availabilities.map((slot, index) => (
                    <div key={index} className="mt-4 p-4 bg-white rounded-2xl flex items-center justify-between text-black text-sm w-fit gap-4">
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

                  <input type="hidden" name="availabilities" value={JSON.stringify(availabilities)} />
                </div>

              </fieldset>
            </div>

            <div className="flex flex-col gap-8">
              <fieldset>

                <legend className="pb-2 uppercase font-bold">Votre message</legend>

                <div className="flex flex-col gap-4">

                  <div className="flex gap-4 pl-2">

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

                  <div className="flex gap-2 pl-2 items-center">
                    <input type="checkbox" id="contact_tel" name="contact" value="true" />
                    <label htmlFor="contact_tel">Être recontacté par téléphone</label>

                  </div>

                  <textarea name="message" placeholder="Message" maxLength={500} className="bg-white text-black rounded-3xl pl-4 p-2 mt-2" />

                </div>

              </fieldset>

              <button type="submit" className="bg-yellow-600 text-white rounded-3xl px-12 py-2 cursor-pointer hover:bg-yellow-500 ml-auto mt-auto transition-colors">Envoyer</button>
            </div>

          </div>
        </form>



        <Image src="/images/form_background.jpg" fill alt="Une pièce d'appartement" className="object-cover blur-[4px] brightness-50"></Image>
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
