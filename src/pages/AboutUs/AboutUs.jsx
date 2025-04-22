import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Avatar,
  Button,
  Stack,
  Link,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  CheckCircle as CheckCircleIcon,
  Lightbulb as LightbulbIcon,
  Public as PublicIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  School as SchoolIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Code as CodeIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

// Import founder images
import karthikImage from '../../assets/karthik.jpg';
import gangaImage from '../../assets/WhatsApp Image 2025-04-22 at 23.32.14.jpeg';
import sreeImage from '../../assets/WhatsApp Image 2025-04-22 at 23.32.15.jpeg';
import './AboutUs.css';

// Styled components with new brand colors
const StyledSection = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  position: 'relative',
  '&:nth-of-type(odd)': {
    backgroundColor: '#f8f9fa',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  position: 'relative',
  color: '#273F4F',
}));

// We're using inline styling for accent text with the brand color #FE7743
const FounderCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  overflow: 'hidden',
  backgroundColor: '#EFEEEA',
  boxShadow: '0 10px 30px rgba(39, 63, 79, 0.15)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(39, 63, 79, 0.25)',
  },
}));

const FounderAvatar = styled(Avatar)(({ theme }) => ({
  width: 180,
  height: 180,
  margin: '0 auto 20px',
  border: '4px solid #FE7743',
  boxShadow: '0 10px 20px rgba(254, 119, 67, 0.2)',
}));

// Card for displaying company values
const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  borderRadius: '16px',
  backgroundColor: '#EFEEEA',
  boxShadow: '0 8px 24px rgba(39, 63, 79, 0.12)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 30px rgba(39, 63, 79, 0.2)',
  },
}));

// Wrapper for icons in value cards
const IconWrapper = styled(Box)(({ theme }) => ({
  width: 70,
  height: 70,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  background: 'linear-gradient(135deg, #077A7D 0%, #273F4F 100%)',
  color: '#ffffff',
  boxShadow: '0 8px 20px rgba(7, 122, 125, 0.2)',
}));

// Timeline item for the journey section
const TimelineItem = styled(Paper)(({ theme, isLeft }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  backgroundColor: '#EFEEEA',
  position: 'relative',
  marginBottom: theme.spacing(4),
  width: '48%',
  alignSelf: isLeft ? 'flex-start' : 'flex-end',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20px',
    [isLeft ? 'right' : 'left']: '-15px',
    width: '30px',
    height: '30px',
    backgroundColor: '#FE7743',
    borderRadius: '50%',
    zIndex: 1,
    transform: isLeft ? 'translateX(50%)' : 'translateX(-50%)',
  },
}));

// Founders data - NIT Rourkela alumni
const FOUNDERS = [
  {
    id: 1,
    name: 'Ganga Paramesh Yenuganti',
    role: 'Co-Founder & CEO',
    bio: 'Ganga brings strategic vision and business acumen to MyBudgetBuddy. An NIT Rourkela alumnus (B.Tech in Civil Engineering, 2024), she oversees company operations and growth strategy.',
    avatar: gangaImage,
    education: 'B.Tech in Civil Engineering, NIT Rourkela',
    graduationYear: '2024',
    linkedin: 'https://linkedin.com/in/gangaparamesh',
    twitter: 'https://twitter.com/gangaparamesh',
    email: 'ganga@mybudgetbuddy.com',
    icon: <BusinessIcon fontSize="large" />,
  },
  {
    id: 2,
    name: 'Karthik Peddi',
    role: 'Co-Founder & CTO',
    bio: 'Karthik is a tech visionary with expertise in building scalable software solutions. As an NIT Rourkela alumnus (B.Tech in Biotechnology Engineering, 2024), he leads the technical direction and innovation strategy of MyBudgetBuddy.',
    avatar: karthikImage,
    education: 'B.Tech in Biotechnology Engineering, NIT Rourkela',
    graduationYear: '2024',
    linkedin: 'https://linkedin.com/in/karthikpeddi',
    twitter: 'https://twitter.com/karthikpeddi',
    email: 'karthik@mybuddybudget.com',
    icon: <CodeIcon fontSize="large" />,
  },
  {
    id: 3,
    name: 'Sree Vardhana Pulyakula',
    role: 'Co-Founder & COO',
    bio: 'Sree excels in operations and customer experience. As an NIT Rourkela alumnus (B.Tech in Civil Engineering, 2024), he ensures smooth operations and exceptional service delivery.',
    avatar: sreeImage,
    education: 'B.Tech in Civil Engineering, NIT Rourkela',
    graduationYear: '2024',
    linkedin: 'https://linkedin.com/in/sreevardhana',
    twitter: 'https://twitter.com/sreevardhana',
    email: 'sree@mybudgetbuddy.com',
    icon: <LocationIcon fontSize="large" />,
  },
];

