# Minima Project

Una aplicación web mínima que consiste en un frontend React y un backend Node.js, con pipeline de CI/CD usando Azure DevOps.

## Descripción del Proyecto

Este proyecto implementa una aplicación web básica con:

- **Frontend**: Aplicación React con Vite que muestra datos del backend
- **Backend**: API REST en Node.js/Express con endpoint de salud y datos básicos
- **Pipeline CI/CD**: Azure DevOps Pipeline para build y testing automático

## Estructura del Proyecto

```
├── front/          # Frontend React application
├── back/           # Backend Node.js API
├── azure-pipelines.yml  # Azure DevOps Pipeline
├── README.md       # Este archivo
├── decisiones.md   # Documentación de decisiones técnicas
└── descripcion.md  # Especificaciones del proyecto
```

## Prerequisitos

Para ejecutar este proyecto localmente, necesitas:

- **Node.js** versión 18.x o superior
- **npm** (incluido con Node.js)
- **Git** para clonar el repositorio

Para el pipeline de Azure DevOps:
- Agente self-hosted con Node.js 18.x instalado
- Acceso a Internet para descargar dependencias npm
- Puerto 3000 disponible para el frontend
- Puerto 3001 disponible para el backend

## Cómo Levantar la Aplicación Localmente

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd minima
```

### 2. Configurar y ejecutar el Backend

```bash
# Navegar al directorio del backend
cd back

# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Iniciar el servidor en modo desarrollo
npm run dev

# O iniciar en modo producción
npm start
```

El backend estará disponible en `http://localhost:3001`

Endpoints disponibles:
- `GET /health` - Estado de salud del servidor
- `GET /api/data` - Datos básicos de la aplicación

### 3. Configurar y ejecutar el Frontend

```bash
# En una nueva terminal, navegar al directorio del frontend
cd front

# Instalar dependencias
npm install

# Ejecutar tests
npm test

# Iniciar en modo desarrollo
npm run dev

# O generar build de producción
npm run build
```

El frontend estará disponible en `http://localhost:3000`

## Cómo Funciona el Pipeline

### Configuración del Pipeline

El pipeline está definido en `azure-pipelines.yml` y está configurado para:

- **Trigger**: Se ejecuta automáticamente en commits a las ramas `main` y `develop`
- **Agente**: Utiliza un agente self-hosted (pool: 'Self-Hosted')
- **Stages**: Dos etapas principales - Build y Deploy

### Etapa de Build

La etapa de Build contiene dos jobs paralelos:

#### Backend Job
1. Instala Node.js 18.x
2. Instala dependencias con `npm ci`
3. Ejecuta build del backend
4. Ejecuta tests unitarios con coverage
5. Publica resultados de tests y coverage

#### Frontend Job
1. Instala Node.js 18.x
2. Instala dependencias con `npm ci`
3. Ejecuta build del frontend (genera artifacts en `/dist`)
4. Ejecuta tests unitarios con coverage
5. Publica resultados de tests, coverage y build artifacts

### Etapa de Deploy

- Se ejecuta solo si la etapa de Build es exitosa
- Solo se ejecuta en la rama `main`
- Descarga los artifacts del frontend
- Placeholder para deployment a staging environment

### Requisitos del Agente Self-Hosted

Para que el pipeline funcione correctamente, el agente debe tener:

**Sistema Operativo:**
- Windows 10/11, macOS, o Linux (Ubuntu 18.04+)

**Software Requerido:**
- Node.js 18.x o superior
- npm (incluido con Node.js)
- Git

**Configuración de Red:**
- Acceso a Internet para descargar dependencias de npm
- Puertos 3000 y 3001 disponibles para testing local (si es necesario)

**Recursos Mínimos:**
- 2 GB RAM
- 5 GB espacio en disco disponible
- CPU de 2 cores o más (recomendado)

## Scripts Disponibles

### Backend (`/back`)
- `npm start` - Inicia el servidor
- `npm run dev` - Inicia en modo desarrollo con nodemon
- `npm run build` - Ejecuta verificación de build
- `npm test` - Ejecuta tests unitarios
- `npm run test:coverage` - Ejecuta tests con coverage

