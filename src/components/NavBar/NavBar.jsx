// Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
// Material-UI imports
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactsIcon from '@mui/icons-material/Contacts';
import CelebrationIcon from '@mui/icons-material/Celebration';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';

const NavBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Profile menu state
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const profileMenuOpen = Boolean(profileMenuAnchor);
  // Chat menu state
  const [chatMenuAnchor, setChatMenuAnchor] = useState(null);
  const chatMenuOpen = Boolean(chatMenuAnchor);
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Handle profile menu open
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  // Handle profile menu close
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };
  
  // Handle logout action
  const handleLogout = () => {
    console.log('Logging out...');
    handleProfileMenuClose();
    // Implement logout functionality
  };
  
  // Handle profile update action
  const handleProfileUpdate = () => {
    console.log('Navigating to profile update page...');
    handleProfileMenuClose();
    navigate('/profile-update');
  };
  
  // Handle chat menu open
  const handleChatMenuOpen = (event) => {
    setChatMenuAnchor(event.currentTarget);
  };
  
  // Handle chat menu close
  const handleChatMenuClose = () => {
    setChatMenuAnchor(null);
  };
  
  // Handle chat with service provider
  const handleChatWithProvider = (providerId) => {
    console.log('Opening chat with provider:', providerId);
    handleChatMenuClose();
    navigate(`/chat/${providerId}`);
  };

  const navLinks = [
    { text: 'Home', icon: <HomeIcon />, path: '/customer/home' },
    { text: 'About Us', icon: <InfoIcon />, path: '/about-us' },
    { text: 'Contact Us', icon: <ContactsIcon />, path: '/contact-us' },
    { text: 'Service Providers', icon: <CelebrationIcon />, path: '/service-providers' }
    // Corporate removed from main navigation
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand-section">
          <div className="navbar-logo">
            <Link to="/customer/home">MyBudgetBuddy</Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className="nav-link">
                {link.text}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="navbar-actions-section">
          {/* Hide search on service providers page */}
          {!window.location.pathname.includes('/service-providers') && (
            <div className="navbar-search">
              <form onSubmit={handleSearch}>
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Search for events, services, venues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <IconButton type="submit" className="search-button" aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </div>
              </form>
            </div>
          )}
          
          <div className="navbar-user-actions">
            <IconButton 
              aria-label="show chat history" 
              className="notification-btn"
              onClick={handleChatMenuOpen}
              aria-controls={chatMenuOpen ? 'chat-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={chatMenuOpen ? 'true' : undefined}
            >
              <Badge badgeContent={2} color="primary">
                <ChatIcon className="notification-icon" />
              </Badge>
            </IconButton>
            
            <IconButton aria-label="show notifications" className="notification-btn">
              <Badge badgeContent={3} color="error">
                <NotificationsIcon className="notification-icon" />
              </Badge>
            </IconButton>
            
            {/* Profile Avatar - Clicking opens profile menu */}
            <Avatar 
              className="user-avatar"
              onClick={handleProfileMenuOpen}
              aria-controls={profileMenuOpen ? 'profile-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={profileMenuOpen ? 'true' : undefined}
            >
              U
            </Avatar>
            
            {/* Profile Menu */}
            <Menu
              id="profile-menu"
              anchorEl={profileMenuAnchor}
              open={profileMenuOpen}
              onClose={handleProfileMenuClose}
              slotProps={{
                paper: {
                  'aria-labelledby': 'profile-button',
                }
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className="profile-menu"
            >
              <MenuItem onClick={handleProfileUpdate}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile Update</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
            
            {/* Chat History Menu */}
            <Menu
              id="chat-menu"
              anchorEl={chatMenuAnchor}
              open={chatMenuOpen}
              onClose={handleChatMenuClose}
              slotProps={{
                paper: {
                  'aria-labelledby': 'chat-button',
                }
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              className="chat-menu"
            >
              <MenuItem sx={{ backgroundColor: '#f5f5f5', fontWeight: 'bold' }}>
                <ListItemText>Recent Chats</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleChatWithProvider('provider1')}>
                <ListItemIcon>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: '#4b60db' }}>C</Avatar>
                </ListItemIcon>
                <ListItemText primary="Cake Delights" secondary="Last message: 2 hours ago" />
              </MenuItem>
              <MenuItem onClick={() => handleChatWithProvider('provider2')}>
                <ListItemIcon>
                  <Avatar sx={{ width: 24, height: 24, bgcolor: '#e91e63' }}>P</Avatar>
                </ListItemIcon>
                <ListItemText primary="Party Planners" secondary="Last message: Yesterday" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate('/chat-history')} sx={{ justifyContent: 'center', color: '#4b60db' }}>
                <ListItemText primary="View All Chats" />
              </MenuItem>
            </Menu>
            
            <IconButton 
              className="mobile-menu-btn"
              aria-label="mobile menu"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className="mobile-menu-drawer"
      >
        <div className="drawer-header">
          <IconButton onClick={toggleMobileMenu}>
            <CloseIcon />
          </IconButton>
        </div>
        <List>
          {navLinks.map((item) => (
            <ListItemButton 
              key={item.path} 
              component={Link} 
              to={item.path} 
              onClick={toggleMobileMenu}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
          {/* Add Corporate in mobile menu */}
          <ListItemButton 
            component={Link} 
            to="/service-providers?event=corporate" 
            onClick={toggleMobileMenu}
          >
            <ListItemIcon><CelebrationIcon /></ListItemIcon>
            <ListItemText primary="Corporate Events" />
          </ListItemButton>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={handleProfileUpdate}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <ListItemText primary="Profile Update" />
          </ListItemButton>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
    </nav>
  );
};

export default NavBar;