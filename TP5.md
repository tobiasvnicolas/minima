# Trabajo Práctico 05 –  DevOps CICD Pipelines (2025)

## 🎯 Objetivo

Implementar un **CICD Pipeline completo** que automatice el build y despliegue de una aplicación desde **QA hasta Producción** utilizando **servicios cloud de tu elección** (Azure Web Apps, AWS EC2/ECS, Google Cloud Run, etc.), con **aprobaciones manuales** y **estrategias de rollback**.

Este trabajo se aprueba **solo si podés explicar qué hiciste, por qué lo hiciste y cómo lo resolviste**.

---

## 🧩 Escenario (actualizado)

Como líder técnico, debés:
1. Tomar la aplicación.
2. Configurar **servicios cloud** para entornos de **QA** y **Producción** AWS EC2/ECS.
3. Crear un **Release Pipeline** (GitHub Actions, AWS CodePipeline) que tome artefactos del Build Pipeline y los despliegue automáticamente.
4. Implementar **aprobaciones manuales** para el pase a Producción.
5. El despliegue debe incluir:
   - Configuración de **variables por entorno** (connection strings, URLs, etc.).
   - **Health checks** post-despliegue.


---

## 📋 Tareas que debés cumplir

### 1. Configuración de Cloud Resources
- Crear **servicios cloud** para QA y Producción AWS EC2/ECS.  
- Configurar variables de entorno.  
- Documentar recursos creados y su propósito.

### 2. Release Pipeline Configuration
- Configurar **Release Pipeline** (GitHub Actions, AWS CodePipeline) conectado al Build Pipeline del TP5.
- Definir **stages** para QA y Producción con diferentes configuraciones.  


### 3. Gestión de aprobaciones y gates
- Configurar **aprobaciones manuales** para el pase a Producción.    
- Documentar proceso de aprobación y responsables.


### 4A. Evidencias y documentación
- Capturas de configuración de servicios cloud, releases exitosos, health checks.  
- Documentar en `decisiones.md` las decisiones técnicas tomadas.

---

## 🔧 Pasos sugeridos (checklist)

1. **Cloud Resources**
   - Crear recursos cloud para QA + PROD en AWS.  [Listas las bases de datos qa y prod, y los repositorios]
2. **Release Pipeline**
   - Conectar con Build Pipeline, configurar stages QA/PROD.
3. **Variables y Secrets**
   - Configurar variables y secretos por entorno.
4. **Aprobaciones**
   - Implementar aprobación manual QA → PROD.  
5. **Health Checks**
   - Validar despliegues con endpoints de salud.   
7. **Evidencias**
   - Capturas y explicación en `decisiones.md`.

---