import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import './ContactUs.css';

// Inquiry types
const INQUIRY_TYPES = [
  'General Inquiry',
  'Service Provider Registration',
  'Customer Support',
  'Feedback',
  'Partnership Opportunities',
  'Media Inquiry',
  'Other',
];

// Office locations
const OFFICE_LOCATIONS = [
  {
    id: 1,
    city: 'Hyderabad',
    address: '123 Business Park, Hi-Tech City, Hyderabad, Telangana - 500081',
    phone: '+91 98765 43210',
    email: 'hyderabad@mybudgetbuddy.com',
    hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
  },
  {
    id: 2,
    city: 'Bangalore',
    address: '456 Tech Hub, Whitefield, Bangalore, Karnataka - 560066',
    phone: '+91 98765 43211',
    email: 'bangalore@mybudgetbuddy.com',
    hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
  },
  {
    id: 3,
    city: 'Mumbai',
    address: '789 Business Center, Andheri East, Mumbai, Maharashtra - 400069',
    phone: '+91 98765 43212',
    email: 'mumbai@mybudgetbuddy.com',
    hours: 'Monday - Saturday: 9:00 AM - 6:00 PM',
  },
];

// Social media links
const SOCIAL_MEDIA = [
  { name: 'Facebook', icon: <FacebookIcon />, url: 'https://facebook.com/mybudgetbuddy' },
  { name: 'Instagram', icon: <InstagramIcon />, url: 'https://instagram.com/mybudgetbuddy' },
  { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com/mybudgetbuddy' },
  { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://linkedin.com/company/mybudgetbuddy' },
  { name: 'WhatsApp', icon: <WhatsAppIcon />, url: 'https://wa.me/919876543210' },
];

const ContactUs = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (formData.phone && !/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, you would send the form data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent successfully! We will get back to you soon.',
        severity: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        message: '',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Please fix the errors in the form.',
        severity: 'error',
      });
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };
  
  return (
    <Box className="contact-us-page">
      {/* Hero Section */}
      <Box className="contact-hero-section">
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="contact-hero-title">
            Contact <span className="text-gradient">Us</span>
          </Typography>
          <Typography variant="h5" component="h2" className="contact-hero-subtitle">
            We'd Love to Hear From You
          </Typography>
          <Typography variant="body1" className="contact-hero-description">
            Have questions, feedback, or need assistance? Our team is here to help you.
            Fill out the form below or reach out to us through any of our contact channels.
          </Typography>
        </Container>
      </Box>

      {/* Contact Form and Info Section */}
      <Box className="section-container contact-main-section">
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Paper elevation={3} className="contact-form-paper">
                <Typography variant="h5" component="h3" className="form-title">
                  Send Us a Message
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} className="contact-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        placeholder="+91XXXXXXXXXX"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        label="Inquiry Type"
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        error={!!errors.inquiryType}
                        helperText={errors.inquiryType}
                        required
                      >
                        <MenuItem value="">Select Inquiry Type</MenuItem>
                        {INQUIRY_TYPES.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={5}
                        label="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        size="large"
                        className="submit-button"
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
            
            {/* Contact Information */}
            <Grid item xs={12} md={5}>
              <Box className="contact-info-container">
                <Typography variant="h5" component="h3" className="info-title">
                  Contact Information
                </Typography>
                
                <Box className="contact-info-item">
                  <PhoneIcon className="contact-icon" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      +91 98765 43210 (Customer Support)
                    </Typography>
                    <Typography variant="body1">
                      +91 98765 43213 (Business Inquiries)
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="contact-info-item">
                  <EmailIcon className="contact-icon" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      support@mybudgetbuddy.com
                    </Typography>
                    <Typography variant="body1">
                      info@mybudgetbuddy.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box className="contact-info-item">
                  <LocationIcon className="contact-icon" />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Head Office
                    </Typography>
                    <Typography variant="body1">
                      123 Business Park, Hi-Tech City,
                    </Typography>
                    <Typography variant="body1">
                      Hyderabad, Telangana - 500081
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" component="h4" className="social-title">
                  Connect With Us
                </Typography>
                
                <Box className="social-icons">
                  {SOCIAL_MEDIA.map((social) => (
                    <Button
                      key={social.name}
                      variant="outlined"
                      color="primary"
                      startIcon={social.icon}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-button"
                    >
                      {!isMobile && social.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Office Locations Section */}
      <Box className="section-container office-locations-section">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" className="section-title">
            Our Offices
          </Typography>
          
          <Grid container spacing={4}>
            {OFFICE_LOCATIONS.map((office) => (
              <Grid item xs={12} sm={6} md={4} key={office.id}>
                <Card className="office-card">
                  <CardContent>
                    <Typography variant="h6" component="h3" className="office-city">
                      {office.city}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box className="office-detail">
                      <LocationIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {office.address}
                      </Typography>
                    </Box>
                    <Box className="office-detail">
                      <PhoneIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {office.phone}
                      </Typography>
                    </Box>
                    <Box className="office-detail">
                      <EmailIcon fontSize="small" color="primary" />
                      <Typography variant="body2">
                        {office.email}
                      </Typography>
                    </Box>
                    <Box className="office-hours">
                      <Typography variant="body2" fontWeight="medium">
                        Working Hours:
                      </Typography>
                      <Typography variant="body2">
                        {office.hours}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Map Section */}
      <Box className="section-container map-section">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" className="section-title">
            Find Us
          </Typography>
          
          <Paper elevation={3} className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2954088332953!2d78.38348491487767!3d17.44543888804597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93dc8c5d69df%3A0x19688beb557fa0ee!2sHITEC%20City%2C%20Hyderabad%2C%20Telangana%2C%20India!5e0!3m2!1sen!2sus!4v1650123456789!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MyBudgetBuddy Office Location"
            ></iframe>
          </Paper>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Box className="section-container faq-section">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" className="section-title">
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className="faq-item">
                <Typography variant="h6" component="h3" className="faq-question">
                  How do I register as a service provider?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  You can register as a service provider by clicking on the "Register as Provider" button on our homepage or by contacting our business team at partners@mybudgetbuddy.com.
                </Typography>
              </Box>
              
              <Box className="faq-item">
                <Typography variant="h6" component="h3" className="faq-question">
                  How can I change or cancel my booking?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  You can change or cancel your booking by logging into your account, going to "My Bookings," and selecting the booking you wish to modify. Please note that cancellation policies may vary by service provider.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box className="faq-item">
                <Typography variant="h6" component="h3" className="faq-question">
                  Is my payment information secure?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your credit card details on our servers.
                </Typography>
              </Box>
              
              <Box className="faq-item">
                <Typography variant="h6" component="h3" className="faq-question">
                  How do I leave a review for a service provider?
                </Typography>
                <Typography variant="body1" className="faq-answer">
                  After your event is completed, you will receive an email invitation to leave a review. You can also go to the service provider's profile and click on "Write a Review."
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box className="more-questions">
            <Typography variant="body1">
              Have more questions? Feel free to <Button color="primary" href="#contact-form">contact us</Button> or check our <Button color="primary" href="/faq">complete FAQ page</Button>.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Snackbar for form submission feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;