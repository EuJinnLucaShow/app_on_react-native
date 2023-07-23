import db from '../../firebase/config';

export const authSignUp =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
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
