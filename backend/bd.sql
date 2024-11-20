CREATE DATABASE aromas_de_cafe;

\c aromas_de_cafe;

-- Tabla de usuarios
CREATE TABLE public.usuarios (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    calle character varying(100),
    ciudad character varying(50),
    comuna character varying(50),
    rol character varying(15),
    nombre character varying(50)
);

SELECT * FROM usuarios;

-- Tabla de productos (cafés)
CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    imagen character varying(50)
);

SELECT * FROM productos;

-- Tabla de carrito
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    email VARCHAR NOT NULL,
    descripcion TEXT,
    imagen VARCHAR,
    nombre VARCHAR
);

SELECT * FROM carrito;


--agregando administradores
INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('1', 'Anakaren', 'admin@gmail.com', 'Admin', 'jdksfhalkf', 'kdsfjhkljf', 'sdfssagf', 'Administrador');

INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('2', 'Bernardo', 'admin2@gmail.com', 'Admin2', 'Digo de Almagro', 'Calama', 'El Loa', 'Administrador');

INSERT INTO usuarios (id, nombre, email, pass, calle, ciudad, comuna, rol) VALUES 
('3', 'Lucas', 'admin3@gmail.com', 'Admin3', 'vcvcvcvcv', 'cvcvcvcv', 'cvcvcv', 'Administrador');


INSERT INTO public.productos (id, nombre, descripcion, precio, imagen) VALUES
(1, 'Café Arabica', 'Un café suave y aromático con notas de frutas.', 3.99, 'cafe1.jpg'),
(2, 'Café Robusta', 'Café fuerte y con cuerpo, ideal para los amantes del café intenso.', 4.49, 'cafe2.jpg'),
(3, 'Café de Especialidad', 'Café de origen único, seleccionado por su calidad excepcional.', 5.99, 'cafe3.jpg'),
(4, 'Café Descafeinado', 'Café sin cafeína, perfecto para disfrutar en cualquier momento del día.', 3.49, 'cafe4.jpg'),
(5, 'Café Mocha', 'Una mezcla deliciosa de café y chocolate, ideal para los golosos.', 4.99, 'cafe5.jpg'),
(6, 'Café Latte', 'Café suave con leche espumosa, un clásico en cualquier cafetería.', 4.29, 'cafe6.jpg');


--actualizando tabla productos
SELECT * FROM productos;


INSERT INTO public.usuarios (id, email, password, calle, ciudad, comuna, rol, nombre) VALUES
(1, 'admin@gmail.com', 'Admin', 'jdksfhalkf', 'kdsfjhkljf', 'sdfssagf', 'Administrador', 'Anakaren'),
(2, 'admin2@gmail.com', 'Admin2', 'Digo de Almagro', 'Calama', 'El Loa', 'Administrador', 'Bernardo'),
(3, 'admin3@gmail.com', 'Admin3', 'vcvcvcvcv', 'cvcvcvcv', 'cvcvcv', 'Administrador', 'Lucas'),
(5, 'marielaolivaresramos@gmail.com', '$2a$10$XcjINwqEa3vDKiiJtnfk8.ojozDIT6Ud4innaW0WkGQaVhTSTwU5C', 'Diego de Almagro 2382', 'Calama', 'Calama', NULL, 'Mariela Olivares'),
(6, 'sebastianpenaolivares@gmail.com', '$2a$10$wNEzwyVTIMitChkXPuaq/eFwYSHqrC5gcVvkcDNAG6c6fcm0x.hPK', 'Diego de Almagro 2382', 'Calama', 'Calama', NULL, 'Sebastian Peña Olivares'),
(7, 'marcelopenamolina@gmail.com', '$2a$10$R1QiyoI1Cnqr8PGxqR39K.PT0/MWNXuIgXh1xk3Vpju81jhHATgO6', 'Pacifico 2270', 'Calama', 'Calama', 'usuario', 'Marcelo Peña'),
(8, 'marielaolivaresrubia@gmail.com', '$2a$10$/muF7SuhgPyaFyxB1Uftre..Vm3ZbhtygQk.g3e3T6W51g7fLMVTy', 'Diego de Almagro 2382', 'Calama', 'Calama', 'usuario', 'Mariela Olivares Ramos'),
(9, 'yasnapena@gmail.com', '$2a$10$3sqY94pipsDpLVeujf9Bwu9bOmqNZ7xACyWyfmdd./j7lfCVnHx2m', 'calle', 'Calama', 'Calama', 'usuario', 'Yasna Peña'),
(10, 'petete@gmail.com', '$2a$10$ZEGPFKCSxCClabYJohx0yO1VcoINmysvwifFJlc2JIfBymxoxcoYO', 'calama', 'calama', 'calama', 'usuario', 'Petete'),
(11, 'mozita@gmail.com', '$2a$10$PjW.X498kvUhBE7XcVAW.u7GD9f/QfXpoQXIB1cAez7HdYeH.i/pa', 'calama', 'calama', 'calama', 'usuario', 'Mozita'),
(12, 'leo@gmail.com', '$2a$10$7KQSBc5JAMYaGkTU1g32neyd4EdCq/ho/Mjz9rEvXvK8l7QsAqcWa', 'calama', 'calama', 'Calama', 'usuario', 'Leo'),
(13, 'pedro@gmail.com', '$2a$10$LbpiKP2ZHgzO7Yv/n3DTeeVT.hfQ3uQO0EUKvOJvyi8H4XpyTNtLi', 'calama', 'Calama', 'Clama', 'usuario', 'Pedro'),
(14, 'wilson@gmail.com', '$2a$10$vevoFSxLm.ubHnGR2fvN6uIgLGbGLPpP74u7ZwlPChgt12mLtnYwq', 'Calama', 'Calama', 'Calama', 'usuario', 'Wilson'),
(15, 'roberto@gmail.com', '$2a$10$E/v7zueTyM/D0g33kJgQne2PMGDmbJIR/aheVoAzgSp1iGQ9D5YH.', 'Calama', 'Clamaa', 'Clama', 'usuario', 'Roberto');


