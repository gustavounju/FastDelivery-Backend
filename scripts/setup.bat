@echo off
REM FastDelivery API - Setup Script for Windows
REM Este script automatiza la configuración inicial del proyecto en Windows

echo 🚚 FastDelivery API - Setup Script
echo ==================================

REM Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no está instalado. Instala Node.js 18+ desde https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Node.js encontrado:
node --version

REM Verificar npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no está instalado
    pause
    exit /b 1
)

echo [INFO] npm encontrado:
npm --version

REM Instalar dependencias
echo [INFO] Instalando dependencias...
npm ci
if %errorlevel% neq 0 (
    echo [ERROR] Error al instalar dependencias
    pause
    exit /b 1
)

REM Configurar variables de entorno
echo [INFO] Configurando variables de entorno...
if not exist .env (
    if exist .env.example (
        copy .env.example .env
        echo [INFO] Archivo .env creado desde .env.example
        echo [WARNING] Por favor, edita .env con tus configuraciones
    ) else (
        echo [ERROR] Archivo .env.example no encontrado
    )
) else (
    echo [INFO] .env ya existe, omitiendo...
)

REM Crear directorio de uploads
echo [INFO] Configurando directorio de uploads...
if not exist uploads mkdir uploads
echo. > uploads\.gitkeep

REM Ejecutar linting
echo [INFO] Ejecutando linter...
npm run lint
if %errorlevel% neq 0 (
    echo [WARNING] Advertencias en el linting
)

REM Compilar aplicación
echo [INFO] Compilando aplicación...
npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Error al compilar la aplicación
    pause
    exit /b 1
)

echo.
echo 🎉 ¡Configuración completada!
echo ==========================
echo.
echo Para iniciar la aplicación:
echo   npm run start:dev
echo.
echo Para abrir la documentación:
echo   http://localhost:3000/api/docs
echo.
echo Comandos útiles:
echo   npm run start:dev    # Desarrollo con watch
echo   npm run test         # Ejecutar tests
echo   npm run lint         # Linting
echo   npm run build        # Compilar
echo.
echo [WARNING] No olvides configurar tus variables de entorno en .env
pause
