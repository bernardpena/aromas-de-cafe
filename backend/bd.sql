CREATE DATABASE aromas_de_cafe;

\c aromas_de_cafe;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  pass VARCHAR(15) NOT NULL,
  calle VARCHAR(100),
  ciudad VARCHAR(50),
  comuna VARCHAR(50),
  rol VARCHAR(15));

SELECT * FROM usuarios;

-- Tabla de productos (cafés)
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10, 2) NOT NULL
);

SELECT * FROM productos;

-- Tabla de carrito
CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  producto_id INTEGER REFERENCES productos(id),
  cantidad INTEGER DEFAULT 1
);

SELECT * FROM carrito;

--modificacion tabla usuarios
ALTER TABLE usuarios 
ADD COLUMN nombre VARCHAR(50);


--agregando administradores
INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('1', 'Anakaren', 'admin@gmail.com', 'Admin', 'jdksfhalkf', 'kdsfjhkljf', 'sdfssagf', 'Administrador');

INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('2', 'Bernardo', 'admin2@gmail.com', 'Admin2', 'Digo de Almagro', 'Calama', 'El Loa', 'Administrador');

INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('3', 'Lucas', 'admin3@gmail.com', 'Admin3', 'vcvcvcvcv', 'cvcvcvcv', 'cvcvcv', 'Administrador');


INSERT INTO productos (nombre, descripcion, precio) VALUES 
('Café Arábica', 'Un café suave y aromático con notas de frutas.', 3.99),
('Café Robusta', 'Café fuerte y con cuerpo, ideal para los amantes del café intenso.', 4.49),
('Café de Especialidad', 'Café de origen único, seleccionado por su calidad excepcional.', 5.99),
('Café Descafeinado', 'Café sin cafeína, perfecto para disfrutar en cualquier momento del día.', 3.49),
('Café Mocha', 'Una mezcla deliciosa de café y chocolate, ideal para los golosos.', 4.99),
('Café Latte', 'Café suave con leche espumosa, un clásico en cualquier cafetería.', 4.29);


--actualizando tabla productos
SELECT * FROM productos;

UPDATE productos 
SET nombre = 
  CASE 
    WHEN nombre = 'Café Arábica' THEN 'Cafe Arabica'
    WHEN nombre = 'Café Robusta' THEN 'Cafe Robusta'
    WHEN nombre = 'Café de Especialidad' THEN 'Cafe de Especialidad'
    WHEN nombre = 'Café Descafeinado' THEN 'Cafe Descafeinado'
    WHEN nombre = 'Café Mocha' THEN 'Cafe Mocha'
    WHEN nombre = 'Café Latte' THEN 'Cafe Latte'
    ELSE nombre 
  END;

  --modificacion tabla Productos agregando imagen
ALTER TABLE productos 
ADD COLUMN imagen VARCHAR(50);

--actualizando tabla productos
UPDATE productos
SET imagen = 'cafe1.jpg' WHERE id = 1;
UPDATE productos
SET imagen = 'cafe2.jpg' WHERE id = 2;
UPDATE productos
SET imagen = 'cafe3.jpg' WHERE id = 3;
UPDATE productos
SET imagen = 'cafe4.jpg' WHERE id = 4;
UPDATE productos
SET imagen = 'cafe5.jpg' WHERE id = 5;
UPDATE productos
SET imagen = 'cafe6.jpg' WHERE id = 6;