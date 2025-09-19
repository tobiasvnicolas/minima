## Stack Tecnológico

### Frontend: React + Vite

**Decisión**: Se eligió React 18 con Vite como bundler.

**Justificación**:
- **React**: Framework moderno y ampliamente adoptado, ideal para crear interfaces de usuario interactivas
- **Vite**: Bundler rápido que proporciona desarrollo en tiempo real y build optimizado
- **Simplicidad**: Para una aplicación mínima, React ofrece el balance perfecto entre funcionalidad y complejidad
- **Ecosistema**: Amplio ecosistema de librerías y herramientas disponibles
- **Performance**: Vite ofrece hot module replacement (HMR) extremadamente rápido durante desarrollo

**Alternativas consideradas**:
- Vue.js: Descartado por requerir familiarización adicional del equipo
- Angular: Demasiado pesado para una aplicación mínima
- Plain JavaScript: Insuficiente para una aplicación escalable

### Backend: Node.js + Express

**Decisión**: API REST desarrollada en Node.js usando Express.js.

**Justificación**:
- **JavaScript Everywhere**: Permite usar el mismo lenguaje en frontend y backend
- **Express**: Framework minimalista pero poderoso, perfecto para APIs simples
- **Ecosistema npm**: Vasta colección de paquetes disponibles
- **Performance**: Node.js es eficiente para I/O intensivo típico de APIs REST
- **Simplicidad**: Configuración mínima requerida para crear una API funcional

**Alternativas consideradas**:
- Python + FastAPI: Descartado para mantener uniformidad de lenguaje
- .NET Core: Más pesado para una aplicación mínima
- PHP: Menos moderno y eficiente para este tipo de aplicaciones

### Testing

**Frontend**: Vitest + Testing Library
- **Vitest**: Testing framework rápido y nativo de Vite
- **Testing Library**: Estándar de facto para testing de componentes React
- **jsdom**: Simula DOM para testing en Node.js

**Backend**: Jest + Supertest
- **Jest**: Framework de testing maduro y completo
- **Supertest**: Perfecto para testing de APIs HTTP
- **Cobertura**: Reportes detallados de code coverage

## Estructura del Repositorio

**Decisión**: Monorepo con separación clara de frontend y backend.

```
├── front/          # Aplicación React
├── back/           # API Node.js
├── azure-pipelines.yml
├── README.md
├── decisiones.md
└── descripcion.md
```

**Justificación**:
- **Simplicidad**: Un solo repositorio facilita el mantenimiento
- **Separación de responsabilidades**: Directorios claros para cada componente
- **Pipeline único**: Facilita CI/CD coordinado entre frontend y backend
- **Versionado conjunto**: Cambios relacionados se mantienen sincronizados

**Alternativas consideradas**:
- Microrepos separados: Complejidad innecesaria para un proyecto mínimo
- Estructura plana: Confusión entre archivos de frontend y backend

## Diseño del Pipeline de CI/CD

### Plataforma: Azure DevOps

**Decisión**: Azure DevOps Pipelines con agente self-hosted.

**Justificación**:
- **Agente self-hosted**: Mayor control sobre el entorno de ejecución
- **Paralelización**: Jobs paralelos para frontend y backend optimizan tiempo de build
- **Integración**: Excelente integración con repositorios Git
- **Reportes**: Soporte nativo para test results y code coverage

### Estructura del Pipeline

**Decisión**: Pipeline multi-stage con jobs paralelos.

```yaml
Stages:
  - Build (paralelo)
    - Backend Job
    - Frontend Job
  - Deploy (condicional)
    - Deploy to Staging
```

**Justificación de la Estructura**:

#### Stage: Build
- **Jobs paralelos**: Frontend y backend se procesan simultáneamente para reducir tiempo total
- **Independencia**: Cada job maneja sus propias dependencias y tests
- **Fail-fast**: Si cualquier job falla, el pipeline se detiene inmediatamente

