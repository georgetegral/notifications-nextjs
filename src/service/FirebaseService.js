import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "../config/firebase.config";

class FirebaseService{
	constructor(firebaseApp) {
        this.auth = getAuth(firebaseApp);
		this.firestore = getFirestore(firebaseApp);
	}

	getFirestoreDb(){
		return{
			error: null,
			db: this.firestore
		};
	}
}

export default new FirebaseService(getApp());
