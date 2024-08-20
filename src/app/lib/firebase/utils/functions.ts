import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";
import { firebase } from "../firebase";
type NoteType = {
  category: string;
  content: {
    answer: string;
    question: string;
  }[];
};
const userRef = collection(firebase, "users");
const notesRef = (userId: string) =>
  collection(firebase, `/users/${userId}/notes`);

export async function getUser(userId: string) {
  const user = await getDoc(doc(userRef, userId));
  return user.data() ?? null;
}

export async function getNotes(id: string) {
  let result: NoteType[] = [];
  const docs = await getDocs(notesRef(id));
  docs.forEach((note) => result.push(note.data() as NoteType));
  return result;
}

export async function createNote<
  T extends {
    answer: string;
    question: string;
  }[]
>(userId: string, category: string, data: T) {
  const notes = await getNotes(userId);
  const exists = notes.find((note) => note.category === category);
  if (exists) {
    notes
    return exists;
  }

  const newRef = await addDoc(notesRef(userId), data);

  const newData = await getDoc(doc(newRef, newRef.id));

  return newData.data() as NoteType;
}

export async function createUser<T extends WithFieldValue<object>>(
  userId: string,
  data: T
) {
  const user = await getUser(userId);
  if (user) return user;

  const newRef = await addDoc(userRef, data);

  const newData = await getDoc(doc(newRef, userId));

  return newData;
}
