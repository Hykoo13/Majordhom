import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 bg-white ">
      <div className="relative flex min-w-[80%] max-w-[100%] min-h-100 items-start justify-start overflow-hidden rounded-3xl p-16">

        <form className="flex flex-col z-1 ">
          <h2 className="pb-4 text-xl uppercase font-bold">Contacter l'agence</h2>
          <div className="flex flex-wrap gap-8 pl-8">

            <fieldset>

              <legend className="pb-2 uppercase font-bold">Vos informations</legend>

              <div className="flex flex-col gap-2">

                <div className="flex gap-2 pl-2"> {/* Civilité */}

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

                <input type="email" name="nom" placeholder="Adresse mail" className="bg-white text-black rounded-3xl pl-4 py-2" />
                <input type="tel" name="prenom" placeholder="Téléphone" className="bg-white text-black rounded-3xl pl-4 py-2" />

              </div>

            </fieldset>

            <fieldset>

              <legend className="pb-2 uppercase font-bold">Disponibilités pour une visite</legend>

              <div className="flex gap-2 ">

                <button className="bg-white text-black rounded-3xl px-4 py-2 w-fit">Ajouter un créneau</button>
              </div>

            </fieldset>

            <fieldset>

              <legend className="pb-2 uppercase font-bold">Vos informations</legend>

              <div className="flex flex-col gap-2">

                <div className="flex gap-2 pl-2"> {/* Civilité */}

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

                <input type="email" name="nom" placeholder="Adresse mail" className="bg-white text-black rounded-3xl pl-4 py-2" />
                <input type="tel" name="prenom" placeholder="Téléphone" className="bg-white text-black rounded-3xl pl-4 py-2" />

              </div>

            </fieldset>

          </div>
        </form>



        <Image src="/images/form_background.jpg" fill alt="Une pièce d'appartement" className="object-cover blur-[2px] brightness-50"></Image>
      </div>

    </main>
  );
}
