import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCO6h44QfNz1HPnEM54zRlsQaoTLjXVnR4",
  authDomain: "memory-game-hiscore.firebaseapp.com",
  projectId: "memory-game-hiscore",
  storageBucket: "memory-game-hiscore.appspot.com",
  messagingSenderId: "790271829645",
  appId: "1:790271829645:web:ab709f25e20a3d967e64c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to save a player's score
export async function saveScore(name, score, time) {
  try {
    // Round to 1 decimals
    const roundedTime = Math.round(time * 10) / 10;

    await addDoc(collection(db, "hiscores"), {
      name: name,
      score: score,
      time: roundedTime,
    });
    console.log("Score saved!", score, roundedTime);
  } catch (error) {
    console.error("Error saving score:", error);
  }
}

export async function getTopScores() {
  const q = query(collection(db, "hiscores"), orderBy("score", "asc"), orderBy("time", "asc"), limit(10));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
}
