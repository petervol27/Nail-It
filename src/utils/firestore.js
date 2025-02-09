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
  addDoc,
  arrayRemove,
  where,
} from 'firebase/firestore';
import { firestore } from '../firebase';

/**
 * Create a new user document in Firestore.
 * @param {string} userId - The Firebase Auth user ID.
 * @param {object} userData - The user data to store.
 * @returns {Promise<string>} A success message.
 * @param {string} designId - The ID of the design.
 * @returns {Promise<void>}
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
    nailCrewFollowers: [], // Array of user IDs
    nailCrewFollowing: [], // Array of user IDs
    savedDesigns: [], // Array of design IDs
    myDesigns: [], // Array of design IDs
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
export const updateUserProfile = async (userId, updatedData) => {
  try {
    await updateDoc(doc(firestore, 'users', userId), updatedData);
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: error.message };
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
    // ✅ Ensure creatorId exists before proceeding
    if (!designData.creatorId) {
      throw new Error('Creator ID is missing. Cannot create design.');
    }

    const docRef = doc(collection(firestore, 'designs'));

    await setDoc(docRef, {
      ...designData,
      createdAt: Timestamp.now(), // ✅ Keep timestamp consistent
      likes: 0,
      likedBy: [], // ✅ Ensure likedBy is an array to avoid indexOf error
    });

    return { id: docRef.id, ...designData, createdAt: Timestamp.now() };
  } catch (error) {
    console.error('Error creating design:', error);
    return null;
  }
};

export const getDesigns = async () => {
  try {
    const q = query(
      collection(firestore, 'designs'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const designs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return designs;
  } catch (error) {
    console.error('Error fetching designs:', error);
    return [];
  }
};

// export const toggledSavedDesign = async (userId, designId) => {
//   try {
//     const userRef = doc(firestore, 'users', userId);
//     const userDoc = await getDoc(userRef);
//     if (!userDoc.exists()) {
//       console.error('User document not found.');
//       return;
//     }
//     const userData = userDoc.data();
//     const isSaved = userData.savedDesigns?.includes(designId);
//     await updateDoc(userRef, {
//       savedDesigns: isSaved ? arrayRemove(designId) : arrayUnion(designId),
//     });
//     console.log(
//       isSaved ? 'Design removed from saved list' : 'Design saved successfully'
//     );
//   } catch (error) {
//     console.error('Error toggling saved design:', error);
//   }
// };

export const toggleLikeDesign = async (designId, userId) => {
  try {
    const designRef = doc(firestore, 'designs', designId);
    const designSnap = await getDoc(designRef);

    if (!designSnap.exists()) {
      console.error('Design not found.');
      return;
    }

    const designData = designSnap.data();
    const alreadyLiked = designData.likedBy?.includes(userId);

    if (alreadyLiked) {
      // ✅ Unlike the design
      await updateDoc(designRef, {
        likes: designData.likes - 1,
        likedBy: arrayRemove(userId),
      });

      console.log('Like removed.');
      return false; // Return new state
    } else {
      // ✅ Like the design
      await updateDoc(designRef, {
        likes: designData.likes + 1,
        likedBy: arrayUnion(userId),
      });

      console.log('Design liked successfully!');
      return true; // Return new state
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return null; // Handle error case
  }
};

export const getDesignById = async (designId) => {
  try {
    const designRef = doc(firestore, 'designs', designId);
    const designSnap = await getDoc(designRef);

    if (designSnap.exists()) {
      return { id: designSnap.id, ...designSnap.data() };
    } else {
      console.error('Design not found.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching design:', error);
    return null;
  }
};

// 🔥 Get all user-uploaded designs (Gallery)
export const getUserUploadedDesigns = async (userId) => {
  try {
    const designsQuery = query(
      collection(firestore, 'designs'),
      where('creatorId', '==', userId) // ✅ Only get designs the user created
    );

    const snapshot = await getDocs(designsQuery);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching user designs:', error);
    return [];
  }
};

// 🔥 Get all saved designs (My Designs)
export const getSavedDesigns = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) return [];

    const userData = userSnap.data();
    const designIds = userData.savedDesigns || [];

    if (designIds.length === 0) return [];

    const designsQuery = query(
      collection(firestore, 'designs'),
      where('__name__', 'in', designIds)
    );
    const designsSnap = await getDocs(designsQuery);

    return designsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching saved designs:', error);
    return [];
  }
};
