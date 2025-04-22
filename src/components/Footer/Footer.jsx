// Footer.jsx
import './Footer.css';
// Material-UI imports
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      console.log('Subscribing email:', email);
      setEmail('');
      // Implement subscription logic
    }
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-logo">MyBudgetBuddy</h2>
            <p className="footer-description">
              Your one-stop solution to find the perfect service provider for all your event needs.
            </p>
            <div className="social-links">
              <a href="https://www.instagram.com/my_buddybudget/" className="social-link facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/my_buddybudget/" className="social-link instagram">
                <InstagramIcon />
              </a>
              <a href="https://www.instagram.com/my_buddybudget/" className="social-link twitter">
                <TwitterIcon />
              </a>
              <a href="https://www.instagram.com/my_buddybudget/" className="social-link linkedin">
                <LinkedInIcon />
              </a>
              <a href="https://www.instagram.com/my_buddybudget/" className="social-link whatsapp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="quick-links">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about-us">About Us</a></li>
                <li><a href="/contact-us">Contact Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div className="popular-services">
              <h3>Popular Services</h3>
              <ul>
                <li><a href="/services/wedding">Wedding Planning</a></li>
                <li><a href="/services/birthday">Birthday Parties</a></li>
                <li><a href="/services/corporate">Corporate Events</a></li>
                <li><a href="/services/catering">Catering Services</a></li>
                <li><a href="/services/photography">Photography</a></li>
                <li><a href="/services/venue">Venue Booking</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-contact">
            <div className="contact-info">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <PhoneIcon className="contact-icon" />
                <span>+91 98765 43210</span>
              </div>
              <div className="contact-item">
                <EmailIcon className="contact-icon" />
                <span>contact@mybudgetbuddy.com</span>
              </div>
              <div className="contact-item">
                <LocationOnIcon className="contact-icon" />
                <span>123 Business Park, Tech Hub, Hyderabad, India - 500081</span>
              </div>
            </div>
            
            <div className="newsletter">
              <h3>Subscribe to Newsletter</h3>
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button 
                    type="submit" 
                    variant="contained" 
                    className="subscribe-btn"
                    endIcon={<SendIcon />}
                  >
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        <Divider className="footer-divider" />
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} MyBudgetBuddy. All rights reserved.
          </p>
          <div className="bottom-links">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/faq">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;