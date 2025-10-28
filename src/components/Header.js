import React from 'react';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ user, onMenuClick, showMenuButton, currentUser }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-3 md:px-4 py-3 flex items-center justify-between min-h-[60px]">
      {/* Left side - User info */}
      <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
        {/* Menu button for mobile */}
        {showMenuButton && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* User Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=3B82F6&color=fff`}
            alt={user?.displayName}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${user?.displayName}&background=3B82F6&color=fff`;
            }}
          />
          <div className="absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>

        {/* User Details */}
        <div className="min-w-0 flex-1">
          <h2 className="text-sm md:text-lg font-semibold text-gray-900 truncate">
            {user?.displayName || 'Select a contact'}
          </h2>
          <p className="text-xs md:text-sm text-green-600">Online</p>
        </div>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        {/* Video call button */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 hidden sm:block">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Voice call button */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Header;