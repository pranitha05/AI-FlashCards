import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  WithFieldValue,
} from "firebase/firestore";
import { firebase } from "../firebase";
import { set } from "firebase/database";
type NoteType = {
  category: string;
  flashcards: {
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

export async function getNotes(id: string, noteId: string) {
  let result: NoteType[] = [];
  const docs = await getDocs(notesRef(id));
  docs.forEach((note) => result.push(note.data() as NoteType));
  return result;
}

type FlashcardRaw = {
  category: string;
  flashcards: {
    question: string;
    answer: string;
  }[];
};

export async function createBatchNotes(
  flashcards: FlashcardRaw,
  userId: string
) {
  const notesCollection = notesRef(userId);
  const { id } = await addDoc(notesCollection, flashcards);
  return id;
}

export async function getBatchNotes(userId: string) {
  let result: (NoteType & { id: string })[] = [];
  const x = await getDocs(collection(firebase, "users", userId, "notes"));
  x.forEach((data) => {
    const res = data.data();
    result.push({
      id: data.id,
      category: res.category,
      flashcards: res.flashcards,
    });
  });
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

export async function updateFlashcard(userId: string, noteId: string, data: FlashcardRaw) {
  const snapshot = query(collection(firebase, "users", userId, "notes"));
  const docSnap = await getDocs(snapshot);
  docSnap.forEach(async (doc) => {
    if (doc.id === noteId) {
      await deleteDoc(doc.ref);
      await addDoc(notesRef(userId), { flashcards: data.flashcards, category: data.category });
    }
  });
}

export async function deleteFlashcard(userId: string, noteId: string) {
  const notesCollection = notesRef(userId);
  const docRef = doc(notesCollection, noteId); 
  return deleteDoc(docRef);
}
