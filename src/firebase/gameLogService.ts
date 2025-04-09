import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { GameLogEntry } from "../types/GameLogEntry";

export async function saveGameLog(uid: string, gameLog: GameLogEntry[]) {
  if (!uid) return;
  try {
    await setDoc(doc(db, "users", uid), { gameLog });
    console.log("✅ Saved gameLog for:", uid);
  } catch (err) {
    console.error("❌ Failed to save gameLog:", err);
  }
}

export async function loadGameLog(uid: string): Promise<GameLogEntry[] | null> {
  if (!uid) return null;
  try {
    const docRef = doc(db, "users", uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      return data?.gameLog || [];
    }
    return null;
  } catch (err) {
    console.error("❌ Failed to load gameLog:", err);
    return null;
  }
}