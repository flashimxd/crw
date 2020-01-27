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

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
})

export const signOutSuccess = user => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
})

export const signOutError = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
})

export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
})

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }
})

export const signUpError = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
})

