import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 w-full flex-col items-center py-32 px-16 bg-white ">
      <div className="relative flex w-200 min-h-100 items-start justify-start overflow-hidden rounded-3xl p-16">
        <form className="flex flex-col z-1">
          <h2>Contacter l'agence</h2>
          <div>
            <fieldset>
              <legend>Vos informations</legend>
              <input type="radio" name="Civilité" value="Mr" />
            </fieldset>
            <fieldset>
              <legend>Vos coordonnées</legend>

            </fieldset>
            <fieldset>
              <legend>Vos coordonnées</legend>

            </fieldset>
          </div>
        </form>
        <Image src="/images/form_background.jpg" fill alt="Une pièce d'appartement" className="object-cover blur-[2px] brightness-50"></Image>
      </div>
    </main>
  );
}
