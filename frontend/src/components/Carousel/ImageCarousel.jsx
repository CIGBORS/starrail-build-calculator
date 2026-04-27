import React, { useState, useEffect, useCallback } from "react";
import "./ImageCarousel.css";

const images = [
    "caroseul/1banner_4_2.png"
]

export default function Imagecarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if(!isAutoPlaying){
            return;
        }

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    const handleUserInteraction = () => {
        setIsAutoPlaying(false);
    };

    return (
        <div className="carousel-container">
            <div className="carousel-slide">
                <img src={images[currentIndex]} />
            </div>

            <button
                className="carousel-arrow left"
                onClick={() => { prevSlide(); handleUserInteraction();}}
            >
                &#10094;
            </button>

            <button
                className="carousel-arrow right"
                onClick={() => { nextSlide(); handleUserInteraction(); }}
            > 
                &#10095;
            </button>

            <div className="carousel-dots">
                {
                    images.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? "active" : ""}`}
                            onClick={() => { goToSlide(index); handleUserInteraction(); }}
                        />
                    ))
                }
            </div>
        </div>
    )
}