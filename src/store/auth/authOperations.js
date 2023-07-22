import db from '../../firebase/config';

export const authSignUp =
  ({ email, password, nickname }) =>
  async (dispatch, getState) => {
    try {
      console.log(email, password, nickname);
      const user = await db
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      console.log('error.message', error.message);
    }
  };

export const authSignIn =
  ({ email, password }) =>
  async dispatch => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
      console.log('error.code', error.code);
      console.log('error.message', error.message);
    }
  };
