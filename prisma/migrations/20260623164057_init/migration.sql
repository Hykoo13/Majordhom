-- CreateTable
CREATE TABLE "Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "reason" TEXT NOT NULL,
    "contactTel" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "dateVisite" TEXT,
    "heureVisite" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
