import React from 'react';
import Slider from 'react-slick';

const Carousel = () => {
    const settings = {
        dots: true, // Muestra puntos de navegación
        infinite: true, // Carrusel infinito
        speed: 1600, // Velocidad de transición
        slidesToShow: 1, // Cuántas imágenes mostrar
        slidesToScroll: 1, // Cuántas imágenes desplazarse
        autoplay: true, // Habilita el movimiento automático
        autoplaySpeed: 3500, // Tiempo en milisegundos antes de que cambie la imagen (3 segundos)
        pauseOnHover: false,
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                <div>
                    <img src="../../public/header.jpg" alt="Café 1" className="carousel-image" />
                </div>
                <div>
                    <img src="../../public/header2.jpg" alt="Café 2" className="carousel-image" />
                </div>
                <div>
                    <img src="../../public/header3.jpg" alt="Café 3" className="carousel-image" />
                </div>
                <div>
                    <img src="../../public/header4.jpg" alt="Café 3" className="carousel-image" />
                </div>
                <div>
                    <img src="../../public/header5.jpg" alt="Café 3" className="carousel-image" />
                </div>

            </Slider>
        </div>
    );
};

export default Carousel;
