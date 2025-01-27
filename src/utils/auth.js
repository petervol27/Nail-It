import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { getUserDocument } from './firestore';
/**
 * Monitors authentication state and sets the user and loading state accordingly.
 * @param {function} setUser - Function to update the user state.
 * @param {function} setIsLoading - Function to update the loading state.
 * @returns {function} Unsubscribe function to stop listening to auth changes.
 */
export const checkUserAuth = (setUser, setIsLoading) => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        // 1) get Firestore user doc
        const docData = await getUserDocument(currentUser.uid);
        // 2) merge it with the auth user object
        const mergedUser = {
          ...currentUser, // has uid, email, etc.
          ...docData, // has name, hasSeenInstructions, etc.
        };
        setUser(mergedUser);
      } catch (error) {
        console.error('Error fetching user doc:', error);
        setUser(currentUser);
      }
    } else {
      // no logged-in user
      setUser(null);
    }
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
