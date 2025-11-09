-- Base de Datos: nom_ape_gen

-- 1. CREACIÓN DE LAS TABLAS

-- Tabla para almacenar los países
CREATE TABLE Pais (
    ID_Pais INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Pais VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla para almacenar los géneros (Masculino, Femenino, No Binario, etc.)
CREATE TABLE Genero (
    ID_Genero INT AUTO_INCREMENT PRIMARY KEY,
    Nombre_Genero VARCHAR(50) NOT NULL UNIQUE
);

-- Tabla para almacenar los nombres de pila. Se asocia al género.
CREATE TABLE Nombre (
    ID_Nombre INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL UNIQUE,
    ID_Genero INT NOT NULL,
    FOREIGN KEY (ID_Genero) REFERENCES Genero(ID_Genero) ON DELETE RESTRICT
);

-- Tabla para almacenar los apellidos. No tiene asociación directa con el género.
CREATE TABLE Apellido (
    ID_Apellido INT AUTO_INCREMENT PRIMARY KEY,
    Apellido VARCHAR(100) NOT NULL UNIQUE
);

-- Tabla de UNIÓN para la relación N:M (Nombre - País)
-- Un nombre puede estar en muchos países, y un país puede tener muchos nombres.
CREATE TABLE Nombre_Pais (
    ID_Nombre INT NOT NULL,
    ID_Pais INT NOT NULL,
    PRIMARY KEY (ID_Nombre, ID_Pais), -- Clave compuesta para evitar duplicados
    FOREIGN KEY (ID_Nombre) REFERENCES Nombre(ID_Nombre) ON DELETE CASCADE,
    FOREIGN KEY (ID_Pais) REFERENCES Pais(ID_Pais) ON DELETE CASCADE
);

-- Tabla de UNIÓN para la relación N:M (Apellido - País)
-- Un apellido puede estar en muchos países, y un país puede tener muchos apellidos.
CREATE TABLE Apellido_Pais (
    ID_Apellido INT NOT NULL,
    ID_Pais INT NOT NULL,
    PRIMARY KEY (ID_Apellido, ID_Pais), -- Clave compuesta para evitar duplicados
    FOREIGN KEY (ID_Apellido) REFERENCES Apellido(ID_Apellido) ON DELETE CASCADE,
    FOREIGN KEY (ID_Pais) REFERENCES Pais(ID_Pais) ON DELETE CASCADE
);


-- 2. INSERCIÓN DE DATOS DE EJEMPLO

-- Insertar Géneros
INSERT INTO Genero (Nombre_Genero) VALUES
('Masculino'),
('Femenino'),
('No Binario');

-- Insertar Países
INSERT INTO Pais (Nombre_Pais) VALUES
('España'),
('México'),
('Alemania');

-- Insertar Apellidos
INSERT INTO Apellido (Apellido) VALUES
('García'),     -- Común en España y México
('López'),      -- Común en España y México
('Müller'),     -- Común en Alemania
('Fernández');  -- Común solo en España

-- Insertar Nombres (asociados a Género)
-- ID_Genero: 1=Masculino, 2=Femenino
INSERT INTO Nombre (Nombre, ID_Genero) VALUES
('David', 1),    -- Masculino
('Santiago', 1), -- Masculino
('Ana', 2),      -- Femenino
('Sofía', 2),    -- Femenino
('Kai', 3);      -- No Binario

-- 3. POBLAR TABLAS DE UNIÓN (RELACIONES)

-- NOMBRES POR PAÍS:
-- David es común en España (1) y México (2)
INSERT INTO Nombre_Pais (ID_Nombre, ID_Pais) VALUES
(1, 1), -- David (1) -> España (1)
(1, 2); -- David (1) -> México (2)

-- Santiago es común solo en México (2)
INSERT INTO Nombre_Pais (ID_Nombre, ID_Pais) VALUES
(2, 2); -- Santiago (2) -> México (2)

-- Ana es común en España (1) y Alemania (3)
INSERT INTO Nombre_Pais (ID_Nombre, ID_Pais) VALUES
(3, 1), -- Ana (3) -> España (1)
(3, 3); -- Ana (3) -> Alemania (3)

-- Kai es común solo en Alemania (3)
INSERT INTO Nombre_Pais (ID_Nombre, ID_Pais) VALUES
(5, 3); -- Kai (5) -> Alemania (3)


-- APELLIDOS POR PAÍS:
-- García (1) es común en España (1) y México (2)
INSERT INTO Apellido_Pais (ID_Apellido, ID_Pais) VALUES
(1, 1), -- García (1) -> España (1)
(1, 2); -- García (1) -> México (2)

-- Müller (3) es común solo en Alemania (3)
INSERT INTO Apellido_Pais (ID_Apellido, ID_Pais) VALUES
(3, 3); -- Müller (3) -> Alemania (3)

-- Fernández (4) es común solo en España (1)
INSERT INTO Apellido_Pais (ID_Apellido, ID_Pais) VALUES
(4, 1); -- Fernández (4) -> España (1)


-- 4. CONSULTAS ÚTILES (Ejemplos)

-- Consulta para obtener todos los nombres y su género disponibles en ESPAÑA:
-- SELECT
--     N.Nombre,
--     G.Nombre_Genero,
--     P.Nombre_Pais
-- FROM Nombre N
-- JOIN Genero G ON N.ID_Genero = G.ID_Genero
-- JOIN Nombre_Pais NP ON N.ID_Nombre = NP.ID_Nombre
-- JOIN Pais P ON NP.ID_Pais = P.ID_Pais
-- WHERE P.Nombre_Pais = 'España';

-- Consulta para obtener todos los apellidos disponibles en ALEMANIA:
-- SELECT
--     A.Apellido,
--     P.Nombre_Pais
-- FROM Apellido A
-- JOIN Apellido_Pais AP ON A.ID_Apellido = AP.ID_Apellido
-- JOIN Pais P ON AP.ID_Pais = P.ID_Pais
-- WHERE P.Nombre_Pais = 'Alemania';