import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { useRoute } from '../../router/router';
import { getStateChange } from '../../redux/auth/authSelectors';
import { authStateChangeUser } from '../../redux/auth/authOperations';

export default function Main() {
  const stateChange = useSelector(getStateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
