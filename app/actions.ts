"use server";

import { prisma } from "../lib/prisma";

export async function createContact(formData: FormData) {
  try {
    const civilite = formData.get("civilite") as string;
    const nom = formData.get("nom") as string;
    const prenom = formData.get("prenom") as string;
    const email = formData.get("email") as string;
    const telephone = (formData.get("telephone") as string) || null;
    const reason = formData.get("reason") as string;
    const contactTel = formData.get("contact") === "true";
    const message = formData.get("message") as string;
    const availabilities = (formData.get("availabilities") as string) || null;

    if (!civilite || !nom || !prenom || !email || !reason || !message) {
      return { success: false, error: "Veuillez remplir tous les champs obligatoires." };
    }

    await prisma.contact.create({
      data: {
        civilite,
        nom,
        prenom,
        email,
        telephone,
        reason,
        contactTel,
        message,
        availabilities,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la création du contact :", error);
    return { success: false, error: "Une erreur est survenue lors de l'enregistrement." };
  }
}
