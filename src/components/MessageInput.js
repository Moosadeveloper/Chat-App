import React, { useState } from 'react';

const MessageInput = ({ onSendMessage, disabled }) => {
  const [inputValue, setInputValue] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() && !disabled && !sending) {
      setSending(true);
      try {
        await onSendMessage(inputValue);
        setInputValue('');
      } catch (error) {
        console.error('Failed to send message:', error);
        // You could show a toast notification here
      } finally {
        setSending(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-2 md:p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 md:space-x-3">
        {/* Emoji button - hidden on very small screens */}
        <button
          type="button"
          className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Attachment button - hidden on very small screens */}
        <button
          type="button"
          className="hidden sm:block p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Text input */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={disabled}
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-full border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!inputValue.trim() || disabled || sending}
          className={`p-2 md:p-3 rounded-full transition-all duration-200 ${
            inputValue.trim() && !disabled && !sending
              ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {sending ? (
            <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
          ) : (
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;