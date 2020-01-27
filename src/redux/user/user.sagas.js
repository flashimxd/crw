import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { googleSignInSuccess, googleSignInError, 
    emailSignInSuccess, emailSignInError, signOutSuccess, 
    signOutError, signUpSuccess, signUpError} from './user.actions'

export function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapShot = yield userRef.get();

        yield put (googleSignInSuccess({
                id: userSnapShot.id,
                ...userSnapShot,
            })
        );

    } catch (error) {
        yield put (googleSignInError(error))
    }
}

export function* signInWithEmail({ payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapShot = yield userRef.get();

        yield put (emailSignInSuccess({
                id: userSnapShot.id,
                ...userSnapShot,
            })
        );
    } catch (error) {
        yield put(emailSignInError(error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if(!userAuth) return

        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapShot = yield userRef.get();
            yield put (emailSignInSuccess({
                id: userSnapShot.id,
                ...userSnapShot,
            })
        );

    } catch (error) {
        yield put(emailSignInError(error))
    }
}

export function* signOut(){
    try {
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch (error) {
        yield put(signOutError(error))
    }
}

export function* singUp({ payload: { email, password, displayName }}) {
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(
            email,
            password
        );
        yield put(signUpSuccess({ user, additionalData: { displayName }}))
    } catch (error) {
        yield put(signUpError(error))
    }
}

export function* signInAfterSignUp({ payload: { user, additionalData }}) {
    try {
        const userRef = yield call(createUserProfileDocument, user, additionalData);
        const userSnapShot = yield userRef.get();
            yield put (emailSignInSuccess({
                id: userSnapShot.id,
                ...userSnapShot,
            })
        );
    } catch (error) {
        yield put(emailSignInError(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, singUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), 
               call(onCheckUserSession), call(onSignOutStart),
               call(onSignUpStart), call(onSignUpSuccess)
            ])
}