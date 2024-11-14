import React from 'react';
import Slider from 'react-slick';
<<<<<<< HEAD
import '../assets/css/carousel.css';

const images = [
    { src: '/header.jpg', alt: 'Café 1' },
    { src: '/header2.jpg', alt: 'Café 2' },
    { src: '/header3.jpg', alt: 'Café 3' },
    { src: '/header4.jpg', alt: 'Café 4' },
    { src: '/header5.jpg', alt: 'Café 5' },
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1600,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="container-fluid">
            <div className="carousel">
                <Slider {...settings}>
                    {images.map((image, index) => (
                        <div key={index}>
                            <img src={image.src} alt={image.alt} className="carousel-image" />
                        </div>
                    ))}
=======

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
        <div className='carousel-container'>
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

>>>>>>> e4e40319e1243002971e8b885b59829560a6ce4d
                </Slider>
            </div>
        </div>
    );
};

export default Carousel;
