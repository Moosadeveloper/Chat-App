import React from 'react';

const ChatArea = ({ children }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-2 md:p-4">
      <div className="max-w-4xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default ChatArea;