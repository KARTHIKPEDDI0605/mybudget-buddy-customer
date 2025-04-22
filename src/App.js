import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import AboutUs from './pages/AboutUs/AboutUs';
import ContactUs from './pages/ContactUs/ContactUs';
import ProfileUpdate from './pages/Profile/Profile';
import ServiceProviders from './pages/ServiceProviders/ServiceProviders';
import Chat from './pages/Chat/chat';
import ChatHistory from './pages/Chat/ChatHistory';
import './App.css';

// Create a custom theme with brand colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#4b60db', // Brand primary color
      light: '#6b7fe3',
      dark: '#3240a0',
    },
    secondary: {
      main: '#FE7743', // Brand accent color
      light: '#ff9a72',
      dark: '#e56a3a',
    },
    info: {
      main: '#077A7D', // Brand teal color
      light: '#0a9ea2',
      dark: '#055658',
    },
    text: {
      primary: '#273F4F', // Brand dark blue for text
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(75, 96, 219, 0.2)',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(39, 63, 79, 0.1)',
          overflow: 'hidden',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="app-container">
          <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to="/customer/home" replace />} />
              <Route path="/customer/home" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/profile-update" element={<ProfileUpdate />} />
              <Route path="/service-providers" element={<ServiceProviders />} />
              <Route path="/chat/:providerId" element={<Chat />} />
              <Route path="/chat-history" element={<ChatHistory />} />
              
              {/* Event-specific routes that redirect to service providers with the event type */}
              <Route path="/birthday" element={<Navigate to="/service-providers?event=birthday" replace />} />
              <Route path="/wedding" element={<Navigate to="/service-providers?event=wedding" replace />} />
              <Route path="/corporate" element={<Navigate to="/service-providers?event=corporate" replace />} />
              <Route path="/holiday" element={<Navigate to="/service-providers?event=holiday" replace />} />
              <Route path="/graduation" element={<Navigate to="/service-providers?event=graduation" replace />} />
              <Route path="/baby-shower" element={<Navigate to="/service-providers?event=baby-shower" replace />} />
              <Route path="/dinner-party" element={<Navigate to="/service-providers?event=dinner-party" replace />} />
              <Route path="/nightlife" element={<Navigate to="/service-providers?event=nightlife" replace />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/customer/home" replace />} />
            </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;