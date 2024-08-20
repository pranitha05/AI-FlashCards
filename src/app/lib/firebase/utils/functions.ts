import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  WithFieldValue,
} from "firebase/firestore";
import { firebase } from "../firebase";
import { set } from "firebase/database";
type NoteType = {
  category: string;
  content: {
    answer: string;
    question: string;
  }[];
};
const userRef = collection(firebase, "users");
const notesRef = (userId: string, noteId: string) =>
  collection(firebase, `/users/${userId}/notes/v1/${noteId}/`);

const notesWithoutNoteIdRef = (userId: string) => collection(firebase, `users/${userId}/notes`);

export async function getUser(userId: string) {
  const user = await getDoc(doc(userRef, userId));
  return user.data() ?? null;
}

export async function getNotes(id: string, noteId: string) {
  let result: NoteType[] = [];
  const docs = await getDocs(notesRef(id, noteId));
  docs.forEach((note) => result.push(note.data() as NoteType));
  return result;
}

type FlashcardRaw = {
  category: string;
  content: {
    question: string;
    answer: string;
  }[];
};

export async function createNote<
  T extends {
    answer: string;
    question: string;
  }
>(userId: string, category: string, data: T) {
  const newRef = await addDoc(notesRef(userId, category), data);

  const newData = await getDoc(doc(newRef, newRef.id));

  return newData.data() as NoteType;
}

export async function createBatchNotes(flashcards: FlashcardRaw, userId: string) {
  const notesCollection = notesRef(userId, flashcards.category)
  await addDoc(notesCollection, flashcards)
}


export async function getBatchNotes(userId: string) {
  let result: NoteType[] = [];
  const notesCollection = notesWithoutNoteIdRef(userId);
  const docs = await getDocs(notesCollection);
  docs.forEach((note) => result.push(note.data() as NoteType));
  return result;
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
