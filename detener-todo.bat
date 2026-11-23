@echo off
setlocal
title Veterinaria San Marcos - Detener

echo ==================================================
echo   Veterinaria San Marcos - Deteniendo servicios
echo ==================================================
echo.

for %%S in (Usuarios Mascotas Servicios Equipo Mensajeria Historial Frontend) do (
    taskkill /FI "WINDOWTITLE eq VET - %%S*" /T /F >nul 2>&1 && echo %%S detenido. || echo %%S no estaba en ejecucion.
)

echo.
if /I "%~1"=="/todo" (
    echo Cerrando cualquier proceso java.exe y node.exe restante...
    taskkill /IM java.exe /T /F >nul 2>&1
    taskkill /IM node.exe /T /F >nul 2>&1
)

echo Listo.
pause
