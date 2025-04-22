import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import CelebrationIcon from '@mui/icons-material/Celebration';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PropTypes from 'prop-types';
import './EventTypeGrid.css';

const EventTypeGrid = ({ onSelectEventType }) => {
  const navigate = useNavigate();
  
  const eventTypes = [
    {
      id: 'birthday',
      title: 'Birthday Parties',
      icon: <CakeIcon fontSize="large" />,
      color: '#e91e63',
      description: 'Find the perfect cake makers, decorators, and venues for your birthday celebration.'
    },
    {
      id: 'wedding',
      title: 'Weddings',
      icon: <FavoriteIcon fontSize="large" />,
      color: '#9c27b0',
      description: 'Discover wedding planners, photographers, and caterers for your special day.'
    },
    {
      id: 'corporate',
      title: 'Corporate Events',
      icon: <BusinessCenterIcon fontSize="large" />,
      color: '#2196f3',
      description: 'Connect with venues, caterers, and event planners for your next business function.'
    },
    {
      id: 'holiday',
      title: 'Holiday Celebrations',
      icon: <CelebrationIcon fontSize="large" />,
      color: '#ff9800',
      description: 'Find decorators, caterers, and entertainment for your holiday parties.'
    },
    {
      id: 'graduation',
      title: 'Graduations',
      icon: <SchoolIcon fontSize="large" />,
      color: '#4caf50',
      description: 'Celebrate academic achievements with the right venue and catering services.'
    },
    {
      id: 'baby-shower',
      title: 'Baby Showers',
      icon: <ChildCareIcon fontSize="large" />,
      color: '#00bcd4',
      description: 'Plan the perfect baby shower with specialized decorators and caterers.'
    },
    {
      id: 'dinner-party',
      title: 'Dinner Parties',
      icon: <RestaurantIcon fontSize="large" />,
      color: '#795548',
      description: 'Find private chefs, caterers, and table setting services for intimate gatherings.'
    },
    {
      id: 'nightlife',
      title: 'Nightlife Events',
      icon: <NightlifeIcon fontSize="large" />,
      color: '#607d8b',
      description: 'Discover DJs, venues, and entertainment for your night out.'
    }
  ];

  const handleEventTypeClick = (eventType) => {
    if (onSelectEventType) {
      onSelectEventType(eventType);
      navigate(`/service-providers?event=${eventType}`);
    }
  };

  return (
    <Box className="event-type-grid">
      <Typography variant="h4" className="section-title">
        Browse by Event Type
      </Typography>
      
      <Grid container spacing={3} className="event-grid">
        {eventTypes.map((event) => (
          <Grid 
            item
            key={event.id}
            xs={12}
            sm={6}
            md={3}
            sx={{ mb: 3 }}
          >
            <Card 
              className="event-type-card"
              onClick={() => handleEventTypeClick(event.id)}
              sx={{ 
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '&:hover': { 
                  boxShadow: `0 8px 20px rgba(0, 0, 0, 0.15)`,
                  borderColor: event.color
                }
              }}
            >
              <Box 
                className="event-icon-container"
                sx={{ backgroundColor: `${event.color}20`, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box className="event-icon" sx={{ color: event.color }}>
                  {event.icon}
                </Box>
              </Box>
              <CardContent className="event-card-content" sx={{ padding: '10px !important' }}>
                <Typography variant="h6" className="event-title" sx={{ fontSize: '1rem !important' }}>
                  {event.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

EventTypeGrid.propTypes = {
  onSelectEventType: PropTypes.func
};

export default EventTypeGrid;
