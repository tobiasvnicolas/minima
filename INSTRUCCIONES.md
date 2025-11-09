# Instrucciones para ejecutar el proyecto

## Configuración de la Base de Datos

1. La base de datos `nom_ape_gen` debe estar creada y poblada con los datos del archivo `db.sql`

2. Verificar la configuración en `back/.env`:
   - DB_HOST=localhost
   - DB_PORT=3306
   - DB_USER=root
   - DB_PASS=(tu contraseña de MySQL, vacía si no tienes)
   - DB_NAME=nom_ape_gen

## Ejecutar el Backend

```powershell
cd back
npm install
npm start
```

El servidor backend se ejecutará en http://localhost:3001

## Ejecutar el Frontend

En otra terminal:

```powershell
cd front
npm install
npm run dev
```

El servidor frontend se ejecutará en http://localhost:5173

## Consulta SQL que se ejecuta

El endpoint `/api/nombres-espana` ejecuta la siguiente consulta:

```sql
SELECT
  N.Nombre,
  G.Nombre_Genero,
  P.Nombre_Pais
FROM Nombre N
JOIN Genero G ON N.ID_Genero = G.ID_Genero
JOIN Nombre_Pais NP ON N.ID_Nombre = NP.ID_Nombre
JOIN Pais P ON NP.ID_Pais = P.ID_Pais
WHERE P.Nombre_Pais = 'España'
LIMIT 1;
```

## Ver los resultados

Abre http://localhost:5173 en tu navegador y verás:
- Estado del backend
- Conexión a la base de datos
- Los resultados de la consulta SQL en una tabla
