import React from 'react';
import Slider from 'react-slick';
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
    };

    return (
        <div className="carousel">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image.src} alt={image.alt} className="carousel-image" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;