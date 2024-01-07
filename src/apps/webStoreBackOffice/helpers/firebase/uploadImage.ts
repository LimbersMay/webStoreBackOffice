import {v4 as uuidv4} from "uuid";
import {deleteObject, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {FirebaseStorage} from "../../firebase";

interface ImageResponse {
    imageURL: string;
    imageName: string;
}

interface UploadImageToFirebaseProps {
    oldImageName: string;
    image: File;
    userId: string;
}

export const uploadImageToFirebase2 = async ({ oldImageName, image, userId }: UploadImageToFirebaseProps): Promise<ImageResponse> => {

    // Remove the old image if exists
    await removeImageFromFirebase(oldImageName, userId);

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

const removeImageFromFirebase = async (imageName: string, userId: string) => {
    const desertRef = ref(FirebaseStorage, `${userId}/images/${imageName}`);

    // Check if the resource exists
    getDownloadURL(desertRef)
        .then(() => {
            // The resource exists
            // Now you can proceed to delete it
            deleteObject(desertRef)
                .then(() => {
                    console.log("Image deleted successfully");
                })
                .catch((error) => {
                    console.log("Error deleting image", error);
                });
        }).catch((error) => {
            // The resource does not exist or there's an error while trying to get its download URL
            console.log("Image does not exist or error getting download URL", error);
        });
}