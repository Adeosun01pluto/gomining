import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const handleCreateMiner = (navigate) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in, navigate to dashboard
    navigate('/dashboard/miners');
  } else {
    // No user is signed in, navigate to login
    navigate('/login', { 
      state: { 
        redirectUrl: '/dashboard/miners',
        message: 'Please log in to create a miner' 
      } 
    });
  }
}; 