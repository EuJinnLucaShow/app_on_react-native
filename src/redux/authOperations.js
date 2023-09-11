import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { authLogOut, authStateChange, updateUserProfile } from './authSlice';

export const register = (name, email, password, photo) => async dispatch => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: name,
      photoURL: photo,
    });

    const {
      uid,
      displayName,
      email: emailBase,
      photoURL,
    } = await auth.currentUser;

    const userUpdateData = {
      userId: uid,
      name: displayName,
      email: emailBase,
      avatar: photoURL,
    };

    dispatch(updateUserProfile(userUpdateData));
    return user;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const login = (email, password) => async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    console.log(error.message);
    return error.message;
  }
};

export const authStateChangeUser = () => async dispatch => {
  onAuthStateChanged(auth, user => {
    if (user) {
      const userUpdateData = {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ stateChange: true }));
      dispatch(updateUserProfile(userUpdateData));
    }
  });
};

export const logout = () => async dispatch => {
  await signOut(auth);
  dispatch(authLogOut());
};

export const updateUserAvatar = dbAvatar => async dispatch => {
  try {
    const user = auth.currentUser;
    await updateProfile(user, {
      photoURL: dbAvatar,
    });

    const {
      uid,
      displayName,
      email: emailBase,
      photoURL,
    } = await auth.currentUser;

    const userUpdateData = {
      userId: uid,
      name: displayName,
      email: emailBase,
      avatar: photoURL,
    };

    dispatch(updateUserProfile(userUpdateData));
    return user;
  } catch (error) {
    console.log(error.message);
  }
};
