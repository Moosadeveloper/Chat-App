import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, provider, db } from '../firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      console.log('Attempting Google sign-in...');
      console.log('Auth object:', auth);
      console.log('Provider object:', provider);
      
      // Check if auth is properly initialized
      if (!auth) {
        throw new Error('Firebase Auth not initialized');
      }
      
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful:', user);
      
      // Create user document in Firestore if it doesn't exist
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
      
      if (!userSnap.exists()) {
        console.log('Creating new user document...');
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: new Date(),
          lastSeen: new Date(),
          isOnline: true
        });
        console.log('User document created successfully');
      } else {
        // Update existing user's last seen and online status
        console.log('Updating existing user...');
        await setDoc(userRef, {
          ...userSnap.data(),
          lastSeen: new Date(),
          isOnline: true,
          photoURL: user.photoURL, // Update photo in case it changed
          displayName: user.displayName // Update name in case it changed
        }, { merge: true });
        console.log('User document updated successfully');
      }
      
      return user;
    } catch (error) {
      console.error('Detailed sign-in error:', {
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential
      });
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      // Update user's online status before signing out
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        await setDoc(userRef, {
          isOnline: false,
          lastSeen: new Date()
        }, { merge: true });
        console.log('User status updated to offline');
      }
      
      await signOut(auth);
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
