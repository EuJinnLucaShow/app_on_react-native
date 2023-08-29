import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const deletePost = (id) => async () => {
  try {
    await deleteDoc(doc(db, "posts", `${id}`));
    console.log("Post was successfully deleted");
    return id;
  } catch (e) {
    console.log("e.message", e.message);
  }
};

export const sendLike = async (id, userId, name, avatar) => {
  const uniqLikeId = userId;
  try {
    const docRef = doc(db, "posts", id, "likes", uniqLikeId);
    await setDoc(docRef, {
      ownerId: userId,
      ownerName: name,
      ownerAvatar: avatar,
    });
    console.log("Document LIKE written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLike = async (id, userId) => {
  try {
    const docRef = doc(db, "posts", id, "likes", userId);
    await deleteDoc(docRef);
    console.log("Like was successfully deleted");
  } catch (error) {
    console.error("Error when like deleting:", error);
  }
};
