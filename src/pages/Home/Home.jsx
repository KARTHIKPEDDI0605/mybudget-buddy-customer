import React from 'react';
import { Box, Typography, Avatar, Card, Grid,  Container, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EventCarousel from '../../components/EventCarousel/EventCarousel';
import EventTypeGrid from '../../components/EventTypeGrid/EventTypeGrid';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import './Home.css';


// Glassmorphism styled container
const GlassmorphicContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  marginBottom: theme.spacing(4),
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#EFEEEA',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(39, 63, 79, 0.2)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  height: '100%',
  minHeight: '350px',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 10px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
  }
}));


const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  color: '#273F4F',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    backgroundColor: '#077A7D',
    borderRadius: '2px'
  }
}));

const Home = () => {
  const navigate = useNavigate();

  // Handle event type selection
  const handleSelectEventType = (eventType) => {
    navigate(`/service-providers?event=${eventType}`);
  };

  // Testimonial settings for carousel
  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: false,
    adaptiveHeight: false,
    arrows: true,
    className: "testimonial-slider",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Hyderabad",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      text: "I organized my daughter's birthday party through this platform. The cake maker they recommended was exceptional! Will definitely use this service again.",
      rating: 5
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Vijayawada",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      text: "Found an amazing catering service for our office event. The process was smooth and the quality exceeded our expectations.",
      rating: 4
    },
    {
      id: 3,
      name: "Ananya Reddy",
      location: "Visakhapatnam",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Planned my entire wedding through this platform. The vendors were professional and everything went perfectly. Highly recommend!",
      rating: 5
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Guntur",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      text: "Great platform for finding reliable service providers. Used it for my housewarming party and was very satisfied with the results.",
      rating: 4
    },
    {
      id: 5,
      name: "Lakshmi Devi",
      location: "Warangal",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      text: "The platform made it so easy to find the perfect venue for our corporate retreat. Will definitely use it again for future events.",
      rating: 5
    }
  ];



  return (
    <Box className="home-page">
      {/* Hero carousel section - full width */}
      <EventCarousel onSelectEventType={handleSelectEventType} />
      
      {/* Event types grid */}
      <GlassmorphicContainer>
        <EventTypeGrid onSelectEventType={handleSelectEventType} />
      </GlassmorphicContainer>

      {/* Customer Testimonials Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <SectionTitle variant="h2">
          What Our Customers Say
        </SectionTitle>
        
        <Box sx={{ 
          backgroundColor: '#EFEEEA', 
          borderRadius: '16px', 
          padding: { xs: 3, md: 5 }, 
          boxShadow: '0 8px 32px 0 rgba(39, 63, 79, 0.15)',
          minHeight: '450px', // Ensure enough height for the cards
          position: 'relative'
        }}>
          <Box sx={{ 
            position: 'relative',
            '.slick-track': {
              display: 'flex',
              '& .slick-slide': {
                height: 'inherit',
                '& > div': {
                  height: '100%'
                }
              }
            }
          }}>
            <Slider {...testimonialSettings}>
              {testimonials.map((testimonial) => (
                <Box key={testimonial.id} sx={{ px: 2, py: 2, height: '100%' }}>
                  <TestimonialCard>
                    <Box sx={{ display: 'flex', mb: 3 }}>
                      <Avatar 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        sx={{ width: 70, height: 70, mr: 2, border: '3px solid #FE7743' }}
                      />
                      <Box>
                        <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>{testimonial.name}</Typography>
                        <Typography variant="body1" sx={{ color: '#077A7D', fontWeight: 'medium' }}>
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexGrow: 1, mb: 2 }}>
                      <FormatQuoteIcon sx={{ fontSize: 40, color: '#FE7743', opacity: 0.7 }} />
                      <Typography variant="body1" sx={{ ml: 1, fontStyle: 'italic', color: '#273F4F', fontSize: '1.05rem', lineHeight: 1.6 }}>
                        {testimonial.text}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', mt: 'auto', pt: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={`star-${testimonial.id}-${i}`} style={{ color: i < testimonial.rating ? '#FE7743' : '#e0e0e0', fontSize: '24px' }}>★</span>
                      ))}
                    </Box>
                  </TestimonialCard>
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Container>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ my: 8, textAlign: 'center' }}>
        <GlassmorphicContainer>
          <Typography variant="h4" gutterBottom>
            Ready to Plan Your Next Event?
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Browse our selection of service providers and make your event planning stress-free.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large"
            onClick={() => navigate('/service-providers')}
            sx={{ mt: 2, px: 4, py: 1.5, borderRadius: '30px' }}
          >
            Explore Service Providers
          </Button>
        </GlassmorphicContainer>
      </Container>

      {/* Frequently Asked Questions Section */}
      <Container maxWidth="lg" sx={{ my: 10 }}>
        <SectionTitle variant="h2">
          Frequently Asked Questions
        </SectionTitle>
        
        <Box sx={{ backgroundColor: '#EFEEEA', borderRadius: '16px', padding: 4, boxShadow: '0 8px 32px 0 rgba(39, 63, 79, 0.15)' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq1-content"
                  id="faq1-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    How do I search for service providers?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    You can search for service providers by selecting an event type from the homepage, or by using the search bar at the top of the page. You can also filter providers by location, price range, and service type.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq2-content"
                  id="faq2-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    How do I contact a service provider?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    Once you find a service provider you're interested in, simply click on the "Contact" button on their profile. You can then send them a message directly through our platform.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq3-content"
                  id="faq3-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    Are the service providers verified?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    Yes, all service providers on our platform go through a verification process. We check their credentials, reviews, and ensure they meet our quality standards before they can list their services.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq4-content"
                  id="faq4-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    How do I leave a review?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    After you've used a service provider's services, you'll receive an email invitation to leave a review. You can rate your experience and provide feedback that will help other users make informed decisions.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq5-content"
                  id="faq5-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    Can I save my favorite service providers?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    Yes, you can save your favorite service providers by clicking the heart icon on their profile. You can then access your saved providers from your user dashboard.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              
              <Accordion sx={{ 
                mb: 2, 
                backgroundColor: 'transparent', 
                boxShadow: 'none',
                '&:before': {
                  display: 'none',
                },
              }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#077A7D' }} />}
                  aria-controls="faq6-content"
                  id="faq6-header"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    }
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>
                    What if I need to cancel a booking?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 2 }}>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    Cancellation policies vary by service provider. You can find the specific cancellation policy on each provider's profile. If you need to cancel, please contact the provider directly through our messaging system.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;