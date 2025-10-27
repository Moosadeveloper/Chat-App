import React from 'react';

const MessageBubble = ({ message, currentUserId }) => {
  const isOwn = message.senderId === currentUserId;
  
  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    // Handle both Firestore timestamp and regular date
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-3 md:mb-4 animate-fadeIn px-1`}>
      <div className={`flex max-w-[85%] sm:max-w-xs lg:max-w-md ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-1 md:space-x-2`}>
        {/* Avatar (only for received messages) */}
        {!isOwn && (
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 bg-gradient-to-br from-blue-400 to-blue-600">
            {message.senderName ? message.senderName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

        {/* Message bubble */}
        <div className={`relative px-3 md:px-4 py-2 rounded-2xl ${
          isOwn 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-gray-200 text-gray-900 rounded-bl-md'
        } shadow-sm`}>
          {/* Sender name for received messages */}
          {!isOwn && message.senderName && (
            <div className="text-xs font-semibold text-gray-600 mb-1">
              {message.senderName}
            </div>
          )}
          
          <p className="text-sm leading-relaxed break-words">{message.text}</p>
          
          {/* Time stamp */}
          <div className={`text-xs mt-1 ${
            isOwn ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </div>
        </div>

        {/* Avatar for sent messages */}
        {isOwn && (
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 bg-gradient-to-br from-green-400 to-green-600">
            {message.senderName ? message.senderName.charAt(0).toUpperCase() : 'Y'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;