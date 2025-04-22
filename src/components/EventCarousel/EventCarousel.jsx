import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import './EventCarousel.css';

const EventCarousel = ({ onSelectEventType }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      id: "slide-birthday",
      title: "Birthday Celebrations",
      description: "Consult all the service providers for your Birthday events and create unforgettable memories.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcysbNvuEccmO1O8yWH2y-Uruljwin09swUw&s",
      buttonText: "Explore Birthday Party Services",
      eventType: "birthday"
    },
    {
      id: "slide-corporate",
      title: "Office Parties",
      description: "Plan the perfect corporate event with our network of trusted service providers.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDOAqCLndSRM9HCufpFHnL9-kgItOcQ1_Khw&s",
      buttonText: "Discover Corporate Event Services",
      eventType: "corporate"
    },
    {
      id: "slide-holiday",
      title: "Holiday Events",
      description: "Make your holiday celebrations special with our selection of event planners and venues.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-6ncKV7jDxOY6_0UUP9zWbU78uEtWg0NcRQ&s",
      buttonText: "Find Holiday Event Services",
      eventType: "holiday"
    },
    {
      id: "slide-wedding",
      title: "Wedding Events",
      description: "Create your dream wedding with our curated list of wedding planners and service providers.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGtckVQcJGrv4Lv4cffiKC6l1P_uLQnqgEA&s",
      buttonText: "Browse Wedding Services",
      eventType: "wedding"
    }
  ];

  // Auto slide change every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setActiveSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setActiveSlide(prevSlide => (prevSlide + 1) % slides.length);
  };

  const navigate = useNavigate();
  
  const handleExploreClick = (eventType) => {
    if (onSelectEventType) {
      onSelectEventType(eventType);
      navigate(`/service-providers?event=${eventType}`);
    }
  };

  return (
    <Box className="event-carousel">
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.image})`,
          }}
        >
          <Box className="carousel-content">
            <Typography variant="h2" className="slide-title">
              {slide.title}
            </Typography>
            <Typography variant="h6" className="slide-description">
              {slide.description}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              className="slide-button"
              onClick={() => handleExploreClick(slide.eventType)}
            >
              {slide.buttonText}
            </Button>
          </Box>
        </Box>
      ))}
      
      {/* Navigation Arrows - Fixed positioning */}
      <Box className="carousel-nav-container">
        <IconButton 
          className="carousel-arrow carousel-arrow-left" 
          onClick={handlePrevSlide}
          aria-label="Previous slide"
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        
        <IconButton 
          className="carousel-arrow carousel-arrow-right" 
          onClick={handleNextSlide}
          aria-label="Next slide"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      
      {/* Slide Indicators */}
      <Box className="carousel-indicators">
        {slides.map((slide, index) => (
          <button 
            key={`indicator-${slide.id}`} 
            className={`indicator ${index === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setActiveSlide(index);
              }
            }}
            aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            tabIndex={0}
          />
        ))}
      </Box>
    </Box>
  );
};

EventCarousel.propTypes = {
  onSelectEventType: PropTypes.func
};

export default EventCarousel;