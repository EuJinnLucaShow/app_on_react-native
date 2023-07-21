const authSingIn = user => async dispatch => {
  dispatch(authActions.authRequest());

  try {
    const response = await axios.post('/users/login', user);
    token.set(response.data.token);
    dispatch(authActions.authSuccess(response.data));
  } catch (error) {
    dispatch(authActions.authError(error.message));
  }
};

const authSingUp = user => async dispatch => {
  dispatch(authActions.authRequest());

  try {
    const response = await axios.post('/users/signup', user);
    token.set(response.data.token);
    dispatch(authActions.authSuccess(response.data));
  } catch (error) {
    dispatch(authActions.authError(error.message));
  }
};

const authLogOut = () => async dispatch => {
  dispatch(authActions.authRequest());

  try {
    await axios.post('/users/logout');
    token.unset();
    dispatch(authActions.authSuccess());
  } catch (error) {
    dispatch(authActions.authError(error.message));
  }
};

const authRefresh = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.authRequest());

  try {
    const response = await axios.get('/users/current');
    dispatch(authActions.authSuccess(response.data));
  } catch (error) {
    dispatch(authActions.authError(error.message));
  }
};

export default {
  authSingIn,
  authSingUp,
  authLogOut,
  authRefresh,
};
