// Chat.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box, Avatar, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const ChatPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  height: '70vh',
  display: 'flex',
  flexDirection: 'column'
}));

const MessageContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

const MessageBubble = styled(Box)(({ theme, sent }) => ({
  padding: theme.spacing(1.5),
  borderRadius: 12,
  maxWidth: '70%',
  wordBreak: 'break-word',
  backgroundColor: sent ? theme.palette.primary.light : '#f0f0f0',
  color: sent ? '#fff' : theme.palette.text.primary,
  alignSelf: sent ? 'flex-end' : 'flex-start',
}));

const MessageTime = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(0.5),
}));

function Chat() {
  const { providerId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [providerInfo, setProviderInfo] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const messageContainerRef = useRef(null);
  
  useEffect(() => {
    // Fetch provider information
    const fetchProviderInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/providers/${providerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProviderInfo(data);
        }
      } catch (error) {
        console.error('Error fetching provider info:', error);
      }
    };
    
    // Fetch previous messages
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/chat/history/${providerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    
    fetchProviderInfo();
    fetchMessages();
    
    // Set up WebSocket connection
    const token = localStorage.getItem('token');
    const ws = new WebSocket(`ws://your-backend-url/ws/chat?token=${token}&providerId=${providerId}`);
    
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
    
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    
    setWebSocket(ws);
    
    // Clean up WebSocket connection
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [providerId]);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && webSocket) {
      const messageObj = {
        content: newMessage,
        senderId: 'currentUserId', // You should get this from your auth context
        receiverId: providerId,
        timestamp: new Date().toISOString()
      };
      
      webSocket.send(JSON.stringify(messageObj));
      
      // Optimistically add message to UI
      setMessages(prevMessages => [...prevMessages, {
        ...messageObj,
        sent: true
      }]);
      
      setNewMessage('');
    }
  };

  return (
    <Container maxWidth="md">
      {providerInfo && (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
          <Avatar 
            src={providerInfo.profileImage} 
            alt={providerInfo.firstName}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography variant="h5">
              {providerInfo.firstName} {providerInfo.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {providerInfo.services ? providerInfo.services.join(', ') : 'Service Provider'}
            </Typography>
          </Box>
        </Box>
      )}
      
      <ChatPaper elevation={3}>
        <MessageContainer ref={messageContainerRef}>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <Box key={`${msg.senderId}-${msg.timestamp}`} sx={{ display: 'flex', flexDirection: 'column' }}>
                <MessageBubble sent={msg.senderId === 'currentUserId'}>
                  <Typography variant="body1">{msg.content}</Typography>
                </MessageBubble>
                <MessageTime sx={{ alignSelf: msg.senderId === 'currentUserId' ? 'flex-end' : 'flex-start' }}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </MessageTime>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 4 }}>
              No messages yet. Start a conversation!
            </Typography>
          )}
        </MessageContainer>
        
        <Divider />
        
        <Box component="form" onSubmit={handleSendMessage} sx={{ display: 'flex', mt: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            endIcon={<SendIcon />}
            disabled={!newMessage.trim()}
          >
            Send
          </Button>
        </Box>
      </ChatPaper>
    </Container>
  );
}

export default Chat;