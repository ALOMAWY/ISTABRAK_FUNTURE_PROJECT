import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, setDoc, getDoc, getDocs, deleteDoc, updateDoc, doc, } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDnccB9KmPB3Vi1u_RSGCicwsbxI_o6WZQ",
    authDomain: "istabrak-funture-projcet.firebaseapp.com",
    projectId: "istabrak-funture-projcet",
    storageBucket: "istabrak-funture-projcet.appspot.com",
    messagingSenderId: "806552618866",
    appId: "1:806552618866:web:32d09cf5f695c896d63feb",
    measurementId: "G-8W9NC0J4WC",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(firebaseApp);
let submitForm = document.getElementById("submit-form");
export async function setItemToDb(documentId, data) {
    try {
        if (typeof documentId !== "string") {
            throw new TypeError("documentId must be strings");
        }
        const docRef = doc(db, "products", documentId);
        let productHasSetted = await setDoc(docRef, data);
        if (submitForm) {
            submitForm.innerText = "Add New Product";
        }
        return getAllDocuments();
    }
    catch (error) {
        console.log("Error Adding Document : ", error);
    }
}
export async function getItemFromDb(documentName) {
    // Get the document reference
    try {
        const docRef = doc(db, "products", documentName);
        // Fetch the document
        const docSnap = await getDoc(docRef);
        // Check if the document exists
        if (docSnap.exists()) {
            // Get the document data
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        }
        else {
            console.log("No such document!");
        }
    }
    catch (error) {
        console.log("Error Fetching Document ,", error);
    }
}
export async function updateDocument(documentId, updatedData) {
    const docRef = doc(db, "products", documentId);
    await updateDoc(docRef, updatedData);
    if (submitForm) {
        submitForm.innerText = "Updated Product";
        setTimeout(() => {
            submitForm.innerText = "Add New Product";
        }, 1000);
    }
}
// getItemToDb("products", "0223");
export async function getAllDocuments() {
    const querySanpshot = await getDocs(collection(db, "products"));
    const docs = [];
    if (querySanpshot.empty) {
        return "No Data";
    }
    else {
        querySanpshot.forEach((document) => {
            let doc = document;
            docs.push(doc.data());
        });
        return docs;
    }
}
export async function deleteDocument(documentName) {
    const docRef = doc(db, "products", documentName);
    await deleteDoc(docRef);
}
export async function deleteAllDocuments() {
    let products = (await getAllDocuments());
    products === null || products === void 0 ? void 0 : products.forEach((product) => deleteDocument(product.id));
    return [];
}
