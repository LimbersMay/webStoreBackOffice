import { ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import {FirebaseStorage} from "../firebase";

import { v4 as uuidv4 } from 'uuid';

interface ImageResponse {
    imageURL: string;
    imageName: string;
}

export const uploadImageToFirebase = async (image: File, userId: string): Promise<ImageResponse> => {

    const imageName = image.name + uuidv4();

    const storageRef = ref(FirebaseStorage, `${userId}/images/${imageName}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    return new Promise((resolve, reject) => {
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log(progress);
            },
            (error) => {
                alert(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve({
                        imageURL: downloadURL,
                        imageName: imageName
                    });
                });
            }
        );
    })
}

export const removeImageFromFirebase = async (imageName: string, userId: string) => {
    const desertRef = ref(FirebaseStorage, `${userId}/images/${imageName}`);
    deleteObject(desertRef).then(() => {
        console.log("Image deleted successfully")
    }).catch((error) => {
        console.log("Error deleting image", error);
    });
}