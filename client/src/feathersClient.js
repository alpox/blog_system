// ---------------------------------------------------------------------------
// **** Setup FeathersJS ****
// ---------------------------------------------------------------------------

import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import errors from 'feathers-errors'; // An object with all of the custom error types.
import auth from 'feathers-authentication/client';
import rest from 'feathers-rest/client';
import reduxify from 'feathers-reduxify-services';
import rx from 'feathers-reactive';
import RxJS from 'rxjs';
import { combineReducers } from 'redux';

const debug = (elem) => console.log(elem) || elem;

const app = feathers()
  .configure(rest('http://localhost:3030').fetch(window.fetch.bind(window)))
  .configure(hooks())
  .configure(auth())
  .configure(rx(RxJS));

export default app;