// Company values
const COMPANY_VALUES = [
  {
    id: 1,
    title: 'Customer-Centric',
    description: "We put our customers at the center of everything we do, ensuring their event planning experience is seamless and enjoyable.",
    icon: <CheckCircleIcon fontSize="large" />,
  },
  {
    id: 2,
    title: 'Innovation',
    description: 'We continuously innovate our platform with cutting-edge technology to provide the best solutions for event planning needs.',
    icon: <LightbulbIcon fontSize="large" />,
  },
  {
    id: 3,
    title: 'Transparency',
    description: 'We believe in transparent pricing and clear communication between customers and service providers.',
    icon: <PublicIcon fontSize="large" />,
  },
  {
    id: 4,
    title: 'Security',
    description: 'We prioritize the security of user data and transactions, implementing robust measures to protect our community.',
    icon: <SecurityIcon fontSize="large" />,
  },
  {
    id: 5,
    title: 'Efficiency',
    description: 'We strive to make the event planning process as efficient as possible, saving our users time and effort.',
    icon: <SpeedIcon fontSize="large" />,
  },
];

// Milestones - Updated to start from 2025
const MILESTONES = [
  {
    id: 1,
    year: 'January 2025',
    title: 'Company Founded',
    description: 'MyBudgetBuddy was founded by three NIT Rourkela alumni with a vision to revolutionize event planning through technology.',
  },
  {
    id: 2,
    year: 'March 2025',
    title: 'Beta Launch',
    description: 'We launched our beta platform with 50+ service providers across Hyderabad and Bangalore.',
  },
  {
    id: 3,
    year: 'June 2025',
    title: 'Official Launch',
    description: 'After successful beta testing, we officially launched MyBudgetBuddy with enhanced features and expanded service provider network.',
  },
  {
    id: 4,
    year: 'August 2025',
    title: 'Mobile App Release',
    description: 'Released our mobile application for Android and iOS to provide a seamless on-the-go experience for users.',
  },
  {
    id: 5,
    year: 'October 2025',
    title: 'Expansion to 10 Cities',
    description: 'Expanded our services to 10 major cities across India with 500+ verified service providers.',
  },
  {
    id: 6,
    year: 'December 2025',
    title: 'First Funding Round',
    description: 'Secured seed funding to accelerate growth, enhance platform capabilities, and expand our team.',
  },
];

