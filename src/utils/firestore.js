import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  query,
  orderBy,
  getDocs,
  collection,
} from 'firebase/firestore';
import { firestore } from '../firebase';

/**
 * Create a new user document in Firestore.
 * @param {string} userId - The Firebase Auth user ID.
 * @param {object} userData - The user data to store.
 * @returns {Promise<string>} A success message.
 */
export const createUserDocument = async (userId, userData) => {
  const userRef = doc(firestore, 'users', userId);

  const defaultData = {
    name: '',
    type: 'personal', // 'professional' or 'personal'
    country: '',
    language: '',
    bio: '',
    profileImage: '',
    nailCrew: [], // Array of user IDs
    savedDesigns: [], // Array of design IDs
    myDesigns: [], // Array of design IDs
    inspirations: [], // Array of design IDs
    createdAt: Timestamp.now(),
  };

  try {
    await setDoc(userRef, { ...defaultData, ...userData });
    return 'User document created successfully';
  } catch (error) {
    throw new Error('Error creating user document: ' + error.message);
  }
};

/**
 * Update user data in Firestore.
 * @param {string} userId - The Firebase Auth user ID.
 * @param {object} updates - The updates to apply to the user document.
 * @returns {Promise<string>} A success message.
 */
export const updateUserDocument = async (userId, updates) => {
  const userRef = doc(firestore, 'users', userId);

  try {
    await updateDoc(userRef, updates);
    return 'User document updated successfully';
  } catch (error) {
    throw new Error('Error updating user document: ' + error.message);
  }
};

/**
 * Get user data from Firestore.
 * @param {string} userId - The Firebase Auth user ID.
 * @returns {Promise<object>} The user data.
 */
export const getUserDocument = async (userId) => {
  const userRef = doc(firestore, 'users', userId);

  try {
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User document does not exist');
    }
  } catch (error) {
    throw new Error('Error fetching user document: ' + error.message);
  }
};

/**
 * Add a follower to the nailCrew array.
 * @param {string} userId - The Firebase Auth user ID.
 * @param {string} followerId - The follower's user ID.
 * @returns {Promise<string>} A success message.
 */
export const addFollower = async (userId, followerId) => {
  const userRef = doc(firestore, 'users', userId);

  try {
    await updateDoc(userRef, {
      nailCrew: arrayUnion(followerId),
    });
    return 'Follower added successfully';
  } catch (error) {
    throw new Error('Error adding follower: ' + error.message);
  }
};

// ---------------------------------------------
// Designs

export const createDesign = async (designData) => {
  try {
    const docRef = await addDoc(collection(firestore, 'designs'), {
      ...designData,
      createdAt: Timestamp.now(),
      likes: 0,
    });

    return { id: docRef.id, ...designData, createAt: Timestamp.now() };
  } catch (error) {
    console.error('Error creating design', error);
    return null;
  }
};

export const getDesigns = async () => {
  try {
    const q = query(
      collection(firestore, 'designs'),
      orderBy('createAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const designs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return designs;
  } catch (error) {
    console.error('Error Fetching designs', error);
    return [];
  }
};
