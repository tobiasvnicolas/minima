const mysql = require('mysql2/promise');
require('dotenv').config();

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'nom_ape_gen',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Función para verificar la conexión
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Database connection established successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('✗ Error connecting to database:', error.message);
    return false;
  }
}

// Función para obtener nombres de España
async function getNombresEspana() {
  const query = `
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
  `;

  try {
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

module.exports = {
  pool,
  testConnection,
  getNombresEspana
};
