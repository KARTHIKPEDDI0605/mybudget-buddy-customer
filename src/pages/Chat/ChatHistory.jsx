import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  Divider, 
  Paper, 
  TextField, 
  InputAdornment,
  IconButton,
  Badge,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Styled components
const ChatHistoryContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(39, 63, 79, 0.15)',
}));

const ChatListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(75, 96, 219, 0.05)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
}));

const UnreadBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#FE7743',
    color: 'white',
  },
}));

const NoChatsCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(39, 63, 79, 0.1)',
}));

// Mock data for chat history
const mockChatHistory = [
  {
    id: 'provider1',
    name: 'Cake Delights',
    avatar: 'C',
    avatarColor: '#4b60db',
    lastMessage: 'Thank you for your inquiry. We can definitely provide a custom cake for your event.',
    timestamp: '2025-04-22T14:30:00',
    unreadCount: 2,
    service: 'Cake & Bakery'
  },
  {
    id: 'provider2',
    name: 'Party Planners',
    avatar: 'P',
    avatarColor: '#e91e63',
    lastMessage: 'We have several venue options available for your date. Would you like to schedule a viewing?',
    timestamp: '2025-04-21T09:15:00',
    unreadCount: 0,
    service: 'Event Planning'
  },
  {
    id: 'provider3',
    name: 'Decor Masters',
    avatar: 'D',
    avatarColor: '#ff9800',
    lastMessage: "I have attached some theme ideas for your corporate event. Let me know which one you prefer.",
    timestamp: '2025-04-20T16:45:00',
    unreadCount: 1,
    service: 'Decoration'
  },
  {
    id: 'provider4',
    name: 'Sound Solutions',
    avatar: 'S',
    avatarColor: '#4caf50',
    lastMessage: 'We are available on your event date. Our DJ package includes lighting and sound equipment.',
    timestamp: '2025-04-19T11:20:00',
    unreadCount: 0,
    service: 'Music & Entertainment'
  },
  {
    id: 'provider5',
    name: 'Gourmet Catering',
    avatar: 'G',
    avatarColor: '#9c27b0',
    lastMessage: 'We can accommodate your dietary restrictions. I will send you a revised menu proposal.',
    timestamp: '2025-04-18T13:10:00',
    unreadCount: 0,
    service: 'Catering'
  }
];

function ChatHistory() {
  const navigate = useNavigate();
  const [chatHistory, setChatHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch chat history
    const fetchChatHistory = async () => {
      try {
        // In a real app, you would fetch from your API
        // const response = await fetch('/api/chat/history');
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          setChatHistory(mockChatHistory);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching chat history:', error);
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  const handleChatSelect = (providerId) => {
    navigate(`/chat/${providerId}`);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const filteredChats = chatHistory.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#273F4F' }}>
          Chat History
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
          View and continue your conversations with service providers
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search chats by provider name or service"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          slots={{
            input: 'input'
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }
          }}
          sx={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            }
          }}
        />
        <IconButton 
          sx={{ 
            ml: 1, 
            backgroundColor: 'white', 
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: 'rgba(75, 96, 219, 0.1)',
            }
          }}
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <ChatHistoryContainer>
        {isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography>Loading chat history...</Typography>
          </Box>
        )}
        
        {!isLoading && filteredChats.length > 0 && (
          <List sx={{ p: 0 }}>
            {filteredChats.map((chat, index) => (
              <React.Fragment key={chat.id}>
                <ChatListItem 
                  button 
                  onClick={() => handleChatSelect(chat.id)}
                  sx={{
                    backgroundColor: chat.unreadCount > 0 ? 'rgba(75, 96, 219, 0.05)' : 'transparent',
                  }}
                >
                  <ListItemAvatar>
                    <UnreadBadge
                      badgeContent={chat.unreadCount}
                      color="error"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      invisible={chat.unreadCount === 0}
                    >
                      <Avatar sx={{ bgcolor: chat.avatarColor }}>
                        {chat.avatar}
                      </Avatar>
                    </UnreadBadge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: chat.unreadCount > 0 ? 'bold' : 'normal' }}>
                          {chat.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formatTimestamp(chat.timestamp)}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                        <Typography 
                          variant="body2" 
                          color="textSecondary"
                          sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            fontWeight: chat.unreadCount > 0 ? 'medium' : 'normal',
                            maxWidth: '80%'
                          }}
                        >
                          {chat.lastMessage}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          sx={{ 
                            color: '#077A7D', 
                            backgroundColor: 'rgba(7, 122, 125, 0.1)',
                            px: 1,
                            py: 0.5,
                            borderRadius: '12px',
                            fontSize: '0.7rem'
                          }}
                        >
                          {chat.service}
                        </Typography>
                      </Box>
                    }
                  />
                  <IconButton size="small" sx={{ ml: 1, color: '#4b60db' }}>
                    <ArrowForwardIcon />
                  </IconButton>
                </ChatListItem>
                {index < filteredChats.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        )}
        
        {!isLoading && filteredChats.length === 0 && (
          <NoChatsCard>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                No chat history found
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {searchQuery 
                  ? `No chats match your search for "${searchQuery}"` 
                  : "You haven't started any conversations with service providers yet."
                }
              </Typography>
            </CardContent>
          </NoChatsCard>
        )}
      </ChatHistoryContainer>
    </Container>
  );
}

export default ChatHistory;