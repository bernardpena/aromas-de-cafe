CREATE DATABASE aromas_de_cafe;

\c aromas_de_cafe;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  calle VARCHAR(255),
  ciudad VARCHAR(255),
  comuna VARCHAR(255)
);

-- Tabla de productos (cafés)
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10, 2) NOT NULL
);

-- Tabla de carrito
CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id),
  producto_id INTEGER REFERENCES productos(id),
  cantidad INTEGER DEFAULT 1
);

INSERT INTO productos (nombre, descripcion, precio) VALUES 
('Café Arábica', 'Un café suave y aromático con notas de frutas.', 3.99),
('Café Robusta', 'Café fuerte y con cuerpo, ideal para los amantes del café intenso.', 4.49),
('Café de Especialidad', 'Café de origen único, seleccionado por su calidad excepcional.', 5.99),
('Café Descafeinado', 'Café sin cafeína, perfecto para disfrutar en cualquier momento del día.', 3.49),
('Café Mocha', 'Una mezcla deliciosa de café y chocolate, ideal para los golosos.', 4.99),
('Café Latte', 'Café suave con leche espumosa, un clásico en cualquier cafetería.', 4.29);

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
