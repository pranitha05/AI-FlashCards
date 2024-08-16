import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";
import { firebase } from "../firebase";

const userRef = collection(firebase, "users");
const notesRef = (userId: string) =>
  collection(firebase, `/users/${userId}/notes`);

export async function getUser(userId: string) {
  const user = await getDoc(doc(userRef, userId));
  return user.data() ?? null;
}

export async function getNotes(id: string) {
  let result: string[] = [];
  const docs = await getDocs(notesRef(id));
  docs.forEach((note) => result.push(note.data().content));
  return result;
}

export async function createNote(userId: string, data: string) {
  const notes = await getNotes(userId);
  const exists = notes.find((note) => note === data);
  if (exists) return exists;

  const newRef = await addDoc(notesRef(userId), { content: data });

  const newData = await getDoc(doc(newRef, newRef.id));

  return newData;
}

export async function createUser<T extends WithFieldValue<object>>(
  userId: string,
  data: T
) {
  const user = await getUser(userId);
  if (user) return user;

  const newRef = await addDoc(userRef, data);

  const newData = await getDoc(doc(newRef, newRef.id));

  return newData;
}
