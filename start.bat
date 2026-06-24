@echo off
echo =========================================
echo   Lancement du Projet Majordhom
echo =========================================
echo.

echo [1/3] Installation des dependances (npm install)...
call npm install
if %errorlevel% neq 0 (
    echo Une erreur est survenue lors de l'installation des dependances.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Preparation de la base de donnees (Prisma & SQLite)...
call npx prisma generate
call npx prisma db push
if %errorlevel% neq 0 (
    echo Une erreur est survenue lors de la preparation de la base de donnees.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Demarrage de Next.js (npm run dev)...
echo Le site sera disponible a l'adresse : http://localhost:3000
echo.
call npm run dev
pause
