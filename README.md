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
estructura minima y funcional de aplicacion