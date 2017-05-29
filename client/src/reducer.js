import { INCREASE_COUNTER } from './actions';
import { combineReducers } from 'redux';
import { reducer as serviceReducer } from './feathersClient';
import { reducer as formReducer } from 'redux-form';
import { authReducer, authEpic } from './authentication/reducer'
import { combineEpics } from 'redux-observable';

const initialState = {
    counter: 0
}

const app = (state = initialState, action) => {
    switch(action.type) {
        case INCREASE_COUNTER:
            return { ...state, counter: action.counter}
        default:
            return state;
    }
}

export const rootEpic = combineEpics(
    authEpic
);

export const rootReducer = combineReducers({
    authentication: authReducer,
    form: formReducer
})