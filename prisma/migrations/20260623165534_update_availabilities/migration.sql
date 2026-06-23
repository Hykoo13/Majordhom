/*
  Warnings:

  - You are about to drop the column `dateVisite` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `heureVisite` on the `Contact` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "civilite" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "reason" TEXT NOT NULL,
    "contactTel" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "availabilities" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Contact" ("civilite", "contactTel", "createdAt", "email", "id", "message", "nom", "prenom", "reason", "telephone") SELECT "civilite", "contactTel", "createdAt", "email", "id", "message", "nom", "prenom", "reason", "telephone" FROM "Contact";
DROP TABLE "Contact";
ALTER TABLE "new_Contact" RENAME TO "Contact";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
