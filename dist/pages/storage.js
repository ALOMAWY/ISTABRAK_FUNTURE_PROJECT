import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";
const firebaseConfig = {
    apiKey: "AIzaSyDnccB9KmPB3Vi1u_RSGCicwsbxI_o6WZQ",
    authDomain: "istabrak-funture-projcet.firebaseapp.com",
    projectId: "istabrak-funture-projcet",
    storageBucket: "istabrak-funture-projcet.appspot.com",
    messagingSenderId: "806552618866",
    appId: "1:806552618866:web:32d09cf5f695c896d63feb",
    measurementId: "G-8W9NC0J4WC"
};
const storage = getStorage();
export async function uploadImageAsInputFileRespownse(image) {
    const file = image;
    if (!file)
        return;
    const storageRef = ref(storage, "images/" + file.name);
    await uploadBytes(storageRef, file);
    return file.name;
}
export async function getImageByName(imageName) {
    const storageRef = ref(storage, `images/${imageName}`);
    const imageLink = await getDownloadURL(storageRef);
    console.log(imageLink);
    return imageLink;
}
export async function deleteImageFromDb(imageName) {
    const desertRef = ref(storage, `images/${imageName}`);
    try {
        await deleteObject(desertRef);
        console.log("The Image Has Deleted");
    }
    catch (error) {
        console.log("Some One Has Error", error);
    }
}
export async function deleteAllImagesFromDb(arrayOfImagesName) {
    arrayOfImagesName.forEach((imageName) => deleteImageFromDb(imageName));
}
