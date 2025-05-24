import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { PostType } from "../../utils/types/Types";

export async function getPostByUserId(userId: string): Promise<PostType[]> {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const posts: PostType[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            content: data.content || "No content",
            createdAt: data.createdAt?.toDate().toISOString() || "No date",
            userId: data.userId || userId,
        };
    });
    return posts;
}

export async function addPost(post: PostType): Promise<string | null> {
    try {
        const postsRef = collection(db, "posts");
        const docRef = await addDoc(postsRef, {
            userId: post.userId,
            content: post.content,
            createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding post: ", error);
        return null;
    }
}