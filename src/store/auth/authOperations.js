import db from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUp =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);
      const user = await db.auth().currentUser;
      await user.updateProfile({
        displayName: nickname,
      });

      const { uid, displayName } = await db.auth().currentUser;

      const userUpdateProfile = {
        userId: uid,
        nickName: displayName,
      };

      dispatch(authSlice.actions.updateUserProfile({ userUpdateProfile }));
    } catch (error) {
      console.log('error', error);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async dispatch => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('error', error);
    }
  };
