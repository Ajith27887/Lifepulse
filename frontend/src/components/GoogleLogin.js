import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase-config';

const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('User:', result.user);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error:', error);
  }
};