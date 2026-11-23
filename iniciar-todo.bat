@echo off
setlocal
title Veterinaria San Marcos - Inicio
set "RAIZ=%~dp0"

echo ==================================================
echo   Veterinaria San Marcos - Iniciando servicios
echo ==================================================
echo.
echo Recuerda tener MySQL encendido en Laragon (puerto 3306).
echo.

netstat -ano | findstr /R /C:":3306 .*LISTENING" >nul
if errorlevel 1 (
    echo [AVISO] MySQL no responde en el puerto 3306. Inicia Laragon antes de continuar.
    pause
)

for %%S in (Usuarios Mascotas Servicios Equipo Mensajeria Historial) do (
    echo Iniciando %%S...
    start "VET - %%S" /D "%RAIZ%backend\%%S" cmd /k "mvnw.cmd spring-boot:run"
    timeout /t 3 /nobreak >nul
)

if not exist "%RAIZ%frontend\node_modules" (
    echo Instalando dependencias del frontend...
    pushd "%RAIZ%frontend"
    call npm install
    popd
)

echo Iniciando frontend...
start "VET - Frontend" /D "%RAIZ%frontend" cmd /k "npm run dev"

echo.
echo Servicios iniciados en ventanas separadas:
echo   Usuarios    http://localhost:8081/swagger-ui.html
echo   Mascotas    http://localhost:8082/swagger-ui.html
echo   Servicios   http://localhost:8083/swagger-ui.html
echo   Equipo      http://localhost:8084/swagger-ui.html
echo   Mensajeria  http://localhost:8085/swagger-ui.html
echo   Historial   http://localhost:8086/swagger-ui.html
echo   Frontend    http://localhost:5173
echo.
echo Para detener todo ejecuta detener-todo.bat
pause
