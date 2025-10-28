import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useUsers = (currentUserId) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useUsers: Setting up user listener for currentUserId:', currentUserId);
    
    const q = query(collection(db, 'users'), orderBy('displayName', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('useUsers: Received snapshot with', snapshot.docs.length, 'users');
      
      const allUsers = snapshot.docs.map(doc => {
        const userData = { id: doc.id, ...doc.data() };
        console.log('useUsers: User data:', userData);
        return userData;
      });
      
      const filteredUsers = allUsers.filter(user => user.uid !== currentUserId);
      console.log('useUsers: Filtered users (excluding current user):', filteredUsers);
      
      setUsers(filteredUsers);
      setLoading(false);
    }, (error) => {
      console.error('useUsers: Error in snapshot listener:', error);
      setLoading(false);
    });

    return () => {
      console.log('useUsers: Cleaning up user listener');
      unsubscribe();
    };
  }, [currentUserId]);

  return { users, loading };
};
