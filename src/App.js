import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useUsers } from './hooks/useUsers';
import { useMessages } from './hooks/useMessages';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Header from './components/Header';
import MessageInput from './components/MessageInput';
import MessageBubble from './components/MessageBubble';
import ProfileDropdown from './components/ProfileDropdown';

function ChatApp() {
  const { currentUser } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false); // Start with sidebar hidden on mobile
  
  const { users, loading: usersLoading } = useUsers(currentUser?.uid);
  const { messages, loading: messagesLoading, sendMessage, messagesEndRef } = useMessages(
    currentUser?.uid,
    selectedUserId
  );

  // Default to Public Chat after login
  useEffect(() => {
    if (currentUser && !selectedUserId) {
      setSelectedUserId('PUBLIC');
    }
  }, [currentUser, selectedUserId]);

  // Handle window resize to show sidebar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If no user is logged in, show login page
  if (!currentUser) {
    return <LoginPage />;
  }

  const selectedUser = selectedUserId === 'PUBLIC'
    ? { uid: 'PUBLIC', displayName: 'Public Chat', email: 'all@chat', photoURL: '' }
    : users.find(user => user.uid === selectedUserId);

  const handleContactSelect = (user) => {
    setSelectedUserId(user.uid);
    // On mobile, hide sidebar when contact is selected
    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-gray-50 relative">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${showSidebar ? 'flex' : 'hidden'} 
        md:flex 
        flex-col 
        w-full 
        md:w-80 
        bg-white 
        border-r 
        border-gray-200
        fixed 
        md:relative 
        top-0 
        left-0 
        h-full 
        z-30 
        md:z-auto
        transform 
        transition-transform 
        duration-300 
        ease-in-out
        ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <Sidebar 
          users={users}
          loading={usersLoading}
          onContactSelect={handleContactSelect}
          selectedUserId={selectedUserId}
          currentUser={currentUser}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {selectedUser ? (
          <>
            {/* Header */}
            <Header 
              user={selectedUser} 
              onMenuClick={toggleSidebar}
              showMenuButton={!showSidebar}
              currentUser={currentUser}
            />

            {/* Messages Area */}
            <ChatArea>
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      currentUserId={currentUser.uid}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </ChatArea>

            {/* Message Input */}
            <MessageInput 
              onSendMessage={sendMessage}
              disabled={messagesLoading}
            />
          </>
        ) : (
          /* No chat selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-sm">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Welcome to Chatify</h2>
              <p className="text-sm md:text-base text-gray-600 mb-6">Select a contact to start chatting</p>
              <button
                onClick={toggleSidebar}
                className="md:hidden bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                View Contacts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  );
}

export default App;