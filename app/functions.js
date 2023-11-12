import { useAuth } from "@/firebase/auth";
import { db } from "@/firebase/config";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getdocs, updateDoc } from "firebase/firestore";

const getData = async (collection, document) => {

  const docRef = doc(db, collection, document);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}
const shuffle = (inputString) => {
  const array = inputString.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
}
const handleData = async () => {

  const User = getAuth()
  const hint = await getData("Questions", "hint");
  const userData = await getData("users", User.currentUser.email);
  const newPath = userData.path
  console.log(hint);
  console.log(newPath);

  if (userData[newPath[3]] === true) {
    try{
      const washingtonRef = doc(db, "users", User.currentUser.email);
      const endTime = new Date().getTime()
      const startTime = userData.startTime.seconds
      const totalTime = (endTime/1000)-startTime;
      console.log(totalTime);
      await updateDoc(washingtonRef, {
        endTime: endTime,
        completionTime: totalTime
      })
      return "completed"
    }
    catch(err){
      console.log("Database updation failed: ",err);
    }
  }
  for (let i = 0; i < 4; i++) {
    let c = newPath[i];
    if (userData[c] === false) {
      const obj = { hint: hint[c], level: i + 1 }
      return obj;
    }
  }
}
const handleQuestion = async (User) => {
  const userData = await getData("users", User.email);
  const question = await getData("Questions", 'a');
  console.log(question);
  const randomIndex = Math.floor(Math.random() * 3) + 1;
  const obj = { question: question[randomIndex], answer: question[`${randomIndex}a`] };
  console.log(obj);
  return obj;
}
const handleQuestionSubmit = async (User) => {
  const userData = await getData("users", User.email);
  const newPath = userData.path
  for (let i = 0; i < 4; i++) {
    let c = newPath[i];
    if (userData[c] === false) {
      try{
        const washingtonRef = doc(db, "users", User.email);
        await updateDoc(washingtonRef, {
          [c]: true
        })
          console.log("Success");
          return true;
      }
      catch(err){
        console.log("Failed ",err);
      }
      break;
    }
  }
}
export { getData, shuffle, handleData, handleQuestion, handleQuestionSubmit }