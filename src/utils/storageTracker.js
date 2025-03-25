import { ref, get } from 'firebase/database';
import { database } from '../api/firebase';

const MAX_STORAGE_SIZE = 900 * 1024 * 1024; // 900MB (leaving 100MB buffer)
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB per image

// Calculate size of base64 string in bytes
const getBase64Size = (base64String) => {
    // Remove data URL prefix if present
    const base64WithoutPrefix = base64String.split(',')[1] || base64String;
    // Base64 string length * 0.75 gives us the actual byte size
    return Math.ceil((base64WithoutPrefix.length * 3) / 4);
};

// Calculate size of all images in the database
export const calculateTotalStorageSize = async () => {
    try {
        const eventsRef = ref(database, 'events');
        const snapshot = await get(eventsRef);
        
        if (!snapshot.exists()) {
            return 0;
        }

        let totalSize = 0;
        const events = snapshot.val();
        
        Object.values(events).forEach(event => {
            if (event.image && event.image.startsWith('data:image')) {
                totalSize += getBase64Size(event.image);
            }
        });

        return totalSize;
    } catch (error) {
        console.error('Error calculating storage size:', error);
        throw error;
    }
};

// Check if adding a new image would exceed storage limit
export const checkStorageLimit = async (newImageBase64) => {
    try {
        if (!newImageBase64 || !newImageBase64.startsWith('data:image')) {
            return { canUpload: true, remainingSpace: MAX_STORAGE_SIZE };
        }

        const newImageSize = getBase64Size(newImageBase64);
        
        // Check if single image exceeds max size
        if (newImageSize > MAX_IMAGE_SIZE) {
            return {
                canUpload: false,
                error: `Image size (${(newImageSize / (1024 * 1024)).toFixed(2)}MB) exceeds maximum allowed size (2MB)`,
                remainingSpace: 0
            };
        }

        const currentTotalSize = await calculateTotalStorageSize();
        const remainingSpace = MAX_STORAGE_SIZE - currentTotalSize;
        
        if (currentTotalSize + newImageSize > MAX_STORAGE_SIZE) {
            return {
                canUpload: false,
                error: `Adding this image would exceed storage limit. Remaining space: ${(remainingSpace / (1024 * 1024)).toFixed(2)}MB`,
                remainingSpace
            };
        }

        return {
            canUpload: true,
            remainingSpace,
            usedSpace: currentTotalSize,
            newImageSize
        };
    } catch (error) {
        console.error('Error checking storage limit:', error);
        throw error;
    }
}; 