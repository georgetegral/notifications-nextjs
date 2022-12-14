import { createContext, useContext, useState } from "react";
import FirebaseService from "../service/FirebaseService";
import {
	query,
	doc,
	getDocs,
	collection,
	updateDoc,
	onSnapshot
} from "firebase/firestore";
import { useToast } from '@chakra-ui/react';

const firestoreContext = createContext();

export default function useFirestore() {
	return useContext(firestoreContext);
}

export function FirestoreProvider(props) {
    const toast = useToast();
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

    const markAsSeen = async (id) => {
        try {
            const { err, db } = await FirebaseService.getFirestoreDb();
            const q = query(collection(db, "notifications"));
            const docs = await getDocs(q);
            if (docs.docs.length > 0) {
				const documentId = docs.docs[id].id;
				const ref = doc(db, 'notifications', documentId);
                toast({
                    title: 'Marked as seen',
                    status: 'success',
                    isClosable: true
                })
				await updateDoc(ref, {
					seen: true,
				});
			}
        } catch (e) {
            console.error(e);
        }
    }

    const value = {
        notificationData,
        subscribeNotifications,
        markAsSeen
    };

    return <firestoreContext.Provider value={value} {...props} />;
}



