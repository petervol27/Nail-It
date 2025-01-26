import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * Monitors authentication state and sets the user and loading state accordingly.
 * @param {function} setUser - Function to update the user state.
 * @param {function} setIsLoading - Function to update the loading state.
 * @returns {function} Unsubscribe function to stop listening to auth changes.
 */
export const checkUserAuth = (setUser, setIsLoading) => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser || null);
    setIsLoading(false);
  });

  return unsubscribe;
};

/**
 * Logs out the currently authenticated user.
 * @returns {Promise<string>} A message indicating the result of the logout operation.
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return 'You Have Been Signed Out';
  } catch (error) {
    throw new Error('Logout failed: ' + error.message);
  }
};
