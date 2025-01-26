import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Upload a file to Firebase Storage.
 * @param {string} path - The path to store the file (e.g., `profileImages/{userId}`).
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} The file's download URL.
 */
export const uploadFile = async (path, file) => {
  const storageRef = ref(storage, path);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw new Error('Error uploading file: ' + error.message);
  }
};

/**
 * Upload a user's profile image.
 * @param {string} userId - The Firebase Auth user ID.
 * @param {File} file - The profile image file.
 * @returns {Promise<string>} The profile image's download URL.
 */
export const uploadProfileImage = async (userId, file) => {
  const path = `profileImages/${userId}`;
  return await uploadFile(path, file);
};
