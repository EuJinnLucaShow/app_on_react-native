import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './config';

export const deletePost = id => async () => {
  try {
    await deleteDoc(doc(db, 'posts', `${id}`));
    return id;
  } catch (error) {
    console.log(error);
  }
};

export const sendLike = async (id, userId, name, avatar) => {
  const uniqLikeId = userId;
  try {
    const docRef = doc(db, 'posts', id, 'likes', uniqLikeId);
    await setDoc(docRef, {
      ownerId: userId,
      ownerName: name,
      ownerAvatar: avatar,
    });
    return docRef.id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteLike = async (id, userId) => {
  try {
    const docRef = doc(db, 'posts', id, 'likes', userId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(error);
  }
};
