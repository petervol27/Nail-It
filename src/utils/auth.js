import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export const checkUserAuth = (setUser, setIsLoading) => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  });

  return unsubscribe;
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return 'You Have Been Signed Out';
  } catch (error) {
    return error;
  }
};
