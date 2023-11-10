import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const getData=async(collection,document)=>{
    
    const docRef = doc(db, collection, document);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}

export {getData}