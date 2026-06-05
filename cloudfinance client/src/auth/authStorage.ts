export interface storedUser{
    id: string;
    fullName: string;
    email: string;
    password: string;
    createdAt: string;
};

export interface StoredSession{
    id: string;
    userId: string;
    email: string;
    createdAt: string;
}

const DB_NAME = "cloud-expense-tracker";
const DB_VERSION = 1;

const USERS_STORE = 'users';
const SESSION_STORE = "session";

export function openAuthDb(): Promise<IDBDatabase>{
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        if(!window.indexedDB){
            return Promise.reject(
                new Error("IndexedBD is not supported in this browser")
            )
        }

        request.onerror = () => {
            reject(request.error)
        };

        request.onsuccess = () => {
            resolve(request.result)
        };

        request.onupgradeneeded = () => {
            const db = request.result;

            if(!db.objectStoreNames.contains(USERS_STORE)) {
                const userStore = db.createObjectStore(USERS_STORE, {
                    keyPath: "id"
                });

                userStore.createIndex("email", "email", {
                    unique: true,
                });
            }

            if(!db.objectStoreNames.contains(SESSION_STORE)){
                db.createObjectStore(SESSION_STORE, {
                    keyPath: "id",
                })
            }
        }
    })
}
