/front → código del frontend
/back → código del backend
azure-pipelines.yml → pipeline CI en la raíz
README.md
decisiones.md

---

## Descripción del proyecto

### Frontend (/front)
- Aplicación web simple con una interfaz gráfica mínima.
- Esta es una aplicación basada en un framework moderno de frontend (React).
- Incluye scripts funcionales para construir (build) y ejecutar pruebas (test) localmente.
- La aplicación expone una página principal básica con funcionalidad mínima (mostrar un dato simple).

### Backend (/back)
- Esta es una API sencilla que expone un endpoint básico de salud que devuelve un estado OK.
- Esta implementada en Node.js.
- Incluye scripts para iniciar el servidor, construir y ejecutar pruebas unitarias o de integracion basicas localmente.

---

## Pipeline CI (azure-pipelines.yml)

- Definir pipeline que corra en un agente self-hosted.
- Pipeline debe incluir al menos dos trabajos o pasos:
  - Build y test del frontend.
  - Build y test del backend.
- Usar versiones modernas y estables de herramientas y runtimes.
- Pipeline debe estar configurado para activarse con commits en la rama principal.
- Debe manejar instalación de dependencias, ejecución de builds y tests, y reportar resultados.

---

## Documentación adicional

### README.md
- Descripción breve del proyecto.
- Cómo levantar la app localmente.
- Cómo corre el pipeline.
- Prerequisitos del agente (SO, SDKs, puertos).

### decisiones.md
- Explicar el stack elegido y la estructura del repo.
- Justificar diseño del pipeline (stages, jobs, artefactos).

---