const AboutUs = () => {
  const navigate = useNavigate();
  
  return (
    <Box className="about-us-page">
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #f8f9fa 0%, #EFEEEA 100%)',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  color: '#273F4F',
                  mb: 3
                }}
              >
                About MyBudgetBuddy
              </Typography>
              <Typography variant="h5" component="h2" sx={{ mb: 3, color: '#FE7743', fontWeight: 700 }}>
                Simplifying Event Planning Since 2025
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.7, mb: 4 }}>
                MyBudgetBuddy is your one-stop solution to find the perfect service providers for all your event needs. 
                Founded in January 2025 by three NIT Rourkela alumni, we connect customers with trusted professionals 
                to make every event memorable while staying within budget.
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={() => navigate('/service-providers')}
                sx={{ 
                  background: 'linear-gradient(45deg, #8a2be2, #fc8019)',
                  borderRadius: '30px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0 10px 20px rgba(138, 43, 226, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #7b27cc, #e67316)',
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 30px rgba(138, 43, 226, 0.4)',
                  }
                }}
              >
                Explore Services
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" component="h2">
            Our Story
          </SectionTitle>
          
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" sx={{ mb: 3, color: '#273F4F', fontSize: '1.1rem', lineHeight: 1.7 }}>
                MyBudgetBuddy was born out of a simple yet powerful idea: to make event planning hassle-free and budget-friendly. 
                Our three founders from NIT Rourkela experienced firsthand the challenges of finding reliable service providers for events.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: '#273F4F', fontSize: '1.1rem', lineHeight: 1.7 }}>
                After spending weeks searching for vendors, comparing prices, and reading reviews across multiple platforms, 
                they realized there was a need for a unified platform that could connect customers with trusted service providers for all event needs.
              </Typography>
              <Typography variant="body1" sx={{ color: '#273F4F', fontSize: '1.1rem', lineHeight: 1.7 }}>
                In January 2025, MyBudgetBuddy was launched with a mission to simplify the event planning process. We started with just a handful of service 
                providers in Hyderabad and Bangalore, and we're rapidly expanding across India with verified professionals on our platform.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                p: 4,
                backgroundColor: 'rgba(7, 122, 125, 0.05)',
                borderRadius: '20px',
                boxShadow: '0 10px 30px rgba(39, 63, 79, 0.1)',
              }}>
                <Typography variant="h4" sx={{ mb: 3, color: '#077A7D', fontWeight: 'bold', textAlign: 'center' }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" sx={{ color: '#273F4F', fontSize: '1.1rem', lineHeight: 1.7, textAlign: 'center' }}>
                  To simplify event planning by connecting customers with trusted service providers, making every celebration memorable and stress-free.
                </Typography>
                <Box sx={{ 
                  mt: 4, 
                  p: 3, 
                  borderRadius: '12px', 
                  backgroundColor: 'rgba(254, 119, 67, 0.1)',
                  border: '1px solid rgba(254, 119, 67, 0.3)',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  <Typography variant="h6" sx={{ color: '#FE7743', fontWeight: 'bold', mb: 1 }}>
                    Our Promise
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#273F4F' }}>
                    Quality service providers, transparent pricing, and exceptional customer support for all your event needs.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </StyledSection>

      {/* Our Values Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" component="h2">
            Our Values
          </SectionTitle>
          
          <Box sx={{ mt: 4 }}>
            <Grid 
              container 
              spacing={4} 
              sx={{ 
                justifyContent: 'center',
              }}
            >
              {COMPANY_VALUES.map((value) => (
                <Grid 
                  item 
                  xs={12} 
                  sm={6} 
                  md={4} 
                  key={value.id}
                >
                  <Box sx={{ height: { xs: '300px', sm: '350px' } }}>
                    <ValueCard>
                      <CardContent sx={{ 
                        textAlign: 'center', 
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <IconWrapper>
                          {value.icon}
                        </IconWrapper>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            mb: 2, 
                            fontWeight: 'bold', 
                            color: '#273F4F'
                          }}
                        >
                          {value.title}
                        </Typography>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#273F4F',
                            flexGrow: 1
                          }}
                        >
                          {value.description}
                        </Typography>
                      </CardContent>
                    </ValueCard>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </StyledSection>

      {/* Meet Our Founders Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" component="h2">
            Meet Our Founders
          </SectionTitle>
          
          <Typography variant="h6" align="center" sx={{ maxWidth: '800px', mx: 'auto', mb: 6, color: '#273F4F' }}>
            Our company was founded in January 2025 by three visionary alumni from{' '}
            <Typography component="span" sx={{ color: '#FE7743', fontWeight: 700 }}>
              National Institute of Technology, Rourkela
            </Typography>
            , who shared a common vision of transforming the event planning industry.
          </Typography>
          
          <Grid container spacing={4}>
            {FOUNDERS.map((founder) => (
              <Grid item xs={12} md={4} key={founder.id}>
                <FounderCard>
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <FounderAvatar 
                      src={founder.avatar} 
                      alt={founder.name}
                    />
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                      {founder.name}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom sx={{ color: '#FE7743', fontWeight: 'bold' }}>
                      {founder.role}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                      <SchoolIcon sx={{ color: '#8a2be2', mr: 1 }} />
                      <Typography variant="body2" fontWeight="medium">
                        {founder.education} ({founder.graduationYear})
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography variant="body2" sx={{ mb: 3, textAlign: 'left' }}>
                      {founder.bio}
                    </Typography>
                    
                    <Stack direction="row" spacing={2} justifyContent="center">
                      <Link href={founder.linkedin} target="_blank" rel="noopener">
                        <Avatar sx={{ bgcolor: '#0077b5' }}>
                          <LinkedInIcon />
                        </Avatar>
                      </Link>
                      <Link href={founder.twitter} target="_blank" rel="noopener">
                        <Avatar sx={{ bgcolor: '#1da1f2' }}>
                          <TwitterIcon />
                        </Avatar>
                      </Link>
                      <Link href={`mailto:${founder.email}`}>
                        <Avatar sx={{ background: 'linear-gradient(45deg, #8a2be2, #fc8019)' }}>
                          <EmailIcon />
                        </Avatar>
                      </Link>
                    </Stack>
                  </CardContent>
                </FounderCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </StyledSection>

      {/* Our Journey Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" component="h2">
            Our Journey
          </SectionTitle>
          
          <Typography variant="h6" align="center" sx={{ maxWidth: '800px', mx: 'auto', mb: 6, color: '#273F4F' }}>
            Since our founding in January 2025, we've been on an exciting journey of growth and innovation.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '50%',
              width: '4px',
              backgroundColor: '#FE7743',
              transform: 'translateX(-50%)',
            }
          }}>
            {MILESTONES.map((milestone, index) => (
              <TimelineItem 
                key={milestone.id} 
                isLeft={index % 2 === 0}
                elevation={3}
              >
                <Typography variant="h6" sx={{ color: '#FE7743', fontWeight: 'bold', mb: 1 }}>
                  {milestone.year}
                </Typography>
                <Typography variant="h5" sx={{ color: '#273F4F', fontWeight: 'bold', mb: 2 }}>
                  {milestone.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#273F4F' }}>
                  {milestone.description}
                </Typography>
              </TimelineItem>
            ))}
          </Box>
        </Container>
      </StyledSection>

      {/* Why Choose Us Section */}
      <StyledSection>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" component="h2">
            Why Choose MyBudgetBuddy
          </SectionTitle>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#EFEEEA', 
                borderRadius: '16px', 
                boxShadow: '0 8px 24px rgba(39, 63, 79, 0.12)',
                height: '100%'
              }}>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>Verified Service Providers</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>All service providers on our platform are verified and reviewed for quality assurance.</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>Budget-Friendly Options</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>Find service providers that match your budget with transparent pricing.</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>One-Stop Solution</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>Find all services for your event in one place, from venues to photographers.</Typography>}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                backgroundColor: '#EFEEEA', 
                borderRadius: '16px', 
                boxShadow: '0 8px 24px rgba(39, 63, 79, 0.12)',
                height: '100%'
              }}>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>Customer Reviews</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>Read authentic reviews from previous customers to make informed decisions.</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <SecurityIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>Secure Communication</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>Connect directly with service providers through our secure messaging system.</Typography>}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: '#077A7D' }}>
                          <SpeedIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText 
                        primary={<Typography variant="h6" sx={{ color: '#273F4F', fontWeight: 'bold' }}>24/7 Customer Support</Typography>} 
                        secondary={<Typography variant="body2" sx={{ color: '#273F4F' }}>Our dedicated support team is available round the clock to assist you.</Typography>}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </StyledSection>

      {/* Join Us Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #273F4F 0%, #077A7D 100%)',
        py: { xs: 8, md: 10 },
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 4 
            }}
          >
            Join Our Community
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              mb: 6,
              opacity: 0.9
            }}
          >
            Whether you're planning your next event or offering professional services,
            MyBudgetBuddy is the platform for you.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/service-providers')}
              sx={{ 
                backgroundColor: '#FE7743',
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e56a3a',
                }
              }}
            >
              Explore Services
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/contact-us')}
              sx={{ 
                borderColor: 'white',
                color: 'white',
                borderRadius: '30px',
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                }
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;