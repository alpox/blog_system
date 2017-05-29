import actions from './actions';
import { handleActions } from 'redux-actions';
import app from '../feathersClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

const initialState = {
    user: undefined,
    error: undefined
}

const registrationEpic = action$ =>
    action$.ofType(actions.auth.registration.request.toString())
        .mergeMap(({ payload: { username, email, password } }) =>
            app.service('users').create({
                username,
                email,
                password
            })
            .map(actions.auth.registration.fulfill)
            .catch(err => Observable.of(actions.auth.registration.error(err)))
        )

export const authEpic = registrationEpic;

export const authReducer =  handleActions({
    [actions.auth.registration.fulfill]: (state, { payload: user }) => ({
        ...state,
        user
    }),
    [actions.auth.registration.error]: (state, { payload: error }) => ({
        ...state,
        error
    })
}, initialState);