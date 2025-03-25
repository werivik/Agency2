import { storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB - keeping it smaller for base64
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    try {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size must be less than 2MB');
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        throw new Error('Only JPEG, PNG and WebP images are allowed');
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = () => {
        resolve(reader.result);
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadEventImage = async (file) => {
  try {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      throw new Error('File size must be less than 10MB');
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error('Only JPEG, PNG and WebP images are allowed');
    }

    // Create a unique filename using timestamp
    const timestamp = new Date().getTime();
    const fileName = `event-images/${timestamp}-${file.name}`;
    
    // Create a reference to the file location
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}; 