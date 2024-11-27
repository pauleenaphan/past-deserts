import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assuming you've already set up Firebase in firebase.js

// Convert image file to a base64 string
const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const addMemory = async (title: string, notes: string, link: string, date: string, imgs: File[]) => {
    try {
        // Convert all images to base64
        const base64Images: string[] = [];
        for (const img of imgs) {
            const base64 = await convertToBase64(img);
            base64Images.push(base64); // Push each base64 string to the array
        }

        const collectionRef = collection(db, "dessertMemories");
        await addDoc(collectionRef, {
            title,
            notes,
            link,
            date,
            imgs: base64Images, // Store base64 strings of images
        });

        console.log("Memory added successfully.");
    } catch (error) {
        console.error("Error adding memory:", error);
    }
};

export const getMemories = async() =>{
    try {
        const collectionRef = collection(db, "dessertMemories");
        const querySnapshot = await getDocs(collectionRef);

        const memories = querySnapshot.docs.map((doc) => ({
            id: doc.id, // Firestore document ID
            ...doc.data(), // Spread the document data (title, notes, link, imgs)
        })) as {
            id: string;
            title: string;
            notes: string;
            link: string;
            date: string;
            imgs: string[];
        }[];

        console.log("Fetched memories:", memories);
        return memories; // Return the fetched memories
    } catch (error) {
        console.error("Error fetching documents: ", error);
    }
}
