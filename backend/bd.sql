CREATE TABLE public.carrito (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    producto_id integer NOT NULL,
    cantidad integer NOT NULL,
    email character varying NOT NULL,
    descripcion text,
    imagen character varying,
    nombre character varying
);

ALTER TABLE public.carrito OWNER TO postgres;

CREATE SEQUENCE public.carrito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.carrito_id_seq OWNER TO postgres;

ALTER SEQUENCE public.carrito_id_seq OWNED BY public.carrito.id;

CREATE TABLE public.compras (
    id integer NOT NULL,
    usuario_id integer,
    invitado_id integer,
    producto_id integer,
    cantidad integer NOT NULL,
    email character varying(50),
    descripcion text,
    imagen character varying(255),
    nombre character varying(100),
    valor numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.compras OWNER TO postgres;

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.compras_id_seq OWNER TO postgres;
ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;

CREATE TABLE public.invitados (
    id integer NOT NULL,
    nombre_completo character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    telefono character varying(20),
    calle character varying(100),
    numero character varying(10),
    ciudad character varying(50)
);

ALTER TABLE public.invitados OWNER TO postgres;

CREATE SEQUENCE public.invitados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.invitados_id_seq OWNER TO postgres;

ALTER SEQUENCE public.invitados_id_seq OWNED BY public.invitados.id;

CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    imagen character varying(50)
);

ALTER TABLE public.productos OWNER TO postgres;

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

ALTER TABLE public.usuarios OWNER TO postgres;

ALTER TABLE ONLY public.carrito ALTER COLUMN id SET DEFAULT nextval('public.carrito_id_seq'::regclass);
ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);
ALTER TABLE ONLY public.invitados ALTER COLUMN id SET DEFAULT nextval('public.invitados_id_seq'::regclass);


SELECT * FROM public.carrito;

INSERT INTO public.compras (id, usuario_id, invitado_id, producto_id, cantidad, email, descripcion, imagen, nombre, valor, created_at) 
VALUES 
(2, 11, NULL, 2, 1, 'ejemplo@gmail.com', 'Descripción de ejemplo', 'imagen.jpg', 'Café Arabica', 10.00, '2024-11-21 12:52:12.7914'),
(6, 11, NULL, 1, 1, NULL, 'Un café suave y aromático con notas de frutas.', 'cafe1.jpg', 'Café Arabica', NULL, '2024-11-21 13:03:50.49496'),
(7, NULL, 5, NULL, 1, NULL, NULL, NULL, NULL, NULL, '2024-11-22 05:14:35.830036');

INSERT INTO public.invitados (id, nombre_completo, email, telefono, calle, numero, ciudad) 
VALUES 
(4, 'boris', 'boris@gmail.com', '912345677', 'central sur', 2575, 'calama'),
(5, 'pedro Castillo', 'pedroCastillo@gmail.com', '91234567', 'Granaderos', 2575, 'Calama');

INSERT INTO public.productos (id, nombre, descripcion, precio, imagen) 
VALUES 
(1, 'Café Arabica', 'Un café suave y aromático con notas de frutas.', 3.99, 'cafe1.jpg'),
(2, 'Café Robusta', 'Café fuerte y con cuerpo, ideal para los amantes del café intenso.', 4.49, 'cafe2.jpg'),
(3, 'Café de Especialidad', 'Café de origen único, seleccionado por su calidad excepcional.', 5.99, 'cafe3.jpg'),
(4, 'Café Descafeinado', 'Café sin cafeína, perfecto para disfrutar en cualquier momento del día.', 3.49, 'cafe4.jpg'),
(5, 'Café Mocha', 'Una mezcla deliciosa de café y chocolate, ideal para los golosos.', 4.99, 'cafe5.jpg'),
(6, 'Café Latte', 'Café suave con leche espumosa, un clásico en cualquier cafetería.', 4.29, 'cafe6.jpg');


INSERT INTO public.usuarios (id, email, password, calle, ciudad, comuna, rol, nombre) 
VALUES 
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

ALTER TABLE ONLY public.carrito
    ADD CONSTRAINT carrito_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.invitados
    ADD CONSTRAINT invitados_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_invitado_id_fkey FOREIGN KEY (invitado_id) REFERENCES public.invitados(id);

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_producto_id_fkey FOREIGN KEY (producto_id) REFERENCES public.productos(id);

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


SELECT * FROM usuarios;
SELECT * FROM carrito;
SELECT * FROM productos;
SELECT * FROM invitados;

ALTER TABLE usuarios
ALTER COLUMN id DROP NOT NULL;

ALTER TABLE usuarios
ALTER COLUMN id SET DEFAULT nextval('14');

CREATE SEQUENCE usuarios_id_seq;
ALTER TABLE usuarios ALTER COLUMN id SET DEFAULT nextval('usuarios_id_seq');

SELECT MAX(id) FROM usuarios;

SELECT setval('usuarios_id_seq', (SELECT MAX(id) FROM usuarios));