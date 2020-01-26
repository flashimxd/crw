import { takeLatest, put, all, call } from 'redux-saga/effects'
import UserActionTypes from './user.types'

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import { googleSignInSuccess, googleSignInError, emailSignInSuccess, emailSignInError, get} from './user.actions'

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
        yield put(emailSignInError())
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

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession)])
}