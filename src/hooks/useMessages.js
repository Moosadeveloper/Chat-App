import { useState, useEffect, useRef } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, auth } from '../firebase';

export const useMessages = (currentUserId, selectedUserId) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!currentUserId || !selectedUserId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    // Create a chat room ID by combining both user IDs in alphabetical order
    const chatRoomId = [currentUserId, selectedUserId].sort().join('-');
    
    const q = query(
      collection(db, 'messages'),
      where('chatRoomId', '==', chatRoomId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMessages(messagesData);
      setLoading(false);
      
      // Auto-scroll to bottom when new messages arrive
      setTimeout(scrollToBottom, 100);
    });

    return () => unsubscribe();
  }, [currentUserId, selectedUserId]);

  const sendMessage = async (text) => {
    if (!text.trim() || !currentUserId || !selectedUserId) return;

    try {
      const chatRoomId = [currentUserId, selectedUserId].sort().join('-');
      
      // Get current user info for the message
      const currentUser = auth.currentUser;
      
      await addDoc(collection(db, 'messages'), {
        text: text.trim(),
        senderId: currentUserId,
        receiverId: selectedUserId,
        chatRoomId: chatRoomId,
        senderName: currentUser?.displayName || 'Unknown User',
        senderEmail: currentUser?.email || '',
        senderPhotoURL: currentUser?.photoURL || '',
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      });
      
      console.log('Message sent successfully:', {
        text: text.trim(),
        senderId: currentUserId,
        receiverId: selectedUserId,
        chatRoomId: chatRoomId
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error; // Re-throw to handle in component
    }
  };

  return { 
    messages, 
    loading, 
    sendMessage, 
    messagesEndRef 
  };
};
