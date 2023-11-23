import { db } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// To collect data from a document
const getData = async (collection, document) => {

  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}
//To create random pathway for each user
const shuffle = (inputString) => {
  const array = inputString.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}
// To fetch hint from firebase based on pathway
const handleData = async (email) => {

  // const hint = await getData("Questions", "hint");
  const userData = await getData("users", email);
  const newPath = userData.path

  // If user completed the game, then goto completion page and obtain completion time
  if (userData[newPath[9]] === true) {
    try {
      const washingtonRef = doc(db, "users", email);
      const endTime = new Date().getTime()
      const startTime = userData.startTime.seconds
      const totalTime = (endTime / 1000) - startTime;
      await updateDoc(washingtonRef, {
        endTime: endTime,
        completionTime: totalTime
      })
      const obj = { Name: userData.name, Email: email, StartTime: startTime, EndTime: (endTime / 1000), CompletionTime: totalTime }
      return obj;
    }
    catch (err) {
      return { hint: "Not available", level: "Cant find" }
    }
  }
  // To find the current pathway level and the particular hint
  for (let i = 0; i < 10; i++) {
    let c = newPath[i];
    if (userData[c] === false) {
      const hint = await getData("hint", c);
      const obj = { hint: hint, level: i + 1, userName: userData.name }
      return obj;
    }
  }
}

// To fetch random question for the particular path
const handleQuestion = async (User) => {
  try {
    const userData = await getData("users", User.email);
    const newPath = userData.path
    for (let i = 0; i < 10; i++) {
      let c = newPath[i];
      if (userData[c] === false){
        const question = await getData("Questions", c);
        const randomIndex = Math.floor(Math.random() * 3) + 1;
        const obj = { question: question[randomIndex], answer: question[`${randomIndex}a`], userName: userData.name };
        return obj;
      }
    }
    }catch (err) {
      alert("Something went Wrong, Try Again!!");
    }
  }
// To update firebase data if question is answered correctly
const handleQuestionSubmit = async (User) => {
    const userData = await getData("users", User.email);
    const newPath = userData.path
    for (let i = 0; i < 10; i++) {
      let c = newPath[i];
      if (userData[c] === false) {
        try {
          const washingtonRef = doc(db, "users", User.email);
          await updateDoc(washingtonRef, {
            [c]: true
          })
          return true;
        }
        catch (err) {
        }
        break;
      }
    }
  }
  // to check the path of user
  const checkUserPath = async (email) => {
    const newpath = await getData("users", email)
    if (newpath.path.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  export { getData, shuffle, handleData, handleQuestion, handleQuestionSubmit, checkUserPath }