import { databaseStructure } from "./firebase-database";
import { collection, getDocs, getDoc, doc, setDoc } from "firebase/firestore";

export class FirebaseService {
    constructor(db) {
        this.db = db;
    }

    /**
     * create a document in a collection
     * @param {*} collectionName 
     * @param {*} id 
     * @param {*} data 
     * @returns 
     */
    create = async (collectionName, id, data) => {
        try {
            const docRef = doc(this.db, collectionName, id);
            await setDoc(docRef, data);
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
    }

    /**
     * get document by id
     * @param {*} collectionName 
     * @param {*} id 
     * @returns 
     */
    getById = async (collectionName, id) => {
        const docRef = doc(this.db, collectionName, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    }

    userNotes = {
        get: async (uid) => {

            // get user notes by uid
            let _data = await this.getById(databaseStructure.tables.userNotes, uid);

            // if not exists, initialize user notes
            if (!_data) _data = await this.userNotes.init(uid);

            return _data;

        },
        init: async (uid) => {

            let _data = {
                notes: []
            };

            let success = await this.create(databaseStructure.tables.userNotes, uid, _data);

            return success ? _data : null;
           
        }
    }
}