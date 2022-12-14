import { createContext, useContext, useState } from "react";
import FirebaseService from "../service/FirebaseService";
import {
	query,
	doc,
	getDoc,
	getDocs,
	collection,
	where,
	addDoc,
	updateDoc,
	onSnapshot
} from "firebase/firestore";

const firestoreContext = createContext();

export default function useFirestore() {
	return useContext(firestoreContext);
}

export function FirestoreProvider(props) {
    const [notificationData, setNotificationData] = useState(null);

    const subscribeNotifications = async() => {
        const { err, db } = await FirebaseService.getFirestoreDb();
        const q = query(collection(db, "notifications"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let length = querySnapshot.docs.length;
            var data = {};
            for (let i = 0; i < length; i++) {
                data[i] = querySnapshot.docs[i]._document.data.value.mapValue.fields
            }
            setNotificationData(data);
        });
        return () => unsubscribe();
    };

    const value = {
        notificationData,
        subscribeNotifications
    };

    return <firestoreContext.Provider value={value} {...props} />;
}



