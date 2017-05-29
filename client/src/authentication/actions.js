import { createActions } from 'redux-actions';

export default createActions({
    AUTH: {
        REGISTRATION: {
            REQUEST: user => user,
            FULFILL: user => user,
            ERROR: error => error
        }
    }
})