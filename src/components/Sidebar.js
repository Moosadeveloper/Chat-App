import React from 'react';

const Sidebar = ({ users, loading, onContactSelect, selectedUserId, currentUser }) => {
  if (loading) {
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
          <h1 className="text-xl font-bold text-white">Chatify</h1>
          <p className="text-blue-100 text-sm">Your conversations</p>
        </div>
        
        {/* Loading State */}
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 md:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-blue-600">
        <h1 className="text-lg md:text-xl font-bold text-white">Chatify</h1>
        <p className="text-blue-100 text-xs md:text-sm">Your conversations</p>
      </div>

      {/* Search Bar */}
      <div className="p-3 md:p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full px-3 md:px-4 py-2 pl-8 md:pl-10 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 text-sm"
          />
          <svg
            className="absolute left-2 md:left-3 top-2.5 h-4 w-4 md:h-5 md:w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto">
        {users.length === 0 ? (
          <div className="p-3 md:p-4 text-center text-gray-500">
            <p className="text-sm">No other users found</p>
            <p className="text-xs mt-1">Invite friends to start chatting!</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.uid}
              onClick={() => onContactSelect(user)}
              className={`p-3 md:p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                selectedUserId === user.uid ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=3B82F6&color=fff`}
                    alt={user.displayName}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${user.displayName}&background=3B82F6&color=fff`;
                    }}
                  />
                  <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {user.displayName}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Profile Section */}
      <div className="p-3 md:p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 md:space-x-3">
          <img
            src={currentUser?.photoURL || `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=3B82F6&color=fff`}
            alt={currentUser?.displayName}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${currentUser?.displayName}&background=3B82F6&color=fff`;
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-medium text-gray-900 truncate">
              {currentUser?.displayName}
            </p>
            <p className="text-xs text-gray-500">Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;