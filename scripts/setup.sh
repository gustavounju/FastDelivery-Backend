#!/bin/bash

# FastDelivery API - Setup Script
# Este script automatiza la configuración inicial del proyecto

set -e

echo "🚚 FastDelivery API - Setup Script"
echo "=================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar prerrequisitos
check_prerequisites() {
    print_status "Verificando prerrequisitos..."

    # Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado. Instala Node.js 18+ desde https://nodejs.org/"
        exit 1
    fi

    node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$node_version" -lt 18 ]; then
        print_error "Node.js 18+ es requerido. Versión actual: $(node -v)"
        exit 1
    fi

    # npm
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        exit 1
    fi

    # Docker (opcional)
    if command -v docker &> /dev/null; then
        print_status "Docker encontrado: $(docker --version)"
    else
        print_warning "Docker no encontrado. Algunas funcionalidades pueden no estar disponibles."
    fi

    print_status "✅ Prerrequisitos verificados"
}

# Instalar dependencias
install_dependencies() {
    print_status "Instalando dependencias..."
    npm ci
    print_status "✅ Dependencias instaladas"
}

# Configurar variables de entorno
setup_environment() {
    print_status "Configurando variables de entorno..."

    if [ ! -f .env ]; then
        if [ -f .env.example ]; then
            cp .env.example .env
            print_status "Archivo .env creado desde .env.example"
            print_warning "Por favor, edita .env con tus configuraciones"
        else
            print_error "Archivo .env.example no encontrado"
        fi
    else
        print_status ".env ya existe, omitiendo..."
    fi
}

# Configurar base de datos con Docker
setup_database() {
    if command -v docker &> /dev/null && command -v docker-compose &> /dev/null; then
        print_status "¿Quieres configurar la base de datos con Docker? (y/N)"
        read -r setup_db

        if [[ $setup_db =~ ^[Yy]$ ]]; then
            print_status "Configurando base de datos con Docker..."
            cd docker-compose
            docker-compose up -d
            cd ..
            print_status "✅ Base de datos configurada"
        fi
    else
        print_warning "Docker Compose no disponible. Configura MySQL manualmente."
    fi
}

# Ejecutar linting y tests
run_checks() {
    print_status "Ejecutando verificaciones..."

    # Linting
    print_status "Ejecutando linter..."
    npm run lint

    # Build
    print_status "Compilando aplicación..."
    npm run build

    print_status "✅ Verificaciones completadas"
}

# Crear directorio de uploads
setup_uploads() {
    print_status "Configurando directorio de uploads..."
    mkdir -p uploads
    touch uploads/.gitkeep
    print_status "✅ Directorio de uploads configurado"
}

# Mostrar información final
show_final_info() {
    echo ""
    echo "🎉 ¡Configuración completada!"
    echo "=========================="
    echo ""
    echo "Para iniciar la aplicación:"
    echo "  npm run start:dev"
    echo ""
    echo "Para abrir la documentación:"
    echo "  http://localhost:3000/api/docs"
    echo ""
    echo "Comandos útiles:"
    echo "  npm run start:dev    # Desarrollo con watch"
    echo "  npm run test         # Ejecutar tests"
    echo "  npm run lint         # Linting"
    echo "  npm run build        # Compilar"
    echo ""
    print_warning "No olvides configurar tus variables de entorno en .env"
}

# Función principal
main() {
    check_prerequisites
    install_dependencies
    setup_environment
    setup_uploads
    setup_database
    run_checks
    show_final_info
}

# Ejecutar si es llamado directamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