#### Backend Job:
1. **Node.js Setup**: Instala versión específica para consistencia
2. **npm ci**: Instalación determinística de dependencias
3. **Build verification**: Verifica que el código compile correctamente
4. **Testing**: Ejecuta tests unitarios con coverage
5. **Reporting**: Publica resultados para visibilidad

#### Frontend Job:
1. **Node.js Setup**: Misma versión que backend
2. **npm ci**: Instalación determinística
3. **Build**: Genera assets de producción optimizados
4. **Testing**: Tests unitarios con coverage
5. **Artifacts**: Publica build para posible deployment

#### Stage: Deploy
- **Condicional**: Solo se ejecuta en rama `main` y si Build es exitoso
- **Environment**: Utiliza Azure DevOps environments para control
- **Placeholder**: Estructura preparada para deployment real

### Triggers y Condiciones

**Decisión**: 
```yaml
trigger:
  branches:
    include: [main, develop]
  paths:
    exclude: [README.md, decisiones.md]
```

**Justificación**:
- **Ramas principales**: main (producción) y develop (desarrollo)
- **Exclusiones**: Documentación no requiere rebuild completo
- **Eficiencia**: Evita builds innecesarios

### Configuración de Dependencias

**Decisión**: `npm ci` en lugar de `npm install`.

**Justificación**:
- **Determinismo**: Usa package-lock.json exactamente como está
- **Performance**: Más rápido en entornos CI
- **Confiabilidad**: Evita discrepancias entre entornos

### Artifacts y Reporting

**Decisión**: Publicar múltiples tipos de artifacts.

1. **Test Results**: Formato JUnit para integración con Azure DevOps
2. **Code Coverage**: Formato Cobertura para reportes visuales
3. **Build Artifacts**: Frontend compilado para deployment

**Justificación**:
- **Visibilidad**: Tests y coverage visibles en la interfaz web
- **Deployment**: Artifacts listos para deployment automático
- **Debugging**: Logs y reportes facilitan troubleshooting

## Configuración de Agente Self-Hosted

**Decisión**: Usar agente self-hosted en lugar de Microsoft-hosted.

**Justificación**:
- **Control**: Control total sobre el entorno y software instalado
- **Performance**: Potencialmente más rápido por cache persistente
- **Consistencia**: Mismo entorno para todos los builds
- **Requisitos específicos**: Puede satisfacer necesidades particulares del proyecto

**Requisitos del Agente**:
- Node.js 18.x (LTS)
- npm latest
- Git
- Recursos suficientes (2GB RAM, 5GB disco)

## Consideraciones de Seguridad

### Variables de Entorno
- Uso de variables del pipeline para configuración
- Secrets manejados por Azure DevOps Key Vault (cuando sea necesario)

### Dependencias
- `npm ci` asegura dependencias exactas
- Regular audit de dependencias por vulnerabilidades

### Artifacts
- Build artifacts solo accesibles por usuarios autorizados
- Limpieza automática de artifacts antiguos

## Escalabilidad Futura

### Monorepo vs Microservicios
- Estructura actual permite evolución hacia microservicios
- Pipeline puede dividirse cuando la complejidad lo justifique

### Testing
- Estructura preparada para integration tests
- Placeholder para E2E testing con herramientas como Playwright

### Deployment
- Estructura preparada para multiple environments
- Configuración lista para containers (Docker) si es necesario

## Conclusiones

Las decisiones tomadas priorizan:

1. **Simplicidad**: Stack moderno pero no excesivamente complejo
2. **Maintainability**: Código y configuración fáciles de entender y modificar
3. **Performance**: Builds rápidos y aplicación eficiente
4. **Escalabilidad**: Arquitectura que puede crecer con los requisitos
5. **Developer Experience**: Herramientas que facilitan el desarrollo local

El proyecto establece una base sólida para futuro crecimiento manteniendo la simplicidad requerida para un MVP.