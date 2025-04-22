import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Chip, 
  Rating, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Divider,
  Avatar,
  Paper,
  ImageList,
  ImageListItem,
  Modal,
  Backdrop,
  Fade,
  IconButton,
  InputAdornment,
  Grid as GridLegacy,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CakeIcon from '@mui/icons-material/Cake';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import StarIcon from '@mui/icons-material/Star';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './ServiceProviders.css';

// Glassmorphism styled container
const GlassmorphicContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  border: '1px solid rgba(255, 255, 255, 0.18)',
  marginBottom: theme.spacing(4),
}));

const ProviderCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const ServiceProviders = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const eventType = queryParams.get('event') || 'all';

  // State for filters and providers
  const [serviceType, setServiceType] = useState('all');
  const [city, setCity] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [openGallery, setOpenGallery] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Pagination state
  const [page, setPage] = useState(1);
  const [providersPerPage] = useState(9);
  const [paginatedProviders, setPaginatedProviders] = useState([]);

  // Mock data for service types based on event type
  const getServiceTypes = useCallback((eventType) => {
    switch(eventType) {
      case 'birthday':
        return [
          { id: 'cake', name: 'Cake Maker', icon: <CakeIcon /> },
          { id: 'catering', name: 'Catering', icon: <FastfoodIcon /> },
          { id: 'maid', name: 'Maid Service', icon: <CleaningServicesIcon /> },
          { id: 'dj', name: 'DJ/Music', icon: <MusicNoteIcon /> }
        ];
      case 'corporate':
        return [
          { id: 'venue', name: 'Venue', icon: <BusinessCenterIcon /> },
          { id: 'catering', name: 'Catering', icon: <RestaurantIcon /> },
          { id: 'bar', name: 'Bar Service', icon: <LocalBarIcon /> },
          { id: 'photography', name: 'Photography', icon: <CameraAltIcon /> }
        ];
      case 'wedding':
        return [
          { id: 'venue', name: 'Venue', icon: <BusinessCenterIcon /> },
          { id: 'catering', name: 'Catering', icon: <RestaurantIcon /> },
          { id: 'photography', name: 'Photography', icon: <CameraAltIcon /> },
          { id: 'music', name: 'Music/Band', icon: <MusicNoteIcon /> }
        ];
      default:
        return [
          { id: 'venue', name: 'Venue', icon: <BusinessCenterIcon /> },
          { id: 'catering', name: 'Catering', icon: <RestaurantIcon /> },
          { id: 'cleaning', name: 'Cleaning', icon: <CleaningServicesIcon /> },
          { id: 'entertainment', name: 'Entertainment', icon: <MusicNoteIcon /> }
        ];
    }
  }, []);

  // Cities in Andhra Pradesh and Telangana
  const cities = [
    // Andhra Pradesh
    'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 
    'Rajahmundry', 'Tirupati', 'Kakinada', 'Kadapa', 'Anantapur',
    // Telangana
    'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam',
    'Ramagundam', 'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Suryapet'
  ];
  
  // Get specialties based on service type
  const getSpecialties = (serviceType) => {
    const specialtiesMap = {
      'cake': ['Birthday Cakes', 'Wedding Cakes', 'Custom Designs', 'Fondant Art', 'Cupcakes', 'Pastries'],
      'catering': ['South Indian', 'North Indian', 'Continental', 'Buffet Style', 'Plated Service', 'Vegetarian'],
      'maid': ['Event Setup', 'Cleanup Services', 'Waitstaff', 'Bartending', 'Full-Service Staffing'],
      'dj': ['Wedding DJ', 'Corporate Events', 'Club DJ', 'Sound Equipment', 'Lighting Effects'],
      'venue': ['Banquet Halls', 'Outdoor Venues', 'Rooftop Spaces', 'Conference Rooms', 'Garden Venues'],
      'bar': ['Cocktail Service', 'Wine Selection', 'Full Bar Setup', 'Signature Drinks', 'Mobile Bar'],
      'photography': ['Wedding Photography', 'Event Coverage', 'Portrait Sessions', 'Drone Photography', 'Video Services'],
      'music': ['Live Bands', 'Solo Performers', 'Classical Music', 'Contemporary Artists', 'Fusion Music'],
      'cleaning': ['Pre-event Cleaning', 'Post-event Cleanup', 'Deep Cleaning', 'Same-day Service'],
      'entertainment': ['Live Performances', 'Magic Shows', 'Game Setups', 'Interactive Activities']
    };
    
    // Return specialties for the given service type or a default list
    return specialtiesMap[serviceType] || ['Professional Service', 'Custom Solutions', 'Quality Work', 'Timely Delivery'];
  };

  // Generate mock service providers
  const generateMockProviders = useCallback(() => {
    const serviceTypes = getServiceTypes(eventType);
    const mockProviders = [];
    
    // Generate 5 providers for each service type
    serviceTypes.forEach(service => {
      cities.forEach((city, cityIndex) => {
        if (cityIndex < 5) { // Limit to 5 cities per service type
          // Generate 6 portfolio images for each provider
          const portfolioImages = [];
          for (let i = 1; i <= 6; i++) {
            portfolioImages.push(`https://source.unsplash.com/random/300x300/?${service.id},${i}`);
          }
          
          const provider = {
            id: `${service.id}-${cityIndex}`,
            name: `${city} ${service.name} ${cityIndex + 1}`,
            serviceType: service.id,
            serviceTypeName: service.name,
            city: city,
            address: `${Math.floor(Math.random() * 100) + 1} Main Street, ${city}`,
            priceRange: Math.floor(Math.random() * 3) + 1, // 1: Budget, 2: Mid-range, 3: Premium
            rating: (Math.random() * 2 + 3).toFixed(1), // Rating between 3.0 and 5.0
            reviews: Math.floor(Math.random() * 50) + 5,
            image: `https://source.unsplash.com/random/300x200/?${service.id}`,
            profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70) + 1}.jpg`,
            description: `Professional ${service.name.toLowerCase()} service with years of experience in ${eventType} events.`,
            portfolioImages: portfolioImages,
            experience: Math.floor(Math.random() * 10) + 3, // 3-13 years of experience
            specialties: getSpecialties(service.id)
          };
          mockProviders.push(provider);
        }
      });
    });
    
    return mockProviders;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType]);

  // Initialize providers on component mount or when event type changes
  useEffect(() => {
    const mockProviders = generateMockProviders();
    setProviders(mockProviders);
    setFilteredProviders(mockProviders);
    // Reset filters when event type changes
    setServiceType('all');
    setCity('all');
    setPriceRange('all');
    setSearchTerm('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventType]);

  // Apply filters when any filter changes
  useEffect(() => {
    let filtered = [...providers];
    
    // Apply service type filter
    if (serviceType !== 'all') {
      filtered = filtered.filter(provider => provider.serviceType === serviceType);
    }
    
    // Apply city filter
    if (city !== 'all') {
      filtered = filtered.filter(provider => provider.city === city);
    }
    
    // Apply price range filter
    if (priceRange !== 'all') {
      filtered = filtered.filter(provider => provider.priceRange === parseInt(priceRange));
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(provider => 
        provider.name.toLowerCase().includes(term) || 
        provider.description.toLowerCase().includes(term) ||
        provider.city.toLowerCase().includes(term)
      );
    }
    
    setFilteredProviders(filtered);
    setPage(1); // Reset to first page when filters change
  }, [serviceType, city, priceRange, searchTerm, providers]);
  
  // Handle pagination
  useEffect(() => {
    const indexOfLastProvider = page * providersPerPage;
    const indexOfFirstProvider = indexOfLastProvider - providersPerPage;
    setPaginatedProviders(filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider));
  }, [filteredProviders, page, providersPerPage]);
  
  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
    // Scroll to top of results
    window.scrollTo({
      top: document.querySelector('.service-providers-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  // Get event title based on event type
  const getEventTitle = () => {
    switch(eventType) {
      case 'birthday': return 'Birthday Parties';
      case 'wedding': return 'Weddings';
      case 'corporate': return 'Corporate Events';
      case 'holiday': return 'Holiday Celebrations';
      case 'graduation': return 'Graduations';
      case 'baby-shower': return 'Baby Showers';
      case 'dinner-party': return 'Dinner Parties';
      case 'nightlife': return 'Nightlife Events';
      default: return 'All Events';
    }
  };

  // Handle chat button click
  const handleChatClick = (providerId) => {
    navigate(`/chat/${providerId}`);
  };

  // Get price range label
  const getPriceRangeLabel = (range) => {
    switch(range) {
      case 1: return 'Budget';
      case 2: return 'Mid-range';
      case 3: return 'Premium';
      default: return 'All Prices';
    }
  };
  
  // Get color for price range chip
  const getPriceRangeColor = (range) => {
    switch(range) {
      case 1: return 'success';
      case 2: return 'primary';
      case 3: return 'secondary';
      default: return 'default';
    }
  };
  
  // Handle opening the gallery modal
  const handleOpenGallery = (images) => {
    setSelectedImages(images);
    setCurrentImageIndex(0);
    setOpenGallery(true);
  };
  
  // Handle closing the gallery modal
  const handleCloseGallery = () => {
    setOpenGallery(false);
  };
  
  // Navigate to the next image in the gallery
  const handleNextImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === selectedImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Navigate to the previous image in the gallery
  const handlePrevImage = (event) => {
    event.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? selectedImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Service Providers for {getEventTitle()}
      </Typography>
      
      {/* Filters Section */}
      <GlassmorphicContainer sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        
        <GridLegacy container spacing={2}>
          {/* Service Type Filter */}
          <GridLegacy item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Service Type</InputLabel>
              <Select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                label="Service Type"
              >
                <MenuItem value="all">All Services</MenuItem>
                {getServiceTypes(eventType).map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {service.icon}
                      <Box sx={{ ml: 1 }}>{service.name}</Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridLegacy>
          
          {/* City Filter */}
          <GridLegacy item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>City</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                label="City"
              >
                <MenuItem value="all">All Cities</MenuItem>
                {cities.map((cityName) => (
                  <MenuItem key={cityName} value={cityName}>{cityName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </GridLegacy>
          
          {/* Price Range Filter */}
          <GridLegacy item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                label="Price Range"
              >
                <MenuItem value="all">All Prices</MenuItem>
                <MenuItem value="1">Budget</MenuItem>
                <MenuItem value="2">Mid-range</MenuItem>
                <MenuItem value="3">Premium</MenuItem>
              </Select>
            </FormControl>
          </GridLegacy>
          
          {/* Search */}
          <GridLegacy item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search providers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  )
                }
              }}
            />
          </GridLegacy>
        </GridLegacy>
      </GlassmorphicContainer>
      
      {/* Results Count */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body1">
          Showing {filteredProviders.length} service providers
        </Typography>
        
        {/* Active Filters */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {serviceType !== 'all' && (
            <Chip 
              label={`Service: ${getServiceTypes(eventType).find(s => s.id === serviceType)?.name}`} 
              onDelete={() => setServiceType('all')} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
          {city !== 'all' && (
            <Chip 
              label={`City: ${city}`} 
              onDelete={() => setCity('all')} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
          {priceRange !== 'all' && (
            <Chip 
              label={`Price: ${getPriceRangeLabel(parseInt(priceRange))}`} 
              onDelete={() => setPriceRange('all')} 
              size="small" 
              color="primary" 
              variant="outlined"
            />
          )}
        </Box>
      </Box>
      
      {/* Service Providers Grid */}
      <Box className="service-providers-container">
        <GridLegacy container spacing={3}>
          {filteredProviders.length > 0 ? (
            paginatedProviders.map((provider) => (
              <GridLegacy item xs={12} sm={6} md={4} key={provider.id}>
                <ProviderCard>
                <CardMedia
                  component="img"
                  height="160"
                  image={provider.image}
                  alt={provider.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={provider.profileImage} sx={{ width: 50, height: 50, mr: 2 }} />
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        {provider.name}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={provider.serviceTypeName} 
                        sx={{ mr: 1, backgroundColor: 'rgba(63, 81, 181, 0.1)', color: 'primary.main' }} 
                      />
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {provider.city}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Rating value={parseFloat(provider.rating)} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({provider.reviews} reviews)
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {provider.description}
                  </Typography>
                  
                  {/* Experience and Specialties */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <WorkHistoryIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        {provider.experience} years of experience
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <StarIcon fontSize="small" color="primary" sx={{ mr: 1, mt: 0.5 }} />
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          Specialties:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                          {provider.specialties.slice(0, 3).map((specialty) => (
                            <Chip 
                              key={`${provider.id}-${specialty}`} 
                              label={specialty} 
                              size="small" 
                              variant="outlined"
                              sx={{ fontSize: '0.7rem' }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Portfolio Gallery */}
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" fontWeight="medium" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PhotoLibraryIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                      Portfolio
                    </Typography>
                    <ImageList sx={{ width: '100%', height: 120 }} cols={3} rowHeight={120} gap={4}>
                      {provider.portfolioImages.slice(0, 3).map((item, index) => (
                        <ImageListItem 
                          key={`${provider.id}-${item}`} 
                          sx={{ 
                            cursor: 'pointer',
                            '&:hover': { opacity: 0.8 }
                          }}
                          onClick={() => handleOpenGallery(provider.portfolioImages)}
                        >
                          <img
                            src={item}
                            alt={`Portfolio ${index + 1}`}
                            loading="lazy"
                            style={{ borderRadius: '4px' }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={getPriceRangeLabel(provider.priceRange)} 
                      size="small" 
                      color={getPriceRangeColor(provider.priceRange)} 
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<ChatIcon />}
                      onClick={() => handleChatClick(provider.id)}
                    >
                      Contact
                    </Button>
                  </Box>
                </CardContent>
              </ProviderCard>
            </GridLegacy>
          ))
        ) : (
          <Box sx={{ width: '100%', textAlign: 'center', py: 5 }}>
            <Typography variant="h6" color="text.secondary">
              No service providers found matching your criteria.
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              sx={{ mt: 2 }}
              onClick={() => {
                setServiceType('all');
                setCity('all');
                setPriceRange('all');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </Button>
          </Box>
        )}
      </GridLegacy>
        
        {/* Pagination */}
        {filteredProviders.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
            <Pagination 
              count={Math.ceil(filteredProviders.length / providersPerPage)} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
      
      {/* Image Gallery Modal */}
      <Modal
        open={openGallery}
        onClose={handleCloseGallery}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={openGallery}>
          <Box sx={{ 
            position: 'relative',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            maxWidth: '90vw',
            maxHeight: '90vh',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              zIndex: 10,
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%'
            }}>
              <IconButton onClick={handleCloseGallery} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              <img
                src={selectedImages[currentImageIndex]}
                alt={`Portfolio item ${currentImageIndex + 1}`}
                style={{ 
                  display: 'block',
                  maxWidth: '90vw',
                  maxHeight: '80vh',
                  width: 'auto',
                  height: 'auto'
                }}
              />
              
              {/* Navigation arrows */}
              <IconButton 
                onClick={handlePrevImage}
                sx={{ 
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              
              <IconButton 
                onClick={handleNextImage}
                sx={{ 
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(0,0,0,0.5)',
                  color: 'white',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
            
            {/* Thumbnails */}
            <Box sx={{ 
              display: 'flex',
              p: 1,
              bgcolor: '#f5f5f5',
              overflowX: 'auto'
            }}>
              {selectedImages.map((img, index) => (
                <Box
                  key={img}
                  onClick={() => setCurrentImageIndex(index)}
                  sx={{
                    width: 60,
                    height: 60,
                    flexShrink: 0,
                    m: 0.5,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: index === currentImageIndex ? '2px solid #3f51b5' : '2px solid transparent',
                  }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default ServiceProviders;