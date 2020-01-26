import UserActionTypes from './user.types';

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
})

export const googleSignInSuccess = user => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
})

export const googleSignInError = error => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  payload: error,
})

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
})

export const emailSignInSuccess = user => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user,
})

export const emailSignInError = error => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: error,
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
})

