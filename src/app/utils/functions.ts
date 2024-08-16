import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebase } from "../lib/firebase/firebase";

const userRef = collection(firebase, "users");
const notesRef = (id: string) => collection(firebase, `/users/${id}/notes`);


export async function getUser(userId: string) {
    const user = await getDoc(doc(userRef, userId))
    const notes  = await getNotes(userId)
    return {...user.data(), notes } ?? null;
}

export async function getNotes(id: string) {
    let result: string[] = []
    const docs = await getDocs(notesRef(id))
    docs.forEach(note => result.push(note.data().content))
    return result;
}

export async function createNote(userId: string, data: string) {

}



export async function createUser(userId: string) {
    const user = await getUser(userId);
    if(user) return user;
    
    await addDoc(userRef, {})

}