### Frontend (`/front`)
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Genera build de producción
- `npm run preview` - Preview del build de producción
- `npm test` - Ejecuta tests unitarios
- `npm run test:coverage` - Ejecuta tests con coverage

## Tecnologías Utilizadas

- **Frontend**: React 18, Vite, Axios, Vitest
- **Backend**: Node.js, Express, Jest, Supertest
- **DevOps**: Azure DevOps Pipelines
- **Testing**: Jest (backend), Vitest (frontend)

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
# Minima Project

Aplicación web con frontend React y backend Node.js + base de datos MySQL.

## 🚀 Quick Start con Docker

```bash
# Iniciar toda la aplicación
docker-compose up -d

# Detener
docker-compose down
```

- **Frontend**: http://localhost
- **Backend**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 📋 Prerequisitos

- **Docker Desktop** (Windows/Mac) o Docker Engine (Linux)
- **MySQL** local (para desarrollo)
- **Node.js 20.x** (solo para desarrollo local sin Docker)

## 🗄️ Configuración de Base de Datos

1. **Crear la base de datos:**
   ```sql
   CREATE DATABASE nom_ape_gen;
   ```

2. **Importar datos:**
   ```bash
   mysql -u root -p nom_ape_gen < db.sql
   ```

3. **Configurar variables de entorno:**
   
   Copia `.env.example` a `.env` y configura:
   ```env
   DB_USER=root
   DB_PASSWORD=tu_password
   DB_NAME=nom_ape_gen
   ```

## 🐳 Docker

### Ejecutar con Docker Compose

```bash
# Construir y ejecutar
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

### Construir imágenes individuales

```bash
# Backend
docker build -t minima-backend ./back

# Frontend
docker build -t minima-frontend ./front
```

## 💻 Desarrollo Local (sin Docker)

### Backend

```bash
cd back
npm install
npm start          # Producción
npm run dev        # Desarrollo con hot-reload
npm test           # Tests
```

Servidor: http://localhost:3001

### Frontend

```bash
cd front
npm install
npm run dev        # Desarrollo
npm run build      # Producción
npm test           # Tests
```

Servidor: http://localhost:5173 (desarrollo)

## 📡 API Endpoints

- `GET /health` - Estado del servidor y conexión a BD
- `GET /api/data` - Información básica
- `GET /api/nombres-espana` - Consulta datos de España desde MySQL

## 🏗️ Estructura del Proyecto

```
minima/
├── back/              # Backend Node.js + Express
│   ├── src/
│   ├── tests/
│   ├── Dockerfile
│   └── package.json
├── front/             # Frontend React + Vite
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── .github/
│   └── workflows/     # GitHub Actions CI/CD
├── docker-compose.yml
├── azure-pipelines.yml
└── db.sql
```

## 🔧 Stack Tecnológico

- **Frontend**: React 18, Vite, Axios
- **Backend**: Node.js 20, Express, MySQL2
- **Testing**: Vitest (frontend), Jest (backend)
- **DevOps**: Docker, GitHub Actions, Azure Pipelines
- **Database**: MySQL

## 📝 Scripts Disponibles

### Backend
```bash
npm start          # Iniciar servidor
npm run dev        # Desarrollo con nodemon
npm test           # Tests con Jest
npm run test:coverage  # Coverage
```

### Frontend
```bash
npm run dev        # Servidor desarrollo
npm run build      # Build producción
npm test           # Tests con Vitest
npm run test:coverage  # Coverage
```

## 🔐 Seguridad

Los archivos `.env` están ignorados en Git. **Nunca** commitees credenciales.

Archivos seguros para commitear:
- `.env.example` (plantilla sin credenciales)

## 📦 CI/CD

### GitHub Actions
- Build y test automático de frontend y backend
- Construcción de imágenes Docker
- Push a GitHub Container Registry

### Azure DevOps
- Pipeline configurado para agente self-hosted
- Build y test paralelos
- Publicación de artifacts

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.